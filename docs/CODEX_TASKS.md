# CODEX_TASKS.md — Codex 任务清单

> 逐个执行，不要跳任务。每个任务完成后必须 build、commit、push。涉及 UI 的任务必须使用 `zai-mcp-server` 做视觉审核。

## Task 01 — 初始化项目

目标：

- 初始化 Nuxt 项目。
- 安装 Tailwind。
- 配置 TypeScript。
- 准备基础目录。

操作建议：

```bash
pnpm dlx nuxi@latest init .
pnpm install
pnpm add -D @nuxtjs/tailwindcss wrangler
```

验收：

- `pnpm dev` 可启动。
- `pnpm build` 成功。
- 项目目录结构清晰。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: initialize nuxt project"
git push
```

## Task 02 — 基础布局与设计系统

目标：

- 创建 SiteHeader / SiteFooter。
- 设置全局页面背景、字体、基础颜色。
- 配置 Tailwind 基础 token。
- 实现专业、职业化、非廉价蓝白灰的视觉基调。

涉及文件：

- `app.vue`
- `components/site/SiteHeader.vue`
- `components/site/SiteFooter.vue`
- `assets/css/main.css`
- `tailwind.config.ts`

验收：

- Header 有 Logo 和核心导航。
- Footer 有 independent disclaimer。
- 页面整体不是默认模板。
- 移动端不溢出。

视觉审核：

- 必须截图首页。
- 必须使用 `zai-mcp-server` 审核。
- 根据审核反馈修复。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add base layout and visual system"
git push
```

## Task 03 — 核心 Post Workspace

目标：

- 创建 `PostWorkspace.vue`。
- 创建 `PostEditor.vue`。
- 实现 textarea 输入和状态管理。
- 初始示例文案。
- 工具区首屏可见。

涉及文件：

- `components/post/PostWorkspace.vue`
- `components/post/PostEditor.vue`
- `pages/index.vue`

验收：

- 首页可以输入文本。
- 输入不丢失。
- 移动端可输入。
- 工具在首屏。

视觉审核：

- 必须使用 `zai-mcp-server` 审核桌面端和移动端首屏。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add post workspace and editor"
git push
```

## Task 04 — Post Stats 字符统计

目标：

- 实现字符数、单词数、行数、段落数。
- 实现 hashtag、link、emoji 统计。
- 实现预计阅读时间。
- 创建 stats 面板。

涉及文件：

- `utils/postStats.ts`
- `composables/usePostStats.ts`
- `components/post/PostStats.vue`

验收：

- 输入文本时统计实时变化。
- 空输入显示 0。
- hashtag/link/emoji 能基本识别。
- build 成功。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add linkedin post stats"
git push
```

## Task 05 — LinkedIn-style Preview

目标：

- 创建 feed-style preview。
- 显示作者 placeholder。
- 显示正文段落。
- 显示 see-more hint。
- 不使用 LinkedIn logo，不复制官方完整 UI。

涉及文件：

- `components/post/PostPreview.vue`
- `components/post/PostWorkspace.vue`

验收：

- 输入内容实时预览。
- 段落换行正确。
- 长文有 see-more hint。
- 视觉专业、高级、贴近职业内容场景。

视觉审核：

- 必须使用 `zai-mcp-server` 审核 preview 组件。
- 重点检查是否山寨 LinkedIn、是否高级、是否移动端正常。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add linkedin style post preview"
git push
```

## Task 06 — Formatter 功能

目标：

- 实现格式化工具函数。
- 实现 clean spacing。
- 实现 normalize line breaks。
- 实现 copy post。
- 实现 clear。

涉及文件：

- `utils/postFormat.ts`
- `composables/usePostFormatter.ts`
- `components/post/FormatToolbar.vue`
- `components/post/CopyButton.vue`

验收：

- Format post 不改写原意。
- 多余空行被清理。
- 行尾空格被清理。
- Copy 有成功提示。
- clear 可用。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add post formatting actions"
git push
```

## Task 07 — Unicode Bold / Italic Converter

目标：

- 实现普通文本转 Unicode bold。
- 实现普通文本转 Unicode italic。
- 实现普通文本转 Unicode bold italic。
- 创建独立转换器组件。
- 加 accessibility note。

涉及文件：

- `utils/unicodeText.ts`
- `composables/useUnicodeText.ts`
- `components/post/UnicodeTextConverter.vue`

验收：

- A-Z、a-z、0-9 基本可转换。
- 不支持字符保持原样。
- 可一键复制。
- 页面解释这是 Unicode，不是 LinkedIn 原生富文本。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add unicode text converter"
git push
```

## Task 08 — Inspector 规则

目标：

- 实现 LinkedIn post inspector。
- 输出 score、good、warning、fix。
- 创建 Inspector 面板。

涉及文件：

- `utils/postInspector.ts`
- `composables/usePostInspector.ts`
- `components/post/PostInspector.vue`

验收：

- 空文本有 fix。
- 长 hook 有 warning。
- 无换行有 warning。
- hashtag 太多有 warning。
- 有 CTA 能识别。
- 不声称 AI quality score。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add linkedin post inspector"
git push
```

## Task 09 — 创建 P0 SEO 页面

目标：

创建页面：

- `/`
- `/linkedin-post-formatter`
- `/linkedin-post-preview`
- `/linkedin-post-character-limit`
- `/how-to-bold-text-in-linkedin-post`
- `/linkedin-post-inspector`

每个页面：

- H1 对应目标关键词。
- subtitle 清晰。
- 默认 mode 匹配页面意图。
- SEO meta 正确。
- canonical 正确。
- 工具在首屏。

涉及文件：

- `pages/*.vue`
- `composables/useSeoMetaConfig.ts`

验收：

- 每个 URL 可访问。
- title/description 不重复。
- 页面默认功能状态不同。
- build 成功。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add linkedin post seo pages"
git push
```

## Task 10 — SEO 内容、FAQ、Related Tools

目标：

- 每页添加 How to use。
- 添加 tips。
- 添加 FAQ。
- 添加 Related Tools 卡片。
- 添加 FAQ schema，如实现方便。

涉及文件：

- `components/post/FaqBlock.vue`
- `components/post/RelatedTools.vue`
- `pages/*.vue`

验收：

- SEO 内容在工具下方。
- FAQ 真实展示。
- Related Tools 内链正确。
- 不堆 keyword。
- 文案不冒充 LinkedIn 官方。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add seo content faq and internal links"
git push
```

## Task 11 — sitemap、robots、favicon

目标：

- 添加 sitemap。
- 添加 robots。
- 添加简洁 favicon。
- 配置 site URL。

涉及文件：

- `public/sitemap.xml`
- `public/robots.txt`
- `public/favicon.svg`

验收：

- `/sitemap.xml` 可访问。
- `/robots.txt` 可访问。
- sitemap 包含 P0 URL。
- robots 指向 sitemap。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "feat: add sitemap robots and favicon"
git push
```

## Task 12 — 全站视觉审核与修复

目标：

- 全站视觉检查。
- 使用 `zai-mcp-server` 审核关键页面截图。
- 修复视觉问题。

截图页面：

- `/`
- `/linkedin-post-formatter`
- `/linkedin-post-preview`
- `/linkedin-post-character-limit`
- `/how-to-bold-text-in-linkedin-post`
- `/linkedin-post-inspector`

视口：

- Desktop
- Mobile

验收：

- 高级专业。
- 非廉价蓝白灰。
- 非山寨 LinkedIn。
- 移动端无溢出。
- 首屏工具清楚。
- Preview 可信。
- Inspector 清晰。

完成后：

```bash
pnpm build
git status
git add .
git commit -m "fix: polish visual design after audit"
git push
```

## Task 13 — Cloudflare Pages 部署

目标：

- 静态生成。
- Wrangler 部署到 Cloudflare Pages。
- 记录部署 URL。

命令：

```bash
pnpm generate
pnpm wrangler pages deploy dist --project-name postcraft-work
```

验收：

- 部署成功。
- 线上首页可访问。
- 线上 P0 页面可访问。
- sitemap 可访问。
- robots 可访问。

完成后：

```bash
git status
git add .
git commit -m "chore: deploy postcraft work to cloudflare pages"
git push
```

如果没有文件变化，不需要空 commit，但必须确认最新 commit 已 push。

## Task 14 — Launch QA

目标：

按 `docs/QA_CHECKLIST.md` 做最终检查。

必须检查：

- 功能
- SEO
- 移动端
- 可访问性
- 视觉
- Cloudflare
- GSC 准备

完成后：

```bash
pnpm build
pnpm generate
git status
git add .
git commit -m "chore: complete launch qa"
git push
```

如果没有文件变化，不需要空 commit，但必须输出 QA 结果。
