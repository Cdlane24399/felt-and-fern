import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface FormSubmission {
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly subject?: string;
}

function isValidSubmission(data: unknown): data is FormSubmission {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.name === "string" &&
    obj.name.length > 0 &&
    typeof obj.email === "string" &&
    obj.email.includes("@") &&
    typeof obj.message === "string" &&
    obj.message.length > 0
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();

    if (!isValidSubmission(body)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form submission. Required: name, email, message.",
        },
        { status: 400 },
      );
    }

    if (!resend) {
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 503 },
      );
    }

    const toAddress = process.env.NOTIFICATION_EMAIL ?? "cd.lane@icloud.com";

    await resend.emails.send({
      from: "PURRFECT AI <onboarding@resend.dev>",
      to: toAddress,
      subject: `[PURRFECT] New Inquiry: ${body.subject ?? "Contact Form"}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f8f5f0; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #fff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; letter-spacing: 2px; }
            .body { padding: 24px; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #1a1a2e; font-size: 13px; text-transform: uppercase; }
            .value { margin-top: 4px; color: #333; line-height: 1.6; }
            .footer { padding: 16px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>PURRFECT</h1>
            </div>
            <div class="body">
              <h2 style="color: #1a1a2e;">New Contact Form Submission</h2>
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${body.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${body.email}">${body.email}</a></div>
              </div>
              ${body.subject ? `<div class="field"><div class="label">Subject</div><div class="value">${body.subject}</div></div>` : ""}
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${body.message.replace(/\n/g, "<br/>")}</div>
              </div>
            </div>
            <div class="footer">
              Received at ${new Date().toISOString()}
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Form submission received and notification sent.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
