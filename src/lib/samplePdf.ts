/** Shared sample PDF used for all portal download buttons until real files are published. */

export const SAMPLE_PDF_PATH = "/documents/nbm-sample-document.pdf";
export const SAMPLE_PDF_FILENAME = "NBM-Sample-Document.pdf";

/** Trigger download of the common sample PDF. Optional label customises the saved filename. */
export function downloadSamplePdf(label?: string) {
  const link = document.createElement("a");
  link.href = SAMPLE_PDF_PATH;
  link.download = label
    ? `${sanitizeFilename(label)}.pdf`
    : SAMPLE_PDF_FILENAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").slice(0, 120);
}
