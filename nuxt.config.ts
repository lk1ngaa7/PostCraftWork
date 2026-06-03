export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'PostCraft.work - Free LinkedIn Post Tools',
      meta: [
        {
          name: 'description',
          content:
            'Format, preview, inspect, and polish your LinkedIn posts before publishing. Free browser-based LinkedIn post tools with no sign-up required.'
        }
      ]
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },
  compatibilityDate: '2026-06-03'
})
