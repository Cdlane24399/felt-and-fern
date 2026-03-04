import { NextRequest, NextResponse } from 'next/server'
import { verifyCronAuth } from '@/lib/automation/cron-auth'
import { listTasks, sendWeeklyReport } from '@/lib/automation'
import type { CronResult, WeeklyReportMetrics } from '@/lib/automation'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authError = verifyCronAuth(request)
  if (authError) return authError

  try {
    const allTasks = listTasks()

    const completedCount = allTasks.filter(
      (t) => t.status === 'completed'
    ).length
    const pendingCount = allTasks.filter(
      (t) =>
        t.status === 'queued' ||
        t.status === 'running' ||
        t.status === 'needs_human'
    ).length
    const blockedCount = allTasks.filter(
      (t) => t.status === 'waiting' || t.type === 'human_blocked'
    ).length

    const metrics: WeeklyReportMetrics = {
      totalTasks: allTasks.length,
      completedCount,
      pendingCount,
      blockedCount,
      completionRate:
        allTasks.length > 0
          ? Math.round((completedCount / allTasks.length) * 100)
          : 0,
    }

    const emailResult = await sendWeeklyReport(allTasks, metrics)

    const result: CronResult = {
      success: emailResult.success,
      message: emailResult.success
        ? `Weekly report sent. ${metrics.completionRate}% complete.`
        : `Weekly report failed: ${emailResult.error}`,
      tasksProcessed: allTasks.length,
    }

    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, message: 'Weekly cron failed', errors: [message] },
      { status: 500 }
    )
  }
}
