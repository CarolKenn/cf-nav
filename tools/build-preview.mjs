// 用真实模板生成静态预览（无需部署即可查看视觉效果）
// 用法：npm run preview → preview.html / preview-edit.html / preview-admin.html / preview-setup.html
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SITE } from '../src/defaults.js';
import { renderPage, renderSetup } from '../src/page.js';
import { renderAdmin } from '../src/admin.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const strip = (html) =>
  html.replace('<link rel="icon" href="/favicon.svg" type="image/svg+xml">', '').replace(/href="\/admin"/g, 'href="#"');

/* 前台：游客视角 */
const home = strip(renderPage({ site: DEFAULT_SITE, stats: { pv: 128, colo: 'HKG', latency: 3.2 } }));
writeFileSync(join(root, 'preview.html'), home, 'utf8');

/* 前台：登录 + 编辑态（fetch 打桩，改动不会真的落盘） */
const stub = `<script>
(function(){
  var fake = JSON.parse(JSON.stringify(window.__SITE__.site));
  window.fetch = function(url, opt){
    var b = opt && opt.body ? JSON.parse(opt.body) : {};
    if (/apps$/.test(url)) {
      fake.apps.push({ id:'new' + Date.now(), name:b.name, url:b.url, group:b.group, icon:b.icon, color:b.color, desc:b.desc });
    } else if (/apps\\//.test(url) && opt.method === 'PATCH') {
      var id = decodeURIComponent(url.split('/').pop());
      fake.apps.forEach(function(a){ if (a.id === id) for (var k in b) a[k] = b[k]; });
    } else if (/apps\\//.test(url) && opt.method === 'DELETE') {
      var id2 = decodeURIComponent(url.split('/').pop());
      fake.apps = fake.apps.filter(function(a){ return a.id !== id2; });
    }
    return Promise.resolve({ ok:true, status:200, text:function(){
      return Promise.resolve(JSON.stringify({ ok:true, site:fake }));
    }});
  };
})();
</script>`;
const edit = strip(
  renderPage({ site: DEFAULT_SITE, stats: { pv: 128, colo: 'HKG', latency: 3.2 }, canEdit: true })
).replace('</body>', stub + '</body>');
writeFileSync(join(root, 'preview-edit.html'), edit, 'utf8');

/* 后台（同样打桩，避免静态打开时报错） */
const adminStub = `<script>
window.fetch = function(){
  return Promise.resolve({ ok:true, json:function(){ return Promise.resolve({ ok:true }); } });
};
</script>`;
const admin = renderAdmin({ site: DEFAULT_SITE }).replace('<script>window.__EDIT__', `${adminStub}<script>window.__EDIT__`);
writeFileSync(join(root, 'preview-admin.html'), admin, 'utf8');

/* 未配置 ADMIN_PASSWORD 时的引导页 */
const setup = renderSetup({ workerName: 'cf-nav-demo', host: 'cf-nav-demo.example.workers.dev' }).replace(
  'href="https://dash.cloudflare.com/"',
  'href="#"'
);
writeFileSync(join(root, 'preview-setup.html'), setup, 'utf8');

console.log('preview → preview.html', `${(home.length / 1024).toFixed(1)} KB`);
console.log('preview → preview-edit.html', `${(edit.length / 1024).toFixed(1)} KB`);
console.log('preview → preview-admin.html', `${(admin.length / 1024).toFixed(1)} KB`);
console.log('preview → preview-setup.html', `${(setup.length / 1024).toFixed(1)} KB`);
