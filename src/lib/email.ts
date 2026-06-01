import { Resend } from "resend";

// Sender — verified domain in Resend, or the onboarding sandbox for testing.
const FROM = process.env.RESEND_FROM ?? "FullPond <onboarding@resend.dev>";

export type EmailResult = "SENT" | "RENDERED" | "FAILED";

/**
 * Sends an email via Resend. With no RESEND_API_KEY (demo mode) it does NOT
 * send — it returns "RENDERED" so the caller can still log/preview it.
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "RENDERED";
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from: FROM, to, subject, html });
    return error ? "FAILED" : "SENT";
  } catch {
    return "FAILED";
  }
}

export function buildNewVacancyEmail(opts: {
  name: string;
  vacancyTitle: string;
  vacancySummary: string;
  vacancyLocation: string;
  vacancyUrl: string;
}): { subject: string; html: string } {
  const firstName = opts.name.split(" ")[0] || "there";
  const subject = `New role at FullPond — ${opts.vacancyTitle}`;
  const html = /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f1ece0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#0a1424;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0a1424;border-radius:18px 18px 0 0;padding:34px 40px;text-align:center;">
              <p style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                Full<span style="color:#54a6f8;">Pond</span>
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.45);letter-spacing:2px;text-transform:uppercase;">
                New opportunity
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-left:1px solid #e7e2d6;border-right:1px solid #e7e2d6;">
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0a1424;">
                Hi ${firstName} 👋
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#57534e;line-height:1.6;">
                A new role just opened at <strong>FullPond</strong> that may be a great match for you.
              </p>

              <!-- Role card -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#f7faff;border:1px solid #d9ecff;border-radius:14px;margin-bottom:28px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="margin:0 0 6px;font-size:18px;font-weight:700;color:#1c5da1;">${opts.vacancyTitle}</p>
                    <p style="margin:0 0 12px;font-size:13px;color:#78716c;">${opts.vacancyLocation}</p>
                    <p style="margin:0;font-size:14px;color:#44403c;line-height:1.6;">${opts.vacancySummary}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="border-radius:999px;background:#2e90e5;">
                    <a href="${opts.vacancyUrl}"
                      style="display:inline-block;padding:14px 34px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">
                      View role &amp; apply →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:26px 0 0;font-size:13px;color:#a8a29e;line-height:1.6;">
                Your FullPond profile travels with every application — applying takes a couple of minutes.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#faf8f2;border:1px solid #e7e2d6;border-top:none;border-radius:0 0 18px 18px;padding:22px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#a8a29e;line-height:1.6;">
                You're receiving this because you have a FullPond candidate account.<br/>
                FullPond · Global remote talent
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  return { subject, html };
}
