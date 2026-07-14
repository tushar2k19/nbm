import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getPortalLanguage,
  getStoredLocale,
  PORTAL_LANGUAGES,
  setAppLocale,
  type PortalLanguageCode,
} from "@/lib/locale";
import { getGoogleTranslateTargetLang } from "@/lib/googleTranslate";

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<PortalLanguageCode>("en");
  const containerRef = useRef<HTMLDivElement>(null);

  const syncLocale = useCallback(() => {
    const googleLang = getGoogleTranslateTargetLang();
    if (googleLang && getPortalLanguage(googleLang)?.google) {
      setLocale(googleLang as PortalLanguageCode);
      return;
    }
    setLocale(getStoredLocale());
  }, []);

  useEffect(() => {
    syncLocale();
    const onChange = () => syncLocale();
    window.addEventListener("nbm-locale-change", onChange);
    return () => window.removeEventListener("nbm-locale-change", onChange);
  }, [syncLocale]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const current = getPortalLanguage(locale) ?? PORTAL_LANGUAGES[0];

  const select = (code: PortalLanguageCode) => {
    setOpen(false);
    if (code === locale) return;
    void setAppLocale(code);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Select language. Current: ${current.label}`}
        className="inline-flex items-center gap-1 hover:underline"
      >
        {current.label}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full z-[60] mt-1 min-w-[9.5rem] overflow-hidden rounded-md border border-border bg-background py-1 text-foreground shadow-lg"
        >
          {PORTAL_LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={locale === lang.code}>
              <button
                type="button"
                onClick={() => select(lang.code)}
                className={`flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-xs transition-colors hover:bg-secondary ${
                  locale === lang.code ? "bg-secondary/80 font-semibold text-primary" : ""
                }`}
              >
                <span>{lang.label}</span>
                <span className="text-muted-foreground">{lang.nativeLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
