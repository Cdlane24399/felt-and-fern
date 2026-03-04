import { NextResponse } from 'next/server'
import { processQueue, checkEscalations } from '@/lib/automation'

export async function POST(): Promise<NextResponse> {
  try {
    const queueResult = await processQueue()
    const escalationResult = await checkEscalations()

    return NextResponse.json({
      success: true,
      message: 'Heartbeat processed',
      queue: {
        processed: queueResult.processed,
        results: queueResult.results,
      },
      escalations: {
        escalated: escalationResult.escalated,
        tasks: escalationResult.tasks,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
