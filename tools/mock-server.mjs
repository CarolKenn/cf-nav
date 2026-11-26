// 无需 wrangler 的本地运行环境：直接调用 Worker 的 fetch 入口，用内存 Map 模拟 KV
// 用法：node tools/mock-server.mjs [port]
import http from 'node:http';
import worker from '../src/index.js';

const port = Number(process.argv[2] || 8788);
const store = new Map();

const NAV = {
  async get(key) {
    return store.has(key) ? store.get(key) : null;
  },
  async put(key, value) {
    store.set(key, String(value));
  },
  async delete(key) {
    store.delete(key);
  },
};

const env = {
  NAV,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'nav-admin',
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v);

  let body;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    body = Buffer.concat(chunks);
  }

  const request = new Request(url, { method: req.method, headers, body });
  const ctx = {
    waitUntil(p) {
      Promise.resolve(p).catch(() => {});
    },
    passThroughOnException() {},
  };

  try {
    const response = await worker.fetch(request, env, ctx);
    const out = {};
    response.headers.forEach((v, k) => {
      out[k] = v;
    });
    res.writeHead(response.status, out);
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('mock server error: ' + err.stack);
  }
});

server.listen(port, () => {
  console.log(`mock server → http://localhost:${port}   (ADMIN_PASSWORD=${env.ADMIN_PASSWORD})`);
});
