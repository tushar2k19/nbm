import { Download } from "lucide-react";
import type { ComponentProps } from "react";
import { downloadSamplePdf } from "@/lib/samplePdf";

type DownloadPdfButtonProps = {
  /** Used for aria-label and optional custom download filename */
  label: string;
  className?: string;
  iconClassName?: string;
  showText?: boolean;
  text?: string;
  variant?: "icon" | "link" | "card";
} & Omit<ComponentProps<"button">, "onClick" | "type">;

export function DownloadPdfButton({
  label,
  className = "",
  iconClassName = "h-5 w-5",
  showText = false,
  text = "Download",
  variant = "icon",
  ...props
}: DownloadPdfButtonProps) {
  const baseClass =
    variant === "icon"
      ? "inline-flex h-9 w-9 items-center justify-center rounded-lg text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
      : variant === "link"
        ? "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        : "group inline-flex items-center gap-2 text-xs hover:text-primary transition-colors";

  return (
    <button
      type="button"
      onClick={() => downloadSamplePdf(label)}
      title={`Download PDF: ${label}`}
      aria-label={`Download PDF — ${label}`}
      className={`${baseClass} ${className}`}
      {...props}
    >
      <Download className={iconClassName} />
      {showText ? <span>{text}</span> : null}
    </button>
  );
}
