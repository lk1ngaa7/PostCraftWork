# QA_CHECKLIST.md — 上线验收清单

## 1. 功能验收

### Editor

- [ ] 可以输入文本。
- [ ] 可以粘贴长文本。
- [ ] 可以清空。
- [ ] 输入后 preview 实时更新。
- [ ] 移动端输入正常。

### Formatter

- [ ] Format post 可用。
- [ ] Clean spacing 可用。
- [ ] 多余空行能清理。
- [ ] 行尾空格能清理。
- [ ] 不会改写用户内容。
- [ ] Copy post 可用。
- [ ] Copy 后有成功提示。

### Preview

- [ ] 段落展示正确。
- [ ] 空文本有 empty state。
- [ ] 长文有 see-more hint。
- [ ] 不使用 LinkedIn 官方 Logo。
- [ ] 不复制 LinkedIn 完整 UI。
- [ ] 移动端不溢出。

### Stats

- [ ] Characters 正确。
- [ ] Words 基本正确。
- [ ] Lines 正确。
- [ ] Paragraphs 正确。
- [ ] Hashtags 基本正确。
- [ ] Links 基本正确。
- [ ] Emojis 基本正确。
- [ ] Read time 合理。

### Bold Text

- [ ] Bold 转换可用。
- [ ] Italic 转换可用。
- [ ] Bold italic 转换可用。
- [ ] 不支持字符保持原样。
- [ ] Copy 可用。
- [ ] 有 Unicode / accessibility 说明。

### Inspector

- [ ] 空文本提示 fix。
- [ ] 长 hook 提示 warning。
- [ ] 长段落提示 warning。
- [ ] hashtag 太多提示 warning。
- [ ] 无 CTA 提示 warning。
- [ ] 有清晰 good/warning/fix 分类。
- [ ] 不声称 AI viral score。

## 2. 页面验收

必须可访问：

- [ ] `/`
- [ ] `/linkedin-post-formatter`
- [ ] `/linkedin-post-preview`
- [ ] `/linkedin-post-character-limit`
- [ ] `/how-to-bold-text-in-linkedin-post`
- [ ] `/linkedin-post-inspector`

每页必须：

- [ ] H1 唯一。
- [ ] title 唯一。
- [ ] description 唯一。
- [ ] canonical 正确。
- [ ] 工具在首屏。
- [ ] SEO 内容在工具下方。
- [ ] FAQ 可见。
- [ ] Related Tools 内链可用。

## 3. SEO 验收

- [ ] `robots.txt` 可访问。
- [ ] `sitemap.xml` 可访问。
- [ ] sitemap 包含 P0 页面。
- [ ] canonical 使用正式域名。
- [ ] 页面没有 noindex。
- [ ] title 不超过合理长度。
- [ ] description 不堆关键词。
- [ ] FAQ 文案和页面展示一致。
- [ ] Footer 有独立声明。

## 4. 移动端验收

视口至少检查：

- 390px 宽
- 430px 宽
- 768px 宽

检查项：

- [ ] 无横向滚动。
- [ ] textarea 可用。
- [ ] 按钮高度至少 44px。
- [ ] 按钮不挤压。
- [ ] preview 不溢出。
- [ ] stats 卡片可读。
- [ ] inspector 可读。
- [ ] header 不遮挡内容。

## 5. 可访问性验收

- [ ] textarea 有 label。
- [ ] 所有按钮有明确文本。
- [ ] focus ring 可见。
- [ ] copy 成功提示用 `aria-live`。
- [ ] 状态不只靠颜色表达。
- [ ] 图片/图标不承载唯一信息。
- [ ] Tab 顺序合理。
- [ ] 对比度足够。

## 6. 视觉验收

必须符合：

- [ ] 专业。
- [ ] 高级。
- [ ] 克制。
- [ ] 职业内容工具感。
- [ ] 不是廉价蓝白灰工具站。
- [ ] 不是广告站。
- [ ] 不是重后台。
- [ ] 不是山寨 LinkedIn。

重点检查：

- [ ] Header 精致。
- [ ] Hero 首屏清晰。
- [ ] Editor 有写作工具质感。
- [ ] Preview 像职业社交内容预览。
- [ ] Inspector 像发布前检查清单。
- [ ] SEO 内容区不臃肿。
- [ ] Related Tools 卡片有层次。

## 7. zai-mcp-server 审核

涉及视觉的任务必须完成：

- [ ] 首页 desktop 截图审核。
- [ ] 首页 mobile 截图审核。
- [ ] Formatter 页面审核。
- [ ] Preview 页面审核。
- [ ] Bold Text 页面审核。
- [ ] Inspector 页面审核。
- [ ] 根据审核结果修复。
- [ ] 修复后重新 build。

审核问题：

```txt
页面是否专业、高级、可信？
是否贴近 LinkedIn 职业内容场景？
是否不是山寨 LinkedIn？
是否不是廉价工具站？
移动端是否可用？
首屏是否直接可操作？
```

## 8. 构建验收

必须成功：

```bash
pnpm build
pnpm generate
```

如果有 lint/typecheck：

```bash
pnpm lint
pnpm typecheck
```

## 9. Cloudflare 验收

- [ ] Wrangler 已登录，不要求用户重新登录。
- [ ] `pnpm generate` 成功。
- [ ] `dist/` 存在。
- [ ] `pnpm wrangler pages deploy dist --project-name postcraft-work` 成功。
- [ ] Cloudflare 返回部署 URL。
- [ ] 线上首页可访问。
- [ ] 线上 P0 页面可访问。
- [ ] 线上 sitemap 可访问。
- [ ] 线上 robots 可访问。

## 10. Git 验收

每个任务完成后：

- [ ] `git status` 已检查。
- [ ] 已 `git add .`。
- [ ] 已 `git commit`。
- [ ] 已 `git push`。
- [ ] commit message 清晰。

禁止：

- [ ] 大量无关文件混入 commit。
- [ ] force push。
- [ ] 删除用户已有远端配置。
