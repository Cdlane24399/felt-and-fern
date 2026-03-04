import { NextRequest, NextResponse } from 'next/server'
import {
  listTasks,
  createTask,
  updateTask,
  getTask,
} from '@/lib/automation'
import type { TaskStatus, Phase, TaskType } from '@/lib/automation'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as TaskStatus | null
    const phase = searchParams.get('phase') as Phase | null
    const type = searchParams.get('type') as TaskType | null

    const filters: {
      status?: TaskStatus
      phase?: Phase
      type?: TaskType
    } = {}

    if (status) filters.status = status
    if (phase) filters.phase = phase
    if (type) filters.type = type

    const tasks =
      Object.keys(filters).length > 0 ? listTasks(filters) : listTasks()

    return NextResponse.json({
      success: true,
      tasks,
      count: tasks.length,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as {
      type?: TaskType
      title?: string
      description?: string
      phase?: Phase
      reasonHumanRequired?: string
      suggestedAction?: string
    }

    if (!body.type || !body.title || !body.description || !body.phase) {
      return NextResponse.json(
        {
          success: false,
          error: 'Required fields: type, title, description, phase',
        },
        { status: 400 }
      )
    }

    const task = createTask({
      type: body.type,
      status: 'queued',
      title: body.title,
      description: body.description,
      phase: body.phase,
      reasonHumanRequired: body.reasonHumanRequired,
      suggestedAction: body.suggestedAction,
    })

    return NextResponse.json({ success: true, task }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as {
      id?: string
      status?: TaskStatus
      aiOutput?: string
      reasonHumanRequired?: string
      suggestedAction?: string
    }

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Task ID is required' },
        { status: 400 }
      )
    }

    const existing = getTask(body.id)
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      )
    }

    const updates: Record<string, unknown> = {}
    if (body.status) updates.status = body.status
    if (body.aiOutput) updates.aiOutput = body.aiOutput
    if (body.reasonHumanRequired)
      updates.reasonHumanRequired = body.reasonHumanRequired
    if (body.suggestedAction) updates.suggestedAction = body.suggestedAction
    if (body.status === 'completed')
      updates.completedAt = new Date().toISOString()

    const updated = updateTask(body.id, updates)

    return NextResponse.json({ success: true, task: updated })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
