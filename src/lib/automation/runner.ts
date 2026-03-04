import { listTasks, updateTask, getTasksByStatus } from './task-store'
import { sendHumanActionRequired } from './notifications'
import type { AutomationTask } from './types'

const AI_MOCK_OUTPUTS: Record<string, string> = {
  'brand color palette': `PURRFECT Brand Color Palette:
- Primary: #1a1a2e (Deep Navy) - sophistication and trust
- Secondary: #c8a97e (Warm Gold) - premium quality
- Accent: #e8d5b7 (Cream) - warmth and comfort
- Background: #f8f5f0 (Warm White) - clean, inviting
- Text: #333333 (Charcoal) - readability
- Success: #2d6a4f (Forest Green) - natural, eco-friendly
- Warning: #f4a261 (Amber) - attention without alarm`,

  'seo blog post': `10 SEO Blog Post Outlines:
1. "The Ultimate Guide to Choosing the Right Cat Scratcher" (target: cat scratcher guide)
2. "Why Organic Catnip Makes a Difference for Your Cat" (target: organic catnip benefits)
3. "5 Signs Your Cat Needs More Mental Stimulation" (target: cat enrichment toys)
4. "Cat Tunnel vs Cat Tree: Which Does Your Cat Prefer?" (target: cat tunnel review)
5. "Sustainable Cat Products: A Complete Buyer's Guide" (target: eco-friendly cat products)
6. "How to Keep an Indoor Cat Happy and Active" (target: indoor cat toys)
7. "The Science Behind Why Cats Love Tunnels" (target: why cats like tunnels)
8. "Premium Cat Toys That Actually Last" (target: durable cat toys)
9. "From Kitten to Senior: Age-Appropriate Cat Toys" (target: cat toys by age)
10. "Why Handcrafted Cat Toys Are Worth the Investment" (target: handmade cat toys)`,

  'social media': `30 Social Media Post Drafts (Instagram/TikTok):
Week 1: Brand Introduction
1. "Meet PURRFECT - where premium meets playful"
2. Behind-the-scenes: Our design process
3. Poll: What's your cat's favorite toy type?
4. Cat fact + product teaser
5. UGC prompt: Show us your cat's happy place

Week 2: Product Teasers
6-10. Individual product reveals with lifestyle shots

Week 3: Education & Engagement
11-15. Cat care tips paired with product usage

Week 4: Community & Social Proof
16-20. Customer stories and testimonials

Week 5-6: Launch Countdown
21-30. Daily countdown posts with exclusive previews`,

  'email welcome sequence': `5-Email Welcome Sequence:

Email 1 (Immediate): "Welcome to the PURRFECT family"
- Brand story, what makes us different
- 10% first order discount code

Email 2 (Day 2): "Meet our bestsellers"
- Product highlights with lifestyle imagery
- Social proof / early reviews

Email 3 (Day 4): "The PURRFECT difference"
- Sustainability story
- Material quality deep-dive
- Behind the scenes

Email 4 (Day 7): "Your cat deserves this"
- Personalized recommendations
- Reminder of welcome discount
- Free shipping threshold callout

Email 5 (Day 14): "Don't miss out"
- Discount expiry reminder
- New arrival preview
- Community invitation`,

  'competitor pricing': `Top 5 Cat Product Brand Analysis:

1. Catit ($15-$45 range)
   - Mass market, wide distribution
   - Focus on functional design

2. Petstages ($8-$25 range)
   - Budget-friendly, value positioning
   - Dental and play categories

3. Kong Cat ($5-$20 range)
   - Brand recognition from dog products
   - Durability-focused messaging

4. Yeowww! ($8-$15 range)
   - Premium organic catnip niche
   - Strong cult following

5. Ripple Rug ($40-$60 range)
   - Premium play mat category
   - Made in USA positioning

PURRFECT Positioning: Premium tier ($20-$65), emphasizing design + sustainability`,

  'photography shot list': `Product Photography Shot List:

Per Product (6 shots each):
1. Hero shot - white background, 3/4 angle
2. Lifestyle - cat interacting with product
3. Detail - texture/material closeup
4. Scale - product with size reference
5. Flat lay - product with complementary items
6. In-use action shot

Brand Shots:
- Founder with products
- Workshop/studio behind-the-scenes
- Material sourcing story
- Packaging unboxing sequence
- Cat lifestyle mood board shots

Social Media Assets:
- Square crops for Instagram grid
- Vertical for Stories/Reels/TikTok
- Wide for website hero banners`,
}

function generateMockOutput(title: string): string {
  const lowerTitle = title.toLowerCase()
  for (const [key, output] of Object.entries(AI_MOCK_OUTPUTS)) {
    if (lowerTitle.includes(key)) {
      return output
    }
  }
  return `[AI Output Placeholder] Task "${title}" has been processed. Full implementation will generate real content using the Anthropic API.`
}

async function executeAutonomousTask(
  task: AutomationTask
): Promise<AutomationTask> {
  const aiOutput = generateMockOutput(task.title)
  const updated = updateTask(task.id, {
    status: 'completed',
    aiOutput,
    completedAt: new Date().toISOString(),
  })
  return updated ?? task
}

async function handleHumanRequiredTask(
  task: AutomationTask
): Promise<AutomationTask> {
  const result = await sendHumanActionRequired(task)
  const newStatus = result.success ? 'notified' : 'needs_human'
  const updated = updateTask(task.id, {
    status: newStatus,
    notifiedAt: result.success ? new Date().toISOString() : undefined,
  })
  return updated ?? task
}

async function handleDraftTask(
  task: AutomationTask
): Promise<AutomationTask> {
  const aiOutput = generateMockOutput(task.title)
  const updated = updateTask(task.id, {
    status: 'needs_human',
    aiOutput,
    reasonHumanRequired: 'AI draft ready for review',
    suggestedAction: 'Review the generated draft and approve or request changes',
  })

  if (updated) {
    await sendHumanActionRequired(updated)
    return updateTask(task.id, {
      status: 'notified',
      notifiedAt: new Date().toISOString(),
    }) ?? updated
  }
  return task
}

export async function processQueue(): Promise<{
  processed: number
  results: readonly { taskId: string; title: string; status: string }[]
}> {
  const queued = listTasks({ status: 'queued' })
  const results: { taskId: string; title: string; status: string }[] = []

  for (const task of queued) {
    updateTask(task.id, { status: 'running' })

    try {
      let result: AutomationTask

      switch (task.type) {
        case 'ai_autonomous':
          result = await executeAutonomousTask(task)
          break
        case 'ai_draft':
          result = await handleDraftTask(task)
          break
        case 'human_required':
        case 'human_blocked':
          result = await handleHumanRequiredTask(task)
          break
        default:
          result = task
      }

      results.push({
        taskId: result.id,
        title: result.title,
        status: result.status,
      })
    } catch (error) {
      updateTask(task.id, { status: 'queued' })
      const message = error instanceof Error ? error.message : String(error)
      results.push({
        taskId: task.id,
        title: task.title,
        status: `error: ${message}`,
      })
    }
  }

  return { processed: results.length, results }
}

export async function checkEscalations(): Promise<{
  escalated: number
  tasks: readonly string[]
}> {
  const notified = getTasksByStatus('notified')
  const escalatedIds: string[] = []
  const fortyEightHoursAgo = Date.now() - 48 * 60 * 60 * 1000

  for (const task of notified) {
    if (!task.notifiedAt) continue
    const notifiedTime = new Date(task.notifiedAt).getTime()

    if (notifiedTime < fortyEightHoursAgo) {
      await sendHumanActionRequired({
        ...task,
        title: `[ESCALATION] ${task.title}`,
        description: `This task was first flagged ${Math.round((Date.now() - notifiedTime) / (1000 * 60 * 60))} hours ago and still needs attention. ${task.description}`,
      })
      updateTask(task.id, { notifiedAt: new Date().toISOString() })
      escalatedIds.push(task.id)
    }
  }

  return { escalated: escalatedIds.length, tasks: escalatedIds }
}
