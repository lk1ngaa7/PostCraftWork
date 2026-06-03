<template>
  <main>
    <PostWorkspace
      mode="inspector"
      title="LinkedIn Post Inspector"
      subtitle="Check your LinkedIn post structure for hook length, paragraph spacing, CTA, hashtags, links, and readability."
    />
    <SeoContent
      heading="Inspect structure before publishing"
      intro="The inspector checks structural signals that affect readability. It does not pretend to score creativity or topic quality."
      :sections="sections"
      :faq="faq"
      :related-tools="relatedTools"
    />
  </main>
</template>

<script setup lang="ts">
import { defaultFaq, relatedToolsFor } from '~/utils/pageContent'

useSeoMetaConfig({
  title: 'LinkedIn Post Inspector',
  description: 'Inspect your LinkedIn post for hook length, paragraph spacing, CTA, hashtags, links, emojis, and mobile readability before publishing.',
  path: '/linkedin-post-inspector'
})

const sections = [
  { title: 'Hook and first paragraph', body: 'Check whether the opening line and first paragraph are short enough to scan.' },
  { title: 'CTA and hashtags', body: 'See whether the draft includes a reader prompt and avoids an overloaded hashtag block.' },
  { title: 'Readable mobile structure', body: 'Warnings focus on long blocks, early links, emoji runs, and very long posts.' }
]

const faq = [
  { question: 'Does the inspector judge content quality?', answer: 'No. It checks structure and readability signals only. It is not an AI quality score.' },
  { question: 'What does the score mean?', answer: 'The score reflects basic structural checks such as hook length, spacing, CTA, hashtags, links, and long paragraphs.' },
  { question: 'Can I use this for any LinkedIn post?', answer: 'Yes. It works best for text posts where you want a clearer opening and cleaner paragraph structure.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/linkedin-post-inspector')
</script>
