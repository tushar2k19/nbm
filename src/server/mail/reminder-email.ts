import { deliverOutboxEmail } from "@/server/mail/deliver";
import type { ComplianceAudience, ComplianceStage } from "@/server/portal/reporting-compliance";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function reminderCopy(
  stage: ComplianceStage,
  audience: ComplianceAudience,
  stateName: string,
  monthLabel: string,
  fullName: string,
) {
  const safeName = escapeHtml(fullName);
  const safeState = escapeHtml(stateName);
  const safeMonth = escapeHtml(monthLabel);

  const portalLine =
    "Please sign in to the NBM State Login portal using your official credentials and take the necessary action at the earliest.";

  let subject: string;
  let lead: string;
  let detail: string;

  if (audience === "editors") {
    switch (stage) {
      case "not_started":
        subject = `Reminder: Monthly MIS entry pending — ${stateName} (${monthLabel})`;
        lead = `No monthly data has been entered yet for <strong>${safeState}</strong> for the reporting period <strong>${safeMonth}</strong>.`;
        detail = "Add beneficiary entries for this month and submit them for state review before the reporting cutoff.";
        break;
      case "drafts_pending":
        subject = `Reminder: Submit monthly entries for review — ${stateName} (${monthLabel})`;
        lead = `Draft entries are saved for <strong>${safeState}</strong> for <strong>${safeMonth}</strong>, but none have been submitted for review.`;
        detail = "Review your draft entries and submit them so the State Reviewer can verify the month.";
        break;
      case "corrections_pending":
        subject = `Reminder: Corrections required on declined entries — ${stateName} (${monthLabel})`;
        lead = `One or more entries for <strong>${safeState}</strong> (<strong>${safeMonth}</strong>) were declined by the State Reviewer.`;
        detail =
          "Open the declined entries (retry icon), update the details, save as draft, and resubmit for review. Check Comments &amp; Queries for reviewer notes.";
        break;
      default:
        subject = `Reminder: Action required on monthly MIS — ${stateName} (${monthLabel})`;
        lead = `Monthly reporting for <strong>${safeState}</strong> (<strong>${safeMonth}</strong>) is pending with State Editors.`;
        detail = portalLine;
    }
  } else {
    switch (stage) {
      case "awaiting_review":
        subject = `Reminder: Monthly submissions awaiting review — ${stateName} (${monthLabel})`;
        lead = `Editors have submitted entries for <strong>${safeState}</strong> for <strong>${safeMonth}</strong> that are awaiting your review.`;
        detail = "Open the Reviewer Dashboard, verify the submissions, and approve or decline each entry as appropriate.";
        break;
      case "review_in_progress":
        subject = `Reminder: Complete monthly review — ${stateName} (${monthLabel})`;
        lead = `Review is in progress for <strong>${safeState}</strong> (<strong>${safeMonth}</strong>). Some entries are approved; others still need a decision.`;
        detail = "Please complete review of all pending entries so Headquarters can close the month for this state.";
        break;
      default:
        subject = `Reminder: Monthly review pending — ${stateName} (${monthLabel})`;
        lead = `Monthly submissions for <strong>${safeState}</strong> (<strong>${safeMonth}</strong>) are pending with State Reviewers.`;
        detail = "Sign in to the Reviewer Dashboard and process the queue.";
    }
  }

  const html = `
    <p>Namaste ${safeName},</p>
    <p>${lead}</p>
    <p>${detail}</p>
    <p>${portalLine}</p>
    <p>This is an official reminder from NBM Headquarters. If you have already completed this action, you may disregard this message.</p>
    <p>National Bamboo Mission<br/>Department of Agriculture and Farmers Welfare<br/>mis-nbm@gov.in</p>
  `.trim();

  const text = [
    `Namaste ${fullName},`,
    "",
    lead.replace(/<[^>]+>/g, ""),
    "",
    detail.replace(/&amp;/g, "&"),
    "",
    portalLine,
    "",
    "This is an official reminder from NBM Headquarters. If you have already completed this action, you may disregard this message.",
    "",
    "National Bamboo Mission",
    "Department of Agriculture and Farmers Welfare",
    "mis-nbm@gov.in",
  ].join("\n");

  return { subject, html, text };
}

export async function deliverComplianceReminderEmail(input: {
  to: string;
  fullName: string;
  relatedUserId: string;
  stage: ComplianceStage;
  audience: ComplianceAudience;
  stateName: string;
  monthLabel: string;
}) {
  const copy = reminderCopy(input.stage, input.audience, input.stateName, input.monthLabel, input.fullName);
  return deliverOutboxEmail({
    to: input.to,
    subject: copy.subject,
    html: copy.html,
    text: copy.text,
    relatedUserId: input.relatedUserId,
  });
}
