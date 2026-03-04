import { NextRequest, NextResponse } from 'next/server'
import { verifyCronAuth } from '@/lib/automation/cron-auth'
import { createTask, processQueue } from '@/lib/automation'
import type { CronResult } from '@/lib/automation'

const CONTENT_TASKS = [
  {
    title: 'Generate social media posts batch',
    description:
      'Create a batch of social media posts for Instagram and TikTok featuring PURRFECT products with engaging captions and hashtag strategies.',
  },
  {
    title: 'Draft blog post content',
    description:
      'Write a draft blog post about cat care, product guides, or brand stories for the PURRFECT blog.',
  },
  {
    title: 'Generate product copy variants',
    description:
      'Create A/B test variants of product descriptions optimized for conversion and SEO.',
  },
] as const

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authError = verifyCronAuth(request)
  if (authError) return authError

  try {
    // Pick a random content task type
    const taskTemplate =
      CONTENT_TASKS[Math.floor(Math.random() * CONTENT_TASKS.length)]

    if (!taskTemplate) {
      return NextResponse.json(
        { success: false, message: 'No task template found' },
        { status: 500 }
      )
    }

    const task = createTask({
      type: 'ai_autonomous',
      status: 'queued',
      title: taskTemplate.title,
      description: taskTemplate.description,
      phase: 'foundation',
      schedule: 'every 6 hours',
    })

    // Process the queue to handle the new task
    const queueResult = await processQueue()

    const result: CronResult = {
      success: true,
      message: `Content task created and processed: ${task.title}`,
      tasksProcessed: queueResult.processed,
    }

    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, message: 'Content cron failed', errors: [message] },
      { status: 500 }
    )
  }
}
