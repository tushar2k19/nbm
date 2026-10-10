/** PMFBY-aligned language list (GIGW bilingual + scheduled languages). */

import i18n from "@/i18n";
import {
  clearGoogleTranslateCookie,
  getGoogleTranslateTargetLang,
  loadGoogleTranslate,
  setGoogleTranslateCookie,
} from "@/lib/googleTranslate";

export const LOCALE_STORAGE_KEY = "nbm-locale";

export const PORTAL_LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English", i18n: true },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी", i18n: true },
  { code: "as", label: "Assamese", nativeLabel: "অসমীয়া", google: true },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", google: true },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી", google: true },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", google: true },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം", google: true },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", google: true },
  { code: "or", label: "Odia", nativeLabel: "ଓଡ଼ିଆ", google: true },
  { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ", google: true },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", google: true },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", google: true },
] as const;

export type PortalLanguageCode = (typeof PORTAL_LANGUAGES)[number]["code"];

export function getPortalLanguage(code: string) {
  return PORTAL_LANGUAGES.find((lang) => lang.code === code);
}

export function getStoredLocale(): PortalLanguageCode {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && getPortalLanguage(stored)) return stored as PortalLanguageCode;
  return "en";
}

export function applyDocumentLang(code: PortalLanguageCode) {
  document.documentElement.lang = code === "hi" ? "hi" : code === "en" ? "en" : code;
}

export async function setAppLocale(code: PortalLanguageCode) {
  const lang = getPortalLanguage(code);
  if (!lang) return;

  localStorage.setItem(LOCALE_STORAGE_KEY, code);
  applyDocumentLang(code);

  const hadGoogleTranslate = Boolean(getGoogleTranslateTargetLang());

  if (lang && "i18n" in lang && lang.i18n) {
    clearGoogleTranslateCookie();
    await i18n.changeLanguage(code);
    window.dispatchEvent(new CustomEvent("nbm-locale-change", { detail: code }));
    if (hadGoogleTranslate) window.location.reload();
    return;
  }

  if (lang && "google" in lang && lang.google) {
    await i18n.changeLanguage("en");
    setGoogleTranslateCookie(code);
    window.location.reload();
  }
}

export function initAppLocale() {
  const code = getStoredLocale();
  applyDocumentLang(code);
  const lang = getPortalLanguage(code);

  if (lang && "i18n" in lang && lang.i18n) {
    void i18n.changeLanguage(code);
    if (getGoogleTranslateTargetLang()) clearGoogleTranslateCookie();
    return;
  }

  void i18n.changeLanguage("en");
  if ((lang && "google" in lang && lang.google) || getGoogleTranslateTargetLang()) {
    loadGoogleTranslate();
  }
}

export const LOCALE_INIT_SCRIPT = `(function(){try{var l=localStorage.getItem("${LOCALE_STORAGE_KEY}");if(l==="hi")document.documentElement.lang="hi";else if(l&&l!=="en")document.documentElement.lang=l}catch(e){}})();`;
