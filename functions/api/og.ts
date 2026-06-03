interface PagesContext {
  request: Request
}

interface OgPayload {
  title: string
  description: string
  image: string
  canonical: string
  domain: string
}

const maxHtmlLength = 200_000
const timeoutMs = 3500

export async function onRequestGet({ request }: PagesContext) {
  const requestUrl = new URL(request.url)
  const rawUrl = requestUrl.searchParams.get('url') || ''
  const parsed = parsePublicUrl(rawUrl)

  if (parsed.error || !parsed.url) {
    return json({ error: parsed.error || 'Invalid URL.' }, 400)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(parsed.url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml'
      }
    })

    if (!response.ok) {
      return json({ error: 'We could not fetch a link preview.' }, 502)
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html')) {
      return json({
        title: parsed.url.hostname.replace(/^www\./, ''),
        description: '',
        image: '',
        canonical: parsed.url.toString(),
        domain: parsed.url.hostname.replace(/^www\./, '')
      } satisfies OgPayload)
    }

    const html = (await response.text()).slice(0, maxHtmlLength)
    const payload = extractOgPayload(html, parsed.url)
    return json(payload)
  } catch {
    return json({ error: 'We could not fetch a link preview.' }, 504)
  } finally {
    clearTimeout(timeout)
  }
}

function parsePublicUrl(rawUrl: string): { url?: URL, error?: string } {
  if (!rawUrl) return { error: 'Missing URL.' }

  try {
    const url = new URL(rawUrl)
    const hostname = url.hostname.toLowerCase()

    if (!['http:', 'https:'].includes(url.protocol)) return { error: 'Only public HTTP or HTTPS URLs are supported.' }
    if (hostname === 'localhost' || hostname.endsWith('.localhost')) return { error: 'Local URLs are not supported.' }
    if (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) return { error: 'LinkedIn private pages are not fetched.' }
    if (isPrivateIp(hostname)) return { error: 'Private network URLs are not supported.' }

    return { url }
  } catch {
    return { error: 'Invalid URL.' }
  }
}

function extractOgPayload(html: string, fallbackUrl: URL): OgPayload {
  const title = getMetaContent(html, 'property', 'og:title')
    || getMetaContent(html, 'name', 'twitter:title')
    || getTitle(html)
    || fallbackUrl.hostname.replace(/^www\./, '')
  const description = getMetaContent(html, 'property', 'og:description')
    || getMetaContent(html, 'name', 'description')
    || getMetaContent(html, 'name', 'twitter:description')
    || ''
  const image = absolutizeUrl(
    getMetaContent(html, 'property', 'og:image') || getMetaContent(html, 'name', 'twitter:image') || '',
    fallbackUrl
  )
  const canonical = absolutizeUrl(getCanonical(html), fallbackUrl) || fallbackUrl.toString()

  return {
    title: decodeHtml(title),
    description: decodeHtml(description),
    image,
    canonical,
    domain: fallbackUrl.hostname.replace(/^www\./, '')
  }
}

function getMetaContent(html: string, attr: 'name' | 'property', value: string) {
  const metaPattern = new RegExp(`<meta[^>]+${attr}=[\"']${escapeRegExp(value)}[\"'][^>]*>`, 'i')
  const tag = html.match(metaPattern)?.[0] || ''
  return getAttribute(tag, 'content')
}

function getTitle(html: string) {
  return html.match(/<title[^>]*>(.*?)<\/title>/is)?.[1]?.trim() || ''
}

function getCanonical(html: string) {
  const tag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] || ''
  return getAttribute(tag, 'href')
}

function getAttribute(tag: string, attr: string) {
  const pattern = new RegExp(`${attr}=[\"']([^\"']*)[\"']`, 'i')
  return tag.match(pattern)?.[1]?.trim() || ''
}

function absolutizeUrl(value: string, baseUrl: URL) {
  if (!value) return ''
  try {
    return new URL(value, baseUrl).toString()
  } catch {
    return ''
  }
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

function isPrivateIp(hostname: string) {
  if (/^127\./.test(hostname) || /^10\./.test(hostname) || /^192\.168\./.test(hostname)) return true
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)) return true
  if (hostname === '0.0.0.0' || hostname === '::1' || hostname.startsWith('[')) return true
  return false
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
