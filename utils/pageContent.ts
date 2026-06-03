import type { FaqItem } from '~/components/post/FaqBlock.vue'
import type { RelatedTool } from '~/components/post/RelatedTools.vue'

export const allRelatedTools: RelatedTool[] = [
  {
    title: 'LinkedIn Post Formatter',
    description: 'Clean spacing, line breaks, bullets, and duplicate formatting before copying a draft.',
    to: '/linkedin-post-formatter'
  },
  {
    title: 'LinkedIn Post Preview',
    description: 'Review the first screen, see-more behavior, media, and link card approximation.',
    to: '/linkedin-post-preview'
  },
  {
    title: 'Character Limit Checker',
    description: 'Compare post, profile, article, and ad copy against configurable character limits.',
    to: '/linkedin-post-character-limit'
  },
  {
    title: 'Bold Text Converter',
    description: 'Create copy-ready Unicode bold, italic, sans, and monospace emphasis for short phrases.',
    to: '/how-to-bold-text-in-linkedin-post'
  },
  {
    title: 'Post Inspector',
    description: 'Check hook length, paragraph density, CTA, hashtag use, link placement, and readability.',
    to: '/linkedin-post-inspector'
  }
]

export function relatedToolsFor(path: string) {
  return allRelatedTools.filter((tool) => tool.to !== path)
}

export const defaultFaq: FaqItem[] = [
  {
    question: 'Is my post uploaded to a server?',
    answer: 'No. The core editor, formatter, preview, stats, Unicode converter, and inspector run in your browser. The preview page can optionally fetch public link metadata when you ask it to fetch an OG preview.'
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
