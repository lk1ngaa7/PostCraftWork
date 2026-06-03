# PRD.md — PostCraft.work 产品需求文档

## 1. 产品名称

PostCraft.work

## 2. 产品一句话定位

Free LinkedIn Post Tools — Format, preview, inspect, and polish your LinkedIn posts before publishing.

## 3. 背景

大量 LinkedIn 用户在发布内容前有实际的工具需求：

- 想让帖子换行更好看。
- 想知道发布后在移动端会怎么显示。
- 想知道 LinkedIn post 字符限制。
- 想加粗部分文字。
- 想检查开头 hook 是否过长。
- 想检查 hashtag 是否太多。
- 想一键复制干净格式。

这些需求比泛泛的 AI post generator 更明确，也更适合做轻量免费工具。

## 4. 目标用户

### 4.1 核心用户

- LinkedIn 内容创作者
- 创业者 / Indie Hacker
- 招聘人员 / HR / Recruiter
- B2B 销售
- 顾问 / Consultant
- 求职者
- 职场博主
- SaaS marketer

### 4.2 用户特征

- 经常在 LinkedIn 发布内容。
- 不一定想要 AI 代写。
- 更在意发布前排版、预览、可读性、专业感。
- 希望工具免费、快速、无登录。

## 5. 用户场景

### 场景 1：发布前格式化

用户写了一段 LinkedIn 文案，希望清理多余空行、优化段落、添加 bullet，然后复制到 LinkedIn。

### 场景 2：发布前预览

用户想知道文案在 LinkedIn mobile feed 里是否首屏吸引人，以及哪里会出现 `see more` 截断。

### 场景 3：检查字符限制

用户搜索 `linkedin post character limit`，想知道自己的文案是否过长。

### 场景 4：加粗文字

用户搜索 `how to bold text in linkedin post`，想把标题或关键词转换成 Unicode bold，再复制到 LinkedIn。

### 场景 5：检查内容质量

用户希望检查自己的 LinkedIn post 是否存在：

- Hook 太长
- 段落太密
- CTA 缺失
- Hashtag 太多
- 链接太靠前
- 首屏可读性差

## 6. MVP 范围

### P0 必做

- Post editor
- Mobile-style preview
- Character / word / hashtag / link / emoji count
- Format actions
- Unicode bold / italic converter
- Inspector rules
- Copy button
- SEO landing pages
- FAQ
- Related tools
- Responsive layout
- Cloudflare deployment

### P1 可做

- Date extractor / timestamp helper
- Hook generator，不接 AI，只做结构化模板
- LinkedIn post templates
- Export as plain text
- Save draft in localStorage

### P2 暂不做

- AI generation
- AI rewriting
- User accounts
- Team workspace
- Paid plan
- Direct LinkedIn publishing
- Browser extension
- Image/carousel generation
- Database
- Analytics dashboard

## 7. 页面范围

P0：

- `/`
- `/linkedin-post-formatter`
- `/linkedin-post-preview`
- `/linkedin-post-character-limit`
- `/how-to-bold-text-in-linkedin-post`
- `/linkedin-post-inspector`

P1：

- `/linkedin-post-date-extractor`
- `/linkedin-post-templates`
- `/linkedin-hook-generator`

## 8. 核心功能需求

### 8.1 Post Editor

必须支持：

- 大文本输入
- Placeholder 示例文案
- 清空按钮
- 复制按钮
- 格式化按钮
- 字符统计实时更新
- 移动端可用

不要求富文本编辑器。textarea 足够，但视觉要像专业编辑器。

### 8.2 Formatter

P0 格式化动作：

- Trim leading/trailing whitespace
- Collapse 3+ blank lines to 2 blank lines
- Normalize line endings
- Remove trailing spaces per line
- Keep paragraph breaks
- Convert hyphen lines to clean bullets，可选
- Add blank line between dense paragraphs，可选

不要自动大幅改写用户内容。

### 8.3 Preview

必须模拟：

- 作者区
- headline
- timestamp
- post body
- see more hint
- engagement placeholder

不要复制 LinkedIn 官方完整 UI。只做 “LinkedIn-style professional post preview”。

### 8.4 Character Limit

显示：

- Characters
- Words
- Lines
- Paragraphs
- Hashtags
- Links
- Emojis
- Estimated reading time

提供提示：

- Opening hook length
- First 200 characters
- Possible see-more point
- Too many hashtags
- Long paragraphs

### 8.5 Unicode Text Converter

支持：

- Bold
- Italic
- Bold Italic

说明：

- LinkedIn 原生 post 不支持真正 rich text。
- 工具使用 Unicode 字符模拟 bold / italic。
- 某些屏幕阅读器或设备可能显示不一致。
- 不要过度使用。

### 8.6 Inspector

P0 检查规则：

- Hook 是否超过 180 字符。
- 第一段是否超过 300 字符。
- 是否有 CTA。
- Hashtag 是否超过 5 个。
- 链接是否出现在前 200 字符内。
- 是否有超长段落。
- 是否有连续 3 个以上 emoji。
- 是否全文太长。
- 是否没有换行。

输出类型：

- Good
- Warning
- Fix

Inspector 不要假装懂内容质量，只做结构与可读性检查。

## 9. 成功标准

### 功能成功

用户 5 秒内完成：

1. 粘贴 LinkedIn post。
2. 看到预览。
3. 看到统计。
4. 修正格式。
5. 复制结果。

### SEO 成功

上线后 GSC 可看到：

- impression
- query
- page
- CTR
- indexed pages

### 体验成功

- 无登录。
- 无广告。
- 无弹窗。
- 移动端可用。
- 页面加载快。
- 工具在首屏。

## 10. 非目标

第一版不追求：

- 完整 AI 写作平台
- 复杂模板库
- 账号体系
- 团队协作
- 付费变现
- 多平台社媒覆盖
- 100 个页面的程序化 SEO

先把 LinkedIn Post Toolbox 做到专业、稳定、可用。
