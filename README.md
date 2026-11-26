# cf-nav · Cloudflare Worker 网址导航

一个 Sun-Panel 风格的导航首页：渐变光斑背景、实时时钟、搜索过滤、指标卡片、图标宫格，外加一个密码保护的后台。
**代码跑在 Cloudflare Workers，数据存在 Cloudflare KV**，没有服务器、没有数据库、没有构建步骤。

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/CarolKenn/cf-nav)

---

## 一、一键部署（推荐）

点上面的按钮，然后：

1. 用 GitHub 登录并授权（Cloudflare 会把仓库克隆到你自己的账号下，之后这份副本归你维护）
2. 用 Cloudflare 登录（免费账号即可）
3. 在配置页填三样东西：
   - **Worker 名**：随便，默认 `cf-nav`
   - **KV namespace 名**：默认 `cf-nav-NAV`，**自动创建并绑好**，不用手动建
   - **ADMIN_PASSWORD**：后台密码，自己定一个（建议 12 位以上）
4. 点 **Deploy**，等一两分钟，拿到 `https://<worker名>.<你的子域>.workers.dev`
5. 打开 `https://<你的地址>/admin` 登录，改标题、换配色、加应用

> 项目里 `wrangler.toml` 的 KV 绑定**故意不写 id**，靠 Wrangler 4.45+ 的自动资源供给（automatic provisioning）：
> 首次部署时自动创建 `cf-nav-NAV` 这个 namespace 并关联，之后按名字复用，不会重复建、也不会丢数据。
> 点完按钮，Cloudflare 还会给这个仓库开启 Workers Builds —— **以后只要往仓库 main 分支提交，就会自动重新部署**。

不想多一个仓库副本？也可以：Cloudflare 面板 → Workers & Pages → Create → **Import a repository** → 选 `CarolKenn/cf-nav`，
效果相同（同样会开启 push 自动部署）。

## 二、以后怎么更新

| 想改什么 | 怎么做 | 是否需要重新部署 |
| --- | --- | --- |
| 站点标题、配色、页脚、应用增删改 | 打开 `/admin` 后台改，点保存 | 不需要，存 KV 即时生效 |
| 页面样式、交互、接口逻辑 | 在 GitHub 网页上直接编辑 `src/*.js` 并提交 | 自动部署，约 1 分钟 |
| 本地改完再提交 | `git clone` → 改 → `git commit && git push` | 自动部署 |

改了前端代码后想先在本地看效果：`npm run preview` 生成 `preview.html`，双击打开即可（不用起服务）。

## 三、手动部署（命令行，可选）

```bash
git clone https://github.com/CarolKenn/cf-nav && cd cf-nav
npm install
npx wrangler login

# 设置后台密码
npx wrangler secret put ADMIN_PASSWORD

# 部署（首次会自动创建并绑定 KV，无需手动建 namespace）
npm run deploy
```

需要把这些命令压缩成一行：`npm i && npx wrangler secret put ADMIN_PASSWORD && npm run deploy`。

## 四、本地开发

```bash
cp .dev.vars.example .dev.vars   # 里面写 ADMIN_PASSWORD=你的密码
npm run dev                      # http://localhost:8787（wrangler 模拟真 KV）
```

不装 wrangler 也能跑（内存模拟 KV，数据不持久，重启即清空）：

```bash
npm run mock                     # http://localhost:8788
```

## 五、数据结构

KV 里只有两个键：

| key     | 内容 |
| ------- | ---- |
| `site`  | 站点配置 + 应用列表（JSON） |
| `stats` | 访问计数：`{ pv, hits: { appId: 次数 }, updated }` |

`site` 的结构：

```json
{
  "title": "Sun-Panel",
  "desc": "我的导航站",
  "theme": "style1",
  "footer": "Worker + KV",
  "showStats": true,
  "groupOrder": ["APP", "工具", "娱乐"],
  "apps": [
    {
      "id": "github",
      "name": "GitHub",
      "url": "https://github.com",
      "icon": "🐙",
      "color": "#24292f",
      "group": "APP",
      "desc": "代码托管"
    }
  ]
}
```

- `icon` 支持三种写法：emoji（`🚀`）、首字母（`S`）、图片地址（`https://…/logo.png`）。
- `group` 是自由文本，分组顺序由 `groupOrder` 决定，没列出的分组排在后面。
- `theme` 可选 `style1`（深蓝/品红）、`style2`（墨绿/青）、`style3`（暮紫/橙）、`style4`（夜蓝/靛）；
  访客也能点右下角色盘按钮临时切换（存 localStorage，不影响站点默认值）。
- 批量维护：后台底部的「JSON 导入/导出」，或直接写 KV：

```bash
npx wrangler kv key put --binding=NAV site --path=./site.json
```

## 六、接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/` | 导航首页（服务端渲染） |
| GET | `/admin` | 后台（未登录显示登录页） |
| GET | `/api/site` | 读取当前站点 JSON（公开） |
| POST | `/api/login` | `{password}` → 下发 HttpOnly 会话 Cookie（7 天） |
| POST | `/api/logout` | 清除会话 |
| GET/PUT | `/api/admin/site` | 读取 / 整体保存站点（需登录） |
| POST | `/api/hit` | `{id}` 记录点击；`{id:null}` 计一次 PV |
| GET | `/healthz` | 健康检查，返回边缘节点 colo |

## 七、实现要点

- **零构建**：CSS/JS 以字符串内联在 `page.js` / `admin.js` 里，`wrangler deploy` 只打一个 ESM 入口，不用 Vite / webpack。
- **无框架**：前台约 200 行原生 JS，负责时钟、搜索（名称/描述/分组/网址全匹配，`/` 聚焦，`Esc` 清空，`Enter` 打开第一个结果）、主题切换、点击上报（`sendBeacon`）。
- **直接打开网址**：搜索框输入 `github.com` 这类域名时，结果区顶部会出现「打开网址」直达卡片。
- **鉴权**：HMAC-SHA256 签名的无状态 Cookie（`v1.<exp>.<sig>`），密钥由 `ADMIN_PASSWORD`（或单独的 `SESSION_SECRET`）派生，不落库；密码与签名比对都用定长逐字节比较。仍在用示例密码 `nav-admin` 时，登录页会给出警告。
- **指标卡片**：应用数、分组数、PV 来自 KV；边缘节点取自 `request.cf.colo`；KV 读取耗时实测（`performance.now()`，亚毫秒精度）。
- **安全头**：`nosniff`、`referrer-policy`、CSP（只允许 self + inline 样式脚本，图片放开任意 https 域名便于图标）。

## 八、注意事项

- **KV 是最终一致的**（同一键的写入跨区域生效约 60 秒）。后台改完立刻刷新其他区域的边缘节点可能看到旧内容，属正常现象；`/api/admin/site` 始终直读。
- **计数是读-改-写**：高并发下 PV 可能有少量丢失。要精确计数请换 Durable Object（一个 DO 实例 + 一次写），其余代码不用动。
- **免费额度**：KV 每天 10 万次读、1000 次写。每次页面访问会写 1 次 `stats`，个人导航站够用；流量大了可以把 `track()` 改成只上报应用点击。
- **每个环境一套 KV**：按钮部署建的是你账号下的新 KV，与原作者的实例互不相干。
- 后台没有内置限流，密码请设长一点；要更严格可以加 Cloudflare Access 或 Turnstile。

## 目录结构

```
cf-nav/
├─ wrangler.toml           # Worker 配置 + KV 绑定（id 由部署流程写回）
├─ src/
│  ├─ index.js             # 入口：路由 / 鉴权 / KV 读写 / 访问统计
│  ├─ page.js              # 前台页面（内联 CSS+JS，服务端渲染）
│  ├─ admin.js             # 后台页面（登录 + 编辑器）
│  └─ defaults.js          # 默认站点数据（KV 为空时使用）
└─ tools/
   ├─ build-preview.mjs    # 生成静态预览 preview.html / preview-admin.html
   └─ mock-server.mjs      # 本地无 wrangler 运行（内存 KV）
```

## License

MIT
