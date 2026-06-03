<template>
  <main>
    <PostWorkspace
      mode="bold"
      title="How to Bold Text in a LinkedIn Post"
      subtitle="Convert short phrases into Unicode bold, italic, or bold italic text you can copy into a LinkedIn post."
    />
    <SeoContent
      heading="How bold text works in LinkedIn posts"
      intro="LinkedIn posts do not provide native rich text controls for regular post copy, so this tool uses Unicode characters for short emphasis."
      :sections="sections"
      :faq="faq"
      :related-tools="relatedTools"
    />
  </main>
</template>

<script setup lang="ts">
import { defaultFaq, relatedToolsFor } from '~/utils/pageContent'

useSeoMetaConfig({
  title: 'How to Bold Text in a LinkedIn Post',
  description: 'Learn how bold text works in LinkedIn posts and convert short phrases to Unicode bold or italic text. Free and browser-based.',
  path: '/how-to-bold-text-in-linkedin-post'
})

const sections = [
  { title: 'Convert short phrases', body: 'Use bold or italic Unicode text for a hook, section label, or a small phrase rather than a full post.' },
  { title: 'Copy Unicode text', body: 'The converted output is plain text made from Unicode characters, so you can paste it into a post draft.' },
  { title: 'Use carefully', body: 'Some devices and assistive technologies may handle Unicode styled letters differently.' }
]

const faq = [
  { question: 'Can I make text bold in a LinkedIn post?', answer: 'LinkedIn regular post text does not provide native bold formatting controls. Unicode styled characters can imitate bold text.' },
  { question: 'Is Unicode bold the same as rich text?', answer: 'No. It is a different set of text characters, not a formatting layer.' },
  { question: 'Should I bold an entire LinkedIn post?', answer: 'No. Use Unicode styling sparingly so the post remains readable and accessible.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/how-to-bold-text-in-linkedin-post')
</script>
