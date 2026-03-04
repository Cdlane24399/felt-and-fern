import { createTask, listTasks } from './task-store'
import type { AutomationTask } from './types'

interface SeedTaskInput {
  readonly type: AutomationTask['type']
  readonly title: string
  readonly description: string
  readonly phase: AutomationTask['phase']
  readonly reasonHumanRequired?: string
  readonly suggestedAction?: string
}

const SEED_TASKS: readonly SeedTaskInput[] = [
  // AI Autonomous tasks
  {
    type: 'ai_autonomous',
    title: 'Generate brand color palette documentation',
    description:
      'Create comprehensive color palette guide with hex codes, usage guidelines, and accessibility contrast ratios for the PURRFECT brand.',
    phase: 'foundation',
  },
  {
    type: 'ai_autonomous',
    title: 'Write 10 SEO blog post outlines',
    description:
      'Research high-volume, low-competition keywords in the cat products space and create detailed outlines for 10 blog posts.',
    phase: 'foundation',
  },
  {
    type: 'ai_autonomous',
    title: 'Create 30 social media post drafts',
    description:
      'Generate 30 days of social media content for Instagram and TikTok, including captions, hashtags, and visual direction.',
    phase: 'foundation',
  },
  {
    type: 'ai_autonomous',
    title: 'Draft email welcome sequence (5 emails)',
    description:
      'Write a 5-email welcome sequence for new subscribers including brand story, product highlights, and first-purchase incentive.',
    phase: 'foundation',
  },
  {
    type: 'ai_autonomous',
    title: 'Research competitor pricing (top 5 cat product brands)',
    description:
      'Analyze pricing strategies, product ranges, and positioning of the top 5 premium cat product brands.',
    phase: 'foundation',
  },
  {
    type: 'ai_autonomous',
    title: 'Generate product photography shot list',
    description:
      'Create detailed shot list for all products including angles, lighting, props, and lifestyle context.',
    phase: 'foundation',
  },

  // AI Draft tasks (needs review)
  {
    type: 'ai_draft',
    title: 'Tech pack: Collapsible Cat Tunnel',
    description:
      'Generate technical specifications, materials list, dimensions, and manufacturing notes for the Collapsible Cat Tunnel.',
    phase: 'sourcing',
  },
  {
    type: 'ai_draft',
    title: 'Tech pack: Knitted Mouse Toy',
    description:
      'Generate technical specifications including yarn type, filling material, safety features, and size variants for the Knitted Mouse Toy.',
    phase: 'sourcing',
  },
  {
    type: 'ai_draft',
    title: 'Tech pack: Wave Cat Scratcher',
    description:
      'Generate technical specifications for the Wave Cat Scratcher including corrugated cardboard density, dimensions, and weight.',
    phase: 'sourcing',
  },
  {
    type: 'ai_draft',
    title: 'Tech pack: Organic Catnip Pouch',
    description:
      'Generate specifications for the Organic Catnip Pouch including sourcing requirements, packaging, and freshness standards.',
    phase: 'sourcing',
  },
  {
    type: 'ai_draft',
    title: 'Supplier outreach template for Alibaba',
    description:
      'Draft professional supplier outreach template for contacting manufacturers on Alibaba, including MOQ questions and quality requirements.',
    phase: 'sourcing',
  },

  // Human Required tasks
  {
    type: 'human_required',
    title: 'Register LLC and get EIN',
    description:
      'Register the PURRFECT business entity as an LLC and obtain an Employer Identification Number from the IRS.',
    phase: 'foundation',
    reasonHumanRequired:
      'Legal registration requires human identity verification and signatures.',
    suggestedAction:
      'Visit your state\'s Secretary of State website to file LLC articles of organization, then apply for EIN at irs.gov.',
  },
  {
    type: 'human_required',
    title: 'File trademark application for PURRFECT',
    description:
      'File a trademark application with the USPTO for the PURRFECT brand name and logo.',
    phase: 'foundation',
    reasonHumanRequired:
      'Trademark filing requires legal declarations and payment.',
    suggestedAction:
      'Search USPTO database for conflicts, then file through TEAS Plus ($250) at uspto.gov.',
  },
  {
    type: 'human_required',
    title: 'Get product liability insurance quotes',
    description:
      'Obtain product liability insurance quotes from at least 3 providers for pet products.',
    phase: 'foundation',
    reasonHumanRequired:
      'Insurance applications require business details and human authorization.',
    suggestedAction:
      'Contact Hiscox, Next Insurance, and Hartford for product liability quotes. Budget $500-$1500/year.',
  },
  {
    type: 'human_required',
    title: 'Set up Stripe account',
    description:
      'Create and verify a Stripe account for payment processing on the PURRFECT store.',
    phase: 'foundation',
    reasonHumanRequired:
      'Payment processor setup requires identity verification and bank account linking.',
    suggestedAction:
      'Sign up at stripe.com, complete identity verification, and link your business bank account.',
  },
  {
    type: 'human_required',
    title: 'Choose and configure custom domain',
    description:
      'Select and purchase a custom domain for the PURRFECT store, then configure DNS.',
    phase: 'foundation',
    reasonHumanRequired:
      'Domain purchase requires payment and DNS configuration decisions.',
    suggestedAction:
      'Check availability of purrfect.com, getpurrfect.com, purrfectpets.com. Purchase through Vercel Domains or Namecheap.',
  },
]

export function seedTasks(): readonly AutomationTask[] {
  const existing = listTasks()
  if (existing.length > 0) {
    return existing
  }

  const created: AutomationTask[] = []
  for (const seed of SEED_TASKS) {
    const task = createTask({
      type: seed.type,
      status: 'queued',
      title: seed.title,
      description: seed.description,
      phase: seed.phase,
      reasonHumanRequired: seed.reasonHumanRequired,
      suggestedAction: seed.suggestedAction,
    })
    created.push(task)
  }

  return created
}

export function getSeedTaskCount(): number {
  return SEED_TASKS.length
}
