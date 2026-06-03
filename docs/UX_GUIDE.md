# UX_GUIDE.md — PostCraft.work UI/UX 指导

## 1. 设计目标

PostCraft.work 的视觉目标不是普通蓝白灰工具站，而是一个专业、克制、高级的职业内容工作台。

关键词：

```txt
professional
editorial
focused
premium
calm
creator workspace
LinkedIn-adjacent
not LinkedIn-clone
```

要让用户感觉：

- 这是给职业内容创作者用的。
- 工具干净、可信、轻快。
- 适合 LinkedIn 场景。
- 不是廉价 AI SaaS。
- 不是广告站。
- 不是后台管理系统。

## 2. 设计边界

可以贴近 LinkedIn 场景：

- 使用职业蓝作为 accent。
- 使用 feed preview 的概念。
- 使用专业身份卡片风格。
- 使用类似职场内容工具的语气。

不能做：

- 使用 LinkedIn logo。
- 完全复制 LinkedIn 页面。
- 用官方蓝 + 官方图标做山寨感。
- 让用户误以为本站是 LinkedIn 官方。

必须有声明：

> PostCraft.work is an independent tool and is not affiliated with LinkedIn.

## 3. 颜色系统

推荐色板：

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
Soft blue background: #EAF3FF
Deep navy: #0B1220
Success: #15803D
Warning: #B45309
Error: #DC2626
```

使用原则：

- 页面大背景用暖灰蓝，不要纯白到底。
- Header、工具卡片、预览卡片用白色。
- Primary CTA 用职业蓝。
- 深色只用于文字和少量强调。
- 不要到处用高饱和蓝。
- 不要大面积渐变。
- 渐变只可用于 hero 背景的极淡氛围。

## 4. 字体

使用 system font：

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

字重建议：

- H1：700
- Section title：650/700
- Body：400/450
- Button：600
- Stats number：700

## 5. 页面布局

### 桌面端首屏

推荐布局：

```txt
Header

Hero Workspace
Left column:
- H1
- subtitle
- trust note
- editor
- toolbar

Right column:
- mobile-style preview
- stats
- inspector summary
```

宽度：

- 主容器 max-width：1180px - 1240px
- 左列：55%
- 右列：45%
- Gap：24px - 32px

### 移动端

顺序：

```txt
Header
H1
Subtitle
Editor
Actions
Preview
Stats
Inspector
SEO content
FAQ
Footer
```

要求：

- 不出现横向滚动。
- textarea 和 preview 不溢出。
- 按钮高度至少 44px。
- 操作按钮可换行。
- 预览卡片宽度 100%。

## 6. Header

风格：

- 高度 64px。
- 白色半透明或纯白。
- 下边框极淡。
- Logo 简洁，使用文字 PostCraft.work。
- 导航不要太多。

导航：

```txt
Formatter
Preview
Character Limit
Bold Text
Inspector
```

移动端：

- 可以折叠菜单。
- MVP 可以只显示 Logo + 简短导航，不必做复杂 drawer。

## 7. Hero

H1：

```txt
Free LinkedIn Post Tools
```

Subtitle：

```txt
Format, preview, inspect, and polish your LinkedIn posts before publishing.
```

Trust note：

```txt
No sign-up required · Browser-based · Copy-ready formatting
```

Hero 不要大图，不要夸张插画。产品本身就是 hero。

## 8. Editor 设计

Editor 是核心，要有专业写作工具质感。

样式建议：

- 白色卡片
- 1px soft border
- 18px - 24px padding
- 16px - 20px radius
- 轻微 shadow
- 顶部有小标题：Your post
- 右上角有 stats mini info
- textarea 使用等宽字体不必，普通 sans 即可
- textarea 背景可以是 #FBFCFE
- focus 时边框变 professional blue，shadow 很轻

Placeholder 示例：

```txt
Paste your LinkedIn post here...

Start with a strong hook.
Keep paragraphs short.
Preview how it looks before publishing.
```

## 9. Toolbar 设计

按钮分组：

Primary：

- Format post
- Copy post

Secondary：

- Clean spacing
- Add bullets
- Clear

按钮风格：

- Primary button：solid professional blue。
- Secondary button：white / subtle border。
- Danger action：只用 text button，不要红色大按钮。

## 10. Preview 卡片

Preview 要像“职业社交 feed 预览”，但不要复制 LinkedIn。

结构：

```txt
Preview label
[Card]
  Avatar placeholder
  Name: Alex Morgan
  Headline: Founder · B2B Creator
  Time: Now · Public
  Post body
  See more hint
  Engagement placeholder
```

视觉：

- 卡片宽度可模拟 mobile。
- 白底。
- 边框细。
- radius 18px。
- 行高舒适。
- body 字号 14-15px。
- 段落间距适中。
- see more 用 muted blue，不要太像官方 UI。

## 11. Stats 面板

Stats 不要像后台表格，要像轻量 dashboard。

展示：

```txt
Characters
Words
Hashtags
Links
Read time
```

每项：

- 数字大一点。
- 标签小一点。
- 卡片边框轻。
- 状态颜色克制。

## 12. Inspector 面板

Inspector 像“发布前检查清单”。

结构：

```txt
Post score
Good checks
Warnings
Fix suggestions
```

状态：

- Good：green dot + text
- Warning：amber dot + text
- Fix：red dot + text

不要只靠颜色，必须有文字。

Score：

- 可以显示 0-100。
- 不要夸大为 AI quality score。
- 文案用：Publishing readiness

## 13. Bold Text 工具

设计成一个小型转换器：

```txt
Input text
Output:
- Bold
- Italic
- Bold italic
Copy buttons
Accessibility note
```

提示文案必须包含：

```txt
This uses Unicode characters to simulate bold or italic text. Use it sparingly for accessibility and readability.
```

## 14. SEO 内容区

工具下面才放 SEO 内容。

视觉：

- 不要长墙文本。
- 用短段落、小标题、列表、FAQ accordion。
- 内容宽度不要太宽，max 760px - 860px。
- Related tools 用卡片。

## 15. Footer

Footer 简洁：

- Logo
- Tools
- Guides
- Privacy / Terms placeholder
- Independent disclaimer

Footer 文案：

```txt
PostCraft.work is an independent tool and is not affiliated with LinkedIn.
```

## 16. 视觉禁区

禁止：

- 廉价大渐变 hero
- 过度阴影
- 玻璃拟态
- 大量 icon 堆砌
- 纯蓝白灰模板感
- 卡片边框太重
- 过密布局
- 文字太小
- 用 emoji 当主要视觉
- 广告位
- 假 dashboard
- 过度营销 CTA

## 17. 视觉审核要求：zai-mcp-server

任何 UI 相关改动完成后，必须用 `zai-mcp-server` 审核截图。

截图至少包括：

- 首页桌面端首屏
- 首页移动端首屏
- `/linkedin-post-formatter`
- `/linkedin-post-preview`
- `/how-to-bold-text-in-linkedin-post`

审核问题：

```txt
1. 这个页面是否看起来专业、高级、可信？
2. 是否贴近 LinkedIn 职业内容场景，但不是山寨 LinkedIn？
3. 是否仍然像廉价蓝白灰工具站？
4. 首屏是否能立刻看懂并开始使用？
5. Editor、Preview、Inspector 的主次是否清楚？
6. 移动端是否有横向溢出或拥挤？
7. 字体、间距、卡片层级是否舒服？
8. CTA 是否清晰但不过度营销？
9. 有哪些最应该立即修复的视觉问题？
```

Codex 必须根据视觉审核结果修复关键问题，再 build 和 commit。
