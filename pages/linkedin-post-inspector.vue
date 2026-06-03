<template>
  <main>
    <ToolsInspectorTool />
    <SeoContent
      heading="Inspect structure before publishing"
      intro="The inspector checks structural signals that affect readability. It does not pretend to score creativity or topic quality."
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
  title: 'LinkedIn Post Inspector - Check Readability Before Publishing',
  description: 'Inspect your LinkedIn post for hook length, paragraph density, hashtags, links, CTA, and readability before publishing.',
  path: '/linkedin-post-inspector'
})

const sections = [
  { title: 'Structure checks', body: 'Review hook length, first paragraph density, line breaks, long paragraphs, post length, and empty draft states.' },
  { title: 'Publishing signals', body: 'Check whether the post includes a clear CTA, keeps hashtags controlled, avoids early links, and limits emoji runs.' },
  { title: 'Readability context', body: 'Use approximate readability metrics for English posts and structural spacing checks for any language.' }
]

const howToSteps = [
  { title: 'Paste the draft', body: 'Add the post text you want to review. The inspector runs locally as you type.' },
  { title: 'Read the readiness score', body: 'Use the score as a structural checklist, not as an AI quality or engagement prediction.' },
  { title: 'Fix priority items first', body: 'Start with empty text, missing CTA, dense opening sections, early links, or very long paragraphs.' },
  { title: 'Review warnings and good checks', body: 'Use the warning and good panels to decide what to keep and what to adjust before copying the post.' }
]

const tips = [
  'A strong opening usually fits into one short line or one compact paragraph.',
  'Move links lower in the post when the opening still needs to establish context.',
  'Keep hashtags useful and limited; a long hashtag block can make a post feel less polished.',
  'Use the preview tool after inspection if you want to judge the collapsed first screen visually.'
]

const faq = [
  { question: 'Does the inspector judge content quality?', answer: 'No. It checks structure and readability signals only. It is not an AI quality score.' },
  { question: 'What does the score mean?', answer: 'The score reflects basic structural checks such as hook length, spacing, CTA, hashtags, links, and long paragraphs.' },
  { question: 'What should I fix first?', answer: 'Start with fix items, especially empty content, missing line breaks, very dense opening sections, links before the hook, and missing CTA.' },
  { question: 'Does the inspector predict engagement?', answer: 'No. It does not estimate reach, virality, or engagement. It only highlights structural publishing checks.' },
  { question: 'Can I use this for any LinkedIn post?', answer: 'Yes. It works best for text posts where you want a clearer opening and cleaner paragraph structure.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/linkedin-post-inspector')
</script>
