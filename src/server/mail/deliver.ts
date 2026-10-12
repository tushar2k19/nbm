import { randomUUID } from "node:crypto";
import { getMysqlPool } from "@/server/db/mysql";
import { buildNbmEmailHtml } from "@/lib/nbm-email-template";

export type PasswordMailPurpose = "invite" | "reset";

const FROM_ADDRESS = () => process.env.SMTP_FROM?.trim() || "mis-nbm@gov.in";

export function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST?.trim());
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function messageCopy(purpose: PasswordMailPurpose, fullName: string, url: string) {
  const subject =
    purpose === "invite"
      ? "Set your NBM State Login password"
      : "Reset your NBM State Login password";
  const intro =
    purpose === "invite"
      ? "National Bamboo Mission Headquarters has created a State Login account for you. Choose a password to activate it."
      : "A password reset was requested for your National Bamboo Mission State Login account.";
  const action = purpose === "invite" ? "Set password" : "Reset password";
  const safeName = escapeHtml(fullName);
  const safeUrl = escapeHtml(url);

  const html = buildNbmEmailHtml({
    salutation: `Namaste ${safeName},`,
    paragraphs: [intro],
    cta: { label: action, href: safeUrl },
    footnote:
      "This link works once and expires in 48 hours. If you did not expect this message, contact NBM Headquarters at mis-nbm@gov.in.",
  });

  const text = [
    `Namaste ${fullName},`,
    "",
    intro,
    "",
    `${action}: ${url}`,
    "",
    "This link works once and expires in 48 hours. If you did not expect this message, contact NBM Headquarters at mis-nbm@gov.in.",
    "",
    "National Bamboo Mission",
    "Department of Agriculture and Farmers Welfare",
  ].join("\n");

  return { subject, html, text, action, url };
}

export async function deliverOutboxEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  relatedUserId?: string | null;
}): Promise<{ messageId: string; previewPath: string }> {
  const messageId = randomUUID();
  const db = getMysqlPool();

  await db.query(
    `INSERT INTO email_outbox (id, to_email, subject, html_body, text_body, related_user_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [messageId, input.to, input.subject, input.html, input.text, input.relatedUserId ?? null],
  );

  if (smtpConfigured()) {
    await sendViaSmtp({
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    });
  } else {
    console.info(`[mail] Preview stored for ${input.to}: /mailbox/${messageId}`);
  }

  return { messageId, previewPath: `/mailbox/${messageId}` };
}

export async function deliverPasswordEmail(input: {
  to: string;
  fullName: string;
  purpose: PasswordMailPurpose;
  setPasswordUrl: string;
  relatedUserId: string;
}): Promise<{ messageId: string; previewPath: string }> {
  const copy = messageCopy(input.purpose, input.fullName, input.setPasswordUrl);
  return deliverOutboxEmail({
    to: input.to,
    subject: copy.subject,
    html: copy.html,
    text: copy.text,
    relatedUserId: input.relatedUserId,
  });
}

export function mailFromAddress(): string {
  return FROM_ADDRESS();
}

async function sendViaSmtp(message: { to: string; subject: string; html: string; text: string }) {
  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER?.trim();
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: user ? { user, pass: process.env.SMTP_PASSWORD ?? "" } : undefined,
  });
  await transporter.sendMail({
    from: FROM_ADDRESS(),
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });
}
