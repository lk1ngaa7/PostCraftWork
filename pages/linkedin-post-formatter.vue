<template>
  <main>
    <ToolsFormatterTool />
    <SeoContent
      heading="How to format a LinkedIn post"
      intro="Use the formatter to clean spacing and line breaks while keeping your original wording intact."
      :sections="sections"
      :faq="faq"
      :related-tools="relatedTools"
    />
  </main>
</template>

<script setup lang="ts">
import { defaultFaq, relatedToolsFor } from '~/utils/pageContent'

useSeoMetaConfig({
  title: 'LinkedIn Post Formatter - Format Posts Before Publishing',
  description: 'Format your LinkedIn posts with clean spacing, readable paragraphs, bullets, and a live preview. Free, browser-based, and no sign-up required.',
  path: '/linkedin-post-formatter'
})

const sections = [
  { title: 'Clean spacing', body: 'Remove trailing spaces and collapse excessive blank lines into readable paragraph breaks.' },
  { title: 'Keep the meaning', body: 'Formatting actions do not rewrite your post or change the message you wrote.' },
  { title: 'Copy the result', body: 'Use one-click copy after formatting so the cleaned draft is ready to paste.' }
]

const faq = [
  { question: 'How do I format a LinkedIn post?', answer: 'Paste your draft, click Format post or Clean spacing, review the preview, then copy the cleaned text.' },
  { question: 'Can LinkedIn posts use bold text?', answer: 'LinkedIn posts do not provide native rich text formatting. You can use Unicode characters for short bold or italic phrases.' },
  { question: 'Why does my LinkedIn post lose formatting?', answer: 'Extra spaces, inconsistent line breaks, or pasted text from another editor can make formatting feel uneven. Clean spacing before copying.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/linkedin-post-formatter')
</script>
