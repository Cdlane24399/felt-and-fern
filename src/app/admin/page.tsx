import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | PURRFECT",
};

const mockActivityLog = [
  {
    id: "1",
    timestamp: "2026-03-02 14:32",
    type: "ai" as const,
    action: "Generated product descriptions for Spring collection",
    status: "completed" as const,
  },
  {
    id: "2",
    timestamp: "2026-03-02 13:15",
    type: "ai" as const,
    action: "Published blog post: Why Natural Materials Matter",
    status: "completed" as const,
  },
  {
    id: "3",
    timestamp: "2026-03-02 12:00",
    type: "ai" as const,
    action: "Optimized product images for web delivery",
    status: "in-progress" as const,
  },
  {
    id: "4",
    timestamp: "2026-03-02 10:45",
    type: "ai" as const,
    action: "Analyzed customer feedback for product improvements",
    status: "completed" as const,
  },
  {
    id: "5",
    timestamp: "2026-03-02 09:30",
    type: "ai" as const,
    action: "Updated SEO metadata across all product pages",
    status: "completed" as const,
  },
] as const;

const mockActionItems = [
  {
    id: "1",
    title: "Review new product photography",
    priority: "high" as const,
    dueDate: "2026-03-03",
  },
  {
    id: "2",
    title: "Approve Spring newsletter copy",
    priority: "medium" as const,
    dueDate: "2026-03-04",
  },
  {
    id: "3",
    title: "Confirm inventory restock quantities",
    priority: "high" as const,
    dueDate: "2026-03-03",
  },
  {
    id: "4",
    title: "Review Stripe payment integration",
    priority: "low" as const,
    dueDate: "2026-03-07",
  },
] as const;

const mockPipeline = [
  { stage: "Content Generation", count: 3, status: "active" as const },
  { stage: "Product Photography", count: 1, status: "queued" as const },
  { stage: "SEO Optimization", count: 2, status: "active" as const },
  { stage: "Email Campaigns", count: 0, status: "idle" as const },
  { stage: "Social Media", count: 1, status: "queued" as const },
] as const;

const statusColors = {
  completed: "bg-emerald-100 text-emerald-700",
  "in-progress": "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
} as const;

const priorityColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-stone-100 text-stone-600",
} as const;

const pipelineStatusColors = {
  active: "bg-emerald-100 text-emerald-700",
  queued: "bg-amber-100 text-amber-700",
  idle: "bg-stone-100 text-stone-400",
} as const;

export default function AdminPage() {
  return (
    <div className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-tight text-stone-900">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Automation engine overview
            </p>
          </div>
          <span className="text-xs text-stone-400">
            Last sync: 2 minutes ago
          </span>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* AI Activity Log */}
          <div className="lg:col-span-2">
            <div className="border border-stone-200 bg-white p-6">
              <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
                AI Activity Log
              </h2>
              <div className="mt-6 divide-y divide-stone-100">
                {mockActivityLog.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm text-stone-700">{entry.action}</p>
                      <p className="mt-0.5 text-xs text-stone-400">
                        {entry.timestamp}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase ${statusColors[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Human Action Items */}
            <div className="border border-stone-200 bg-white p-6">
              <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
                Action Items
              </h2>
              <div className="mt-6 space-y-4">
                {mockActionItems.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-stone-700">{item.title}</p>
                      <span
                        className={`shrink-0 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase ${priorityColors[item.priority]}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-stone-400">
                      Due: {item.dueDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Status */}
            <div className="border border-stone-200 bg-white p-6">
              <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
                Pipeline Status
              </h2>
              <div className="mt-6 space-y-3">
                {mockPipeline.map((stage) => (
                  <div
                    key={stage.stage}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          stage.status === "active"
                            ? "bg-emerald-500"
                            : stage.status === "queued"
                              ? "bg-amber-500"
                              : "bg-stone-300"
                        }`}
                      />
                      <span className="text-sm text-stone-700">
                        {stage.stage}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase ${pipelineStatusColors[stage.status]}`}
                    >
                      {stage.count > 0 ? `${stage.count} tasks` : stage.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
