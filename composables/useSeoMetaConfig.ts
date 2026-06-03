const siteUrl = 'https://postcraft.work'

export function useSeoMetaConfig(config: {
  title: string
  description: string
  path: string
}) {
  const canonical = `${siteUrl}${config.path}`

  useSeoMeta({
    title: config.title,
    description: config.description,
    ogTitle: config.title,
    ogDescription: config.description,
    ogUrl: canonical,
    twitterCard: 'summary'
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonical
      }
    ]
  })
}
