// KV 中没有任何数据时使用的默认站点配置
// 结构：{ config 字段平铺 + apps[] }，全部存在 KV 的 "site" 键里

export const DEFAULT_SITE = {
  title: 'Sun-Panel',
  desc: '我的导航站 · Cloudflare Worker + KV',
  theme: 'style1',
  footer: 'Worker + KV',
  showStats: true,
  groupOrder: ['APP', '工具', '娱乐'],
  apps: [
    { id: 'sunpanel', name: 'Sun-Panel', url: 'https://github.com/naiba/nav', icon: 'S', color: '#2563eb', group: 'APP', desc: '开源导航面板' },
    { id: 'about', name: '关于作者', url: 'https://example.com/about', icon: '👤', color: '#334155', group: 'APP', desc: '个人主页' },
    { id: 'github', name: 'Author Home', url: 'https://github.com/', icon: '🐙', color: '#24292f', group: 'APP', desc: 'GitHub 仓库' },
    { id: 'ssh', name: 'SSH', url: 'https://example.com/ssh', icon: '>_', color: '#f97316', group: 'APP', desc: '终端入口' },
    { id: 'baidu', name: 'Baidu', url: 'https://www.baidu.com', icon: '百', color: '#1c3fbf', group: 'APP', desc: '搜索' },

    { id: 'xunlei', name: 'XunLei', url: 'https://www.xunlei.com', icon: '⚡', color: '#0ea5e9', group: '工具', desc: '下载' },
    { id: 'openwrt', name: 'OpenWRT', url: 'http://192.168.1.1', icon: '📶', color: '#0f766e', group: '工具', desc: '路由器后台' },
    { id: 'files', name: 'Files', url: 'https://example.com/files', icon: '📁', color: '#eab308', group: '工具', desc: '文件管理' },
    { id: 'hass', name: 'Home Assistant', url: 'https://www.home-assistant.io', icon: '🏠', color: '#38bdf8', group: '工具', desc: '智能家居' },
    { id: 'notes', name: 'Notes', url: 'https://example.com/notes', icon: '📝', color: '#64748b', group: '工具', desc: '随手记' },

    { id: 'translate', name: 'Translation', url: 'https://translate.google.com', icon: '文', color: '#475569', group: '娱乐', desc: '翻译' },
    { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com', icon: '✳', color: '#10a37f', group: '娱乐', desc: 'AI 对话' },
    { id: 'google', name: 'Google', url: 'https://www.google.com', icon: 'G', color: '#ea4335', group: '娱乐', desc: '搜索' },
    { id: 'docker', name: 'docker', url: 'https://hub.docker.com', icon: '🐳', color: '#2496ed', group: '娱乐', desc: '镜像中心' },
    { id: 'calendar', name: 'Li-Calendar', url: 'https://example.com/calendar', icon: '📅', color: '#8b5cf6', group: '娱乐', desc: '日历' },
  ],
};

export function normalizeSite(input) {
  const s = input && typeof input === 'object' ? input : {};
  const base = { ...DEFAULT_SITE, ...s };
  return {
    title: String(base.title || 'Sun-Panel').slice(0, 60),
    desc: String(base.desc || '').slice(0, 120),
    theme: ['style1', 'style2', 'style3', 'style4'].includes(base.theme) ? base.theme : 'style1',
    footer: String(base.footer || '').slice(0, 80),
    showStats: base.showStats !== false,
    groupOrder: Array.isArray(base.groupOrder) ? base.groupOrder.map((g) => String(g)).slice(0, 20) : [],
    apps: (Array.isArray(base.apps) ? base.apps : []).map((a, i) => ({
      id: String(a.id || 'app-' + i),
      name: String(a.name || '未命名').slice(0, 40),
      url: String(a.url || '#').slice(0, 500),
      icon: String(a.icon || '').slice(0, 200),
      color: String(a.color || '#3b82f6').slice(0, 20),
      group: String(a.group || '其他').slice(0, 24),
      desc: String(a.desc || '').slice(0, 60),
    })),
  };
}
