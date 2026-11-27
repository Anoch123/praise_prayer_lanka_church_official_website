
import "server-only";

import { sendEmail } from "@/lib/services/email.service";
import type { ApplicationStatus } from "@/lib/types/helper.type";

interface ApplicationStatusEmailInput {
  applicantName: string;
  applicantEmail: string;
  referenceNumber: string;
  status: ApplicationStatus;
}

interface EmailTemplate {
  subject: string;
  badge: string;
  heading: string;
  message: string;
  closing: string;
  accent: string;
  tint: string;
  /** Number of completed steps in PROGRESS_STEPS */
  progress: number;
}

const PROGRESS_STEPS = ["Received", "Review", "Decision"];

const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const TEMPLATES: Record<ApplicationStatus, EmailTemplate> = {
  SUBMITTED: {
    subject: "Application Received | Heartland Theological Seminary",
    badge: "Received",
    heading: "Your Application Has Been Received",
    message:
      "We are pleased to confirm that we have successfully received your application to Heartland Theological Seminary. Our admissions team will review the information you have submitted and contact you with further updates.",
    closing:
      "Thank you for your interest in studying with Heartland Theological Seminary. We appreciate the time you have taken to submit your application.",
    accent: "#2f62b5",
    tint: "#eef4fd",
    progress: 1,
  },

  UNDER_REVIEW: {
    subject: "Application Under Review | Heartland Theological Seminary",
    badge: "Under Review",
    heading: "Your Application Is Under Review",
    message:
      "We would like to inform you that your application to Heartland Theological Seminary is now under review by our admissions team. We are carefully reviewing the information and documents you submitted. We will contact you once a decision has been made or if any additional information is required.",
    closing:
      "Thank you for your patience and continued interest in Heartland Theological Seminary. We appreciate your understanding while our admissions team completes the review process.",
    accent: "#b7791f",
    tint: "#fffbeb",
    progress: 2,
  },

  ACCEPTED: {
    subject: "Application Accepted for Seminary Application | Heartland Theological Seminary",
    badge: "Accepted",
    heading: "Congratulations! Your Application Has Been Accepted",
    message:
      "We are pleased to inform you that your application to Heartland Theological Seminary has been accepted. Our admissions team will contact you with further information about the next steps and enrollment arrangements.",
    closing:
      "Congratulations! We look forward to welcoming you to Heartland Theological Seminary.",
    accent: "#15803d",
    tint: "#eefaf2",
    progress: 3,
  },

  REJECTED: {
    subject: "Application Rejected for Seminary Application | Heartland Theological Seminary",
    badge: "Application Update",
    heading: "An Update Regarding Your Application",
    message:
      "After careful consideration, we regret to inform you that your application to Heartland Theological Seminary has not been accepted at this time.",
    closing:
      "We sincerely appreciate your interest in Heartland Theological Seminary and wish you every blessing in your future ministry and studies.",
    accent: "#475569",
    tint: "#f1f5f9",
    progress: 3,
  },
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createProgressHtml({ accent, progress }: EmailTemplate): string {
  const cells = PROGRESS_STEPS.map((step, index) => {
    const isDone = index < progress;

    return `
      <td width="33.33%" valign="top" style="padding:0 3px;">
        <div style="height:4px;line-height:4px;font-size:0;border-radius:4px;background:${isDone ? accent : "#e2e8f0"};">&nbsp;</div>
        <p style="margin:8px 0 0;font-family:${SANS};font-size:12px;font-weight:${isDone ? "700" : "400"};color:${isDone ? "#1e293b" : "#64748b"};">
          ${step}
        </p>
      </td>`;
  }).join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>${cells}</tr>
    </table>`;
}

function createEmailHtml(
  applicantName: string,
  referenceNumber: string,
  template: EmailTemplate,
): string {
  const { accent, tint } = template;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${escapeHtml(template.subject)}</title>
    <style>
      @media only screen and (max-width:620px) {
        .outer { padding:0 !important; }
        .card { border-radius:0 !important; }
        .pad { padding-left:22px !important; padding-right:22px !important; }
        .title { font-size:24px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#eef1f7;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
      ${escapeHtml(template.message)}
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef1f7;">
      <tr>
        <td class="outer" align="center" style="padding:32px 12px;">
          <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
          <table role="presentation" class="card" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td class="pad" bgcolor="#173b70" style="padding:26px 40px;background:#173b70;">
                <p style="margin:0;font-family:${SERIF};font-size:20px;line-height:1.3;color:#ffffff;">
                  Heartland Theological Seminary
                </p>
                <p style="margin:6px 0 0;font-family:${SANS};font-size:12px;color:#b9cdec;">
                  Admissions Office &middot; Sri Lanka
                </p>
              </td>
            </tr>

            <tr>
              <td class="pad" bgcolor="${tint}" style="padding:36px 40px;background:${tint};border-top:4px solid ${accent};">
                <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:${accent};font-family:${SANS};font-size:12px;font-weight:700;color:#ffffff;">
                  ${escapeHtml(template.badge)}
                </span>
                <h1 class="title" style="margin:18px 0 0;font-family:${SERIF};font-size:30px;font-weight:400;line-height:1.3;color:#14233f;">
                  ${escapeHtml(template.heading)}
                </h1>
              </td>
            </tr>

            <tr>
              <td class="pad" style="padding:28px 37px 0;">
                ${createProgressHtml(template)}
              </td>
            </tr>

            <tr>
              <td class="pad" style="padding:28px 40px 0;font-family:${SANS};font-size:15px;line-height:1.75;color:#334155;">
                <p style="margin:0 0 14px;color:#14233f;">Dear ${escapeHtml(applicantName)},</p>
                <p style="margin:0;">${escapeHtml(template.message)}</p>
              </td>
            </tr>

            <tr>
              <td class="pad" style="padding:24px 40px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="padding:18px;border:1px dashed #b6c2d6;border-radius:12px;background:#f8fafc;">
                      <p style="margin:0;font-family:${SANS};font-size:12px;color:#64748b;">
                        Application reference number
                      </p>
                      <p style="margin:8px 0 0;font-family:'Courier New',Courier,monospace;font-size:20px;font-weight:700;letter-spacing:1px;word-break:break-all;color:#173b70;">
                        ${escapeHtml(referenceNumber)}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="pad" style="padding:24px 40px 36px;font-family:${SANS};font-size:15px;line-height:1.75;color:#334155;">
                <p style="margin:0;">${escapeHtml(template.closing)}</p>
                <p style="margin:28px 0 0;padding-top:20px;border-top:1px solid #e2e8f0;">
                  Kind regards,<br />
                  <strong style="color:#14233f;">Admissions Office</strong><br />
                  Heartland Theological Seminary
                </p>
              </td>
            </tr>
          </table>
          <!--[if mso]></td></tr></table><![endif]-->

          <p style="margin:18px 0;font-family:${SANS};font-size:12px;color:#64748b;">
            Heartland Theological Seminary &middot; Sri Lanka
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function createEmailText(
  applicantName: string,
  referenceNumber: string,
  template: EmailTemplate,
): string {
  return [
    `Dear ${applicantName},`,
    template.heading,
    template.message,
    `Application reference number: ${referenceNumber}`,
    template.closing,
    "Kind regards,\nAdmissions Office\nHeartland Theological Seminary",
  ].join("\n\n");
}

export async function sendApplicationStatusEmail({
  applicantName,
  applicantEmail,
  referenceNumber,
  status,
}: ApplicationStatusEmailInput) {
  const template = TEMPLATES[status];

  return sendEmail({
    to: applicantEmail,
    subject: template.subject,
    html: createEmailHtml(applicantName, referenceNumber, template),
    text: createEmailText(applicantName, referenceNumber, template),
  });
}
