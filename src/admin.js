const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const CSS = `
*{box-sizing:border-box}
:root{--fg:#fff;--muted:rgba(255,255,255,.6);--muted2:rgba(255,255,255,.4);
--card:rgba(11,14,30,.42);--brd:rgba(255,255,255,.11);--r:14px;
--bg1:#060916;--bg2:#111c46;--bg3:#2b0f3c;--b1:#ff2d95;--b2:#4a63ff;--b3:#ff77d0}
body{margin:0;min-height:100vh;color:var(--fg);
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
-webkit-font-smoothing:antialiased;
background:radial-gradient(70% 55% at 4% 102%,var(--b1) 0%,transparent 60%),
radial-gradient(60% 55% at 88% 96%,var(--b3) 0%,transparent 62%),
radial-gradient(60% 50% at 50% -10%,rgba(84,116,255,.3) 0%,transparent 60%),
linear-gradient(158deg,var(--bg2),var(--bg1) 55%,var(--bg3))}
a{color:#9ec1ff;text-decoration:none}
.topbar{position:sticky;top:0;z-index:9;display:flex;align-items:center;justify-content:space-between;gap:12px;
padding:12px 20px;background:rgba(6,9,22,.62);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);
border-bottom:1px solid rgba(255,255,255,.08)}
.topbar b{font-size:14px;letter-spacing:-.01em}
.topbar .acts{display:flex;align-items:center;gap:10px;font-size:12.5px}
main{max-width:980px;margin:0 auto;padding:26px 20px 80px}
.card{background:var(--card);border:1px solid var(--brd);border-radius:var(--r);padding:18px;
-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);margin-bottom:16px}
.card h2{margin:0 0 14px;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:space-between;gap:10px}
.card h2 small{font-weight:500;color:var(--muted2);font-size:11.5px}
label{display:block;font-size:12px;color:var(--muted);margin-bottom:12px}
input[type=text],input[type=password],input[type=url],select,textarea{
width:100%;margin-top:6px;height:36px;padding:0 10px;border-radius:9px;font:inherit;font-size:13px;color:#fff;
background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.13);outline:0;transition:.16s}
textarea{height:auto;padding:10px;line-height:1.6;resize:vertical;min-height:130px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px}
input:focus,select:focus,textarea:focus{border-color:rgba(150,180,255,.6);background:rgba(255,255,255,.1)}
select{appearance:none;background-image:linear-gradient(45deg,transparent 50%,#fff 50%),linear-gradient(135deg,#fff 50%,transparent 50%);
background-position:calc(100% - 16px) 15px,calc(100% - 11px) 15px;background-size:5px 5px,5px 5px;background-repeat:no-repeat}
option{background:#12172e}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:34px;padding:0 14px;border-radius:9px;
border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:#fff;font:inherit;font-size:12.5px;
cursor:pointer;transition:.16s;white-space:nowrap}
.btn:hover{background:rgba(255,255,255,.14)}
.btn.primary{background:linear-gradient(135deg,#4f7dff,#ff5fb4);border-color:transparent;font-weight:600;
box-shadow:0 6px 18px rgba(90,110,255,.32)}
.btn.primary:hover{filter:brightness(1.08)}
.btn.ghost{background:none;border-color:transparent;color:var(--muted)}
.btn.ghost:hover{color:#fff;background:rgba(255,255,255,.08)}
.rows{display:flex;flex-direction:column;gap:8px}
.rhead{display:grid;grid-template-columns:38px 1fr 1.4fr .8fr 1fr .55fr 40px auto;gap:8px;padding:0 8px 6px;
font-size:11px;color:var(--muted2)}
.row{display:grid;grid-template-columns:38px 1fr 1.4fr .8fr 1fr .55fr 40px auto;gap:8px;align-items:center;
padding:8px;border-radius:11px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.07)}
.row .ic{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;font-size:14px;font-weight:800;
overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)}
.row .ic img{width:100%;height:100%;object-fit:cover}
.row input[type=text],.row input[type=url]{height:32px;margin:0;font-size:12.5px}
.row input[type=color]{width:100%;height:32px;padding:2px;border-radius:8px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.06);cursor:pointer}
.row .ops{display:flex;gap:4px}
.row .ops button{width:26px;height:26px;border-radius:7px;border:1px solid rgba(255,255,255,.12);
background:rgba(255,255,255,.06);color:#fff;cursor:pointer;font-size:12px;line-height:1}
.row .ops button:hover{background:rgba(255,255,255,.16)}
.row .ops button.del:hover{background:rgba(255,60,90,.35);border-color:rgba(255,60,90,.6)}
.hint{font-size:11.5px;color:var(--muted2);margin:-4px 0 12px}
.login{max-width:360px;margin:14vh auto;padding:26px;border-radius:16px;background:var(--card);
border:1px solid var(--brd);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.login h1{margin:0 0 6px;font-size:19px}
.login p{margin:0 0 18px;font-size:12.5px;color:var(--muted)}
.err{margin-top:10px;font-size:12px;color:#ff9db0;min-height:16px}
.warn{margin-top:10px;padding:8px 10px;border-radius:8px;font-size:11.5px;line-height:1.65;
background:rgba(255,196,0,.12);border:1px solid rgba(255,196,0,.28);color:#ffe0a3}
.warn code{font-family:ui-monospace,monospace;color:#fff}
#toast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,20px);opacity:0;pointer-events:none;
padding:10px 18px;border-radius:10px;background:rgba(20,24,46,.92);border:1px solid rgba(255,255,255,.16);
font-size:12.5px;transition:.24s;z-index:20}
#toast.on{opacity:1;transform:translate(-50%,0)}
.dirty{width:7px;height:7px;border-radius:50%;background:#ffd166;display:none;margin-right:2px}
.dirty.on{display:inline-block}
@media(max-width:760px){
  .row{grid-template-columns:34px 1fr 1fr;grid-auto-rows:auto}
  .rhead{display:none}
  .row .ops{grid-column:1/-1;justify-content:flex-end}
  .grid2{grid-template-columns:1fr}
  .topbar b{font-size:13px}
}
`;

const ADMIN_JS = `
(function(){
  var S = window.__EDIT__;
  if (!S) return;
  var listEl = document.getElementById('list');
  var dirtyEl = document.getElementById('dirty');
  var toastEl = document.getElementById('toast');
  var tId = 0;

  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function toast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(tId);
    tId = setTimeout(function(){ toastEl.classList.remove('on'); }, 1800);
  }
  function markDirty(){
    if (dirtyEl) dirtyEl.classList.add('on');
  }
  function iconPreview(a){
    var ic = a.icon || '';
    if (/^(https?:|data:)/i.test(ic)) {
      return '<span class="ic" style="background:rgba(255,255,255,.94)"><img src="' + esc(ic) + '" alt=""></span>';
    }
    return '<span class="ic" style="background:' + esc(a.color || '#3b82f6') + '">'
      + esc(ic || (a.name || '?').slice(0, 1)) + '</span>';
  }

  function render(){
    listEl.innerHTML = S.apps.map(function(a, i){
      return '<div class="row" data-i="' + i + '">'
        + iconPreview(a)
        + '<input type="text" data-f="name" value="' + esc(a.name) + '" placeholder="名称">'
        + '<input type="url" data-f="url" value="' + esc(a.url) + '" placeholder="https://">'
        + '<input type="text" data-f="group" value="' + esc(a.group) + '" placeholder="分组">'
        + '<input type="text" data-f="desc" value="' + esc(a.desc) + '" placeholder="描述">'
        + '<input type="text" data-f="icon" value="' + esc(a.icon) + '" placeholder="图标">'
        + '<input type="color" data-f="color" value="' + esc(a.color || '#3b82f6') + '" title="图标底色">'
        + '<div class="ops">'
        + '<button type="button" data-act="up" title="上移">\\u2191</button>'
        + '<button type="button" data-act="down" title="下移">\\u2193</button>'
        + '<button type="button" class="del" data-act="del" title="删除">\\u00d7</button>'
        + '</div></div>';
    }).join('');
  }

  listEl.addEventListener('change', function(e){
    var t = e.target;
    var row = t.closest('.row');
    if (!row) return;
    var i = Number(row.dataset.i);
    var f = t.dataset.f;
    if (f) {
      S.apps[i][f] = t.value;
      if (f === 'icon' || f === 'name' || f === 'color') {
        var fresh = document.createElement('div');
        fresh.innerHTML = iconPreview(S.apps[i]);
        row.replaceChild(fresh.firstChild, row.firstChild);
      }
      markDirty();
    }
  });

  listEl.addEventListener('click', function(e){
    var b = e.target.closest('button[data-act]');
    if (!b) return;
    var row = b.closest('.row');
    var i = Number(row.dataset.i);
    var act = b.dataset.act;
    if (act === 'up' && i > 0) { var t1 = S.apps[i - 1]; S.apps[i - 1] = S.apps[i]; S.apps[i] = t1; render(); markDirty(); }
    if (act === 'down' && i < S.apps.length - 1) { var t2 = S.apps[i + 1]; S.apps[i + 1] = S.apps[i]; S.apps[i] = t2; render(); markDirty(); }
    if (act === 'del') {
      if (!confirm('删除「' + S.apps[i].name + '」？')) return;
      S.apps.splice(i, 1); render(); markDirty();
    }
  });

  function bind(id, field, isCheck){
    var el = document.getElementById(id);
    if (!el) return;
    if (isCheck) { el.checked = S[field] !== false; }
    else if (field === 'groupOrder') { el.value = (S.groupOrder || []).join(', '); }
    else if (field === 'theme') { el.value = S.theme || 'style1'; }
    else { el.value = S[field] || ''; }
    el.addEventListener('change', function(){
      if (isCheck) S[field] = el.checked;
      else if (field === 'groupOrder') S.groupOrder = el.value.split(',').map(function(x){ return x.trim(); }).filter(Boolean);
      else S[field] = el.value;
      markDirty();
    });
  }
  bind('f-title', 'title');
  bind('f-desc', 'desc');
  bind('f-footer', 'footer');
  bind('f-theme', 'theme');
  bind('f-groups', 'groupOrder');
  bind('f-stats', 'showStats', true);

  document.getElementById('add').addEventListener('click', function(){
    S.apps.push({
      id: 'app-' + Date.now().toString(36),
      name: '新应用', url: 'https://', icon: '\\u2b50',
      color: '#4b7bec', group: (S.groupOrder && S.groupOrder[0]) || 'APP', desc: ''
    });
    render(); markDirty();
    listEl.lastElementChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });

  document.getElementById('save').addEventListener('click', function(){
    var btn = this;
    btn.disabled = true; btn.textContent = '保存中…';
    fetch('/api/admin/site', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(S)
    }).then(function(r){
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function(){
      if (dirtyEl) dirtyEl.classList.remove('on');
      toast('已保存到 KV');
    }).catch(function(err){
      toast('保存失败：' + err.message);
    }).then(function(){
      btn.disabled = false; btn.textContent = '保存';
    });
  });

  document.getElementById('logout').addEventListener('click', function(){
    fetch('/api/logout', { method: 'POST' }).then(function(){ location.reload(); });
  });

  document.getElementById('dump').addEventListener('click', function(){
    document.getElementById('json').value = JSON.stringify(S, null, 2);
    toast('已导出到文本框');
  });
  document.getElementById('apply').addEventListener('click', function(){
    try {
      var obj = JSON.parse(document.getElementById('json').value);
      if (!obj || !Array.isArray(obj.apps)) throw new Error('缺少 apps 数组');
      S = obj;
      window.__EDIT__ = obj;
      document.getElementById('f-title').value = obj.title || '';
      document.getElementById('f-desc').value = obj.desc || '';
      document.getElementById('f-footer').value = obj.footer || '';
      document.getElementById('f-theme').value = obj.theme || 'style1';
      document.getElementById('f-groups').value = (obj.groupOrder || []).join(', ');
      document.getElementById('f-stats').checked = obj.showStats !== false;
      render(); markDirty(); toast('已应用到编辑器，记得点保存');
    } catch (e) { toast('JSON 解析失败：' + e.message); }
  });

  render();
})();
`;

export function renderLogin({ error = '', weak = false } = {}) {
  return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>管理登录</title>
<style>${CSS}</style></head><body>
<form class="login" id="loginForm">
  <h1>管理登录</h1>
  <p>输入 ADMIN_PASSWORD 后即可编辑站点内容</p>
  <label>访问密码<input type="password" id="pwd" autocomplete="current-password" autofocus placeholder="••••••••"></label>
  <button class="btn primary" style="width:100%" type="submit">进入后台</button>
  <div class="err" id="err">${esc(error)}</div>
  ${weak ? '<div class="warn">⚠ 当前仍是示例密码 <code>nav-admin</code>，公网可访问时请到 Worker 设置里改成自己的强密码。</div>' : ''}
  <div style="text-align:center;margin-top:6px"><a href="/" style="font-size:12px">← 返回首页</a></div>
</form>
<script>
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  var errEl = document.getElementById('err');
  var btn = e.target.querySelector('button');
  errEl.textContent = ''; btn.disabled = true; btn.textContent = '验证中…';
  fetch('/api/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password: document.getElementById('pwd').value })
  }).then(function(r){ return r.json().then(function(d){ return { ok: r.ok, d: d }; }); })
    .then(function(res){
      if (res.ok && res.d.ok) { location.reload(); return; }
      errEl.textContent = res.d.error || '密码错误';
      btn.disabled = false; btn.textContent = '进入后台';
    })
    .catch(function(){ errEl.textContent = '网络错误'; btn.disabled = false; btn.textContent = '进入后台'; });
});
</script></body></html>`;
}

export function renderAdmin({ site }) {
  const boot = JSON.stringify(site).replace(/</g, '\\u003c');
  return `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>管理 · ${esc(site.title)}</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>${CSS}</style></head><body>
<div class="topbar">
  <b>${esc(site.title)} · 站点管理 <span class="dirty" id="dirty" title="有未保存的修改"></span></b>
  <div class="acts">
    <a href="/" target="_blank" rel="noopener">预览</a>
    <button class="btn primary" id="save" type="button">保存</button>
    <button class="btn ghost" id="logout" type="button">退出</button>
  </div>
</div>
<main>
  <section class="card">
    <h2>基础设置 <small>保存在 KV 的 site 键</small></h2>
    <div class="grid2">
      <label>站点标题<input type="text" id="f-title" maxlength="60"></label>
      <label>副标题<input type="text" id="f-desc" maxlength="120"></label>
      <label>配色风格
        <select id="f-theme">
          <option value="style1">Style 1 · 深蓝 / 品红</option>
          <option value="style2">Style 2 · 墨绿 / 青</option>
          <option value="style3">Style 3 · 暮紫 / 橙</option>
          <option value="style4">Style 4 · 夜蓝 / 靛</option>
        </select>
      </label>
      <label>页脚文字<input type="text" id="f-footer" maxlength="80"></label>
      <label>分组顺序（逗号分隔）<input type="text" id="f-groups" placeholder="APP, 工具, 娱乐"></label>
      <label style="display:flex;align-items:center;gap:8px;height:36px;margin-top:18px">
        <input type="checkbox" id="f-stats" style="width:16px;height:16px;margin:0">
        显示「站点概览」指标
      </label>
    </div>
  </section>

  <section class="card">
    <h2>应用列表 <small>拖动顺序请用 ↑ ↓</small></h2>
    <div class="rhead"><span></span><span>名称</span><span>网址</span><span>分组</span><span>描述</span><span>图标</span><span>底色</span><span></span></div>
    <div class="rows" id="list"></div>
    <p class="hint" style="margin:12px 0 10px">图标支持 emoji（如 🚀）、首字母（如 S）或完整图片地址（https://…/logo.png）。</p>
    <button class="btn" id="add" type="button">+ 新增应用</button>
  </section>

  <section class="card">
    <h2>JSON 导入 / 导出 <small>适合批量维护</small></h2>
    <textarea id="json" placeholder='{"title":"Sun-Panel","apps":[…]}'></textarea>
    <div style="display:flex;gap:10px;margin-top:10px">
      <button class="btn" id="dump" type="button">导出当前数据</button>
      <button class="btn" id="apply" type="button">应用文本框内容</button>
    </div>
  </section>
</main>
<div id="toast"></div>
<script>window.__EDIT__=${boot};</script>
<script>${ADMIN_JS}</script>
</body></html>`;
}
