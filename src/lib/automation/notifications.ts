import { Resend } from "resend";
import type {
  AutomationTask,
  DailyBriefingData,
  WeeklyReportMetrics,
} from "./types";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_ADDRESS = "PURRFECT AI <onboarding@resend.dev>";
const TO_ADDRESS = process.env.NOTIFICATION_EMAIL ?? "cd.lane@icloud.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function baseStyles(): string {
  return `
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f8f5f0; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
      .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #ffffff; padding: 32px; text-align: center; }
      .header h1 { margin: 0; font-size: 28px; letter-spacing: 2px; }
      .header .subtitle { color: #c8a97e; font-size: 14px; margin-top: 4px; }
      .body { padding: 32px; color: #333; line-height: 1.6; }
      .section { margin-bottom: 24px; }
      .section h2 { font-size: 18px; color: #1a1a2e; border-bottom: 2px solid #c8a97e; padding-bottom: 8px; margin-bottom: 12px; }
      .task-item { padding: 12px 16px; border-left: 4px solid #c8a97e; background: #f8f5f0; margin-bottom: 8px; border-radius: 0 8px 8px 0; }
      .task-item.completed { border-left-color: #2d6a4f; }
      .task-item.blocked { border-left-color: #e63946; }
      .task-item.review { border-left-color: #f4a261; }
      .task-title { font-weight: 600; color: #1a1a2e; }
      .task-desc { font-size: 13px; color: #666; margin-top: 4px; }
      .btn { display: inline-block; padding: 12px 24px; background: #1a1a2e; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px; }
      .btn:hover { background: #16213e; }
      .metric { display: inline-block; text-align: center; padding: 16px; min-width: 80px; }
      .metric-value { font-size: 32px; font-weight: 700; color: #1a1a2e; }
      .metric-label { font-size: 12px; color: #666; text-transform: uppercase; }
      .footer { padding: 24px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; }
      .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
      .badge-auto { background: #e8f5e9; color: #2d6a4f; }
      .badge-draft { background: #fff3e0; color: #e65100; }
      .badge-human { background: #fce4ec; color: #c62828; }
    </style>
  `;
}

function wrapEmail(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>${baseStyles()}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>PURRFECT</h1>
          <div class="subtitle">Automation System</div>
        </div>
        <div class="body">${content}</div>
        <div class="footer">
          PURRFECT Automation &bull; Powered by AI<br/>
          <a href="${SITE_URL}/admin" style="color: #c8a97e;">Admin Dashboard</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

function taskBadge(type: AutomationTask["type"]): string {
  const labels: Record<string, string> = {
    ai_autonomous: "AI Auto",
    ai_draft: "AI Draft",
    human_required: "Human",
    human_blocked: "Blocked",
  };
  const classes: Record<string, string> = {
    ai_autonomous: "badge-auto",
    ai_draft: "badge-draft",
    human_required: "badge-human",
    human_blocked: "badge-human",
  };
  return `<span class="badge ${classes[type] ?? ""}">${labels[type] ?? type}</span>`;
}

export async function sendHumanActionRequired(
  task: AutomationTask,
): Promise<{ success: boolean; error?: string }> {
  try {
    const html = wrapEmail(`
      <div class="section">
        <h2>Action Required</h2>
        <p>A task needs your attention:</p>
        <div class="task-item blocked">
          <div class="task-title">${taskBadge(task.type)} ${task.title}</div>
          <div class="task-desc">${task.description}</div>
          ${task.reasonHumanRequired ? `<div class="task-desc" style="margin-top: 8px;"><strong>Why:</strong> ${task.reasonHumanRequired}</div>` : ""}
          ${task.suggestedAction ? `<div class="task-desc"><strong>Suggested action:</strong> ${task.suggestedAction}</div>` : ""}
        </div>
        <a href="${SITE_URL}/admin" class="btn">View in Dashboard</a>
      </div>
    `);

    if (!resend)
      return { success: false, error: "RESEND_API_KEY not configured" };
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject: `[PURRFECT] Action Required: ${task.title}`,
      html,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

export async function sendDailyBriefing(
  data: DailyBriefingData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const renderTaskList = (
      tasks: readonly AutomationTask[],
      className: string,
    ): string => {
      if (tasks.length === 0) return '<p style="color: #999;">None</p>';
      return tasks
        .map(
          (t) => `
          <div class="task-item ${className}">
            <div class="task-title">${taskBadge(t.type)} ${t.title}</div>
            <div class="task-desc">${t.description}</div>
          </div>
        `,
        )
        .join("");
    };

    const html = wrapEmail(`
      <div class="section">
        <h2>Daily Briefing</h2>
        <p>Here's your PURRFECT automation summary for ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}:</p>
      </div>

      <div class="section">
        <h2>Completed (${data.completedTasks.length})</h2>
        ${renderTaskList(data.completedTasks, "completed")}
      </div>

      <div class="section">
        <h2>Needs Review (${data.reviewTasks.length})</h2>
        ${renderTaskList(data.reviewTasks, "review")}
      </div>

      <div class="section">
        <h2>Blocked (${data.blockedTasks.length})</h2>
        ${renderTaskList(data.blockedTasks, "blocked")}
      </div>

      <div class="section">
        <h2>Upcoming (${data.upcomingTasks.length})</h2>
        ${renderTaskList(data.upcomingTasks, "")}
      </div>

      <a href="${SITE_URL}/admin" class="btn">Open Dashboard</a>
    `);

    if (!resend)
      return { success: false, error: "RESEND_API_KEY not configured" };
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject: `[PURRFECT] Daily Briefing - ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
      html,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

export async function sendWeeklyReport(
  allTasks: readonly AutomationTask[],
  metrics: WeeklyReportMetrics,
): Promise<{ success: boolean; error?: string }> {
  try {
    const recentCompleted = allTasks
      .filter((t) => t.status === "completed")
      .slice(-10);

    const blocked = allTasks.filter(
      (t) => t.status === "needs_human" || t.status === "notified",
    );

    const html = wrapEmail(`
      <div class="section">
        <h2>Weekly Progress Report</h2>
        <p>Week ending ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
      </div>

      <div class="section" style="text-align: center;">
        <div class="metric">
          <div class="metric-value">${metrics.totalTasks}</div>
          <div class="metric-label">Total Tasks</div>
        </div>
        <div class="metric">
          <div class="metric-value">${metrics.completedCount}</div>
          <div class="metric-label">Completed</div>
        </div>
        <div class="metric">
          <div class="metric-value">${metrics.pendingCount}</div>
          <div class="metric-label">Pending</div>
        </div>
        <div class="metric">
          <div class="metric-value">${metrics.blockedCount}</div>
          <div class="metric-label">Blocked</div>
        </div>
      </div>

      <div class="section" style="text-align: center;">
        <div class="metric">
          <div class="metric-value">${metrics.completionRate}%</div>
          <div class="metric-label">Completion Rate</div>
        </div>
      </div>

      ${
        recentCompleted.length > 0
          ? `
        <div class="section">
          <h2>Recently Completed</h2>
          ${recentCompleted.map((t) => `<div class="task-item completed"><div class="task-title">${t.title}</div></div>`).join("")}
        </div>
      `
          : ""
      }

      ${
        blocked.length > 0
          ? `
        <div class="section">
          <h2>Needs Attention</h2>
          ${blocked.map((t) => `<div class="task-item blocked"><div class="task-title">${t.title}</div><div class="task-desc">${t.reasonHumanRequired ?? t.description}</div></div>`).join("")}
        </div>
      `
          : ""
      }

      <a href="${SITE_URL}/admin" class="btn">Open Dashboard</a>
    `);

    if (!resend)
      return { success: false, error: "RESEND_API_KEY not configured" };
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject: `[PURRFECT] Weekly Report - ${metrics.completionRate}% Complete`,
      html,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

export async function sendSystemOnlineEmail(
  seedTasks: readonly AutomationTask[],
): Promise<{ success: boolean; error?: string }> {
  try {
    const aiAutoTasks = seedTasks.filter((t) => t.type === "ai_autonomous");
    const aiDraftTasks = seedTasks.filter((t) => t.type === "ai_draft");
    const humanTasks = seedTasks.filter(
      (t) => t.type === "human_required" || t.type === "human_blocked",
    );

    const renderGroup = (
      tasks: readonly AutomationTask[],
      label: string,
      className: string,
    ): string => {
      if (tasks.length === 0) return "";
      return `
        <div class="section">
          <h2>${label} (${tasks.length})</h2>
          ${tasks.map((t) => `<div class="task-item ${className}"><div class="task-title">${t.title}</div><div class="task-desc">${t.description}</div></div>`).join("")}
        </div>
      `;
    };

    const html = wrapEmail(`
      <div class="section">
        <h2>System Online</h2>
        <p>The PURRFECT automation system is now configured and running. Here's an overview of everything that's been set up:</p>
      </div>

      ${renderGroup(aiAutoTasks, "AI Autonomous Tasks", "completed")}
      ${renderGroup(aiDraftTasks, "AI Draft Tasks (Need Review)", "review")}
      ${renderGroup(humanTasks, "Human Required Tasks", "blocked")}

      <div class="section">
        <h2>Cron Schedule</h2>
        <div class="task-item">
          <div class="task-title">Content Generation</div>
          <div class="task-desc">Every 6 hours &mdash; social posts, blog drafts, product copy</div>
        </div>
        <div class="task-item">
          <div class="task-title">Daily Briefing</div>
          <div class="task-desc">Every day at 9:00 AM UTC &mdash; summary of progress and blockers</div>
        </div>
        <div class="task-item">
          <div class="task-title">Research</div>
          <div class="task-desc">Every day at 6:00 PM UTC &mdash; competitor pricing, SEO, suppliers</div>
        </div>
        <div class="task-item">
          <div class="task-title">Weekly Report</div>
          <div class="task-desc">Every Monday at 9:00 AM UTC &mdash; full progress and metrics</div>
        </div>
      </div>

      <div class="section">
        <h2>What Happens Next</h2>
        <ol style="padding-left: 20px;">
          <li>AI autonomous tasks will begin processing automatically on the cron schedule</li>
          <li>You'll receive daily briefings summarizing progress and flagging items that need your attention</li>
          <li>Tasks requiring human action (LLC registration, trademark, etc.) will be highlighted with suggested next steps</li>
          <li>AI draft tasks (tech packs, templates) will be generated and queued for your review</li>
          <li>The weekly report will track overall progress toward launch</li>
        </ol>
      </div>

      <a href="${SITE_URL}/admin" class="btn">Open Admin Dashboard</a>
    `);

    if (!resend)
      return { success: false, error: "RESEND_API_KEY not configured" };
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject: "[PURRFECT] Automation System Online",
      html,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}
