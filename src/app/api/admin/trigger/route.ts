import { NextRequest, NextResponse } from 'next/server'

const VALID_JOBS = ['content', 'briefing', 'research', 'weekly'] as const
type CronJob = (typeof VALID_JOBS)[number]

function isValidJob(job: string): job is CronJob {
  return (VALID_JOBS as readonly string[]).includes(job)
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { job?: string }

    if (!body.job || !isValidJob(body.job)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid job. Must be one of: ${VALID_JOBS.join(', ')}`,
        },
        { status: 400 }
      )
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    const cronUrl = `${siteUrl}/api/cron/${body.job}`

    const response = await fetch(cronUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.CRON_SECRET}`,
      },
    })

    const result: unknown = await response.json()

    return NextResponse.json({
      success: true,
      job: body.job,
      triggered: true,
      result,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
