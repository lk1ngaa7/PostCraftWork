import type { FaqItem } from '~/components/post/FaqBlock.vue'
import type { RelatedTool } from '~/components/post/RelatedTools.vue'

export const allRelatedTools: RelatedTool[] = [
  {
    title: 'LinkedIn Post Formatter',
    description: 'Clean spacing, paragraph breaks, and copy-ready post formatting.',
    to: '/linkedin-post-formatter'
  },
  {
    title: 'LinkedIn Post Preview',
    description: 'Check how a post reads in a professional feed-style preview.',
    to: '/linkedin-post-preview'
  },
  {
    title: 'Character Limit Checker',
    description: 'Count characters, words, hashtags, links, emojis, and reading time.',
    to: '/linkedin-post-character-limit'
  },
  {
    title: 'Bold Text Converter',
    description: 'Convert short phrases into Unicode bold, italic, or bold italic text.',
    to: '/how-to-bold-text-in-linkedin-post'
  },
  {
    title: 'Post Inspector',
    description: 'Review hook length, spacing, CTA, hashtags, links, and readability.',
    to: '/linkedin-post-inspector'
  }
]

export function relatedToolsFor(path: string) {
  return allRelatedTools.filter((tool) => tool.to !== path)
}

export const defaultFaq: FaqItem[] = [
  {
    question: 'Does this tool upload my LinkedIn post?',
    answer: 'No. The editor, preview, stats, formatting, and inspector run in your browser without asking for a LinkedIn account.'
  },
  {
    question: 'Is PostCraft.work affiliated with LinkedIn?',
    answer: 'No. PostCraft.work is an independent tool and is not affiliated with LinkedIn.'
  },
  {
    question: 'Can this tool publish directly to LinkedIn?',
    answer: 'No. It helps you prepare copy-ready text, but you still publish from your own LinkedIn account.'
  }
]
