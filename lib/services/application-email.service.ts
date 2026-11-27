
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
  heading: string;
  message: string;
  closing: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getStatusTemplate(status: ApplicationStatus): EmailTemplate {
  const templates: Record<ApplicationStatus, EmailTemplate> = {
    SUBMITTED: {
      subject: "Application Received | Heartland Theological Seminary",
      heading: "Your Application Has Been Received",
      message:
        "We are pleased to confirm that we have successfully received your application to Heartland Theological Seminary. Our admissions team will review the information you have submitted.",
      closing:
        "Thank you for your interest in studying with Heartland Theological Seminary.",
    },

    ACCEPTED: {
      subject: "Application Accepted | Heartland Theological Seminary",
      heading: "Congratulations! Your Application Has Been Accepted",
      message:
        "We are pleased to inform you that your application to Heartland Theological Seminary has been accepted. Our admissions team will contact you with further information about the next steps.",
      closing:
        "Congratulations! We look forward to welcoming you to Heartland Theological Seminary.",
    },

    REJECTED: {
      subject: "Application Update | Heartland Theological Seminary",
      heading: "An Update Regarding Your Application",
      message:
        "After careful consideration, we regret to inform you that your application to Heartland Theological Seminary has not been accepted at this time.",
      closing:
        "We sincerely appreciate your interest and wish you every blessing in your future ministry and studies.",
    },
  };

  return templates[status];
}

function createEmailHtml(
  applicantName: string,
  referenceNumber: string,
  template: EmailTemplate,
): string {
  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:0;background:#f4f6fa;font-family:Arial,sans-serif;color:#263247;">
        <div style="max-width:620px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;">
          <div style="background:#173b70;padding:30px 24px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:23px;">
              HEARTLAND THEOLOGICAL SEMINARY
            </h1>
            <p style="margin:8px 0 0;color:#dce8f8;font-size:13px;">
              Sri Lanka
            </p>
          </div>

          <div style="padding:32px 28px;">
            <p>Dear ${escapeHtml(applicantName)},</p>

            <h2 style="color:#173b70;font-size:21px;">
              ${escapeHtml(template.heading)}
            </h2>

            <p style="font-size:15px;line-height:1.8;">
              ${escapeHtml(template.message)}
            </p>

            <div style="margin:24px 0;padding:16px;background:#f2f5fa;border-radius:8px;">
              <p style="margin:0 0 6px;font-size:12px;color:#64748b;">
                APPLICATION REFERENCE NUMBER
              </p>
              <strong style="font-size:17px;color:#173b70;">
                ${escapeHtml(referenceNumber)}
              </strong>
            </div>

            <p style="font-size:15px;line-height:1.8;">
              ${escapeHtml(template.closing)}
            </p>

            <p style="margin-top:28px;font-size:14px;line-height:1.7;">
              Kind regards,<br />
              <strong>Admissions Office</strong><br />
              Heartland Theological Seminary
            </p>
          </div>

          <div style="padding:18px;text-align:center;background:#f4f6fa;color:#64748b;font-size:12px;">
            Heartland Theological Seminary | Sri Lanka
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendApplicationStatusEmail({
  applicantName,
  applicantEmail,
  referenceNumber,
  status,
}: ApplicationStatusEmailInput) {
  const template = getStatusTemplate(status);

  const html = createEmailHtml(
    applicantName,
    referenceNumber,
    template,
  );

  const text = `
Dear ${applicantName},

${template.heading}

${template.message}

Application Reference: ${referenceNumber}

${template.closing}

Kind regards,
Admissions Office
Heartland Theological Seminary
  `.trim();

  return sendEmail({
    to: applicantEmail,
    subject: template.subject,
    html,
    text,
  });
}
