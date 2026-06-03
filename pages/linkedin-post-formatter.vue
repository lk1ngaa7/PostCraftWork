<template>
  <main>
    <ToolsFormatterTool />
    <SeoContent
      heading="How to format a LinkedIn post"
      intro="Use the formatter to clean spacing and line breaks while keeping your original wording intact."
      :sections="sections"
      :how-to-steps="howToSteps"
      :tips="tips"
      :faq="faq"
      :related-tools="relatedTools"
    />
  </main>
</template>

<script setup lang="ts">
import { defaultFaq, relatedToolsFor } from '~/utils/pageContent'

useSeoMetaConfig({
  title: 'LinkedIn Post Formatter - Clean Up Spacing and Line Breaks',
  description: 'Format your LinkedIn post with clean spacing, readable paragraphs, normalized bullets, live preview, and one-click copy.',
  path: '/linkedin-post-formatter'
})

const sections = [
  { title: 'Clean messy pasted text', body: 'Remove trailing spaces, normalize line endings, collapse excessive blank lines, and keep the paragraph structure you already chose.' },
  { title: 'Normalize bullet lists', body: 'Turn mixed markdown bullets into a consistent readable bullet style without changing the words in each line.' },
  { title: 'Review before copying', body: 'Edit the formatted output, check the auxiliary preview, then copy the final draft when the spacing feels right.' }
]

const howToSteps = [
  { title: 'Paste the raw draft', body: 'Use the left editor for text from Notes, Google Docs, Notion, or another writing tool.' },
  { title: 'Choose safe formatting', body: 'Click Format post for the full safe cleanup, or run a single action such as Clean spacing or Normalize bullets.' },
  { title: 'Read the change summary', body: 'Confirm what changed. The summary is there so formatting stays transparent and reversible.' },
  { title: 'Edit and copy the output', body: 'Make any final manual edits in the formatted output box, then copy the cleaned post.' }
]

const tips = [
  'Keep one idea per short paragraph when the post is meant to be read on mobile.',
  'Use bullet lists for scannable takeaways, not for every sentence.',
  'Keep hashtags at the end unless a hashtag is part of the sentence itself.',
  'Run the preview or inspector after formatting if you are unsure about the first screen.'
]

const faq = [
  { question: 'How do I format a LinkedIn post?', answer: 'Paste your draft, click Format post or Clean spacing, review the preview, then copy the cleaned text.' },
  { question: 'Will the formatter rewrite my post?', answer: 'No. It is designed for spacing, line breaks, bullets, duplicate hashtags, and copy-ready cleanup, not content rewriting.' },
  { question: 'Can I edit the formatted result?', answer: 'Yes. The formatted output is still editable, so you can make final manual changes before copying.' },
  { question: 'Can LinkedIn posts use bold text?', answer: 'LinkedIn posts do not provide native rich text formatting. You can use Unicode characters for short bold or italic phrases.' },
  { question: 'Why does pasted post formatting look uneven?', answer: 'Text copied from another editor can contain extra spaces, inconsistent line breaks, or mixed bullet characters. Cleaning the draft before copying helps keep the post easier to scan.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/linkedin-post-formatter')
</script>
