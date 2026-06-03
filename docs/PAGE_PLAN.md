# PAGE_PLAN.md — 页面规划

## 1. 总体页面策略

第一版所有页面共用同一个核心工具组件 `PostWorkspace`，不同页面通过默认 tab、标题、SEO 内容和 FAQ 区分 search intent。

不要为每个页面复制一套组件。要复用核心逻辑，避免维护成本过高。

## 2. 页面清单

### 2.1 首页 `/`

Primary keyword：

```txt
free linkedin post tools
```

H1：

```txt
Free LinkedIn Post Tools
```

Subtitle：

```txt
Format, preview, inspect, and polish your LinkedIn posts before publishing.
```

首屏默认：

- Editor
- Preview
- Stats
- Inspector summary

SEO sections：

1. What you can do with PostCraft
2. LinkedIn post formatting tools
3. Preview before publishing
4. Check character limits
5. Format bold and italic text
6. FAQ
7. Related tools

Internal links：

- `/linkedin-post-formatter`
- `/linkedin-post-preview`
- `/linkedin-post-character-limit`
- `/how-to-bold-text-in-linkedin-post`
- `/linkedin-post-inspector`

### 2.2 `/linkedin-post-formatter`

Primary keyword：

```txt
linkedin post formatter
```

Secondary keywords：

```txt
linkedin post formatting
how to format linkedin post
format linkedin post
```

Title：

```txt
LinkedIn Post Formatter - Format Posts Before Publishing
```

Description：

```txt
Format your LinkedIn posts with clean spacing, readable paragraphs, bullets, and a live preview. Free, browser-based, and no sign-up required.
```

H1：

```txt
LinkedIn Post Formatter
```

Subtitle：

```txt
Clean up spacing, paragraphs, bullets, and line breaks before you publish on LinkedIn.
```

首屏默认 tab：

```txt
Format
```

工具重点：

- Clean spacing
- Normalize line breaks
- Copy formatted post
- Preview result

SEO sections：

1. How to format a LinkedIn post
2. Recommended LinkedIn post structure
3. Formatting tips for better readability
4. FAQ

FAQ：

- How do I format a LinkedIn post?
- Can LinkedIn posts use bold text?
- Why does my LinkedIn post lose formatting?
- Does this tool upload my content?

### 2.3 `/linkedin-post-preview`

Primary keyword：

```txt
linkedin post preview
```

Secondary keywords：

```txt
preview linkedin post
linkedin post preview tool
linkedin mobile post preview
```

Title：

```txt
LinkedIn Post Preview - See How Your Post Looks Before Publishing
```

Description：

```txt
Preview your LinkedIn post before publishing. Check mobile layout, opening hook, line breaks, hashtags, and see-more truncation hints.
```

H1：

```txt
LinkedIn Post Preview
```

Subtitle：

```txt
See how your LinkedIn post may look in a professional feed-style preview before you publish.
```

首屏默认 tab：

```txt
Preview
```

工具重点：

- Feed-style preview
- Mobile-first preview
- See-more hint
- First 200 characters

SEO sections：

1. Why preview a LinkedIn post?
2. What to check before publishing
3. Mobile preview tips
4. FAQ

FAQ：

- Can I preview a LinkedIn post before posting?
- Is this an official LinkedIn preview?
- What is the see-more point?
- Does the preview match LinkedIn exactly?

### 2.4 `/linkedin-post-character-limit`

Primary keyword：

```txt
linkedin post character limit
```

Secondary keywords：

```txt
linkedin character limit
linkedin post word count
linkedin post length checker
```

Title：

```txt
LinkedIn Post Character Limit Checker
```

Description：

```txt
Check LinkedIn post character count, word count, hashtags, links, emojis, paragraphs, and readability before publishing.
```

H1：

```txt
LinkedIn Post Character Limit Checker
```

Subtitle：

```txt
Count characters, words, hashtags, links, and paragraphs in your LinkedIn post.
```

首屏默认 tab：

```txt
Stats
```

工具重点：

- Character count
- Word count
- Hashtag count
- Link count
- Paragraph count
- Warnings

SEO sections：

1. LinkedIn post character limit overview
2. What length works best?
3. How to keep posts readable
4. FAQ

FAQ：

- What is the LinkedIn post character limit?
- How long should a LinkedIn post be?
- Do hashtags count as characters?
- Do links count as characters?

重要：如果页面引用具体 LinkedIn 官方字符限制，必须由 Codex 上网核实最新官方信息后再写死。未核实时，页面应使用“check your current post length”而不是绝对承诺。

### 2.5 `/how-to-bold-text-in-linkedin-post`

Primary keyword：

```txt
how to bold text in linkedin post
```

Secondary keywords：

```txt
bold text linkedin post
linkedin bold text generator
linkedin italic text
```

Title：

```txt
How to Bold Text in a LinkedIn Post
```

Description：

```txt
Use a free Unicode bold text converter for LinkedIn posts. Create bold, italic, and bold italic text you can copy into your post.
```

H1：

```txt
How to Bold Text in a LinkedIn Post
```

Subtitle：

```txt
Convert plain text into Unicode bold or italic text you can copy into a LinkedIn post.
```

首屏默认 tab：

```txt
Bold Text
```

工具重点：

- Input text
- Bold
- Italic
- Bold italic
- Copy

SEO sections：

1. Can you bold text in a LinkedIn post?
2. How Unicode bold text works
3. When not to use bold text
4. Accessibility note
5. FAQ

FAQ：

- Does LinkedIn support native bold text?
- Is Unicode bold text safe to use?
- Can screen readers read Unicode bold text?
- Why does bold text look different on some devices?

### 2.6 `/linkedin-post-inspector`

Primary keyword：

```txt
linkedin post inspector
```

Secondary keywords：

```txt
linkedin post checker
linkedin post analyzer
linkedin post readability checker
```

Title：

```txt
LinkedIn Post Inspector - Check Readability Before Publishing
```

Description：

```txt
Inspect your LinkedIn post for hook length, paragraph density, hashtags, links, CTA, and readability before publishing.
```

H1：

```txt
LinkedIn Post Inspector
```

Subtitle：

```txt
Check your post structure, readability, hashtags, links, and call to action before publishing.
```

首屏默认 tab：

```txt
Inspector
```

工具重点：

- Score
- Good checks
- Warnings
- Fix suggestions

SEO sections：

1. What does the inspector check?
2. LinkedIn post readability checklist
3. Common issues before publishing
4. FAQ

FAQ：

- What makes a LinkedIn post readable?
- How many hashtags should I use?
- Should I put a link in my LinkedIn post?
- Does this tool judge my writing quality?

## 3. P1 页面

### 3.1 `/linkedin-post-date-extractor`

只在 P0 完成后做。

注意：

- 不要承诺能从所有 LinkedIn URL 直接提取日期。
- 不要抓取私有页面。
- 可以做成 timestamp helper / copied text date helper。
- 需要先验证 SERP 和用户意图。

### 3.2 `/linkedin-post-templates`

可以做场景模板：

- new job announcement
- hiring
- promotion
- product launch
- event announcement
- case study
- lessons learned

第一版不做大量模板页，避免内容空泛。

## 4. 内链策略

每个页面底部放 Related Tools 卡片：

- LinkedIn Post Formatter
- LinkedIn Post Preview
- LinkedIn Character Limit Checker
- Bold Text for LinkedIn
- LinkedIn Post Inspector

每个页面 SEO 内容中自然链接到 2-4 个相关工具。

## 5. 页面结构模板

每个页面统一结构：

```txt
Header
Hero / Tool Workspace
Trust note
Tool-specific SEO section
How to use
Tips
FAQ
Related Tools
Footer
```

首屏不要放长文案。工具必须在首屏。
