/**
 * Inline-styled HTML for outbox / SMTP (and local /mailbox preview).
 * Shared by server mailers and the mailbox preview page.
 */

export type EmailCta = {
  label: string;
  href: string;
};

export type NbmEmailContent = {
  salutation: string;
  /** HTML strings — use escapeHtml on user input before inserting. */
  paragraphs: string[];
  cta?: EmailCta;
  /** Small print below the main body (before signature block). */
  footnote?: string;
};

const FONT =
  "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif";

const COLORS = {
  brand: "#1e4d3a",
  brandMuted: "#2d6a4f",
  text: "#1f2937",
  textMuted: "#4b5563",
  border: "#e5e2d9",
  surface: "#ffffff",
  surfaceAlt: "#f6f4ef",
  link: "#1e4d3a",
};

function paragraphHtml(html: string): string {
  return `<p style="margin:0 0 14px;font-family:${FONT};font-size:15px;line-height:1.65;color:${COLORS.text};">${html}</p>`;
}

export function buildNbmEmailHtml(content: NbmEmailContent): string {
  const salutation = paragraphHtml(
    `<span style="font-weight:600;color:${COLORS.text};">${content.salutation}</span>`,
  );
  const body = content.paragraphs.map((p) => paragraphHtml(p)).join("\n");

  const cta = content.cta
    ? `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:8px 0 18px;">
        <tr>
          <td style="border-radius:6px;background:${COLORS.brand};">
            <a href="${content.cta.href}" target="_blank" rel="noopener noreferrer"
               style="display:inline-block;padding:12px 22px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:6px;">
              ${content.cta.label}
            </a>
          </td>
        </tr>
      </table>`
    : "";

  const footnote = content.footnote
    ? `<p style="margin:16px 0 0;font-family:${FONT};font-size:13px;line-height:1.55;color:${COLORS.textMuted};">${content.footnote}</p>`
    : "";

  return `
<div data-nbm-email="1" style="margin:0;padding:0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;border-collapse:collapse;">
    <tr>
      <td style="padding:0 0 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:${COLORS.surface};border:1px solid ${COLORS.border};border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:linear-gradient(135deg, ${COLORS.brand} 0%, ${COLORS.brandMuted} 100%);padding:22px 26px;">
              <p style="margin:0;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.92);">
                National Bamboo Mission
              </p>
              <p style="margin:6px 0 0;font-family:${FONT};font-size:14px;color:rgba(255,255,255,0.88);">
                Department of Agriculture and Farmers Welfare · Government of India
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 26px 20px;background:${COLORS.surface};">
              ${salutation}
              ${body}
              ${cta}
              ${footnote}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 26px 22px;background:${COLORS.surfaceAlt};border-top:1px solid ${COLORS.border};">
              <p style="margin:0 0 6px;font-family:${FONT};font-size:13px;font-weight:600;color:${COLORS.text};">
                National Bamboo Mission
              </p>
              <p style="margin:0 0 4px;font-family:${FONT};font-size:13px;line-height:1.5;color:${COLORS.textMuted};">
                Ministry of Agriculture and Farmers Welfare
              </p>
              <p style="margin:0;font-family:${FONT};font-size:13px;color:${COLORS.link};">
                <a href="mailto:mis-nbm@gov.in" style="color:${COLORS.link};text-decoration:none;">mis-nbm@gov.in</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>`.trim();
}

/** Full document for iframe preview (isolates email CSS from the site shell). */
export function emailPreviewDocument(htmlBody: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Email preview</title>
  <style>
    html, body { margin: 0; padding: 0; background: #ebe8e1; }
    body { padding: 20px 16px 28px; }
    a { color: ${COLORS.link}; }
    body > p, body p {
      font-family: ${FONT};
      font-size: 15px;
      line-height: 1.65;
      color: ${COLORS.text};
      max-width: 600px;
      margin: 0 auto 14px;
    }
    body > p a, body p a {
      display: inline-block;
      margin-top: 8px;
      padding: 10px 18px;
      background: ${COLORS.brand};
      color: #fff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
    }
  </style>
</head>
<body>${htmlBody}</body>
</html>`;
}
