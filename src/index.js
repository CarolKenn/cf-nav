import { DEFAULT_SITE, normalizeSite } from './defaults.js';
import { renderPage, renderMessage, renderSetup } from './page.js';
import { renderAdmin, renderLogin } from './admin.js';

const SITE_KEY = 'site';
const STATS_KEY = 'stats';
const COOKIE = 'nav_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 天

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#4f7dff"/><stop offset="1" stop-color="#ff5fb4"/></linearGradient></defs>
<rect width="64" height="64" rx="16" fill="url(#g)"/>
<circle cx="32" cy="32" r="14" fill="none" stroke="#fff" stroke-width="3.6" opacity=".92"/>
<path d="M32 14v7M32 43v7M14 32h7M43 32h7" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/>
<circle cx="32" cy="32" r="3.4" fill="#fff"/></svg>`;

const enc = new TextEncoder();

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    try {
      if (request.method === 'OPTIONS') return new Response(null, { status: 204 });

      if (pathname === '/favicon.svg') {
        return new Response(FAVICON, {
          headers: { 'content-type': 'image/svg+xml; charset=utf-8', 'cache-control': 'public, max-age=86400' },
        });
      }
      if (pathname === '/healthz') return json({ ok: true, colo: request.cf?.colo ?? null });

      if (pathname.startsWith('/api/')) return await handleApi(request, env, url, ctx);

      if (pathname === '/admin' || pathname === '/admin/') return await handleAdmin(request, env);

      if (pathname === '/' || pathname === '/index.html') return await handleHome(request, env);

      return new Response(
        renderMessage({ title: '404', message: '这个地址不存在，回首页看看吧。', link: '/' }),
        { status: 404, headers: htmlHeaders() }
      );
    } catch (err) {
      const msg = err && err.message ? err.message : '未知错误';
      return new Response(`Internal Error: ${msg}`, {
        status: 500,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }
  },
};

/* ───────────────────────────── 页面 ───────────────────────────── */

async function handleHome(request, env) {
  const started = performance.now();
  let site = DEFAULT_SITE;
  let latency = null;

  if (env.NAV) {
    try {
      const raw = await env.NAV.get(SITE_KEY);
      latency = Math.round((performance.now() - started) * 10) / 10;
      if (raw) site = normalizeSite(JSON.parse(raw));
    } catch {
      latency = null;
    }
  }

  let stats = { pv: 0, hits: {} };
  if (env.NAV) {
    try {
      const raw = await env.NAV.get(STATS_KEY, { cacheTtl: 30 });
      if (raw) stats = { ...stats, ...JSON.parse(raw) };
    } catch {}
  }

  const html = renderPage({
    site,
    stats: {
      pv: Number(stats.pv || 0),
      colo: request.cf?.colo || 'CF',
      latency,
    },
  });

  return new Response(html, { headers: htmlHeaders() });
}

async function handleAdmin(request, env) {
  const authed = await isAuthed(request, env);
  if (!env.ADMIN_PASSWORD) {
    const url = new URL(request.url);
    const host = url.hostname;
    const workerName = host.endsWith('.workers.dev') ? host.split('.')[0] : '';
    return new Response(renderSetup({ workerName, host }), { status: 503, headers: htmlHeaders() });
  }
  if (!authed) return new Response(renderLogin({ weak: env.ADMIN_PASSWORD === 'nav-admin' }), { headers: htmlHeaders() });

  const site = await loadSite(env);
  return new Response(renderAdmin({ site }), { headers: htmlHeaders() });
}

/* ───────────────────────────── API ───────────────────────────── */

async function handleApi(request, env, url, ctx) {
  const path = url.pathname;
  const method = request.method;

  if (path === '/api/site' && method === 'GET') {
    const site = await loadSite(env);
    return json({ ok: true, site });
  }

  if (path === '/api/login' && method === 'POST') {
    if (!env.ADMIN_PASSWORD) return json({ ok: false, error: '服务端未配置 ADMIN_PASSWORD' }, 500);
    const body = await readJson(request);
    const pwd = String(body.password || '');
    if (!safeEqual(pwd, env.ADMIN_PASSWORD)) return json({ ok: false, error: '密码不正确' }, 401);

    const token = await issueToken(env);
    const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
    return json(
      { ok: true },
      200,
      { 'set-cookie': `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${secure}` }
    );
  }

  if (path === '/api/logout' && method === 'POST') {
    const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
    return json({ ok: true }, 200, { 'set-cookie': `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}` });
  }

  if (path === '/api/admin/site') {
    if (!(await isAuthed(request, env))) return json({ ok: false, error: '未登录' }, 401);
    if (method === 'GET') return json({ ok: true, site: await loadSite(env) });
    if (method === 'PUT') {
      if (!env.NAV) return json({ ok: false, error: '未绑定 KV：请配置 [[kv_namespaces]] 并创建 NAV' }, 500);
      const body = await readJson(request);
      if (!body || !Array.isArray(body.apps)) return json({ ok: false, error: '数据格式错误：缺少 apps 数组' }, 400);
      if (body.apps.length > 300) return json({ ok: false, error: '应用数量上限 300' }, 400);

      const site = normalizeSite(body);
      await env.NAV.put(SITE_KEY, JSON.stringify(site));
      return json({ ok: true, site });
    }
  }

  if (path === '/api/hit' && method === 'POST') {
    if (!env.NAV) return json({ ok: true, skipped: true });
    const body = await readJson(request);
    const id = body && typeof body.id === 'string' ? body.id.slice(0, 64) : null;
    ctx.waitUntil(bumpStats(env, id).catch(() => {}));
    return json({ ok: true });
  }

  return json({ ok: false, error: 'Not Found' }, 404);
}

/* ───────────────────────────── KV ───────────────────────────── */

async function loadSite(env) {
  if (!env.NAV) return DEFAULT_SITE;
  try {
    const raw = await env.NAV.get(SITE_KEY);
    if (!raw) return DEFAULT_SITE;
    return normalizeSite(JSON.parse(raw));
  } catch {
    return DEFAULT_SITE;
  }
}

async function bumpStats(env, appId) {
  let stats = { pv: 0, hits: {}, updated: 0 };
  try {
    const raw = await env.NAV.get(STATS_KEY);
    if (raw) stats = { ...stats, ...JSON.parse(raw) };
  } catch {}
  stats.hits = stats.hits && typeof stats.hits === 'object' ? stats.hits : {};
  if (appId) {
    stats.hits[appId] = Number(stats.hits[appId] || 0) + 1;
  } else {
    stats.pv = Number(stats.pv || 0) + 1;
  }
  stats.updated = Date.now();
  await env.NAV.put(STATS_KEY, JSON.stringify(stats));
}

/* ───────────────────────────── 会话 ───────────────────────────── */

function sessionSecret(env) {
  return env.SESSION_SECRET || env.ADMIN_PASSWORD || 'insecure-dev-secret';
}

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
}

async function issueToken(env) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `v1.${exp}`;
  const key = await hmacKey(sessionSecret(env));
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(payload)));
  return `${payload}.${b64url(sig)}`;
}

async function isAuthed(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  const raw = parseCookies(request.headers.get('cookie') || '')[COOKIE];
  if (!raw) return false;
  const parts = raw.split('.');
  if (parts.length !== 3) return false;
  const [ver, expStr, sig] = parts;
  const exp = Number(expStr);
  if (ver !== 'v1' || !Number.isFinite(exp) || exp * 1000 < Date.now()) return false;
  const key = await hmacKey(sessionSecret(env));
  const expect = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(`${ver}.${expStr}`)));
  return safeEqual(sig, b64url(expect));
}

/* ───────────────────────────── 工具 ───────────────────────────── */

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  });
}

function htmlHeaders() {
  return {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'content-security-policy':
      "default-src 'self'; img-src * data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; base-uri 'none'; form-action 'self'",
  };
}

async function readJson(request) {
  try {
    const text = await request.text();
    if (!text) return {};
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function b64url(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function parseCookies(header) {
  const out = {};
  header.split(';').forEach((part) => {
    const i = part.indexOf('=');
    if (i < 0) return;
    out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  });
  return out;
}

function safeEqual(a, b) {
  const x = String(a);
  const y = String(b);
  let diff = x.length ^ y.length;
  const n = Math.max(x.length, y.length);
  for (let i = 0; i < n; i++) diff |= (x.charCodeAt(i) || 0) ^ (y.charCodeAt(i) || 0);
  return diff === 0;
}
