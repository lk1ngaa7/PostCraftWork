# TECH_SPEC.md — 技术实现方案

## 1. 技术栈

推荐：

- Nuxt 4 / latest stable Nuxt
- Vue 3 Composition API
- TypeScript
- Tailwind CSS
- pnpm
- Cloudflare Pages
- Static generation

## 2. 项目初始化

如果目录为空：

```bash
pnpm dlx nuxi@latest init .
pnpm install
pnpm add -D @nuxtjs/tailwindcss
pnpm add -D wrangler
```

`nuxt.config.ts` 基础配置：

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s'
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },
  compatibilityDate: '2026-06-03'
})
```

如果 Codex 创建项目时 Nuxt 对 `compatibilityDate` 有不同要求，以当前 Nuxt 文档和项目实际构建为准。

## 3. 核心组件

### 3.1 `PostWorkspace.vue`

职责：

- 统一承载 editor、toolbar、preview、stats、inspector。
- 接收 `mode` prop 控制默认高亮功能。
- 被所有页面复用。

Props：

```ts
type WorkspaceMode = 'format' | 'preview' | 'stats' | 'bold' | 'inspector'

interface Props {
  mode?: WorkspaceMode
  initialText?: string
}
```

### 3.2 `PostEditor.vue`

职责：

- textarea 输入
- v-model
- clear
- paste example
- accessibility label

要求：

- textarea 高度桌面端至少 360px。
- 移动端至少 260px。
- 支持 keyboard focus ring。
- 不要自动上传文本。

### 3.3 `FormatToolbar.vue`

动作：

- Format post
- Clean spacing
- Add paragraph breaks
- Copy
- Clear

实现方式：

- 只做结构整理，不改写内容。
- 所有函数放到 `utils/postFormat.ts`。

### 3.4 `PostPreview.vue`

职责：

- LinkedIn-style professional feed preview。
- 显示 author placeholder。
- 显示 post body。
- 模拟 `see more` 提示。
- 显示 engagement placeholder。

注意：

- 不使用 LinkedIn logo。
- 不复制完整 LinkedIn UI。
- 只做职业社交 feed 风格。

### 3.5 `PostStats.vue`

显示：

- Characters
- Words
- Lines
- Paragraphs
- Hashtags
- Links
- Emojis
- Estimated reading time

### 3.6 `PostInspector.vue`

显示：

- Score
- Checks
- Warnings
- Fix suggestions

每条规则包括：

```ts
interface InspectionItem {
  id: string
  type: 'good' | 'warning' | 'fix'
  title: string
  message: string
}
```

### 3.7 `UnicodeTextConverter.vue`

功能：

- 输入普通文本。
- 转 bold。
- 转 italic。
- 转 bold italic。
- 一键复制。

注意：

- 明确说明这是 Unicode 字符，不是真正 rich text。
- 不建议整篇文章使用。

## 4. Composables

### 4.1 `usePostStats.ts`

返回：

```ts
interface PostStats {
  characters: number
  words: number
  lines: number
  paragraphs: number
  hashtags: number
  links: number
  emojis: number
  estimatedReadTimeMinutes: number
  firstTwoHundredChars: string
}
```

### 4.2 `usePostInspector.ts`

输入文本，输出：

```ts
interface InspectorResult {
  score: number
  items: InspectionItem[]
}
```

### 4.3 `useUnicodeText.ts`

提供：

```ts
toBold(input: string): string
toItalic(input: string): string
toBoldItalic(input: string): string
```

## 5. 工具函数规则

### 5.1 字符统计

字符数使用 JS string length 即可。不要过度复杂化。

### 5.2 Word count

英文按空白切分即可：

```ts
text.trim().split(/\s+/).filter(Boolean).length
```

### 5.3 Hashtag count

正则建议：

```ts
/(^|\s)#[\p{L}\p{N}_]+/gu
```

### 5.4 Link count

正则建议：

```ts
/https?:\/\/[^\s]+/gi
```

### 5.5 Emoji count

可以用基础 Unicode property：

```ts
/\p{Extended_Pictographic}/gu
```

如果构建环境不支持，再降级为简单 emoji 范围匹配。

## 6. Inspector 初始规则

建议规则：

1. Empty text：fix
2. Hook longer than 180 characters：warning
3. First paragraph longer than 300 characters：warning
4. No paragraph breaks and text > 400 characters：warning
5. More than 5 hashtags：warning
6. Link in first 200 chars：warning
7. No CTA phrase：warning
8. Very long post > 2500 characters：warning
9. Good paragraph spacing：good
10. Good hashtag count：good

CTA 检测可用简单关键词：

```txt
what do you think
share your thoughts
comment
reply
follow
connect
try
download
learn more
```

不要将 inspector 表述为 AI 分析。它只是结构化检查。

## 7. SEO Meta

创建 `useSeoMetaConfig.ts`，统一管理 title、description、canonical。

每个页面调用：

```ts
useSeoMeta({
  title: '...',
  description: '...',
  ogTitle: '...',
  ogDescription: '...',
  twitterCard: 'summary_large_image'
})
```

再设置 canonical：

```ts
useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }]
})
```

## 8. 静态资源

`public/`：

- `robots.txt`
- `sitemap.xml`
- `favicon.ico` 或 SVG favicon

MVP 可以用简洁文字 Logo，不要使用 LinkedIn logo。

## 9. Tailwind 设计 Token

建议在 `tailwind.config.ts` 扩展：

```ts
colors: {
  ink: '#0F172A',
  professional: '#0A66C2',
  signal: '#2563EB',
  paper: '#F6F8FB',
  surface: '#FFFFFF'
}
```

如果不扩展 token，也可以直接用 Tailwind 默认色，但必须保持 UX_GUIDE 的视觉方向。

## 10. 构建和部署

开发：

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

部署：

```bash
pnpm wrangler pages deploy dist --project-name postcraft-work
```

## 11. 可访问性

要求：

- textarea 有 label。
- 按钮有明确文本。
- copy 成功提示使用 `aria-live="polite"`。
- Inspector 不能只靠颜色表示状态。
- focus ring 清晰。
- 移动端按钮高度至少 44px。
- 预览区不能横向溢出。

## 12. 测试建议

最低限度：

- 工具函数用简单单元测试。
- build 必须过。
- 手动测试核心页面。
- 移动端 viewport 测试。
- UI 变动必须用 `zai-mcp-server` 视觉审核。
