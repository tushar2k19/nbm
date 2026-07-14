const GT_SCRIPT_ID = "nbm-google-translate-script";
const GT_ELEMENT_ID = "google_translate_element";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages: string;
              autoDisplay: boolean;
              layout: number;
            },
            elementId: string,
          ): void;
          InlineLayout: { SIMPLE: number };
        };
      };
    };
  }
}

function cookieDomain() {
  return window.location.hostname;
}

export function setGoogleTranslateCookie(lang: string) {
  const value = `/en/${lang}`;
  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; path=/; domain=${cookieDomain()}`;
}

export function clearGoogleTranslateCookie() {
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `googtrans=; path=/; ${expired}`;
  document.cookie = `googtrans=; path=/; domain=${cookieDomain()}; ${expired}`;
}

export function getGoogleTranslateTargetLang(): string | null {
  const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return match?.[1] ?? null;
}

export function loadGoogleTranslate(pageLanguage = "en") {
  if (!document.getElementById(GT_ELEMENT_ID)) {
    const mount = document.createElement("div");
    mount.id = GT_ELEMENT_ID;
    mount.className = "sr-only";
    mount.setAttribute("aria-hidden", "true");
    document.body.appendChild(mount);
  }

  if (document.getElementById(GT_SCRIPT_ID)) return;

  window.googleTranslateElementInit = () => {
    const TranslateElement = window.google?.translate?.TranslateElement;
    if (!TranslateElement) return;
    new TranslateElement(
      {
        pageLanguage,
        includedLanguages: "as,bn,gu,hi,kn,ml,mr,or,pa,ta,te",
        autoDisplay: false,
        layout: TranslateElement.InlineLayout.SIMPLE,
      },
      GT_ELEMENT_ID,
    );
  };

  const script = document.createElement("script");
  script.id = GT_SCRIPT_ID;
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.head.appendChild(script);
}
