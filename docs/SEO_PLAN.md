# SEO_PLAN.md — SEO 执行方案

## 1. SEO 总原则

PostCraft.work 第一阶段不是靠内容长文获客，而是靠工具型搜索意图获客。

核心策略：

- 一个页面对应一个明确关键词意图。
- 首屏放工具，不堆 SEO 文案。
- 页面标题直接匹配搜索意图。
- 每个页面提供真实可用的工具。
- FAQ 回答具体问题。
- 通过 Related Tools 做内链。
- 不做 keyword stuffing。
- 不做虚假功能承诺。

## 2. 关键词分组

### 2.1 Formatter 组

Primary：

```txt
linkedin post formatter
```

Secondary：

```txt
linkedin post formatting
how to format linkedin post
format linkedin post
linkedin formatter
```

URL：

```txt
/linkedin-post-formatter
```

Intent：

用户想清理 LinkedIn 文案格式，尤其是换行、空行、段落、bullet、复制格式。

### 2.2 Preview 组

Primary：

```txt
linkedin post preview
```

Secondary：

```txt
preview linkedin post
linkedin post preview tool
linkedin mobile post preview
```

URL：

```txt
/linkedin-post-preview
```

Intent：

用户想在发布前看到 LinkedIn post 大概长什么样。

### 2.3 Character Limit 组

Primary：

```txt
linkedin post character limit
```

Secondary：

```txt
linkedin character limit
linkedin post word count
linkedin post length checker
linkedin character counter
```

URL：

```txt
/linkedin-post-character-limit
```

Intent：

用户想检查 LinkedIn post 长度、字符数、是否超限。

### 2.4 Bold Text 组

Primary：

```txt
how to bold text in linkedin post
```

Secondary：

```txt
bold text linkedin post
linkedin bold text generator
linkedin italic text
linkedin unicode bold
```

URL：

```txt
/how-to-bold-text-in-linkedin-post
```

Intent：

用户想知道 LinkedIn post 怎么加粗，以及需要一个可复制的转换工具。

### 2.5 Inspector 组

Primary：

```txt
linkedin post inspector
```

Secondary：

```txt
linkedin post checker
linkedin post analyzer
linkedin post readability checker
```

URL：

```txt
/linkedin-post-inspector
```

Intent：

用户想检查 LinkedIn post 发布前是否结构清晰、可读、专业。

## 3. Title / Description 模板

### 首页

Title：

```txt
PostCraft.work - Free LinkedIn Post Tools
```

Description：

```txt
Format, preview, inspect, and polish your LinkedIn posts before publishing. Free browser-based LinkedIn post tools with no sign-up required.
```

### Formatter

Title：

```txt
LinkedIn Post Formatter - Format Posts Before Publishing
```

Description：

```txt
Format your LinkedIn posts with clean spacing, readable paragraphs, bullets, and a live preview. Free, browser-based, and no sign-up required.
```

### Preview

Title：

```txt
LinkedIn Post Preview - See Your Post Before Publishing
```

Description：

```txt
Preview your LinkedIn post before publishing. Check mobile layout, opening hook, line breaks, hashtags, and see-more truncation hints.
```

### Character Limit

Title：

```txt
LinkedIn Post Character Limit Checker
```

Description：

```txt
Check LinkedIn post character count, word count, hashtags, links, emojis, paragraphs, and readability before publishing.
```

### Bold Text

Title：

```txt
How to Bold Text in a LinkedIn Post
```

Description：

```txt
Use a free Unicode bold text converter for LinkedIn posts. Create bold, italic, and bold italic text you can copy into your post.
```

### Inspector

Title：

```txt
LinkedIn Post Inspector - Check Readability Before Publishing
```

Description：

```txt
Inspect your LinkedIn post for hook length, paragraph density, hashtags, links, CTA, and readability before publishing.
```

## 4. 页面内容结构

每页内容顺序：

1. H1
2. 短 subtitle
3. Trust note
4. 工具主体
5. How to use
6. Tips / Checklist
7. FAQ
8. Related tools
9. Footer disclaimer

首屏不要超过 2-3 行营销文案。

## 5. Schema 建议

可以添加：

- `WebApplication`
- `FAQPage`
- `BreadcrumbList`

注意：

- 只有页面真实展示的 FAQ 才能进入 FAQ schema。
- 不要编造 rating。
- 不要添加虚假的 review schema。
- 不要添加 SoftwareApplication price，如果没有定价页。

## 6. Canonical

每个页面必须设置 canonical：

```txt
https://postcraft.work/
https://postcraft.work/linkedin-post-formatter
https://postcraft.work/linkedin-post-preview
https://postcraft.work/linkedin-post-character-limit
https://postcraft.work/how-to-bold-text-in-linkedin-post
https://postcraft.work/linkedin-post-inspector
```

如果域名暂未绑定，先用配置常量 `siteUrl`，上线后改成正式域名。

## 7. Sitemap

必须生成 sitemap，包含 P0 页面。

推荐使用 Nuxt sitemap 模块，或者手写 `/public/sitemap.xml`。

MVP 页面少，可以先手写 sitemap：

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://postcraft.work/</loc></url>
  <url><loc>https://postcraft.work/linkedin-post-formatter</loc></url>
  <url><loc>https://postcraft.work/linkedin-post-preview</loc></url>
  <url><loc>https://postcraft.work/linkedin-post-character-limit</loc></url>
  <url><loc>https://postcraft.work/how-to-bold-text-in-linkedin-post</loc></url>
  <url><loc>https://postcraft.work/linkedin-post-inspector</loc></url>
</urlset>
```

## 8. Robots

`public/robots.txt`：

```txt
User-agent: *
Allow: /

Sitemap: https://postcraft.work/sitemap.xml
```

## 9. 内链锚文本

使用自然锚文本：

- LinkedIn Post Formatter
- LinkedIn Post Preview
- LinkedIn Character Limit Checker
- Bold Text for LinkedIn
- LinkedIn Post Inspector

不要全站重复完全一样的一句话。

## 10. FAQ 文案原则

FAQ 要短、具体、真实。

不要写：

```txt
This is the best LinkedIn tool.
```

要写：

```txt
This tool helps you format and preview text locally in your browser before copying it into LinkedIn.
```

## 11. 上线后观察指标

GSC 中重点看：

- Indexed pages
- Queries
- Impressions
- CTR
- Average position
- Page-level impressions
- Queries with impressions but low CTR
- Queries with position 8-20
- Pages crawled but not indexed

## 12. 后续扩展方向

如果 P0 页面有 impression，再扩展：

- `/linkedin-post-templates`
- `/linkedin-hook-generator`
- `/linkedin-post-ideas`
- `/new-job-announcement-linkedin-post`
- `/linkedin-hiring-post-template`
- `/product-launch-linkedin-post`
