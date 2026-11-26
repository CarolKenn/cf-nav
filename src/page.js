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

/* 只有图标：没有卡片底框，图标本身就是一个正方形 */
.apps{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:14px 8px}
.app{position:relative;display:flex;flex-direction:column;align-items:center;gap:7px;
  padding:2px 0;background:none;border:0;text-decoration:none;color:inherit;font:inherit;cursor:pointer;
  transition:transform .18s cubic-bezier(.22,1,.36,1)}
.app:active{transform:scale(.97)}
.app .ico{width:44px;height:44px;flex:0 0 44px;border-radius:13px;display:grid;place-items:center;
  font-size:18px;font-weight:800;letter-spacing:-.02em;overflow:hidden;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.14), 0 3px 10px rgba(0,0,0,.22);
  transition:transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s}
.app:hover .ico{transform:translateY(-3px) scale(1.06);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.26), 0 10px 22px rgba(0,0,0,.42)}
.app:active .ico{transform:translateY(-1px) scale(1.01)}
.app .ico img{width:100%;height:100%;object-fit:cover;display:block}
.app .tx{width:100%;min-width:0;text-align:center}
.app .nm{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
  font-size:11px;font-weight:500;line-height:1.25;word-break:break-word;
  color:rgba(255,255,255,.72);transition:color .18s}
.app:hover .nm{color:#fff}
.app .ds{display:none}

/* 编辑态：同样不加底框，只给图标描边提示可点 */
.app .ops{position:absolute;top:-4px;right:calc(50% - 32px);display:none;z-index:2}
.edit-on .app .ops{display:block}
.app .ops button{width:18px;height:18px;padding:0;border-radius:50%;display:grid;place-items:center;
  border:1px solid rgba(255,255,255,.24);background:rgba(8,10,22,.92);color:rgba(255,255,255,.82);
  font:inherit;font-size:11px;line-height:1;cursor:pointer;transition:.15s;
  box-shadow:0 2px 6px rgba(0,0,0,.4)}
.app .ops button:hover{background:#e11d48;border-color:#e11d48;color:#fff}
.edit-on .app .ico{box-shadow:inset 0 0 0 1px rgba(255,255,255,.26), 0 0 0 2px rgba(120,150,255,0)}
.edit-on .app:hover .ico{box-shadow:inset 0 0 0 1px rgba(255,255,255,.26), 0 0 0 2px rgba(140,170,255,.85)}
.app.add{color:var(--muted)}
.app.add .plus{width:44px;height:44px;flex:0 0 44px;border-radius:13px;display:grid;place-items:center;
  border:1px dashed rgba(255,255,255,.3);font-size:20px;font-weight:300;line-height:1;
  color:rgba(255,255,255,.6);transition:.18s}
.app.add:hover .plus{border-color:rgba(160,185,255,.8);color:#fff;background:rgba(255,255,255,.06)}

.ebar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 18px;padding:9px 12px;border-radius:11px;
  font-size:12px;color:rgba(255,255,255,.78);
  background:rgba(90,120,255,.16);border:1px solid rgba(140,170,255,.34)}
.ebar b{font-weight:600;color:#fff}
.ebar .sp{flex:1}
.ebar button{height:26px;padding:0 10px;border-radius:7px;font:inherit;font-size:11.5px;cursor:pointer;
  color:#fff;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);transition:.15s}
.ebar button:hover{background:rgba(255,255,255,.22)}
.ebar button.done{background:linear-gradient(135deg,#4f7dff,#ff5fb4);border-color:transparent;font-weight:600}

/* 搜索直达的宽卡 */
.direct{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;text-decoration:none;
  color:inherit;background:var(--card);border:1px solid var(--brd);
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);transition:.18s}
.direct:hover{background:var(--card-hover);border-color:var(--brd-hover)}
.direct .ico{width:36px;height:36px;flex:0 0 36px;border-radius:11px;display:grid;place-items:center;font-size:15px}
.direct .dt{min-width:0}
.direct b{display:block;font-size:13px;font-weight:600}
.direct small{display:block;font-size:11px;color:var(--muted2);margin-top:2px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* 编辑弹层 */
.sheet{position:fixed;inset:0;z-index:30;display:none;align-items:center;justify-content:center;padding:18px;
  background:rgba(4,6,16,.62);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
.sheet.on{display:flex}
.sheet .box{width:100%;max-width:392px;border-radius:16px;padding:18px;
  background:rgba(14,17,34,.97);border:1px solid rgba(255,255,255,.14);box-shadow:0 24px 60px rgba(0,0,0,.5)}
.sheet h3{margin:0 0 14px;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:space-between}
.sheet h3 span{font-size:11px;font-weight:500;color:var(--muted2)}
.sheet .f{margin-bottom:10px}
.sheet label{display:block;font-size:11px;color:var(--muted);margin-bottom:4px}
.sheet input[type=text],.sheet input[type=url]{width:100%;height:34px;padding:0 10px;border-radius:9px;
  font:inherit;font-size:13px;color:#fff;background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.13);outline:0;transition:.16s}
.sheet input[type=text]:focus,.sheet input[type=url]:focus{border-color:rgba(150,180,255,.6);background:rgba(255,255,255,.1)}
.sheet .row2{display:grid;grid-template-columns:1fr 62px;gap:8px}
.sheet input[type=color]{width:100%;height:34px;padding:2px;border-radius:9px;cursor:pointer;
  border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06)}
.sheet .acts{display:flex;gap:8px;margin-top:16px}
.sheet .btn{flex:1;height:34px;border-radius:9px;font:inherit;font-size:12.5px;cursor:pointer;color:#fff;
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);transition:.15s}
.sheet .btn:hover{background:rgba(255,255,255,.15)}
.sheet .btn.primary{background:linear-gradient(135deg,#4f7dff,#ff5fb4);border-color:transparent;font-weight:600}
.sheet .btn.primary:hover{filter:brightness(1.08)}
.sheet .btn.danger{flex:0 0 auto;padding:0 12px;color:#ff9db0;background:rgba(255,60,90,.12);border-color:rgba(255,80,110,.35)}
.sheet .btn.danger:hover{background:rgba(255,60,90,.28)}
.sheet .btn:disabled{opacity:.55;cursor:default}

#toast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,20px);opacity:0;pointer-events:none;
  padding:10px 18px;border-radius:10px;background:rgba(20,24,46,.94);border:1px solid rgba(255,255,255,.16);
  font-size:12.5px;transition:.24s;z-index:40;max-width:80vw;text-align:center}
#toast.on{opacity:1;transform:translate(-50%,0)}
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
.fab button.on{background:linear-gradient(135deg,#4f7dff,#ff5fb4);border-color:transparent;color:#fff}
.edit-on #themeBtn{display:none}

@media (max-width:600px){
  .wrap{padding:34px 16px 88px}
  .search kbd{display:none}
  .apps{grid-template-columns:repeat(auto-fill,minmax(66px,1fr));gap:12px 6px}
  .app{gap:6px}
  .app .ico{width:40px;height:40px;flex:0 0 40px;font-size:16px;border-radius:12px}
  .app.add .plus{width:40px;height:40px;flex:0 0 40px;border-radius:12px}
  .app .ops{right:calc(50% - 29px)}
  .app .nm{font-size:10.5px}
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
  var canEdit = !!boot.canEdit;
  var qEl = document.getElementById('q');
  var groupsEl = document.getElementById('groups');
  var toastEl = document.getElementById('toast');
  var sheet = document.getElementById('sheet');
  var editBtn = document.getElementById('editBtn');
  var state = { q: '', editing: false, editingId: null };
  var tId = 0;
  var PALETTE = ['#4b7bec','#e11d48','#0ea5e9','#10b981','#f59e0b','#8b5cf6','#ec4899','#14b8a6','#f97316','#6366f1'];

  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function norm(s){ return String(s == null ? '' : s).toLowerCase().trim(); }

  function toast(msg){
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(tId);
    tId = setTimeout(function(){ toastEl.classList.remove('on'); }, 1900);
  }

  function iconHtml(a){
    var ic = a.icon || '';
    var letter = (a.name || '?').slice(0, 1);
    if (/^(https?:|data:)/i.test(ic)) {
      return '<span class="ico" style="background:rgba(255,255,255,.94)"><img src="' + esc(ic) + '" alt="" loading="lazy" referrerpolicy="no-referrer"></span>';
    }
    return '<span class="ico" style="background:' + esc(a.color || '#3b82f6') + '">' + esc(ic || letter) + '</span>';
  }

  function card(a){
    var inner = iconHtml(a) + '<span class="tx"><b class="nm">' + esc(a.name) + '</b></span>';
    if (state.editing) {
      return '<div class="app" data-id="' + esc(a.id) + '" role="button" tabindex="0"'
        + ' title="' + esc(a.name + (a.desc ? ' · ' + a.desc : '')) + '">'
        + '<span class="ops"><button type="button" data-del="' + esc(a.id) + '" title="删除">\\u00d7</button></span>'
        + inner + '</div>';
    }
    var href = a.url || '#';
    return '<a class="app" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer"'
      + ' data-id="' + esc(a.id) + '" title="' + esc(a.name + (a.desc ? ' · ' + a.desc : '') + '\\n' + href) + '">'
      + inner + '</a>';
  }

  function addTile(g){
    return '<button type="button" class="app add" data-add="' + esc(g) + '" title="新增到「' + esc(g) + '」">'
      + '<span class="plus">+</span><span class="tx"><b class="nm">新增</b></span></button>';
  }

  function groupNames(){
    var names = [];
    (site.groupOrder || []).forEach(function(g){ if (g && names.indexOf(g) < 0) names.push(g); });
    apps.forEach(function(a){
      var g = a.group || '其他';
      if (names.indexOf(g) < 0) names.push(g);
    });
    return names.filter(function(g){
      if (state.editing) return true;
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

    if (state.editing) {
      html += '<div class="ebar"><b>编辑模式</b><span>点卡片修改 · 右上角 × 删除</span>'
        + '<span class="sp"></span>'
        + '<button type="button" data-ebar="add">\\uff0b 新增</button>'
        + '<button type="button" class="done" data-ebar="done">完成</button></div>';
    }

    if (q && isUrlLike(state.q)) {
      html += '<section class="sec"><h2 class="sec-h">搜索直达</h2>'
        + '<a class="direct" href="' + esc(toUrl(state.q)) + '" target="_blank" rel="noopener noreferrer">'
        + '<span class="ico" style="background:linear-gradient(135deg,#5b8cff,#ff5fb4)">\\u2197</span>'
        + '<span class="dt"><b>打开网址</b><small>' + esc(toUrl(state.q)) + '</small></span></a></section>';
    }

    groupNames().forEach(function(g){
      var list = apps.filter(function(a){ return (a.group || '其他') === g; })
                     .filter(function(a){ return matches(a, q); });
      if (!list.length && (!state.editing || q)) return;
      shown += list.length;
      var tiles = list.map(card).join('');
      if (state.editing && !q) tiles += addTile(g);
      html += '<section class="sec"><h2 class="sec-h">' + esc(g)
        + '<span class="cnt">' + list.length + '</span></h2>'
        + '<div class="apps">' + tiles + '</div></section>';
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

  /* ── 前台直接增删改 ── */

  function applySite(next){
    if (!next || !Array.isArray(next.apps)) return;
    site = next;
    apps = next.apps;
    syncGroups();
    render();
    renderStats();
  }

  /* 分组下拉的候选值跟随最新数据 */
  function syncGroups(){
    var dl = document.getElementById('groups-dl');
    if (!dl) return;
    dl.innerHTML = groupNames().map(function(g){
      return '<option value="' + esc(g) + '"></option>';
    }).join('');
  }

  function findApp(id){
    for (var i = 0; i < apps.length; i++) if (apps[i].id === id) return apps[i];
    return null;
  }

  function api(method, url, body){
    var opt = { method: method, headers: { 'content-type': 'application/json' } };
    if (body) opt.body = JSON.stringify(body);
    return fetch(url, opt).then(function(r){
      return r.text().then(function(t){
        var d = {};
        try { d = JSON.parse(t) || {}; } catch (e) {}
        return { ok: r.ok, status: r.status, d: d };
      });
    }).then(function(res){
      if (!res.ok || !res.d.ok) {
        var msg = res.d.error || ('HTTP ' + res.status);
        if (res.status === 401) {
          toast('登录已过期，正在跳转…');
          setTimeout(function(){ location.href = '/admin'; }, 1100);
        }
        throw new Error(msg);
      }
      return res.d;
    });
  }

  function firstGroup(){
    var names = groupNames();
    return names.length ? names[0] : '其他';
  }

  function openSheet(id, group){
    var a = id ? findApp(id) : null;
    if (id && !a) return;
    state.editingId = a ? a.id : null;
    document.getElementById('sheet-title').firstChild.nodeValue = a ? '修改站点' : '新增站点';
    document.getElementById('s-name').value = a ? a.name : '';
    document.getElementById('s-url').value = a ? a.url : '';
    document.getElementById('s-group').value = a ? (a.group || '') : (group || firstGroup());
    document.getElementById('s-icon').value = a ? (a.icon || '') : '';
    document.getElementById('s-color').value =
      a && /^#[0-9a-f]{6}$/i.test(a.color || '') ? a.color : PALETTE[apps.length % PALETTE.length];
    document.getElementById('s-desc').value = a ? (a.desc || '') : '';
    var del = document.getElementById('s-del');
    del.style.display = a ? '' : 'none';
    var save = document.getElementById('s-save');
    save.disabled = false; save.textContent = '保存';
    sheet.classList.add('on');
    setTimeout(function(){ var n = document.getElementById('s-name'); if (n) n.focus(); }, 40);
  }

  function closeSheet(){
    sheet.classList.remove('on');
    state.editingId = null;
  }

  function submitSheet(){
    var nameEl = document.getElementById('s-name');
    var name = nameEl.value.trim();
    if (!name) { toast('名称不能为空'); nameEl.focus(); return; }
    var id = state.editingId;
    var payload = {
      name: name,
      url: document.getElementById('s-url').value.trim(),
      group: document.getElementById('s-group').value.trim() || '其他',
      icon: document.getElementById('s-icon').value.trim(),
      color: document.getElementById('s-color').value,
      desc: document.getElementById('s-desc').value.trim()
    };
    var btn = document.getElementById('s-save');
    btn.disabled = true; btn.textContent = '保存中…';
    api(id ? 'PATCH' : 'POST', id ? '/api/admin/apps/' + encodeURIComponent(id) : '/api/admin/apps', payload)
      .then(function(d){
        applySite(d.site);
        closeSheet();
        toast(id ? '已更新「' + name + '」' : '已添加「' + name + '」');
      })
      .catch(function(err){ toast('保存失败：' + err.message); })
      .then(function(){ btn.disabled = false; btn.textContent = '保存'; });
  }

  function removeApp(id){
    var a = findApp(id);
    if (!a) return;
    if (!confirm('删除「' + a.name + '」？会立即生效')) return;
    api('DELETE', '/api/admin/apps/' + encodeURIComponent(id))
      .then(function(d){
        if (state.editingId === id) closeSheet();
        applySite(d.site);
        toast('已删除「' + a.name + '」');
      })
      .catch(function(err){ toast('删除失败：' + err.message); });
  }

  function setEditing(on){
    state.editing = !!on;
    document.documentElement.classList.toggle('edit-on', state.editing);
    if (editBtn) {
      editBtn.classList.toggle('on', state.editing);
      editBtn.textContent = state.editing ? '\\u2713' : '\\u270e';
      editBtn.title = state.editing ? '退出编辑' : (canEdit ? '编辑模式' : '登录后编辑');
    }
    if (!state.editing) closeSheet();
    render();
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
    if (e.key === 'Escape') {
      if (sheet && sheet.classList.contains('on')) { closeSheet(); return; }
      var t0 = (e.target.tagName || '').toLowerCase();
      if (t0 === 'input' || t0 === 'textarea') return;
      if (state.editing) { setEditing(false); return; }
    }
    var tag = (e.target.tagName || '').toLowerCase();
    if (e.key === '/' && tag !== 'input' && tag !== 'textarea') { e.preventDefault(); if (qEl) qEl.focus(); }
  });

  groupsEl.addEventListener('click', function(e){
    var el = e.target;

    var ebarBtn = el.closest ? el.closest('[data-ebar]') : null;
    if (ebarBtn) {
      if (ebarBtn.dataset.ebar === 'done') setEditing(false);
      else openSheet(null, firstGroup());
      return;
    }

    var del = el.closest ? el.closest('button[data-del]') : null;
    if (del) { e.preventDefault(); e.stopPropagation(); removeApp(del.dataset.del); return; }

    var add = el.closest ? el.closest('[data-add]') : null;
    if (add) { e.preventDefault(); openSheet(null, add.dataset.add); return; }

    var tile = el.closest ? el.closest('.app') : null;
    if (tile && state.editing) { e.preventDefault(); openSheet(tile.dataset.id); return; }

    var a = el.closest ? el.closest('a.app') : null;
    if (a && a.dataset.id) track(a.dataset.id);
  });

  if (editBtn) editBtn.addEventListener('click', function(){
    if (!canEdit) { location.href = '/admin'; return; }
    setEditing(!state.editing);
  });

  if (sheet) {
    syncGroups();
    document.getElementById('s-cancel').addEventListener('click', closeSheet);
    document.getElementById('s-save').addEventListener('click', function(){
      document.getElementById('s-desc').blur();
      submitSheet();
    });
    document.getElementById('s-del').addEventListener('click', function(){
      if (state.editingId) removeApp(state.editingId);
    });
    sheet.addEventListener('click', function(e){ if (e.target === sheet) closeSheet(); });
    sheet.addEventListener('keydown', function(e){
      if (e.key === 'Enter' && (e.target.tagName || '').toLowerCase() === 'input') {
        e.preventDefault(); submitSheet();
      }
    });
  }

  tick();
  setInterval(tick, 1000);
  renderStats();
  render();
  track(null);
})();
`;

export function renderPage({ site, stats = {}, canEdit = false }) {
  const boot = JSON.stringify({ site, stats, canEdit }).replace(/</g, '\\u003c');
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
  <button id="editBtn" type="button" title="${canEdit ? '编辑模式' : '登录后编辑'}" aria-label="编辑">✎</button>
  ${canEdit ? '<a href="/admin" title="后台设置" aria-label="后台设置">⚙</a>' : ''}
</div>

<div class="sheet" id="sheet" role="dialog" aria-modal="true">
  <div class="box">
    <h3 id="sheet-title">新增站点<span>Enter 保存 · Esc 关闭</span></h3>
    <div class="f"><label>名称</label>
      <input type="text" id="s-name" maxlength="40" placeholder="GitHub" autocomplete="off"></div>
    <div class="f"><label>网址</label>
      <input type="url" id="s-url" maxlength="500" placeholder="https://github.com" autocomplete="off"></div>
    <div class="f"><label>分组</label>
      <input type="text" id="s-group" maxlength="24" list="groups-dl" placeholder="工具" autocomplete="off">
      <datalist id="groups-dl"></datalist></div>
    <div class="f row2">
      <div><label>图标（emoji / 首字母 / 图片地址）</label>
        <input type="text" id="s-icon" maxlength="200" placeholder="🚀" autocomplete="off"></div>
      <div><label>底色</label><input type="color" id="s-color" value="#4b7bec"></div>
    </div>
    <div class="f"><label>描述（可选）</label>
      <input type="text" id="s-desc" maxlength="60" placeholder="一句话说明" autocomplete="off"></div>
    <div class="acts">
      <button class="btn danger" id="s-del" type="button">删除</button>
      <button class="btn" id="s-cancel" type="button">取消</button>
      <button class="btn primary" id="s-save" type="button">保存</button>
    </div>
  </div>
</div>
<div id="toast"></div>
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

/* 没有配置 ADMIN_PASSWORD 时的引导页：直接给出可照着点的步骤，而不是只丢一条命令 */
export function renderSetup({ workerName = '', host = '', hasDefaultPwd = false } = {}) {
  const name = workerName || 'cf-nav';
  return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>还需一步 · 设置后台密码</title>
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:28px 18px;color:#fff;
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
-webkit-font-smoothing:antialiased;
background:radial-gradient(64% 60% at 8% 100%,#ff2d95 0%,transparent 58%),
radial-gradient(50% 50% at 88% 92%,#ff77d0 0%,transparent 62%),
radial-gradient(60% 50% at 50% -10%,rgba(84,116,255,.34) 0%,transparent 60%),
linear-gradient(158deg,#111c46,#060916 55%,#2b0f3c)}
.card{width:100%;max-width:620px;padding:30px 28px;border-radius:18px;
background:rgba(10,12,28,.5);border:1px solid rgba(255,255,255,.12);
-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);
box-shadow:0 24px 60px rgba(0,0,0,.35)}
.badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;letter-spacing:.04em;
padding:4px 10px;border-radius:999px;background:rgba(255,196,0,.14);border:1px solid rgba(255,196,0,.3);color:#ffd990}
h1{margin:14px 0 8px;font-size:21px;letter-spacing:-.01em}
.lead{margin:0;font-size:13px;line-height:1.75;color:rgba(255,255,255,.62)}
.lead code{background:rgba(255,255,255,.1);padding:1px 6px;border-radius:5px;font-size:12px}
ol{list-style:none;margin:20px 0 0;padding:0;counter-reset:s}
ol li{position:relative;padding:0 0 16px 34px;font-size:13px;line-height:1.7;counter-increment:s}
ol li::before{content:counter(s);position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:7px;
display:grid;place-items:center;font-size:11px;font-weight:700;
background:linear-gradient(135deg,#4f7dff,#ff5fb4);color:#fff}
ol li b{display:block;font-size:13px;font-weight:600}
ol li span{display:block;margin-top:2px;color:rgba(255,255,255,.55);font-size:12px}
ol li code{background:rgba(255,255,255,.1);padding:1px 6px;border-radius:5px;font-size:11.5px;
font-family:ui-monospace,Menlo,Consolas,monospace;color:#cfe0ff}
.note{margin:4px 0 0;padding:10px 12px;border-radius:10px;font-size:11.5px;line-height:1.7;
background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.55)}
.note b{color:rgba(255,255,255,.82);font-weight:600}
details{margin-top:14px;font-size:12.5px;color:rgba(255,255,255,.6)}
summary{cursor:pointer;color:#9ec1ff;outline:0}
pre{margin:10px 0 0;padding:10px 12px;border-radius:9px;background:rgba(0,0,0,.32);
border:1px solid rgba(255,255,255,.1);overflow-x:auto;font-size:12px;color:#cfe0ff;
font-family:ui-monospace,Menlo,Consolas,monospace}
.acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.btn{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 16px;border-radius:9px;
font-size:12.5px;text-decoration:none;border:1px solid rgba(255,255,255,.16);
background:rgba(255,255,255,.07);color:#fff;transition:.16s}
.btn:hover{background:rgba(255,255,255,.15)}
.btn.primary{background:linear-gradient(135deg,#4f7dff,#ff5fb4);border-color:transparent;font-weight:600;
box-shadow:0 8px 22px rgba(90,110,255,.32)}
.btn.primary:hover{filter:brightness(1.08)}
.host{margin-top:16px;font-size:11px;color:rgba(255,255,255,.32);word-break:break-all}
</style></head>
<body>
<div class="card">
  <span class="badge">● 只差最后一步</span>
  <h1>给 Worker 设一个后台密码</h1>
  <p class="lead">站点已经跑起来了。后台需要 <code>ADMIN_PASSWORD</code> 这个 Secret 才能登录，
  而现在 Worker 里读不到它 —— 通常是部署时那一栏留空了。设好之后本页即可正常登录。</p>

  <ol>
    <li><b>打开 Cloudflare 面板</b><span>Workers &amp; Pages → 点你的 Worker：<code>${esc(name)}</code></span></li>
    <li><b>进 Settings → Variables and Secrets</b><span>中文界面叫「设置 → 变量和密钥」，位置在 Worker 详情页顶部</span></li>
    <li><b>点 Add 新增一条</b><span>Type 选 <code>Secret</code>，Name 填 <code>ADMIN_PASSWORD</code>，Value 填你想用的密码，保存</span></li>
    <li><b>回到本页刷新</b><span>保存会自动生成新版本，等 5~10 秒后重新打开 <code>/admin</code> 就能登录了</span></li>
  </ol>

  <p class="note"><b>别填错地方：</b>Workers Builds 里的「构建变量（Build variables）」只在构建阶段可见，
  Worker 运行时读不到，填在那里仍然会看到这个页面。要加在 Worker 自己的 Variables and Secrets 里。</p>

  <details>
    <summary>或者用命令行（已装 Node 的话）</summary>
    <pre>cd cf-nav
npx wrangler secret put ADMIN_PASSWORD
# 回车后粘贴密码，看到 Success 即生效</pre>
  </details>

  <div class="acts">
    <a class="btn primary" href="/admin">重新打开后台</a>
    <a class="btn" href="https://dash.cloudflare.com/" target="_blank" rel="noopener">打开 Cloudflare 面板</a>
    <a class="btn" href="/">返回首页</a>
  </div>
  ${host ? `<div class="host">当前地址：${esc(host)}</div>` : ''}
</div>
</body></html>`;
}
