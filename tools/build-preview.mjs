// 用真实模板生成静态预览（无需部署即可查看视觉效果）
// 用法：npm run preview  → 生成 preview.html / preview-admin.html
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SITE } from '../src/defaults.js';
import { renderPage } from '../src/page.js';
import { renderAdmin } from '../src/admin.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* 前台 */
const home = renderPage({
  site: DEFAULT_SITE,
  stats: { pv: 128, colo: 'HKG', latency: 3.2 },
})
  .replace('<link rel="icon" href="/favicon.svg" type="image/svg+xml">', '')
  .replace('href="/admin"', 'href="#"');
writeFileSync(join(root, 'preview.html'), home, 'utf8');

/* 后台（把 fetch 打桩，避免静态打开时报错） */
const stub = `<script>
window.fetch = function(){
  return Promise.resolve({ ok:true, json:function(){ return Promise.resolve({ ok:true }); } });
};
</script>`;
const admin = renderAdmin({ site: DEFAULT_SITE }).replace('<script>window.__EDIT__', `${stub}<script>window.__EDIT__`);
writeFileSync(join(root, 'preview-admin.html'), admin, 'utf8');

console.log('preview → preview.html', `${(home.length / 1024).toFixed(1)} KB`);
console.log('preview → preview-admin.html', `${(admin.length / 1024).toFixed(1)} KB`);
