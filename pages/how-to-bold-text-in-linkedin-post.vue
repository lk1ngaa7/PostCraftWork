<template>
  <main>
    <ToolsUnicodeBoldTool />
    <SeoContent
      heading="How bold text works in LinkedIn posts"
      intro="LinkedIn posts do not provide native rich text controls for regular post copy, so this tool uses Unicode characters for short emphasis."
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
  title: 'How to Bold Text in a LinkedIn Post',
  description: 'Use a free Unicode bold text converter for LinkedIn posts. Create bold, italic, and bold italic text you can copy into your post.',
  path: '/how-to-bold-text-in-linkedin-post'
})

const sections = [
  { title: 'Unicode, not rich text', body: 'The converter replaces normal letters with Unicode styled characters. It does not add a hidden formatting layer.' },
  { title: 'Six copy-ready styles', body: 'Generate bold, italic, bold italic, sans bold, sans italic, and monospace outputs from the same plain text input.' },
  { title: 'Selection replacement', body: 'Select a phrase and apply a style, or convert the full input when no text is selected.' }
]

const howToSteps = [
  { title: 'Type a short phrase', body: 'Use a hook, label, name, keyword, or short phrase rather than a full paragraph.' },
  { title: 'Pick a Unicode style', body: 'Choose bold, italic, bold italic, sans, or monospace depending on the emphasis you need.' },
  { title: 'Copy the styled output', body: 'Paste the converted Unicode text into your LinkedIn post draft like normal text.' },
  { title: 'Check readability', body: 'Preview the post and avoid styling long blocks that may be harder to read or announce.' }
]

const tips = [
  'Use styled text for headings, short labels, or a single important phrase.',
  'Avoid converting an entire post because Unicode styling can be harder for assistive technologies.',
  'Numbers and unsupported characters may remain unchanged depending on the selected Unicode style.',
  'Use Restore plain text when you want to remove Unicode styling from a draft fragment.'
]

const faq = [
  { question: 'Can I make text bold in a LinkedIn post?', answer: 'LinkedIn regular post text does not provide native bold formatting controls. Unicode styled characters can imitate bold text.' },
  { question: 'Is Unicode bold the same as rich text?', answer: 'No. It is a different set of text characters, not a formatting layer.' },
  { question: 'Can I convert selected text only?', answer: 'Yes. Select a phrase in the input and apply a style. If nothing is selected, the tool converts the full input.' },
  { question: 'Can I turn Unicode text back into plain text?', answer: 'Yes. Use the restore plain text action to convert supported styled Unicode characters back to regular characters.' },
  { question: 'Should I bold an entire LinkedIn post?', answer: 'No. Use Unicode styling sparingly so the post remains readable and accessible.' },
  ...defaultFaq
]
const relatedTools = relatedToolsFor('/how-to-bold-text-in-linkedin-post')
</script>
