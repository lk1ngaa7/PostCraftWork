<template>
  <main>
    <ToolsPreviewTool />
    <SeoContent
      heading="Why preview a LinkedIn post?"
      intro="Previewing helps you check the first-screen reading experience, paragraph rhythm, and whether the post feels easy to scan."
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
  title: 'LinkedIn Post Preview - Mobile Feed Preview Before Publishing',
  description: 'Preview your LinkedIn post before publishing. Check mobile layout, see-more truncation, links, images, and first-screen readability.',
  path: '/linkedin-post-preview'
})

const sections = [
  { title: 'Approximate mobile feed view', body: 'Use compact, wide, and desktop feed widths to see whether your post still feels readable across common layouts.' },
  { title: 'See-more planning', body: 'Collapsed mode estimates the first visible lines so you can decide whether the hook earns the expansion.' },
  { title: 'Link and image checks', body: 'Detect the first URL, build a mock link card, fetch public OG data when available, and preview a local image without uploading it.' }
]

const howToSteps = [
  { title: 'Paste or write the post', body: 'Add the text you plan to publish, including hashtags, mentions, emojis, and URLs.' },
  { title: 'Tune preview settings', body: 'Edit the name, headline, timestamp, theme, device width, collapsed state, link card, and optional local image.' },
  { title: 'Review the first screen', body: 'Check visible characters, visible lines, hook visibility, and whether a link appears before the main point.' },
  { title: 'Copy back to your draft', body: 'Use the preview findings to adjust spacing or opening lines in your original publishing workflow.' }
]

const tips = [
  'Treat the preview as an approximation; LinkedIn may render posts differently by app version, device, and account.',
  'Put the clearest idea before the first link so the opening does not feel like a redirect.',
  'Use image ratio controls to plan composition, but verify the final crop in LinkedIn before publishing.',
  'If a URL preview cannot be fetched, edit the mock card manually and focus on readability.'
]

const faq = [
  { question: 'Can I preview a LinkedIn post before posting?', answer: 'Yes. This page gives you a browser-based feed-style preview before you paste the post into LinkedIn.' },
  { question: 'Is this an official LinkedIn preview?', answer: 'No. It is an independent approximation for planning layout and readability.' },
  { question: 'Does the preview match LinkedIn exactly?', answer: 'No. LinkedIn can change its interface. Use this as a practical readability preview, not an official rendering.' },
  { question: 'Are uploaded preview images stored?', answer: 'No. The image preview uses a local object URL in your browser and is not uploaded by the tool.' },
  { question: 'What happens when OG fetching fails?', answer: 'The page falls back to an editable mock link card so you can still plan the post layout.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/linkedin-post-preview')
</script>
