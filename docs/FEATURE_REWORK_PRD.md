# PostCraft.work 专业功能改造 PRD

## 0. 文档目的

本文档用于指导 Codex 对 PostCraft.work 做一次完整功能改造。

当前站点已经上线，但核心问题是：多个 SEO 页面虽然 H1、subtitle、URL 不同，但首屏工具主体几乎相同，用户切换页面后感知不到真实功能差异。此次改造目标不是做一个简单 MVP，而是把 PostCraft.work 做成一个专业、可信、功能完善的 LinkedIn Post 工具站。

本次改造完成后，PostCraft.work 应该从“同一个编辑器换标题”升级为“5 个独立、完整、专业的 LinkedIn 内容发布前工具”。

---

## 1. 产品定位

### 1.1 产品名称

PostCraft.work

### 1.2 产品定位

Free LinkedIn Post Tools
Format, preview, inspect, and polish your LinkedIn posts before publishing.

### 1.3 产品目标

PostCraft.work 要成为一个专业的 LinkedIn 内容发布前工具箱，帮助用户在发布前完成：

* 格式整理
* 移动端预览
* 字符限制检查
* Unicode 粗体/斜体转换
* 结构诊断
* 可读性检查
* 链接与图片预览模拟
* 发布前检查清单

### 1.4 核心用户

* LinkedIn 内容创作者
* B2B marketer
* SaaS founder
* Indie hacker
* Recruiter / HR
* Job seeker
* Consultant
* Sales professional
* Personal branding creator
* Agency operator

---

## 2. 当前问题

当前线上页面存在严重同质化问题：

```txt
/
 /linkedin-post-formatter
 /linkedin-post-preview
 /linkedin-post-character-limit
 /how-to-bold-text-in-linkedin-post
 /linkedin-post-inspector
```

虽然这些页面的 URL、H1、subtitle 不同，但首屏核心 UI 基本都是：

```txt
输入框
预览卡片
字符统计
Inspector 小面板
```

这导致：

1. 用户进入 Formatter 页面，看不到真正的格式化工作流。
2. 用户进入 Preview 页面，看不到专业的移动端 feed 预览。
3. 用户进入 Character Limit 页面，看不到完整限制检查面板。
4. 用户进入 Bold Text 页面，看不到粗体/斜体转换器。
5. 用户进入 Inspector 页面，看不到真正的结构诊断和评分。
6. Google 也可能认为页面主体重复，影响 SEO 质量。

本次改造必须彻底解决这个问题。

---

## 3. 改造原则

### 3.1 页面必须是真独立工具

每个页面必须有独立的首屏主功能、独立布局、独立交互重点。

不能只改：

* H1
* subtitle
* active tab
* mode label

必须改：

* 首屏主视觉
* 主功能组件
* 页面工作流
* 默认输入区
* 结果输出区
* 验收指标

### 3.2 允许复用底层能力，但不能复用同一套首屏

可以复用：

* 文本统计 utils
* 格式化 utils
* URL 检测 utils
* Unicode 转换 utils
* Inspector rules
* Copy button
* SEO components
* FAQ components

不能让所有页面都渲染同一个 `PostWorkspace`。

推荐方式：

```txt
pages/
  index.vue
  linkedin-post-formatter.vue
  linkedin-post-preview.vue
  linkedin-post-character-limit.vue
  how-to-bold-text-in-linkedin-post.vue
  linkedin-post-inspector.vue

components/tools/
  FormatterTool.vue
  PreviewTool.vue
  CharacterLimitTool.vue
  UnicodeBoldTool.vue
  InspectorTool.vue
```

### 3.3 专业完整，不做廉价 MVP

本次改造不是“能用就行”。

每个页面都要做到：

* 真实解决用户搜索意图
* 功能完整
* 首屏专业
* 交互顺畅
* 移动端可用
* 文案可信
* SEO 内容不空
* 可访问性合格
* 可被视觉审核通过

### 3.4 不山寨 LinkedIn

可以使用 LinkedIn 作为描述性关键词，但不能让用户误以为 PostCraft.work 是 LinkedIn 官方产品。

禁止：

* 使用 LinkedIn 官方 logo
* 完整复制 LinkedIn UI
* 写 Official / LinkedIn-approved / Partner
* 要求用户输入 LinkedIn 账号、密码、cookie、token
* 抓取私有 LinkedIn 页面

Footer 必须保留：

```txt
PostCraft.work is an independent tool and is not affiliated with LinkedIn.
```

### 3.5 数据本地优先

用户输入的 post 文本默认必须在浏览器本地处理。

只有链接预览 OG 抓取可以使用 Cloudflare Pages Function，但必须满足：

* 只抓取用户输入的公开 URL
* 不抓取 LinkedIn 私有内容
* 不保存 URL
* 设置超时
* 设置错误降级
* 明确提示 link preview is approximate

---

## 4. 信息架构

### 4.1 页面清单

```txt
/
 /linkedin-post-formatter
 /linkedin-post-preview
 /linkedin-post-character-limit
 /how-to-bold-text-in-linkedin-post
 /linkedin-post-inspector
```

### 4.2 首页定位

首页不是纯导航页，也不是完整复制某一个工具页。

首页定位：

```txt
Professional LinkedIn post tool hub + quick start workspace
```

首页必须包括：

1. Hero
2. 5 个工具卡片
3. Quick Start mini workspace
4. Why use PostCraft
5. Related tools
6. FAQ
7. Footer disclaimer

首页首屏必须让用户明白：

* 这是 LinkedIn post 工具箱
* 有 5 个工具
* 可以马上开始使用
* 不是 LinkedIn 官方产品

---

## 5. 全局设计要求

### 5.1 视觉方向

关键词：

```txt
professional
premium
focused
editorial
creator workspace
LinkedIn-adjacent
not LinkedIn-clone
```

### 5.2 颜色建议

```txt
Page background: #F6F8FB
Surface: #FFFFFF
Elevated surface: #FFFFFF
Primary ink: #0F172A
Secondary text: #475569
Muted text: #64748B
Border: #E2E8F0
Soft border: #EEF2F7
Professional blue: #0A66C2
Action blue: #2563EB
Soft blue: #EAF3FF
Success: #15803D
Warning: #B45309
Error: #DC2626
```

### 5.3 UI 禁区

禁止：

* 低质蓝白灰模板感
* 大面积廉价渐变
* 过度阴影
* 玻璃拟态
* 重后台系统风
* 一堆 tab 伪装多个工具
* 首屏 SEO 长文
* 广告位
* 弹窗
* AI SaaS 夸张话术

### 5.4 视觉审核

任何 UI 改动完成后，必须使用 `zai-mcp-server` 做截图审核。

必须审核：

```txt
desktop 首页
mobile 首页
formatter 页面
preview 页面
character limit 页面
bold text 页面
inspector 页面
```

审核问题：

```txt
1. 页面是否专业、高级、可信？
2. 是否贴近 LinkedIn 职业内容场景？
3. 是否不是山寨 LinkedIn？
4. 是否不是廉价工具站？
5. 首屏是否直接展示当前页面的核心工具？
6. 每个页面是否明显不同？
7. 移动端是否无横向溢出？
8. Editor、结果区、操作区主次是否清楚？
```

---

# 6. 页面一：首页 `/`

## 6.1 页面定位

工具集入口 + Quick Start 工作区。

首页不做单一功能页，但必须让用户能快速开始。

## 6.2 SEO

Title：

```txt
PostCraft.work - Free LinkedIn Post Tools
```

Description：

```txt
Format, preview, inspect, and polish your LinkedIn posts before publishing. Free professional LinkedIn post tools with no sign-up required.
```

H1：

```txt
Free LinkedIn Post Tools
```

Subtitle：

```txt
Format, preview, inspect, and polish your LinkedIn posts before publishing.
```

## 6.3 首屏结构

桌面端：

```txt
Header

Hero left:
- H1
- subtitle
- trust note
- primary CTA: Start with Formatter
- secondary CTA: View all tools

Hero right:
- Compact Quick Start card
- textarea
- character count
- preview snippet
- copy button
```

移动端：

```txt
Header
H1
subtitle
tool cards
quick start card
SEO content
FAQ
Footer
```

## 6.4 工具卡片

展示 5 个工具：

### Formatter

```txt
Clean spacing, paragraphs, bullets, and line breaks before publishing.
```

### Preview

```txt
See how your post may look in a professional mobile feed preview.
```

### Character Limit

```txt
Check post length, profile fields, hashtags, mentions, and reading time.
```

### Bold Text

```txt
Convert plain text into Unicode bold, italic, and bold italic styles.
```

### Inspector

```txt
Check hook length, readability, hashtags, links, CTA, and publishing readiness.
```

## 6.5 首页验收标准

* 打开首页后，用户能在 3 秒内理解这是 LinkedIn post 工具箱。
* 5 个工具卡片明显可点击。
* Quick Start 可以输入文本并看到基础统计。
* 首页不能看起来像纯目录页。
* 首页不能和其他功能页首屏完全一样。

---

# 7. 页面二：LinkedIn Post Formatter

URL：

```txt
/linkedin-post-formatter
```

## 7.1 页面定位

自动清理和优化 LinkedIn post 的格式问题。

核心搜索意图：

```txt
linkedin post formatter
linkedin post formatting
how to format linkedin post
```

## 7.2 SEO

Title：

```txt
LinkedIn Post Formatter - Clean Up Spacing and Line Breaks
```

Description：

```txt
Format your LinkedIn post with clean spacing, readable paragraphs, normalized bullets, live preview, and one-click copy.
```

H1：

```txt
LinkedIn Post Formatter
```

Subtitle：

```txt
Clean up spacing, paragraphs, bullets, and line breaks before copying your post into LinkedIn.
```

## 7.3 首屏布局

桌面端：

```txt
Left large panel:
- Raw post input
- Format controls
- Change summary

Right panel:
- Formatted output editor
- Live preview
- Copy formatted post
```

移动端：

```txt
H1
Raw input
Format buttons
Formatted output
Change summary
Copy button
Preview
```

## 7.4 核心功能

### 7.4.1 Raw Input

字段：

```txt
Paste your draft post
```

支持：

* 长文本
* 多段落
* bullet list
* URL
* hashtag
* emoji

### 7.4.2 Format Actions

必须实现：

```txt
Format post
Clean spacing
Normalize bullets
Remove trailing spaces
Normalize line breaks
Copy formatted
Clear
Use example
```

### 7.4.3 Safe Format 默认规则

点击 `Format post` 后默认执行安全格式化：

1. Trim 首尾空白。
2. 移除每行行尾空格。
3. 统一 CRLF / CR 为 LF。
4. 连续 3 个及以上空行压缩为 2 个空行。
5. 连续多个空格压缩，但不要破坏缩进和 URL。
6. bullet 符号标准化：

   * `* item`
   * `- item`
   * `• item`
     可以统一为 `• item`。
7. 保留用户已有段落结构。
8. 不改写用户文案。
9. 不自动生成新内容。

### 7.4.4 Advanced Format 可选规则

增加开关：

```txt
Add spacing between dense paragraphs
Normalize bullet style
Remove duplicate hashtags
Move hashtags to the end
```

这些默认关闭，用户主动开启才执行。

### 7.4.5 Change Summary

格式化后显示：

```txt
Removed 8 trailing spaces
Reduced 3 extra blank lines
Normalized 5 bullet lines
Kept your original wording unchanged
```

### 7.4.6 Formatted Output

格式化结果必须仍可编辑。

用户可以继续手动微调，然后复制。

### 7.4.7 Live Preview

右侧显示格式化后的 feed preview。

Preview 是辅助，不是主角；Formatter 页面主角是格式化前后结果。

## 7.5 边界情况

* 空输入：提示 `Paste your post to format it.`
* 只有一行：仍可清理空格。
* 只有 URL：不要破坏 URL。
* 中文/英文混排：不应乱码。
* emoji：保留。
* hashtag：保留。
* markdown：不要强行转换，除 bullet 以外保持原样。

## 7.6 验收标准

* 页面首屏明显是 Formatter，不是通用编辑器。
* 点击 Format 后文本真的变化。
* Change Summary 清楚说明变化。
* 格式化不会改写用户含义。
* 用户可以编辑格式化后的结果。
* Copy formatted 可用。
* 移动端可完成完整流程。
* UI 经 `zai-mcp-server` 审核通过。

---

# 8. 页面三：LinkedIn Post Preview

URL：

```txt
/linkedin-post-preview
```

## 8.1 页面定位

提供近似的 LinkedIn-style mobile feed preview，帮助用户在发布前检查首屏展示、折叠、链接和图片效果。

不要宣称 100% 一比一还原。应使用：

```txt
LinkedIn-style preview
approximate mobile feed preview
```

## 8.2 SEO

Title：

```txt
LinkedIn Post Preview - Mobile Feed Preview Before Publishing
```

Description：

```txt
Preview your LinkedIn post before publishing. Check mobile layout, see-more truncation, links, images, and first-screen readability.
```

H1：

```txt
LinkedIn Post Preview
```

Subtitle：

```txt
See how your post may look in a professional mobile feed preview before publishing.
```

## 8.3 首屏布局

桌面端：

```txt
Left panel:
- Post input
- Author preview settings
- Media settings
- Link preview settings

Right dominant panel:
- Large mobile feed preview
- collapsed / expanded toggle
- light / dark toggle
```

移动端：

```txt
Input
Preview settings
Large preview
Collapsed / expanded toggle
Link/image preview
```

## 8.4 核心功能

### 8.4.1 Post Input

支持普通文本、URL、hashtag、mention、emoji。

### 8.4.2 Mobile Feed Preview

必须模拟：

* avatar placeholder
* display name
* headline
* timestamp
* visibility dot / public label
* post body
* see more
* link preview
* image placeholder
* reaction summary placeholder
* comment / repost / send action row

注意：

* 不使用 LinkedIn logo。
* 不复制官方完整 UI。
* 只做职业社交 feed 风格。

### 8.4.3 Author Settings

用户可编辑：

```txt
Name
Headline
Avatar initials
Timestamp label
```

默认：

```txt
Alex Morgan
Founder · B2B Creator
Now
```

### 8.4.4 Collapse / See More

实现两个预览模式：

```txt
Collapsed
Expanded
```

Collapsed 模式：

* 通过 CSS line clamp 近似模拟 3 行折叠。
* 超过折叠高度时显示 `see more`。
* 显示提示：

```txt
Approximate truncation point. LinkedIn may render posts differently by device.
```

### 8.4.5 First-screen Preview

显示：

```txt
First visible characters
First visible lines
Hook visibility
```

给出提示：

* opening too long
* first paragraph too dense
* hook visible
* link appears before the hook

### 8.4.6 Link Preview

必须实现复杂但稳定的两层方案。

#### Level 1：URL 检测

本地检测 post 中第一个 URL。

显示：

```txt
Detected link: example.com
```

#### Level 2：Mock Link Card

如果检测到 URL，默认生成 mock link card：

```txt
domain
manual title input
manual description input
thumbnail placeholder
```

用户可以手动编辑 link title / description。

#### Level 3：OG Fetch API

实现 Cloudflare Pages Function：

```txt
/api/og?url=
```

功能：

* fetch 公开 URL
* 解析 title
* 解析 og:title
* 解析 og:description
* 解析 og:image
* 解析 canonical/domain
* 3-5 秒超时
* 返回 JSON
* 出错时 fallback 到 mock card
* 不保存用户 URL
* 不抓取 LinkedIn 私有页面

如果抓取失败，显示：

```txt
We could not fetch a link preview. You can still edit the preview manually.
```

### 8.4.7 Image Preview

支持：

* 用户上传本地图片作为预览
* 使用 object URL 本地显示
* 不上传服务器
* 支持移除图片
* 支持 1:1、4:5、16:9 占位比例切换

### 8.4.8 Light / Dark Preview

支持 preview card 的 light / dark mode 切换。

这不是全站主题切换，只是预览卡片切换。

### 8.4.9 Device Width Toggle

支持：

```txt
Compact mobile
Wide mobile
Desktop feed
```

不同宽度影响折叠预览和行数展示。

## 8.5 边界情况

* 没有 URL：不显示 link card。
* 多个 URL：默认取第一个，提示 detected multiple links。
* 图片 + URL 同时存在：同时显示，但布局要合理。
* URL 抓取失败：fallback。
* 输入极长文本：preview 不应卡死。
* 移动端：preview 不应溢出。

## 8.6 验收标准

* 页面首屏明显以 Preview 为主。
* 预览卡片是视觉主角。
* 支持 collapsed / expanded。
* 支持 see more hint。
* 支持 link preview mock。
* 支持 OG fetch fallback。
* 支持 image preview。
* 支持 preview light/dark。
* 不山寨 LinkedIn。
* 移动端可用。
* UI 经 `zai-mcp-server` 审核通过。

---

# 9. 页面四：LinkedIn Post Character Limit Checker

URL：

```txt
/linkedin-post-character-limit
```

## 9.1 页面定位

提供 LinkedIn 内容相关字段的字符限制检查、进度条、超限提示、发布前长度建议。

本页面不只是统计 chars/words，而是一个 LinkedIn limit dashboard。

## 9.2 SEO

Title：

```txt
LinkedIn Post Character Limit Checker
```

Description：

```txt
Check LinkedIn post length, article fields, profile fields, hashtags, mentions, links, and reading time with visual limit indicators.
```

H1：

```txt
LinkedIn Post Character Limit Checker
```

Subtitle：

```txt
Check post length, profile fields, hashtags, mentions, links, and reading time before publishing.
```

## 9.3 首屏布局

桌面端：

```txt
Left:
- Main post text input
- Common field selector

Right:
- Limit dashboard
- Progress bars
- Warnings
- Suggestions
```

移动端：

```txt
Post input
Main post limit card
Progress bars
Field limit tabs
Hashtag/mention/link stats
Suggestions
```

## 9.4 Limit Source System

实现一个集中配置文件：

```txt
utils/linkedinLimits.config.ts
```

每条限制必须包含：

```ts
type LinkedInLimit = {
  id: string
  label: string
  max: number
  unit: 'characters'
  sourceType: 'official' | 'needs-verification' | 'community-observed'
  sourceUrl?: string
  lastVerified?: string
  notes?: string
}
```

硬性要求：

* Post body 3000 chars 可写为 official。
* Article body 125000 chars 可写为 official。
* 其他字段如 headline/about/profile/article title 等，Codex 必须实现前核实最新来源。
* 未核实字段不得伪装成 official。
* UI 中必须显示 `limits may vary` 提示。

## 9.5 字段分组

### 9.5.1 Post

字段：

```txt
Post body
```

显示：

* character count
* progress bar
* remaining characters
* over limit count
* first visible estimate
* reading time
* words
* lines
* paragraphs
* hashtags
* mentions
* links
* emojis

### 9.5.2 Article

字段：

```txt
Article title
Article subtitle / description
Article body
```

如果限制未核实，将字段标为：

```txt
Verify before relying on this value.
```

### 9.5.3 Profile

字段：

```txt
First name
Last name
Headline
About / Summary
Custom profile URL
```

这些字段必须在配置里标 source。

### 9.5.4 Ads / Page Content

可作为高级折叠区：

```txt
Ad intro text
Ad headline
Ad description
Page post intro text
```

Codex 可以先实现配置驱动 UI，但具体数值必须核实来源后写入。

## 9.6 进度条规则

每个字段显示：

```txt
current / max
remaining
progress bar
status
```

状态：

```txt
Safe: 0-79%
Near limit: 80-99%
Over limit: >100%
```

颜色：

* Safe: green
* Near: amber
* Over: red

不能只靠颜色，必须有文字状态。

## 9.7 建议系统

根据输入给出：

* Post is within the limit.
* You are close to the limit.
* Your post is over the limit by X characters.
* Consider moving long-form content into an article.
* Your opening section is long; check the preview.
* Hashtag count is high.
* Link appears early in the post.
* Mentions detected.

## 9.8 Hashtag / Mention / Link 统计

实现：

```txt
Hashtag count
Mention count
Link count
Emoji count
```

Hashtag 建议：

* 0：提示可以添加 1-3 个相关 hashtags。
* 1-5：合理。
* > 5：提示可能显得拥挤。

Mention：

* 检测 `@name`。
* 不校验真实账号。

Link：

* 检测 URL。
* 提示链接可能影响首屏可读性。

## 9.9 验收标准

* 页面首屏明显是 Limit Checker。
* Progress dashboard 是主角。
* Post body 3000 限制可用。
* Article body 125000 限制可用。
* 其他字段配置化，不乱写无来源限制。
* 超限提示准确。
* 进度条清晰。
* Hashtag / mention / link / emoji 统计可用。
* 移动端可用。
* UI 经 `zai-mcp-server` 审核通过。

---

# 10. 页面五：How to Bold Text in a LinkedIn Post

URL：

```txt
/how-to-bold-text-in-linkedin-post
```

## 10.1 页面定位

将普通文本转换为 Unicode bold / italic / bold italic，供用户复制到 LinkedIn post 中。

这个页面必须彻底脱离通用 PostWorkspace。首屏必须就是 Unicode Text Converter。

## 10.2 SEO

Title：

```txt
How to Bold Text in a LinkedIn Post - Unicode Bold Converter
```

Description：

```txt
Convert plain text into Unicode bold, italic, and bold italic styles you can copy into a LinkedIn post. Includes accessibility notes and plain-text restore.
```

H1：

```txt
How to Bold Text in a LinkedIn Post
```

Subtitle：

```txt
Convert plain text into Unicode bold, italic, and bold italic text you can copy into LinkedIn.
```

## 10.3 首屏布局

桌面端：

```txt
Left:
- Plain text editor
- selection formatting toolbar
- keyboard shortcut hints

Right:
- Bold output
- Italic output
- Bold italic output
- Sans bold output
- Copy buttons
- Accessibility note
```

移动端：

```txt
Plain input
Style buttons
Output cards
Copy buttons
Accessibility note
Preview
```

## 10.4 核心功能

### 10.4.1 Plain Text Input

支持：

* 普通英文
* 数字
* 基础标点
* 多行文本
* 选中文本局部转换

### 10.4.2 Output Styles

必须实现：

```txt
Bold
Italic
Bold Italic
Sans Bold
Sans Italic
Monospace
```

至少 P0 完成：

```txt
Bold
Italic
Bold Italic
```

但本 PRD 要求专业完整，因此最终必须完成 6 种样式。

### 10.4.3 Selection Replacement

用户可以：

1. 在左侧输入框选中部分文字。
2. 点击 Bold / Italic / Bold Italic。
3. 工具只替换选中部分。
4. 未选中时转换整段文本。

### 10.4.4 Keyboard Shortcuts

实现：

```txt
Cmd/Ctrl + B: Bold selected text
Cmd/Ctrl + I: Italic selected text
Cmd/Ctrl + Shift + B: Bold italic selected text
```

如果 textarea 快捷键冲突，要保证不破坏输入体验。

### 10.4.5 Copy

每个 output card 都有 copy button。

还要有：

```txt
Copy all
Copy selected style
```

### 10.4.6 Restore Plain Text

必须实现：

```txt
Remove Unicode formatting
Restore plain text
```

用于将 Unicode bold/italic 还原为普通 ASCII 字符。

### 10.4.7 Accessibility Warning

页面必须显示：

```txt
This tool uses Unicode characters to simulate bold or italic text. LinkedIn regular posts do not support native rich text formatting. Use Unicode styling sparingly because it may reduce readability or accessibility for some users.
```

### 10.4.8 LinkedIn Preview

下方可以显示：

* styled text preview
* warning if whole paragraph is styled
* recommendation: use styled text for short hook or keywords only

## 10.5 Unicode 映射要求

实现文件：

```txt
utils/unicodeText.ts
```

必须支持：

* A-Z
* a-z
* 0-9
* 保留空格
* 保留标点
* 不支持字符原样返回

实现函数：

```ts
toBold(text: string): string
toItalic(text: string): string
toBoldItalic(text: string): string
toSansBold(text: string): string
toSansItalic(text: string): string
toMonospace(text: string): string
restorePlainText(text: string): string
```

## 10.6 边界情况

* 中文字符：保持原样。
* emoji：保持原样。
* 标点：保持原样。
* 已经是 Unicode bold：再次转换不要乱码。
* 粘贴长文：不能卡死。
* 空输入：显示 empty state。
* 移动端：copy button 易点。

## 10.7 验收标准

* 首屏明显是 Bold Text Converter。
* 不再显示通用 workspace。
* 6 种 Unicode 输出可用。
* 选中文本替换可用。
* 快捷键可用。
* restore plain text 可用。
* copy 可用。
* accessibility note 明显。
* 移动端可用。
* UI 经 `zai-mcp-server` 审核通过。

---

# 11. 页面六：LinkedIn Post Inspector

URL：

```txt
/linkedin-post-inspector
```

## 11.1 页面定位

对 LinkedIn post 做发布前结构诊断，给出发布准备度评分和具体改进建议。

定位应为：

```txt
Structure and readability checker
```

不要定位为：

```txt
AI viral score
Guaranteed engagement optimizer
```

## 11.2 SEO

Title：

```txt
LinkedIn Post Inspector - Check Readability Before Publishing
```

Description：

```txt
Inspect your LinkedIn post for hook length, paragraph structure, hashtags, links, CTA, readability, and publishing readiness.
```

H1：

```txt
LinkedIn Post Inspector
```

Subtitle：

```txt
Check hook length, readability, hashtags, links, CTA, and publishing readiness before posting.
```

## 11.3 首屏布局

桌面端：

```txt
Left:
- Post input
- quick example
- analysis controls

Right dominant panel:
- Publishing readiness score
- critical issues
- warnings
- good checks
- prioritized fix list
```

移动端：

```txt
Input
Score
Critical fixes
Warnings
Good checks
Detailed analysis
```

## 11.4 核心功能

### 11.4.1 Publishing Readiness Score

显示 0-100 分。

不要叫：

```txt
Viral score
AI score
Engagement guarantee
```

叫：

```txt
Publishing readiness
```

评分维度：

```txt
Hook clarity
Mobile readability
Paragraph structure
CTA presence
Hashtag usage
Link placement
Length control
Readability
Formatting
```

### 11.4.2 Hook Analysis

检查：

* 第一行是否为空。
* 第一行字符数。
* 第一行是否过长。
* 第一行是否包含问题句。
* 第一行是否包含数字。
* 第一行是否包含明显开场模式。

注意：不能声称准确判断“是否抓眼球”。只能说：

```txt
Your opening line may be easier to scan if it is shorter.
```

规则：

```txt
0 chars: fix
1-80 chars: good
81-140 chars: warning
>140 chars: fix
```

### 11.4.3 Paragraph Structure

检查：

* 段落数
* 平均段落长度
* 最大段落长度
* 是否整篇无换行
* 是否有连续超长段落

建议：

```txt
Keep paragraphs short for mobile readability.
```

### 11.4.4 CTA Detection

检测简单 CTA：

```txt
comment
reply
share
save
follow
connect
what do you think
what would you add
drop your thoughts
learn more
try it
download
check it out
```

输出：

* 有 CTA：good
* 无 CTA：warning
* CTA 太多：warning

### 11.4.5 Hashtag Analysis

检查：

* hashtag count
* hashtag 是否集中在结尾
* hashtag 是否过多

规则：

```txt
0: neutral suggestion
1-5: good
6-10: warning
>10: fix
```

### 11.4.6 Link Placement

检查：

* 是否包含 URL
* URL 是否出现在前 200 字符
* URL 是否在正文中间
* 是否多个 URL

提示：

```txt
Links near the opening may distract from the hook. Consider placing links later if appropriate.
```

不要说“必须放评论区”，只能作为建议：

```txt
Some creators prefer placing links later or in comments, depending on their publishing strategy.
```

### 11.4.7 Readability Score

实现英文可读性指标：

* Flesch Reading Ease
* Flesch-Kincaid Grade
* average sentence length
* average words per paragraph

标注：

```txt
Readability is approximate and works best for English text.
```

中文或混合文本：

* 不计算 Flesch。
* 显示 structural readability instead。

### 11.4.8 Reading Time

按照英文约 200 words/min 估算。

显示：

```txt
Estimated read time: 1 min
```

### 11.4.9 Emoji Density

检查：

* emoji count
* consecutive emoji
* emoji 是否过密

### 11.4.10 Priority Fix List

根据严重程度输出 3-5 条优先修复建议。

示例：

```txt
1. Shorten your opening line.
2. Break the longest paragraph into 2-3 shorter paragraphs.
3. Move hashtags to the end.
4. Add a simple CTA.
```

### 11.4.11 Good Checks

不仅提示问题，也要显示做得好的地方：

```txt
Good paragraph spacing
Readable post length
Hashtag count looks reasonable
CTA detected
No early link distraction
```

## 11.5 Inspector 输出结构

```ts
type InspectorSeverity = 'good' | 'info' | 'warning' | 'fix'

type InspectorItem = {
  id: string
  severity: InspectorSeverity
  category: 'hook' | 'structure' | 'cta' | 'hashtags' | 'links' | 'readability' | 'length' | 'formatting'
  title: string
  message: string
  suggestion?: string
}
```

## 11.6 验收标准

* 页面首屏明显是 Inspector。
* Publishing readiness score 是主角。
* 至少 10 条检查规则可用。
* 有 good / warning / fix 分类。
* 有 priority fix list。
* 有 readability score。
* 有 reading time。
* 不声称 AI 分析。
* 不保证涨互动。
* 移动端可用。
* UI 经 `zai-mcp-server` 审核通过。

---

# 12. 全局共享能力

## 12.1 Copy System

所有页面 copy button 要统一：

* copy 成功提示
* copy 失败 fallback
* aria-live
* 按钮状态变化

## 12.2 Example System

每个页面都要有 `Use example`。

示例文案按页面定制：

* Formatter：格式混乱示例
* Preview：中等长度 post + URL
* Character Limit：接近上限示例
* Bold：短 hook 示例
* Inspector：有明显问题的 post 示例

## 12.3 Privacy Note

所有文本工具页底部或工具区旁边显示：

```txt
Your text is processed locally in your browser. PostCraft.work does not require sign-up and does not publish to LinkedIn.
```

如果使用 OG fetch：

```txt
Only the public URL is requested to generate an optional link preview. Your post text is not uploaded.
```

## 12.4 SEO 内容区

每个页面工具下方必须有：

```txt
How to use
Tips
FAQ
Related tools
Disclaimer
```

不要首屏堆 SEO 内容。

## 12.5 Related Tools

每个页面底部都要有 4 个相关工具卡片。

---

# 13. 技术实现要求

## 13.1 推荐目录结构

```txt
components/
  layout/
    SiteHeader.vue
    SiteFooter.vue
  tools/
    FormatterTool.vue
    PreviewTool.vue
    CharacterLimitTool.vue
    UnicodeBoldTool.vue
    InspectorTool.vue
  shared/
    CopyButton.vue
    ToolCard.vue
    ProgressBar.vue
    StatCard.vue
    FaqBlock.vue
    RelatedTools.vue
    PrivacyNote.vue

utils/
  postFormat.ts
  postStats.ts
  unicodeText.ts
  postInspector.ts
  readability.ts
  linkDetection.ts
  linkedinLimits.config.ts

composables/
  useClipboard.ts
  usePostStats.ts
  usePostFormatter.ts
  useUnicodeText.ts
  usePostInspector.ts
  useOgPreview.ts

server/
  api/
    og.get.ts
```

## 13.2 API：OG Preview

实现：

```txt
GET /api/og?url=https://example.com
```

返回：

```json
{
  "ok": true,
  "url": "https://example.com",
  "domain": "example.com",
  "title": "Example title",
  "description": "Example description",
  "image": "https://example.com/og.png"
}
```

错误：

```json
{
  "ok": false,
  "error": "Unable to fetch preview"
}
```

要求：

* URL 必须 http/https。
* 禁止 file://、localhost、内网 IP。
* 超时 3-5 秒。
* 限制响应大小。
* 解析失败 fallback。
* 不保存日志中的完整用户 post。

## 13.3 性能要求

* 首屏 JS 不要过大。
* 工具函数本地执行。
* 长文输入防抖 100-200ms。
* OG fetch 手动触发或检测后延迟触发。
* 图片 preview 使用 object URL，并在移除时 revoke。

## 13.4 可访问性要求

* 所有 textarea/input 有 label。
* 所有按钮有明确文本。
* 状态不只靠颜色。
* copy 成功提示使用 aria-live。
* progress bar 有文字说明。
* keyboard focus 明显。
* 移动端按钮高度至少 44px。
* 不出现横向滚动。

---

# 14. SEO 要求

## 14.1 URL 不变

保持现有 URL，不要改 URL。

## 14.2 每页 Title / Description 独立

不能所有页面复用同一个 title template。

## 14.3 Canonical

每页 canonical 指向正式 URL：

```txt
https://postcraft.work/
https://postcraft.work/linkedin-post-formatter
https://postcraft.work/linkedin-post-preview
https://postcraft.work/linkedin-post-character-limit
https://postcraft.work/how-to-bold-text-in-linkedin-post
https://postcraft.work/linkedin-post-inspector
```

## 14.4 FAQ Schema

可添加 FAQ schema，但必须只包含页面真实展示的 FAQ。

## 14.5 Sitemap

更新 sitemap，包含全部页面。

---

# 15. Codex 执行任务拆分

## Task 01：重构页面架构

目标：

* 移除所有页面共用同一首屏 workspace 的问题。
* 每个页面引入独立 tool component。
* 保留共享 utils。

验收：

* 5 个功能页首屏明显不同。
* build 成功。
* git commit + push。

## Task 02：实现 FormatterTool

目标：

* 完整实现 Formatter 页面。
* 实现 safe format、advanced format、change summary、copy。

验收：

* Format 后文本真实变化。
* change summary 可见。
* preview 辅助显示。
* mobile 可用。
* zai-mcp-server 审核。
* build 成功。
* git commit + push。

## Task 03：实现 UnicodeBoldTool

目标：

* 完整实现 Bold Text 页面。
* 6 种 Unicode 样式。
* selection replacement。
* keyboard shortcuts。
* restore plain text。

验收：

* 首屏不再是通用 post workspace。
* 输出可复制。
* accessibility note 可见。
* zai-mcp-server 审核。
* build 成功。
* git commit + push。

## Task 04：实现 CharacterLimitTool

目标：

* 实现 limit dashboard。
* 实现 post/article/profile/ad 字段分组。
* 实现配置化 limits。
* 实现 progress bar、over limit、remaining。

验收：

* post 3000 chars 可检查。
* article body 125000 可检查。
* 其他字段有 sourceType。
* 不乱写无来源 official。
* zai-mcp-server 审核。
* build 成功。
* git commit + push。

## Task 05：实现 InspectorTool

目标：

* 实现 publishing readiness score。
* 实现 hook、paragraph、CTA、hashtag、link、readability、emoji、length 检查。
* 实现 priority fix list。

验收：

* 至少 10 条规则。
* good/warning/fix 分类。
* readability 可用。
* 不声称 AI。
* zai-mcp-server 审核。
* build 成功。
* git commit + push。

## Task 06：实现 PreviewTool

目标：

* 实现 mobile feed preview。
* 实现 collapsed/expanded。
* 实现 see more hint。
* 实现 link preview mock。
* 实现 OG fetch API。
* 实现 image preview。
* 实现 preview light/dark。

验收：

* Preview 是页面主角。
* link preview fallback 可用。
* image preview 不上传服务器。
* dark/light 可切换。
* 不山寨 LinkedIn。
* zai-mcp-server 审核。
* build 成功。
* git commit + push。

## Task 07：首页专业化

目标：

* 首页改为 tool hub + quick start。
* 5 个工具卡片。
* Quick Start mini workspace。
* SEO 内容和 FAQ。

验收：

* 首页不是纯目录页。
* 首页不是某个功能页复制。
* 工具卡片跳转正确。
* mobile 可用。
* zai-mcp-server 审核。
* build 成功。
* git commit + push。

## Task 08：SEO 和内容完善

目标：

* 每页补 How to use、Tips、FAQ、Related tools。
* 更新 title/description/canonical。
* 更新 sitemap/robots。

验收：

* 每页内容不同。
* FAQ 不重复堆砌。
* 内链正确。
* build 成功。
* git commit + push。

## Task 09：全站 QA 和部署

目标：

* 完成全站 QA。
* 使用 zai-mcp-server 进行最终视觉审核。
* 部署 Cloudflare Pages。

命令：

```bash
pnpm build
pnpm generate
pnpm wrangler pages deploy dist --project-name postcraft-work
```

验收：

* 线上所有页面可访问。
* sitemap 可访问。
* robots 可访问。
* mobile 正常。
* git commit + push。

---

# 16. 总体验收标准

本次改造完成后必须满足：

## 16.1 功能差异

* 首页是工具入口 + quick start。
* Formatter 页面真的能格式化。
* Preview 页面真的能预览 feed。
* Character Limit 页面真的能检查限制。
* Bold Text 页面真的能转换 Unicode 样式。
* Inspector 页面真的能诊断结构。

## 16.2 视觉差异

用户打开 5 个页面，必须一眼看出当前页面是哪一个工具。

不能再出现：

```txt
只是 H1 不同，工具主体一样
```

## 16.3 专业度

* 页面高级、克制、可信。
* 不像廉价工具站。
* 不像后台系统。
* 不像 LinkedIn 山寨站。
* 交互完整。
* 移动端体验完整。

## 16.4 构建部署

* `pnpm build` 成功。
* `pnpm generate` 成功。
* Cloudflare Pages 部署成功。
* git commit + push 完成。

---

# 17. 最终上线检查清单

```txt
[ ] 首页首屏专业清晰
[ ] 5 个工具卡片跳转正确
[ ] Formatter 格式化真实可用
[ ] Formatter change summary 可用
[ ] Preview collapsed / expanded 可用
[ ] Preview link mock 可用
[ ] Preview OG fetch fallback 可用
[ ] Preview image upload local preview 可用
[ ] Character Limit progress bars 可用
[ ] Character Limit sourceType 显示合理
[ ] Bold Text 6 种样式可用
[ ] Bold Text selection replacement 可用
[ ] Bold Text restore plain text 可用
[ ] Inspector score 可用
[ ] Inspector priority fixes 可用
[ ] Readability score 可用
[ ] Copy buttons 全部可用
[ ] Privacy note 可见
[ ] Independent disclaimer 可见
[ ] 所有页面 title/description/canonical 正确
[ ] sitemap 更新
[ ] robots 正确
[ ] mobile 无横向滚动
[ ] zai-mcp-server 视觉审核完成
[ ] pnpm build 成功
[ ] pnpm generate 成功
[ ] Cloudflare 部署成功
[ ] git commit + push 完成
```

