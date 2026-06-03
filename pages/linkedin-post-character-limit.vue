<template>
  <main>
    <ToolsCharacterLimitTool />
    <SeoContent
      heading="Check your current post length"
      intro="Use live counts to understand the shape of your draft without relying on outdated assumptions about platform limits."
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
  title: 'LinkedIn Post Character Limit Checker',
  description: 'Check LinkedIn post length, article fields, profile fields, hashtags, mentions, links, and reading time with visual limit indicators.',
  path: '/linkedin-post-character-limit'
})

const sections = [
  { title: 'Post and field limits', body: 'Switch between post, article, profile, and ad fields to compare your current text against the selected character limit.' },
  { title: 'Visual progress indicators', body: 'The dashboard shows current count, remaining characters, progress percentage, over-limit state, and source confidence.' },
  { title: 'Publishing shape metrics', body: 'Characters are only one part of the check. The page also counts words, lines, paragraphs, hashtags, links, emojis, and read time.' }
]

const howToSteps = [
  { title: 'Choose the field type', body: 'Start with Post body or select another LinkedIn field such as headline, about section, article title, or ad copy.' },
  { title: 'Paste the text to measure', body: 'The count updates as you type, including URLs, hashtags, mentions, emoji, and line breaks.' },
  { title: 'Read the source label', body: 'Official, needs-verification, and community-observed labels help separate verified limits from practical estimates.' },
  { title: 'Adjust before publishing', body: 'Use the suggestions to trim dense paragraphs, reduce hashtag clutter, or shorten copy that is near the limit.' }
]

const tips = [
  'Use the selected field label carefully; a post body limit is different from a profile headline or ad copy field.',
  'If a field is marked needs-verification, confirm the latest limit in the current LinkedIn interface before relying on it.',
  'Shorter is not always better; readability usually depends on paragraph spacing and first-screen clarity.',
  'Links, hashtags, and mentions are counted as text, so they still affect the total character count.'
]

const faq = [
  { question: 'What is the LinkedIn post character limit?', answer: 'The dashboard includes a post body limit and marks each limit by source confidence. Platform limits can change, so verify important edge cases in the current LinkedIn publishing interface.' },
  { question: 'Why do some limits say needs verification?', answer: 'Some LinkedIn field limits are easier to observe than to verify from current official documentation. Those fields are labeled so they are not presented as official facts.' },
  { question: 'Can this checker count profile and article fields?', answer: 'Yes. Use the field selector to check post, article, profile, and ad-related fields with separate progress indicators.' },
  { question: 'Do hashtags count as characters?', answer: 'Yes. Hashtags are part of the post text and are included in the character count.' },
  { question: 'Do links count as characters?', answer: 'Yes. URLs are included in the text and are counted as characters.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/linkedin-post-character-limit')
</script>
