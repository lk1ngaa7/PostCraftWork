# PostCraft.work

PostCraft.work 是一个面向专业人士、创作者、招聘人员、创业者和职场内容生产者的 LinkedIn Post 工具站。

产品定位：

> Free LinkedIn Post Tools  
> Format, preview, inspect, and polish your LinkedIn posts before publishing.

第一版聚焦 LinkedIn 文案发布前的处理流程：

- LinkedIn post formatter
- LinkedIn post preview
- LinkedIn character limit checker
- LinkedIn bold / italic text converter
- LinkedIn post inspector
- 一键复制
- 浏览器本地处理
- 无登录
- 静态部署到 Cloudflare Pages

## 1. 为什么做这个项目

Semrush 美国市场分析显示，`linkedin post` 词根下存在一批搜索量明确、KD 相对较低、工具意图强的关键词，例如：

- `linkedin post formatter`
- `linkedin post preview`
- `linkedin post character limit`
- `linkedin post inspector`
- `how to bold text in linkedin post`

因此，第一版不做泛 AI post generator，而是做一个可立即使用的 LinkedIn Post Toolbox。

## 2. 技术栈

推荐：

- Nuxt 4 / latest stable Nuxt
- Vue 3
- TypeScript
- Tailwind CSS
- pnpm
- Cloudflare Pages
- Wrangler CLI

站点应尽量静态化，优先使用：

```bash
pnpm generate
```

产物目录：

```bash
dist/
```

部署命令参考：

```bash
pnpm wrangler pages deploy dist --project-name postcraft-work
```

## 3. 推荐目录结构

```txt
postcraft-work/
  AGENTS.md
  README.md
  package.json
  nuxt.config.ts
  app.vue
  pages/
    index.vue
    linkedin-post-formatter.vue
    linkedin-post-preview.vue
    linkedin-post-character-limit.vue
    how-to-bold-text-in-linkedin-post.vue
    linkedin-post-inspector.vue
  components/
    site/
      SiteHeader.vue
      SiteFooter.vue
    post/
      PostWorkspace.vue
      PostEditor.vue
      PostPreview.vue
      PostStats.vue
      PostInspector.vue
      FormatToolbar.vue
      UnicodeTextConverter.vue
      CopyButton.vue
      RelatedTools.vue
      FaqBlock.vue
  composables/
    usePostFormatter.ts
    usePostStats.ts
    usePostInspector.ts
    useUnicodeText.ts
    useSeoMetaConfig.ts
  utils/
    postFormat.ts
    postStats.ts
    postInspector.ts
    unicodeText.ts
  docs/
    MASTER_PROMPT.md
    PRD.md
    PAGE_PLAN.md
    SEO_PLAN.md
    TECH_SPEC.md
    UX_GUIDE.md
    CONTENT_RULES.md
    CODEX_TASKS.md
    QA_CHECKLIST.md
    CLOUDFLARE_DEPLOY.md
    GSC_AFTER_LAUNCH.md
```

## 4. 本地开发

如果项目还未初始化：

```bash
pnpm dlx nuxi@latest init .
pnpm install
```

添加 Tailwind：

```bash
pnpm add -D @nuxtjs/tailwindcss
```

在 `nuxt.config.ts` 中添加：

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    prerender: {
      crawlLinks: true
    }
  }
})
```

启动开发：

```bash
pnpm dev
```

构建：

```bash
pnpm build
```

静态生成：

```bash
pnpm generate
```

## 5. 必须阅读的文档

Codex 执行前必须按顺序阅读：

1. `AGENTS.md`
2. `docs/MASTER_PROMPT.md`
3. `docs/PRD.md`
4. `docs/PAGE_PLAN.md`
5. `docs/TECH_SPEC.md`
6. `docs/UX_GUIDE.md`
7. `docs/CODEX_TASKS.md`
8. `docs/QA_CHECKLIST.md`
9. `docs/CLOUDFLARE_DEPLOY.md`

## 6. 第一阶段页面

P0 页面：

| URL | 目标关键词 | 页面目标 |
|---|---|---|
| `/` | free linkedin post tools | 工具集合首页 |
| `/linkedin-post-formatter` | linkedin post formatter | 格式化 LinkedIn 文案 |
| `/linkedin-post-preview` | linkedin post preview | 模拟发布前预览 |
| `/linkedin-post-character-limit` | linkedin post character limit | 字符数和限制检查 |
| `/how-to-bold-text-in-linkedin-post` | how to bold text in linkedin post | Unicode bold / italic 转换 |
| `/linkedin-post-inspector` | linkedin post inspector | 文案质量检查 |

## 7. 品牌声明

本站可以围绕 LinkedIn 相关关键词做工具，但不能冒充 LinkedIn 官方。Footer 必须包含：

> PostCraft.work is an independent tool and is not affiliated with LinkedIn.

## 8. Codex 执行要求

每完成 `docs/CODEX_TASKS.md` 中一个任务：

```bash
pnpm build
git status
git add .
git commit -m "clear english message"
git push
```

涉及 UI 的任务还必须使用 `zai-mcp-server` 做视觉审核。详见 `AGENTS.md` 与 `docs/UX_GUIDE.md`。
