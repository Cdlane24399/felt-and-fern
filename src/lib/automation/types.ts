export type TaskType =
  | 'ai_autonomous'
  | 'ai_draft'
  | 'human_required'
  | 'human_blocked'

export type TaskStatus =
  | 'queued'
  | 'running'
  | 'completed'
  | 'needs_human'
  | 'notified'
  | 'waiting'
  | 'archived'

export type Phase =
  | 'foundation'
  | 'sourcing'
  | 'store_build'
  | 'pre_launch'
  | 'live'

export interface AutomationTask {
  readonly id: string
  readonly type: TaskType
  readonly status: TaskStatus
  readonly title: string
  readonly description: string
  readonly reasonHumanRequired?: string
  readonly suggestedAction?: string
  readonly aiOutput?: string
  readonly phase: Phase
  readonly schedule?: string
  readonly notifiedAt?: string
  readonly completedAt?: string
  readonly createdAt: string
}

export interface DailyBriefingData {
  readonly completedTasks: readonly AutomationTask[]
  readonly reviewTasks: readonly AutomationTask[]
  readonly blockedTasks: readonly AutomationTask[]
  readonly upcomingTasks: readonly AutomationTask[]
}

export interface WeeklyReportMetrics {
  readonly totalTasks: number
  readonly completedCount: number
  readonly pendingCount: number
  readonly blockedCount: number
  readonly completionRate: number
}

export interface CronResult {
  readonly success: boolean
  readonly message: string
  readonly tasksProcessed?: number
  readonly errors?: readonly string[]
}
