<template>
  <main>
    <PostWorkspace
      mode="format"
      title="Free LinkedIn Post Tools"
      subtitle="Format, preview, inspect, and polish your LinkedIn posts before publishing."
    />
    <SeoContent
      heading="What you can do with PostCraft"
      intro="PostCraft.work keeps the publishing workflow focused: write, format, preview, inspect, and copy your post without signing in."
      :sections="sections"
      :faq="faq"
      :related-tools="relatedTools"
    />
  </main>
</template>

<script setup lang="ts">
import { defaultFaq, relatedToolsFor } from '~/utils/pageContent'

useSeoMetaConfig({
  title: 'PostCraft.work - Free LinkedIn Post Tools',
  description: 'Format, preview, inspect, and polish your LinkedIn posts before publishing. Free browser-based LinkedIn post tools with no sign-up required.',
  path: '/'
})

const sections = [
  { title: 'Format before publishing', body: 'Clean extra spacing, preserve paragraph breaks, and prepare text that is easy to copy.' },
  { title: 'Preview the first screen', body: 'Use the feed-style preview to check whether the opening lines are readable before you post.' },
  { title: 'Inspect structure', body: 'Review hook length, paragraph density, CTA presence, hashtags, links, emojis, and estimated read time.' }
]

const faq = defaultFaq
const relatedTools = relatedToolsFor('/')
</script>
