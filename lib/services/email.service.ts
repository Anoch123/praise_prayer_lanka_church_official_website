
import "server-only";

import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const fromName =
  process.env.SMTP_FROM_NAME || "Heartland Theological Seminary";

const fromEmail = process.env.SMTP_FROM_EMAIL || smtpUser;

if (!smtpHost || !smtpUser || !smtpPass || !fromEmail) {
  throw new Error("Gmail SMTP environment variables are missing.");
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  return transporter.sendMail({
    from: {
      name: fromName,
      address: fromEmail,
    },
    replyTo: fromEmail,
    to,
    subject,
    html,
    text,
  });
}

export async function verifyEmailConnection() {
  await transporter.verify();
}
