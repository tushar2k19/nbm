import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/documents");
const outPath = join(outDir, "nbm-sample-document.pdf");

const doc = await PDFDocument.create();
doc.setTitle("National Bamboo Mission — Sample Document");
doc.setAuthor("Ministry of Agriculture and Farmers Welfare, Government of India");
doc.setSubject("Sample PDF for portal download demonstrations");
doc.setCreator("National Bamboo Mission Portal");

const page = doc.addPage([595.28, 841.89]); // A4
const { width, height } = page.getSize();
const font = await doc.embedFont(StandardFonts.Helvetica);
const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

const forest = rgb(0.12, 0.35, 0.2);
const muted = rgb(0.35, 0.38, 0.4);
const saffron = rgb(0.85, 0.45, 0.1);

// Header band
page.drawRectangle({
  x: 0,
  y: height - 96,
  width,
  height: 96,
  color: forest,
});

page.drawText("Government of India", {
  x: 48,
  y: height - 42,
  size: 11,
  font,
  color: rgb(1, 1, 1),
});

page.drawText("Ministry of Agriculture and Farmers Welfare", {
  x: 48,
  y: height - 58,
  size: 10,
  font,
  color: rgb(0.9, 0.95, 0.92),
});

page.drawText("National Bamboo Mission", {
  x: 48,
  y: height - 78,
  size: 16,
  font: fontBold,
  color: rgb(1, 1, 1),
});

// Tri-color accent
page.drawRectangle({ x: 0, y: height - 100, width: width / 3, height: 4, color: saffron });
page.drawRectangle({ x: width / 3, y: height - 100, width: width / 3, height: 4, color: rgb(1, 1, 1) });
page.drawRectangle({ x: (width / 3) * 2, y: height - 100, width: width / 3, height: 4, color: forest });

page.drawText("SAMPLE DOCUMENT", {
  x: 48,
  y: height - 140,
  size: 20,
  font: fontBold,
  color: forest,
});

page.drawText("For demonstration purposes only", {
  x: 48,
  y: height - 162,
  size: 11,
  font,
  color: muted,
});

const body = [
  "This is a sample PDF template used across the National Bamboo Mission portal",
  "for tenders, vacancies, training modules, official letters, research papers",
  "and reports until final documents are published.",
  "",
  "Document reference: NBM/SAMPLE/2026-27/001",
  "Issuing authority: National Bamboo Mission Cell",
  "Krishi Bhawan, New Delhi — 110001",
  "",
  "Contents in this sample file are placeholders. Users should refer to the",
  "corresponding notice on the portal for authoritative text, dates and",
  "submission requirements.",
  "",
  "Helpline: 1800-180-1551  |  Email: nbm-agri@gov.in",
  "Website: National Bamboo Mission portal",
];

let y = height - 200;
for (const line of body) {
  page.drawText(line, {
    x: 48,
    y,
    size: 11,
    font,
    color: rgb(0.15, 0.17, 0.18),
    maxWidth: width - 96,
    lineHeight: 14,
  });
  y -= line ? 18 : 10;
}

// Footer
page.drawLine({
  start: { x: 48, y: 72 },
  end: { x: width - 48, y: 72 },
  thickness: 0.5,
  color: rgb(0.8, 0.82, 0.84),
});

page.drawText("© National Bamboo Mission, Government of India — Sample PDF", {
  x: 48,
  y: 52,
  size: 9,
  font,
  color: muted,
});

page.drawText(`Generated: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, {
  x: 48,
  y: 36,
  size: 9,
  font,
  color: muted,
});

const bytes = await doc.save();
await mkdir(outDir, { recursive: true });
await writeFile(outPath, bytes);
console.log(`Wrote ${outPath} (${bytes.length} bytes)`);
