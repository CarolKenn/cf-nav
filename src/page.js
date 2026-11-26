const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const CSS = `
*{box-sizing:border-box}
:root{
  --fg:#fff;
  --muted:rgba(255,255,255,.60);
  --muted2:rgba(255,255,255,.40);
  --card:rgba(11,14,30,.34);
  --card-hover:rgba(255,255,255,.14);
  --brd:rgba(255,255,255,.10);
  --brd-hover:rgba(255,255,255,.30);
  --r:12px;
  --bg1:#060916; --bg2:#111c46; --bg3:#2b0f3c;
  --b1:#ff2d95; --b2:#4a63ff; --b3:#ff77d0;
  --glow:rgba(84,116,255,.34);
}
html[data-theme="style2"]{--bg1:#03110e;--bg2:#08283a;--bg3:#042a22;--b1:#14d6a5;--b2:#1e7bff;--b3:#38f0c8;--glow:rgba(30,200,180,.28)}
html[data-theme="style3"]{--bg1:#150611;--bg2:#3a1230;--bg3:#2a0b18;--b1:#ff6a1a;--b2:#c026d3;--b3:#ffb26b;--glow:rgba(255,120,60,.26)}
html[data-theme="style4"]{--bg1:#04060f;--bg2:#101828;--bg3:#0a0f1c;--b1:#3b82f6;--b2:#8b5cf6;--b3:#22d3ee;--glow:rgba(120,140,255,.28)}
html,body{height:100%}
body{
  margin:0;min-height:100vh;color:var(--fg);background:var(--bg1);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}
.bg{position:fixed;inset:0;z-index:-1;overflow:hidden;
  background:
    radial-gradient(72% 52% at 50% -6%, var(--glow) 0%, transparent 62%),
    radial-gradient(64% 64% at 4% 102%, var(--b1) 0%, transparent 62%),
    radial-gradient(58% 58% at 82% 96%, var(--b3) 0%, transparent 66%),
    linear-gradient(158deg, var(--bg2) 0%, var(--bg1) 52%, var(--bg3) 100%);
}
.blob{position:absolute;border-radius:50%;filter:blur(72px);opacity:.5;mix-blend-mode:screen;will-change:transform;
  animation:drift 20s ease-in-out infinite;display:block}
.b1{width:58vw;height:58vw;left:-14vw;bottom:-26vw;background:radial-gradient(circle at 36% 36%, var(--b1), transparent 62%)}
.b2{width:44vw;height:44vw;right:-8vw;bottom:-14vw;background:radial-gradient(circle at 60% 40%, var(--b3), transparent 62%);animation-delay:-6s}
.b3{width:38vw;height:38vw;left:34vw;top:-18vw;background:radial-gradient(circle at 50% 50%, var(--b2), transparent 54%);opacity:.26;animation-delay:-12s}
.bg::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.13;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");}
@keyframes drift{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(2.4vw,-2.4vh,0) scale(1.09)}}

.wrap{max-width:1080px;margin:0 auto;padding:clamp(30px,7vh,66px) 20px 72px}
.hero{text-align:center;margin-bottom:clamp(22px,4vh,38px)}
.hero-row{display:flex;align-items:center;justify-content:center;gap:clamp(10px,1.6vw,18px);flex-wrap:wrap}
.brand{margin:0;font-size:clamp(32px,5.2vw,46px);font-weight:800;letter-spacing:-.025em;line-height:1.05;
  text-shadow:0 2px 22px rgba(0,0,0,.34)}
.clock{display:flex;flex-direction:column;align-items:flex-start;line-height:1.06;text-align:left}
.clock b{font-size:clamp(18px,2.4vw,22px);font-weight:700;letter-spacing:-.01em;font-variant-numeric:tabular-nums}
.clock small{font-size:11px;color:var(--muted);letter-spacing:.02em;margin-top:2px}
.sub{margin:12px 0 0;font-size:13px;color:var(--muted)}
.sub:empty{display:none}

.search{position:relative;max-width:640px;margin:22px auto 0;display:flex;align-items:center;gap:10px;
  height:46px;padding:0 12px 0 14px;border-radius:12px;
  background:rgba(7,9,22,.44);border:1px solid rgba(255,255,255,.14);
  -webkit-backdrop-filter:blur(14px) saturate(130%);backdrop-filter:blur(14px) saturate(130%);
  box-shadow:0 10px 30px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.07);
  transition:border-color .18s, background .18s, box-shadow .18s}
.search:focus-within{border-color:rgba(255,255,255,.34);background:rgba(7,9,22,.58);box-shadow:0 12px 34px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.1)}
.search svg{flex:0 0 auto;opacity:.55}
.search input{flex:1;min-width:0;height:100%;background:none;border:0;outline:0;color:#fff;font-size:14px;font-family:inherit}
.search input::placeholder{color:rgba(255,255,255,.46)}
.search kbd{flex:0 0 auto;font:inherit;font-size:11px;color:var(--muted2);border:1px solid rgba(255,255,255,.16);
  border-radius:5px;padding:1px 6px;line-height:1.5}

.sec{margin-top:26px}
.sec-h{display:flex;align-items:center;gap:8px;margin:0 0 12px;font-size:13px;font-weight:700;
  letter-spacing:.01em;color:rgba(255,255,255,.92)}
.sec-h .cnt{font-size:11px;font-weight:600;color:var(--muted2);padding:1px 6px;border-radius:5px;background:rgba(255,255,255,.07)}
.sec-h::after{content:"";height:1px;flex:1;background:linear-gradient(90deg,rgba(255,255,255,.14),transparent)}

.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(148px,1fr));gap:12px}
.stat{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:var(--r);
  background:var(--card);border:1px solid var(--brd);
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.stat .si{width:26px;height:26px;flex:0 0 26px;display:grid;place-items:center;border-radius:8px;
  background:rgba(255,255,255,.09);color:#cfe0ff;font-size:12px}
.stat .sb{flex:1;min-width:0}
.stat .sr{display:flex;align-items:baseline;justify-content:space-between;gap:8px}
.stat .sr span{font-size:11.5px;color:var(--muted);white-space:nowrap}
.stat .sr b{font-size:12.5px;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap}
.bar{height:3px;border-radius:3px;background:rgba(255,255,255,.12);margin-top:6px;overflow:hidden}
.bar i{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,#8ab4ff,#ff7ad1);
  transition:width .5s cubic-bezier(.22,1,.36,1)}

.apps{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:12px}
.app{display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--r);text-decoration:none;color:inherit;
  background:var(--card);border:1px solid var(--brd);
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
  transition:transform .18s cubic-bezier(.22,1,.36,1), background .18s, border-color .18s, box-shadow .18s}
.app:hover{transform:translateY(-2px);background:var(--card-hover);border-color:var(--brd-hover);
  box-shadow:0 14px 28px rgba(0,0,0,.26)}
.app:active{transform:translateY(0) scale(.99)}
.app .ico{width:30px;height:30px;flex:0 0 30px;border-radius:9px;display:grid;place-items:center;
  font-size:14px;font-weight:800;letter-spacing:-.02em;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
.app .ico img{width:100%;height:100%;object-fit:cover;display:block}
.app .tx{min-width:0}
.app .nm{display:block;font-size:13px;font-weight:600;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.app .ds{display:block;font-size:11px;color:var(--muted2);line-height:1.3;margin-top:2px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.intro{max-width:520px;margin:0 auto;text-align:center;font-size:13px;color:var(--muted);padding:20px 0}
.intro a{color:#9ec1ff}

.foot{margin-top:40px;font-size:11px;color:var(--muted2);text-align:left}
.foot a{color:var(--muted);text-decoration:none}
.foot a:hover{color:#fff;text-decoration:underline}

.fab{position:fixed;right:16px;bottom:16px;display:flex;flex-direction:column;gap:9px;z-index:8}
.fab button,.fab a{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;cursor:pointer;
  background:rgba(10,12,26,.55);border:1px solid rgba(255,255,255,.16);color:#fff;font-size:15px;text-decoration:none;
  -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transition:.18s}
.fab button:hover,.fab a:hover{background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.34)}

@media (max-width:600px){
  .wrap{padding:34px 16px 88px}
  .search kbd{display:none}
  .apps{grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:10px}
  .app{padding:10px}
  .foot{text-align:center}
}
@media (prefers-reduced-motion:reduce){
  .blob{animation:none}
  .app,.bar i{transition:none}
}
`;

const CLIENT_JS = `
(function(){
  var boot = window.__SITE__ || {};
  var site = boot.site || {};
  var stats = boot.stats || {};
  var apps = Array.isArray(site.apps) ? site.apps : [];
  var qEl = document.getElementById('q');
  var groupsEl = document.getElementById('groups');
  var state = { q: '' };

  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function norm(s){ return String(s == null ? '' : s).toLowerCase().trim(); }

  function iconHtml(a){
    var ic = a.icon || '';
    var letter = (a.name || '?').slice(0, 1);
    if (/^(https?:|data:)/i.test(ic)) {
      return '<span class="ico" style="background:rgba(255,255,255,.94)"><img src="' + esc(ic) + '" alt="" loading="lazy" referrerpolicy="no-referrer"></span>';
    }
    return '<span class="ico" style="background:' + esc(a.color || '#3b82f6') + '">' + esc(ic || letter) + '</span>';
  }

  function card(a){
    var href = a.url || '#';
    return '<a class="app" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer"'
      + ' data-id="' + esc(a.id) + '" title="' + esc(a.name + (a.desc ? ' · ' + a.desc : '') + '\\n' + href) + '">'
      + iconHtml(a)
      + '<span class="tx"><b class="nm">' + esc(a.name) + '</b>'
      + (a.desc ? '<small class="ds">' + esc(a.desc) + '</small>' : '')
      + '</span></a>';
  }

  function groupNames(){
    var names = [];
    (site.groupOrder || []).forEach(function(g){ if (g && names.indexOf(g) < 0) names.push(g); });
    apps.forEach(function(a){
      var g = a.group || '其他';
      if (names.indexOf(g) < 0) names.push(g);
    });
    return names.filter(function(g){
      return apps.some(function(a){ return (a.group || '其他') === g; });
    });
  }

  function matches(a, q){
    if (!q) return true;
    var hay = [a.name, a.desc, a.group, a.url].join(' ').toLowerCase();
    return hay.indexOf(q) >= 0;
  }

  function isUrlLike(v){
    var s = String(v || '').trim();
    if (!s || /\\s/.test(s)) return false;
    return /^[a-z0-9-]+(\\.[a-z0-9-]+)+(\\/[^\\s]*)?$/i.test(s) || /^https?:\\/\\//i.test(s);
  }
  function toUrl(v){
    var s = String(v || '').trim();
    return /^https?:\\/\\//i.test(s) ? s : 'https://' + s;
  }

  function render(){
    var q = norm(state.q);
    var html = '';
    var shown = 0;

    if (q && isUrlLike(state.q)) {
      html += '<section class="sec"><h2 class="sec-h">搜索直达</h2><div class="apps">'
        + '<a class="app" href="' + esc(toUrl(state.q)) + '" target="_blank" rel="noopener noreferrer">'
        + '<span class="ico" style="background:linear-gradient(135deg,#5b8cff,#ff5fb4)">\\u2197</span>'
        + '<span class="tx"><b class="nm">打开网址</b><small class="ds">' + esc(toUrl(state.q)) + '</small></span></a>'
        + '</div></section>';
    }

    groupNames().forEach(function(g){
      var list = apps.filter(function(a){ return (a.group || '其他') === g; })
                     .filter(function(a){ return matches(a, q); });
      if (!list.length) return;
      shown += list.length;
      html += '<section class="sec"><h2 class="sec-h">' + esc(g)
        + '<span class="cnt">' + list.length + '</span></h2>'
        + '<div class="apps">' + list.map(card).join('') + '</div></section>';
    });

    if (q && shown === 0 && !isUrlLike(state.q)) {
      html += '<div class="intro">没有找到匹配的应用，试试别的关键词</div>';
    }
    groupsEl.innerHTML = html;
  }

  function renderStats(){
    var el = document.getElementById('stats');
    if (!el) return;
    var pv = Number(stats.pv || 0);
    var n = apps.length;
    var g = groupNames().length;
    var latency = stats.latency;
    var items = [
      { i: '\\u25a6', k: '应用', v: n + ' 个', p: Math.min(100, n * 4 || 3) },
      { i: '\\u25a4', k: '分组', v: g + ' 组', p: Math.min(100, g * 14 || 3) },
      { i: '\\u25d4', k: '访问', v: pv + ' 次', p: pv ? Math.min(100, 14 + Math.log(pv + 1) / Math.log(2) * 8) : 4 },
      { i: '\\u2601', k: '边缘', v: stats.colo || 'CF', p: 100 },
      { i: '\\u2310', k: 'KV 读取', v: (latency == null ? '—' : latency + ' ms'), p: latency == null ? 20 : Math.max(8, Math.min(100, 100 - latency * 6)) }
    ];
    el.innerHTML = items.map(function(it){
      return '<div class="stat"><span class="si">' + it.i + '</span><div class="sb">'
        + '<div class="sr"><span>' + it.k + '</span><b>' + it.v + '</b></div>'
        + '<div class="bar"><i style="width:' + it.p + '%"></i></div></div></div>';
    }).join('');
  }

  function tick(){
    var d = new Date();
    var wd = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][d.getDay()];
    var pad = function(v){ return v < 10 ? '0' + v : '' + v; };
    var t = document.getElementById('clock-time');
    var dd = document.getElementById('clock-date');
    if (t) t.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes());
    if (dd) dd.textContent = (d.getMonth() + 1) + '-' + d.getDate() + ' ' + wd;
  }

  function track(id){
    var body = JSON.stringify({ id: id || null });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/hit', new Blob([body], { type: 'application/json' }));
        return;
      }
    } catch (e) {}
    try { fetch('/api/hit', { method: 'POST', body: body, keepalive: true }); } catch (e) {}
  }

  // 主题切换
  var themes = ['style1', 'style2', 'style3', 'style4'];
  var names = { style1: 'Style 1', style2: 'Style 2', style3: 'Style 3', style4: 'Style 4' };
  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    var label = document.getElementById('styleName');
    if (label) label.textContent = names[t] || t;
    try { localStorage.setItem('nav-theme', t); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('nav-theme'); } catch (e) {}
  applyTheme(saved && themes.indexOf(saved) >= 0 ? saved : (site.theme || 'style1'));

  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', function(){
    var cur = document.documentElement.getAttribute('data-theme') || 'style1';
    applyTheme(themes[(themes.indexOf(cur) + 1) % themes.length]);
  });

  if (qEl) {
    qEl.addEventListener('input', function(){ state.q = qEl.value; render(); });
    qEl.addEventListener('keydown', function(e){
      if (e.key === 'Enter') {
        var first = groupsEl.querySelector('a.app');
        if (first) { window.open(first.href, '_blank', 'noopener'); }
      } else if (e.key === 'Escape') {
        qEl.value = ''; state.q = ''; render(); qEl.blur();
      }
    });
  }
  document.addEventListener('keydown', function(e){
    var tag = (e.target.tagName || '').toLowerCase();
    if (e.key === '/' && tag !== 'input' && tag !== 'textarea') { e.preventDefault(); if (qEl) qEl.focus(); }
  });

  groupsEl.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a.app') : null;
    if (a && a.dataset.id) track(a.dataset.id);
  });

  tick();
  setInterval(tick, 1000);
  renderStats();
  render();
  track(null);
})();
`;

export function renderPage({ site, stats = {} }) {
  const boot = JSON.stringify({ site, stats }).replace(/</g, '\\u003c');
  return `<!DOCTYPE html>
<html lang="zh-CN" data-theme="${esc(site.theme || 'style1')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="dark">
<title>${esc(site.title)}</title>
<meta name="description" content="${esc(site.desc || '')}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>${CSS}</style>
</head>
<body>
<div class="bg"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i></div>
<main class="wrap">
  <header class="hero">
    <div class="hero-row">
      <h1 class="brand">${esc(site.title)}</h1>
      <div class="clock"><b id="clock-time">--:--</b><small id="clock-date"></small></div>
    </div>
    <p class="sub">${esc(site.desc || '')}</p>
    <form class="search" onsubmit="return false">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.6-3.6"></path></svg>
      <input id="q" type="text" placeholder="搜索应用、网址或分组…" autocomplete="off" spellcheck="false" aria-label="搜索">
      <kbd>/</kbd>
    </form>
  </header>
  ${site.showStats === false ? '' : '<section class="sec"><h2 class="sec-h">站点概览</h2><div class="stats" id="stats"></div></section>'}
  <div id="groups"></div>
  <footer class="foot"><span id="styleName">Style 1</span> · ${esc(site.footer || 'Worker + KV')} · <a href="/admin">管理</a></footer>
</main>
<div class="fab">
  <button id="themeBtn" type="button" title="切换配色" aria-label="切换配色">◐</button>
  <a href="/admin" title="管理" aria-label="管理">⚙</a>
</div>
<script>window.__SITE__=${boot};</script>
<script>${CLIENT_JS}</script>
</body>
</html>`;
}

export function renderMessage({ title, message, link }) {
  return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;color:#fff;
font-family:-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
background:radial-gradient(70% 60% at 20% 100%,#ff2d95 0%,transparent 60%),linear-gradient(160deg,#111c46,#060916)}
.box{max-width:460px;padding:32px;border-radius:16px;background:rgba(10,12,28,.5);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(14px);text-align:center}
h1{margin:0 0 10px;font-size:20px}p{margin:0;color:rgba(255,255,255,.66);font-size:13px;line-height:1.7}
a{display:inline-block;margin-top:18px;color:#9ec1ff;font-size:13px}</style></head>
<body><div class="box"><h1>${esc(title)}</h1><p>${message}</p>${link ? `<a href="${esc(link)}">返回首页</a>` : ''}</div></body></html>`;
}
