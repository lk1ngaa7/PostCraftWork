export type LinkedInLimitSourceType = 'official' | 'needs-verification' | 'community-observed'

export interface LinkedInLimit {
  id: string
  group: 'post' | 'article' | 'profile' | 'ads'
  label: string
  max: number
  unit: 'characters'
  sourceType: LinkedInLimitSourceType
  sourceUrl?: string
  lastVerified?: string
  notes?: string
}

const officialPublishingHelpUrl = 'https://www.linkedin.com/help/linkedin/answer/a522483'

export const linkedinLimits: LinkedInLimit[] = [
  {
    id: 'post-body',
    group: 'post',
    label: 'Post body',
    max: 3000,
    unit: 'characters',
    sourceType: 'official',
    sourceUrl: officialPublishingHelpUrl,
    lastVerified: '2026-06-03',
    notes: 'LinkedIn Help describes the post character limit as 3,000 characters.'
  },
  {
    id: 'article-title',
    group: 'article',
    label: 'Article title',
    max: 100,
    unit: 'characters',
    sourceType: 'needs-verification',
    notes: 'Commonly cited by third-party limit guides; verify in the current LinkedIn article editor before relying on it.'
  },
  {
    id: 'article-subtitle',
    group: 'article',
    label: 'Article subtitle / description',
    max: 250,
    unit: 'characters',
    sourceType: 'needs-verification',
    notes: 'Use as a draft planning check only; LinkedIn may change article field limits.'
  },
  {
    id: 'article-body',
    group: 'article',
    label: 'Article body',
    max: 125000,
    unit: 'characters',
    sourceType: 'official',
    sourceUrl: officialPublishingHelpUrl,
    lastVerified: '2026-06-03',
    notes: 'LinkedIn Help describes articles as limited to 125,000 characters.'
  },
  {
    id: 'profile-first-name',
    group: 'profile',
    label: 'Profile first name',
    max: 20,
    unit: 'characters',
    sourceType: 'community-observed',
    notes: 'Observed in community references; verify in profile editing before relying on this value.'
  },
  {
    id: 'profile-last-name',
    group: 'profile',
    label: 'Profile last name',
    max: 40,
    unit: 'characters',
    sourceType: 'community-observed',
    notes: 'Observed in community references; verify in profile editing before relying on this value.'
  },
  {
    id: 'profile-headline',
    group: 'profile',
    label: 'Profile headline',
    max: 220,
    unit: 'characters',
    sourceType: 'community-observed',
    notes: 'Commonly observed profile headline limit; verify in the current LinkedIn profile editor.'
  },
  {
    id: 'profile-about',
    group: 'profile',
    label: 'About / Summary',
    max: 2600,
    unit: 'characters',
    sourceType: 'community-observed',
    notes: 'Commonly observed profile about limit; verify in the current LinkedIn profile editor.'
  },
  {
    id: 'profile-url',
    group: 'profile',
    label: 'Custom profile URL',
    max: 100,
    unit: 'characters',
    sourceType: 'needs-verification',
    notes: 'Planning value only. LinkedIn URL rules can include allowed-character constraints beyond length.'
  },
  {
    id: 'ad-intro',
    group: 'ads',
    label: 'Ad intro text',
    max: 150,
    unit: 'characters',
    sourceType: 'needs-verification',
    notes: 'Advertising specs can change by format and placement; verify in Campaign Manager.'
  },
  {
    id: 'ad-headline',
    group: 'ads',
    label: 'Ad headline',
    max: 70,
    unit: 'characters',
    sourceType: 'needs-verification',
    notes: 'Advertising specs can change by format and placement; verify in Campaign Manager.'
  },
  {
    id: 'ad-description',
    group: 'ads',
    label: 'Ad description',
    max: 100,
    unit: 'characters',
    sourceType: 'needs-verification',
    notes: 'Advertising specs can change by format and placement; verify in Campaign Manager.'
  },
  {
    id: 'page-post-intro',
    group: 'ads',
    label: 'Page post intro text',
    max: 3000,
    unit: 'characters',
    sourceType: 'needs-verification',
    notes: 'Use as a planning value only; page and ad surfaces may behave differently.'
  }
]

export const linkedinLimitGroups = [
  { id: 'post', label: 'Post' },
  { id: 'article', label: 'Article' },
  { id: 'profile', label: 'Profile' },
  { id: 'ads', label: 'Ads / Page' }
] as const

export function getLinkedInLimit(id: string) {
  return linkedinLimits.find((limit) => limit.id === id)
}
