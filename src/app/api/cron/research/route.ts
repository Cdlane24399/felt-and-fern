import { NextRequest, NextResponse } from 'next/server'
import { verifyCronAuth } from '@/lib/automation/cron-auth'
import { createTask, processQueue } from '@/lib/automation'
import type { CronResult } from '@/lib/automation'

const RESEARCH_TASKS = [
  {
    title: 'Competitor pricing scan',
    description:
      'Scan top cat product brands for pricing changes, new products, and promotional strategies.',
  },
  {
    title: 'SEO keyword opportunity research',
    description:
      'Identify new keyword opportunities in the cat products space with volume and difficulty analysis.',
  },
  {
    title: 'Supplier marketplace scan',
    description:
      'Search Alibaba and other platforms for new suppliers offering premium cat product materials.',
  },
  {
    title: 'Social media trend analysis',
    description:
      'Analyze trending cat-related content on Instagram, TikTok, and Pinterest for content inspiration.',
  },
] as const

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authError = verifyCronAuth(request)
  if (authError) return authError

  try {
    const taskTemplate =
      RESEARCH_TASKS[Math.floor(Math.random() * RESEARCH_TASKS.length)]

    if (!taskTemplate) {
      return NextResponse.json(
        { success: false, message: 'No research template found' },
        { status: 500 }
      )
    }

    const task = createTask({
      type: 'ai_autonomous',
      status: 'queued',
      title: taskTemplate.title,
      description: taskTemplate.description,
      phase: 'foundation',
      schedule: 'daily at 6pm UTC',
    })

    const queueResult = await processQueue()

    const result: CronResult = {
      success: true,
      message: `Research task created: ${task.title}`,
      tasksProcessed: queueResult.processed,
    }

    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, message: 'Research cron failed', errors: [message] },
      { status: 500 }
    )
  }
}
