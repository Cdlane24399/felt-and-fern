/**
 * Seeds the task store with initial Phase 1 tasks and sends the
 * "Automation System Online" email via Resend.
 *
 * Run with: bun run --env-file=.env.local scripts/seed-and-notify.ts
 */

import { seedTasks } from '../src/lib/automation/seed'
import { sendSystemOnlineEmail } from '../src/lib/automation/notifications'

console.log('Seeding tasks...')
const tasks = seedTasks()
console.log(`Created ${tasks.length} seed tasks.`)

console.log('\nTask breakdown:')
const byType: Record<string, number> = {}
for (const t of tasks) {
  byType[t.type] = (byType[t.type] ?? 0) + 1
}
for (const [type, count] of Object.entries(byType)) {
  console.log(`  ${type}: ${count}`)
}

console.log('\nSending system online email...')
const result = await sendSystemOnlineEmail(tasks)

if (result.success) {
  console.log('Email sent successfully!')
} else {
  console.error('Email failed:', result.error)
  process.exit(1)
}

console.log('\nDone. Automation system is live.')
