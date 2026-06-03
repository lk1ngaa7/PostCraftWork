# GSC_AFTER_LAUNCH.md — 上线后 GSC 操作

## 1. 上线后立即检查

部署完成后访问：

```txt
https://postcraft.work/
https://postcraft.work/linkedin-post-formatter
https://postcraft.work/linkedin-post-preview
https://postcraft.work/linkedin-post-character-limit
https://postcraft.work/how-to-bold-text-in-linkedin-post
https://postcraft.work/linkedin-post-inspector
https://postcraft.work/sitemap.xml
https://postcraft.work/robots.txt
```

确认：

- 页面 200。
- 无明显渲染错误。
- sitemap 正确。
- robots 允许抓取。
- canonical 是正式域名。

## 2. Google Search Console

### 2.1 添加资源

如果还没添加：

- 添加 Domain property：`postcraft.work`
- 或 URL-prefix：`https://postcraft.work/`

### 2.2 提交 sitemap

提交：

```txt
https://postcraft.work/sitemap.xml
```

### 2.3 提交核心 URL

手动检查并请求收录：

```txt
https://postcraft.work/
https://postcraft.work/linkedin-post-formatter
https://postcraft.work/linkedin-post-preview
https://postcraft.work/linkedin-post-character-limit
https://postcraft.work/how-to-bold-text-in-linkedin-post
https://postcraft.work/linkedin-post-inspector
```

## 3. 前 7 天观察

重点看：

- 页面是否被发现。
- 页面是否被抓取。
- 页面是否 indexed。
- 有没有 Crawled - currently not indexed。
- 有没有 Duplicate without user-selected canonical。
- 有没有 Soft 404。
- 有没有 Page with redirect。

## 4. 前 14-30 天观察

重点看 Performance：

- Queries
- Pages
- Impressions
- CTR
- Average position

优先关注：

- 有 impressions 但 CTR 低的页面。
- 排名 8-20 的 query。
- 和页面主关键词高度相关的 query。
- 意外出现的长尾 query。

## 5. 根据 GSC 调整

### 5.1 有 impression 无点击

检查：

- Title 是否太普通。
- Description 是否没有工具价值。
- H1 是否与 query 匹配。
- SERP 竞争对手是否更直接。

### 5.2 排名 8-20

可以增强：

- FAQ。
- 页面 intro。
- How-to section。
- Related tools 内链。
- 工具默认状态。
- 页面速度。

### 5.3 页面未收录

检查：

- 是否有 noindex。
- canonical 是否错误。
- sitemap 是否包含。
- 页面内容是否太薄。
- 是否和其他页面重复度太高。

## 6. 后续扩展判断

只有当 P0 页面至少出现 impression 后，再考虑扩展：

```txt
/linkedin-post-templates
/linkedin-hook-generator
/linkedin-post-ideas
/new-job-announcement-linkedin-post
/linkedin-hiring-post-template
/product-launch-linkedin-post
```

不要在没有数据前一次性铺太多页面。

## 7. Bing / 其他搜索引擎

可选提交：

- Bing Webmaster Tools
- IndexNow
- Yandex Webmaster

优先级低于 GSC。

## 8. 复盘节奏

建议：

- 上线当天：检查部署和提交。
- 第 3 天：看收录。
- 第 7 天：看是否有 impression。
- 第 14 天：看 query。
- 第 30 天：决定是否扩展 P1 页面。
