import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import type { AutomationTask, TaskStatus, Phase } from './types'

const TASKS_FILE = join(process.cwd(), 'data', 'tasks.json')

function ensureDataDir(): void {
  const dir = dirname(TASKS_FILE)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function loadTasks(): readonly AutomationTask[] {
  ensureDataDir()
  if (!existsSync(TASKS_FILE)) {
    writeFileSync(TASKS_FILE, JSON.stringify([], null, 2), 'utf-8')
    return []
  }
  const raw = readFileSync(TASKS_FILE, 'utf-8')
  return JSON.parse(raw) as AutomationTask[]
}

function saveTasks(tasks: readonly AutomationTask[]): void {
  ensureDataDir()
  writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf-8')
}

export function createTask(
  task: Omit<AutomationTask, 'id' | 'createdAt'>
): AutomationTask {
  const tasks = loadTasks()
  const newTask: AutomationTask = {
    ...task,
    id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  }
  saveTasks([...tasks, newTask])
  return newTask
}

export function getTask(id: string): AutomationTask | undefined {
  const tasks = loadTasks()
  return tasks.find((t) => t.id === id)
}

export function updateTask(
  id: string,
  updates: Partial<Omit<AutomationTask, 'id' | 'createdAt'>>
): AutomationTask | undefined {
  const tasks = loadTasks()
  const index = tasks.findIndex((t) => t.id === id)
  if (index === -1) return undefined

  const existing = tasks[index]
  if (!existing) return undefined

  const updated: AutomationTask = { ...existing, ...updates }
  const newTasks = tasks.map((t, i) => (i === index ? updated : t))
  saveTasks(newTasks)
  return updated
}

export function listTasks(filters?: {
  status?: TaskStatus
  phase?: Phase
  type?: AutomationTask['type']
}): readonly AutomationTask[] {
  const tasks = loadTasks()
  if (!filters) return tasks

  return tasks.filter((t) => {
    if (filters.status && t.status !== filters.status) return false
    if (filters.phase && t.phase !== filters.phase) return false
    if (filters.type && t.type !== filters.type) return false
    return true
  })
}

export function getTasksByStatus(
  status: TaskStatus
): readonly AutomationTask[] {
  return listTasks({ status })
}

export function getTasksByPhase(phase: Phase): readonly AutomationTask[] {
  return listTasks({ phase })
}

export function deleteTask(id: string): boolean {
  const tasks = loadTasks()
  const filtered = tasks.filter((t) => t.id !== id)
  if (filtered.length === tasks.length) return false
  saveTasks(filtered)
  return true
}

export function getTaskCounts(): Record<TaskStatus, number> {
  const tasks = loadTasks()
  const counts: Record<string, number> = {
    queued: 0,
    running: 0,
    completed: 0,
    needs_human: 0,
    notified: 0,
    waiting: 0,
    archived: 0,
  }
  for (const task of tasks) {
    counts[task.status] = (counts[task.status] ?? 0) + 1
  }
  return counts as Record<TaskStatus, number>
}
