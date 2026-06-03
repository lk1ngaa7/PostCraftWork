<template>
  <main>
    <PostWorkspace
      mode="stats"
      title="LinkedIn Post Character Limit Checker"
      subtitle="Count characters, words, hashtags, links, and paragraphs in your LinkedIn post."
    />
    <SeoContent
      heading="Check your current post length"
      intro="Use live counts to understand the shape of your draft without relying on outdated assumptions about platform limits."
      :sections="sections"
      :faq="faq"
      :related-tools="relatedTools"
    />
  </main>
</template>

<script setup lang="ts">
import { defaultFaq, relatedToolsFor } from '~/utils/pageContent'

useSeoMetaConfig({
  title: 'LinkedIn Post Character Limit Checker',
  description: 'Check LinkedIn post character count, word count, hashtags, links, emojis, paragraphs, and readability before publishing.',
  path: '/linkedin-post-character-limit'
})

const sections = [
  { title: 'Count more than characters', body: 'The stats panel also tracks words, paragraphs, lines, hashtags, links, emojis, and read time.' },
  { title: 'Watch readability', body: 'A shorter post can still feel dense if paragraphs are too long or links appear too early.' },
  { title: 'Avoid stale limits', body: 'Platform limits can change, so this page focuses on measuring your draft and keeping it readable.' }
]

const faq = [
  { question: 'What is the LinkedIn post character limit?', answer: 'Platform limits can change. This checker focuses on counting your current draft so you can compare it with the current LinkedIn publishing interface.' },
  { question: 'Do hashtags count as characters?', answer: 'Yes. Hashtags are part of the post text and are included in the character count.' },
  { question: 'Do links count as characters?', answer: 'Yes. URLs are included in the text and are counted as characters.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/linkedin-post-character-limit')
</script>
