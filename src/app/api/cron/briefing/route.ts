import { NextRequest, NextResponse } from 'next/server'
import { verifyCronAuth } from '@/lib/automation/cron-auth'
import {
  listTasks,
  sendDailyBriefing,
  checkEscalations,
} from '@/lib/automation'
import type { CronResult, DailyBriefingData } from '@/lib/automation'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authError = verifyCronAuth(request)
  if (authError) return authError

  try {
    const allTasks = listTasks()

    const completedTasks = allTasks.filter((t) => t.status === 'completed')
    const reviewTasks = allTasks.filter(
      (t) => t.status === 'needs_human' || t.type === 'ai_draft'
    )
    const blockedTasks = allTasks.filter(
      (t) => t.type === 'human_blocked' || t.status === 'waiting'
    )
    const upcomingTasks = allTasks.filter((t) => t.status === 'queued')

    const briefingData: DailyBriefingData = {
      completedTasks,
      reviewTasks,
      blockedTasks,
      upcomingTasks,
    }

    const emailResult = await sendDailyBriefing(briefingData)

    // Check for escalations
    const escalationResult = await checkEscalations()

    const result: CronResult = {
      success: emailResult.success,
      message: emailResult.success
        ? `Daily briefing sent. ${escalationResult.escalated} escalations.`
        : `Briefing email failed: ${emailResult.error}`,
      tasksProcessed: allTasks.length,
    }

    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, message: 'Briefing cron failed', errors: [message] },
      { status: 500 }
    )
  }
}
