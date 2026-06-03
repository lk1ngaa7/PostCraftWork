# CLOUDFLARE_DEPLOY.md — Cloudflare Pages 部署文档

## 1. 部署方式

PostCraft.work 第一版是静态工具站，推荐使用 Cloudflare Pages Direct Upload。

Nuxt 静态生成：

```bash
pnpm generate
```

默认产物目录：

```bash
dist/
```

Cloudflare Pages 部署：

```bash
pnpm wrangler pages deploy dist --project-name postcraft-work
```

## 2. 前提

用户本地已经完成：

- Wrangler CLI 登录。
- Cloudflare 授权。
- Cloudflare 权限配置。

因此 Codex 不要要求用户重新登录，不要输出登录教程。

不要执行：

```bash
wrangler login
```

除非用户明确要求。

## 3. 推荐 package.json scripts

建议添加：

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "deploy": "pnpm generate && wrangler pages deploy dist --project-name postcraft-work"
  }
}
```

如果使用 `pnpm wrangler`：

```json
{
  "scripts": {
    "deploy": "pnpm generate && pnpm wrangler pages deploy dist --project-name postcraft-work"
  }
}
```

## 4. 首次部署

执行：

```bash
pnpm install
pnpm build
pnpm generate
pnpm wrangler pages deploy dist --project-name postcraft-work
```

部署成功后，记录 Cloudflare 返回的 URL。

## 5. 后续部署

每次部署前：

```bash
git status
pnpm build
pnpm generate
```

确认无构建错误后：

```bash
pnpm wrangler pages deploy dist --project-name postcraft-work
```

部署后：

- 打开首页。
- 打开所有 P0 页面。
- 打开 `/sitemap.xml`。
- 打开 `/robots.txt`。

## 6. 自定义域名

如果 Cloudflare Pages 项目已经绑定 `postcraft.work`，确认：

- `https://postcraft.work/` 可访问。
- `https://postcraft.work/sitemap.xml` 可访问。
- canonical 已经使用 `https://postcraft.work`。

如果暂未绑定，先用 Cloudflare Pages 默认域名验证功能。

## 7. 常见问题

### 7.1 `dist/` 不存在

先执行：

```bash
pnpm generate
```

如果仍不存在，检查 Nuxt generate 配置。

### 7.2 部署到了错误项目

检查命令中的项目名：

```bash
--project-name postcraft-work
```

如果 Cloudflare 已有不同项目名，不要盲目创建新项目，先查询或询问用户。

### 7.3 构建成功但页面 404

检查：

- 页面文件是否在 `pages/` 下。
- `pnpm generate` 是否预渲染所有 routes。
- `dist/` 中是否包含对应 HTML。
- Cloudflare Pages 是否部署了正确目录。

### 7.4 sitemap 域名不对

修改 `siteUrl` 或 `public/sitemap.xml`，保证是：

```txt
https://postcraft.work
```

## 8. 部署后 Git

部署成功后，如果部署配置、sitemap、robots、文档有变化：

```bash
git status
git add .
git commit -m "chore: deploy to cloudflare pages"
git push
```

如果没有文件变化，不需要创建空 commit。
