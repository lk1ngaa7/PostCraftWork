# MASTER_PROMPT.md — 给 Codex 的总提示词

你现在要在本地构建一个名为 `PostCraft.work` 的工具站。

## 1. 产品定位

PostCraft.work 的定位是：

> Free LinkedIn Post Tools  
> Format, preview, inspect, and polish your LinkedIn posts before publishing.

这不是 AI SaaS，不是泛社媒内容生成器，也不是模板内容站。第一版是一个专业、快速、无登录、本地处理的 LinkedIn Post Toolbox。

## 2. 第一版要完成什么

P0 页面：

- `/`
- `/linkedin-post-formatter`
- `/linkedin-post-preview`
- `/linkedin-post-character-limit`
- `/how-to-bold-text-in-linkedin-post`
- `/linkedin-post-inspector`

P0 功能：

- LinkedIn post editor
- LinkedIn mobile-style preview
- Format post
- Clean extra blank lines
- Convert selected or input text to Unicode bold / italic / bold italic
- Character count
- Word count
- Hashtag count
- Link count
- Emoji count
- Estimated read time
- See-more preview hint
- Inspector rules
- One-click copy
- FAQ
- Related tools
- SEO meta
- sitemap support
- Cloudflare Pages deployment

## 3. 技术约束

使用：

- Nuxt 4 / latest stable Nuxt
- Vue 3
- TypeScript
- Tailwind CSS
- pnpm
- Static generation
- Cloudflare Pages
- Wrangler CLI

不要使用：

- 数据库
- 登录
- AI API
- 支付
- 后台系统
- 重型 UI 组件库
- 广告位
- LinkedIn 官方 Logo

## 4. 执行顺序

请按 `docs/CODEX_TASKS.md` 逐个任务执行。不要跳任务。

每个任务完成后必须：

```bash
pnpm build
git status
git add .
git commit -m "<clear english commit message>"
git push
```

如果任务涉及 UI/UX，还必须：

1. 启动本地页面。
2. 截图相关页面。
3. 使用 `zai-mcp-server` 图片识别能力进行视觉审核。
4. 根据审核反馈修正。
5. 再 build。
6. 再 commit + push。

## 5. 设计方向

视觉不要沿用廉价蓝白灰工具站。要做成：

- professional
- editorial
- focused
- premium
- calm
- creator workspace
- LinkedIn-adjacent, not LinkedIn-clone

核心视觉：

- 深海军蓝
- 专业蓝
- 暖白背景
- 精致卡片
- 编辑器工作台
- 右侧职业社交 post 预览卡片
- Inspector 像内容质量检查面板

## 6. SEO 策略

每个页面围绕一个明确 search intent：

- formatter
- preview
- character limit
- bold text
- inspector

不要做 keyword stuffing。页面首屏必须先给工具，SEO 内容放在工具下方。

## 7. 合规边界

可以使用 `LinkedIn` 作为描述性关键词，但必须声明本站不是 LinkedIn 官方产品。

Footer 必须包含：

> PostCraft.work is an independent tool and is not affiliated with LinkedIn.

禁止要求用户输入 LinkedIn 账号、密码、cookie、token。

## 8. 最终交付标准

项目完成后必须满足：

- `pnpm build` 成功。
- `pnpm generate` 成功。
- P0 页面可访问。
- 移动端无横向滚动。
- 首屏直接可用。
- UI 已使用 `zai-mcp-server` 审核。
- 已部署到 Cloudflare Pages。
- 已 git commit + git push。
