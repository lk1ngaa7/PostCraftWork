<template>
  <main>
    <ToolsPreviewTool />
    <SeoContent
      heading="Why preview a LinkedIn post?"
      intro="Previewing helps you check the first-screen reading experience, paragraph rhythm, and whether the post feels easy to scan."
      :sections="sections"
      :faq="faq"
      :related-tools="relatedTools"
    />
  </main>
</template>

<script setup lang="ts">
import { defaultFaq, relatedToolsFor } from '~/utils/pageContent'

useSeoMetaConfig({
  title: 'LinkedIn Post Preview - See Your Post Before Publishing',
  description: 'Preview your LinkedIn post before publishing. Check mobile layout, opening hook, line breaks, hashtags, and see-more truncation hints.',
  path: '/linkedin-post-preview'
})

const sections = [
  { title: 'Check the opening', body: 'Look at the first lines and decide whether the hook is clear before readers expand the post.' },
  { title: 'Review line breaks', body: 'Short paragraphs usually read better in a mobile-style feed preview.' },
  { title: 'Use see-more hints', body: 'Longer drafts show a see-more hint so you can judge whether the opening section carries enough value.' }
]

const faq = [
  { question: 'Can I preview a LinkedIn post before posting?', answer: 'Yes. This page gives you a browser-based feed-style preview before you paste the post into LinkedIn.' },
  { question: 'Is this an official LinkedIn preview?', answer: 'No. It is an independent approximation for planning layout and readability.' },
  { question: 'Does the preview match LinkedIn exactly?', answer: 'No. LinkedIn can change its interface. Use this as a practical readability preview, not an official rendering.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/linkedin-post-preview')
</script>
