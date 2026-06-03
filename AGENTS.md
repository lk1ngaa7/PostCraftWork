# AGENTS.md — PostCraft.work Codex 执行规范

> 本文件是 Codex 在本项目中的最高优先级执行规范。执行任何开发、重构、UI、SEO、部署任务前必须先阅读本文件，再阅读 `README.md` 与 `docs/` 下对应文档。

## 1. 项目定位

项目名称：`PostCraft.work`

产品定位：

> Free LinkedIn Post Tools  
> Format, preview, inspect, and polish your LinkedIn posts before publishing.

第一版不是 AI SaaS，不做泛社媒内容生成器。第一版要做一个专业、快速、无登录、浏览器本地处理的 LinkedIn Post Toolbox。

核心目标：

- 用户打开页面后可以立即粘贴 LinkedIn 文案。
- 实时看到 LinkedIn 风格的移动端预览。
- 实时看到字符数、单词数、hashtag 数、link 数、emoji 数。
- 一键格式化、一键复制。
- 支持 LinkedIn bold / italic Unicode 文本转换。
- 支持基础 Inspector 检查：hook、段落、CTA、hashtag、可读性。
- 每个 SEO 页面都有明确 search intent。
- 部署到 Cloudflare Pages。

## 2. 技术栈约束

优先技术栈：

- Nuxt 4 / latest stable Nuxt
- Vue 3
- TypeScript
- Tailwind CSS
- pnpm
- 静态站点生成
- Cloudflare Pages
- Wrangler CLI

禁止：

- 不做登录系统
- 不做数据库
- 不接 AI API
- 不做复杂后台
- 不做广告位
- 不使用重型 UI 组件库
- 不复制 LinkedIn Logo、商标视觉、完整页面结构
- 不把 SEO 长文堆在首屏
- 不做廉价 AI SaaS landing page 风格

## 3. 任务执行顺序

每次开始任务前：

1. 先阅读 `README.md`。
2. 再阅读 `docs/CODEX_TASKS.md`。
3. 如果任务涉及产品需求，阅读 `docs/PRD.md`。
4. 如果任务涉及页面或 SEO，阅读 `docs/PAGE_PLAN.md` 与 `docs/SEO_PLAN.md`。
5. 如果任务涉及 UI/UX，阅读 `docs/UX_GUIDE.md`。
6. 如果任务涉及部署，阅读 `docs/CLOUDFLARE_DEPLOY.md`。

不要凭记忆开发。以文档为准。

## 4. 每完成一个任务后的强制流程

`docs/CODEX_TASKS.md` 中每一个 Task 完成后，都必须执行以下流程。

### 4.1 自测

优先执行：

```bash
pnpm lint
pnpm typecheck
pnpm build
```

如果某个脚本不存在：

1. 优先补齐合理脚本。
2. 如果暂时无法补齐，必须至少执行 `pnpm build`。
3. 在任务日志中说明跳过原因。

### 4.2 Git 提交并推送

每完成一个任务，必须执行：

```bash
git status
git add .
git commit -m "<clear english commit message>"
git push
```

commit message 必须清晰、短小、英文，例如：

```bash
feat: initialize nuxt app
feat: add linkedin post formatter
feat: implement mobile post preview
feat: add character limit checker
feat: add unicode bold text converter
feat: add inspector rules
fix: improve mobile spacing
docs: update launch checklist
```

禁止多个大任务混在一个 commit 里。一个任务一个 commit。

如果 `git push` 失败：

1. 先检查远端配置。
2. 不要删除用户已有 Git 历史。
3. 不要强推，除非用户明确要求。
4. 记录失败原因，并继续保证本地 commit 已完成。

## 5. Cloudflare / Wrangler 规则

用户本地已经完成 Wrangler CLI 登录和 Cloudflare 授权。

因此：

- 不要要求用户重新登录 Wrangler。
- 不要输出 Cloudflare 授权教程。
- 部署时直接执行 `docs/CLOUDFLARE_DEPLOY.md` 中的命令。
- 优先使用 Cloudflare Pages Direct Upload。
- Nuxt 静态生成产物目录为 `dist/`。

推荐部署命令：

```bash
pnpm generate
pnpm wrangler pages deploy dist --project-name postcraft-work
```

如果项目名已在 Cloudflare 中不同，先通过 Wrangler 或项目配置确认，不要盲目新建多个项目。

## 6. zai-mcp-server 视觉审核硬规则

用户本地有 `zai-mcp-server`，提供图片识别能力。任何视觉相关变动都必须使用它审核。

视觉相关变动包括但不限于：

- 页面布局
- 颜色
- 字体
- 间距
- 卡片
- 按钮
- 响应式
- 首屏
- 预览卡片
- mobile UI
- SEO 内容区视觉
- Header / Footer
- Inspector 面板
- 截图展示

涉及 UI 的任务完成后必须执行：

1. 启动本地预览。
2. 截图首页和相关页面。
3. 使用 `zai-mcp-server` 的图片识别能力进行视觉审核。
4. 根据审核结果修正 UI。
5. 必要时再次截图复审。
6. 再执行 build。
7. 再 git commit + git push。

视觉审核重点：

- 是否高级、专业、职业化。
- 是否贴近 LinkedIn 内容创作者场景，但不是山寨 LinkedIn。
- 是否不像廉价蓝白灰工具站。
- 是否不像广告站。
- 是否不像重后台系统。
- 首屏工具是否足够清晰。
- 输入区、预览区、Inspector 区是否主次明确。
- 移动端是否无横向溢出。
- 按钮是否有明确状态。
- 字号、行高、间距是否舒服。
- 卡片层级是否精致。
- CTA 是否克制，不要过度营销。

如果无法调用 `zai-mcp-server`：

- 不要直接跳过。
- 先检查 Codex MCP 可用工具列表。
- 找到来自 `zai-mcp-server` 的图片识别/视觉理解工具。
- 仍无法使用时，必须在任务日志中明确说明原因，并至少进行手动截图自查。

## 7. 品牌和合规边界

可以使用 `LinkedIn` 作为描述性关键词，例如：

- LinkedIn post formatter
- LinkedIn post preview
- LinkedIn character limit checker

但必须避免让用户误以为本站是 LinkedIn 官方产品。

页面 Footer 或 About 区必须包含简短声明：

> PostCraft.work is an independent tool and is not affiliated with LinkedIn.

禁止：

- 使用 LinkedIn 官方 Logo
- 复制 LinkedIn 完整 UI
- 冒充 LinkedIn 官方
- 暗示本站能直接发布到 LinkedIn
- 抓取私有 LinkedIn 页面内容
- 要求用户输入 LinkedIn 账号密码

## 8. MVP 范围

P0 页面：

- `/`
- `/linkedin-post-formatter`
- `/linkedin-post-preview`
- `/linkedin-post-character-limit`
- `/how-to-bold-text-in-linkedin-post`
- `/linkedin-post-inspector`

P1 页面：

- `/linkedin-post-date-extractor`
- `/linkedin-post-templates`
- `/linkedin-hook-generator`

第一版优先完成 P0。P1 只有在 P0 稳定后再做。

## 9. 质量底线

每个页面必须满足：

- 首屏直接可用。
- 工具在 SEO 内容上方。
- 移动端可用。
- 所有 input / textarea 有 label。
- 所有按钮有明确文本。
- 禁用态和错误态清晰。
- 内容本地处理，不上传用户文本。
- 页面 title、description、canonical 正确。
- sitemap 可生成。
- 构建无错误。
- 部署可访问。

## 10. 任务完成定义

一个任务只有同时满足以下条件才算完成：

1. 功能按文档实现。
2. 相关页面可访问。
3. 移动端无明显问题。
4. 视觉相关任务已通过 `zai-mcp-server` 审核。
5. `pnpm build` 成功。
6. 已 git commit。
7. 已 git push。
8. 如任务要求部署，已部署到 Cloudflare Pages 并记录部署 URL。
