import { useState, useEffect, useCallback, useRef } from "react";
import {
  Volume2,
  ZoomOut,
  AlignJustify,
  Highlighter,
  Type,
  BookOpen,
  EyeOff,
  MousePointer2,
  SunMoon,
  Contrast,
  RotateCcw,
  Accessibility,
  X,
} from "lucide-react";
import { increaseTextScale, decreaseTextScale, resetTextScale } from "@/lib/textScale";

type A11yState = {
  tts: boolean;
  lineHeight: boolean;
  highlightLinks: boolean;
  textSpacing: boolean;
  dyslexia: boolean;
  hideImages: boolean;
  largeCursor: boolean;
  darkMode: boolean;
  invertColors: boolean;
  highContrast: boolean;
};

const STORAGE_KEY = "nbm-a11y";

const DEFAULT_STATE: A11yState = {
  tts: false,
  lineHeight: false,
  highlightLinks: false,
  textSpacing: false,
  dyslexia: false,
  hideImages: false,
  largeCursor: false,
  darkMode: false,
  invertColors: false,
  highContrast: false,
};

function loadState(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(s: A11yState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
}

function applyState(s: A11yState) {
  const html = document.documentElement;
  const body = document.body;

  // line height
  s.lineHeight
    ? html.setAttribute("data-line-height", "increased")
    : html.removeAttribute("data-line-height");

  // highlight links
  s.highlightLinks
    ? html.setAttribute("data-highlight-links", "")
    : html.removeAttribute("data-highlight-links");

  // text spacing
  s.textSpacing
    ? html.setAttribute("data-text-spacing", "")
    : html.removeAttribute("data-text-spacing");

  // dyslexia font
  if (s.dyslexia) {
    html.setAttribute("data-dyslexia", "");
    if (!document.getElementById("opendyslexic-font")) {
      const link = document.createElement("link");
      link.id = "opendyslexic-font";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.cdnfonts.com/css/opendyslexic";
      document.head.appendChild(link);
    }
  } else {
    html.removeAttribute("data-dyslexia");
  }

  // hide images
  s.hideImages
    ? html.setAttribute("data-hide-images", "")
    : html.removeAttribute("data-hide-images");

  // large cursor
  s.largeCursor
    ? html.setAttribute("data-large-cursor", "")
    : html.removeAttribute("data-large-cursor");

  // dark mode
  if (s.darkMode) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  // invert colors
  s.invertColors
    ? html.setAttribute("data-invert", "")
    : html.removeAttribute("data-invert");

  // high contrast
  s.highContrast
    ? html.setAttribute("data-high-contrast", "")
    : html.removeAttribute("data-high-contrast");

  // TTS: stop any ongoing speech when turned off
  if (!s.tts && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  void body; // body ref kept for potential future use
}

let ttsUtterance: SpeechSynthesisUtterance | null = null;

function speakPage() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const text =
    document.getElementById("main-content")?.innerText ||
    document.body.innerText;
  ttsUtterance = new SpeechSynthesisUtterance(text.slice(0, 4000));
  ttsUtterance.lang = document.documentElement.lang || "en-IN";
  ttsUtterance.rate = 0.9;
  window.speechSynthesis.speak(ttsUtterance);
}

function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  ttsUtterance = null;
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Hydrate from localStorage after mount
  useEffect(() => {
    const saved = loadState();
    setState(saved);
    applyState(saved);
  }, []);

  // Persist + apply on every state change
  useEffect(() => {
    saveState(state);
    applyState(state);
  }, [state]);

  // Focus close button when panel opens
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const toggle = useCallback(
    (key: keyof A11yState) => {
      if (key === "tts") {
        setState((prev) => {
          const next = { ...prev, tts: !prev.tts };
          if (next.tts) speakPage();
          else stopSpeech();
          return next;
        });
        return;
      }
      setState((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    [],
  );

  const resetAll = useCallback(() => {
    stopSpeech();
    setState(DEFAULT_STATE);
    resetTextScale();
  }, []);

  const btnCls = (active: boolean) =>
    `a11y-ctrl${active ? " a11y-ctrl--active" : ""}`;

  return (
    <>
      {/* Trigger button — placed in header utility strip via SiteLayout */}
      <button
        ref={triggerRef}
        type="button"
        className="a11y-trigger"
        aria-label="Accessibility options"
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((v) => !v)}
        title="Accessibility options"
      >
        <Accessibility className="h-3.5 w-3.5" aria-hidden />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="a11y-backdrop"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sliding panel */}
      <div
        id="a11y-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility options"
        className={`a11y-panel${open ? " a11y-panel--open" : ""}`}
      >
        {/* Header */}
        <div className="a11y-panel-header">
          <span className="a11y-panel-title">
            <Accessibility className="h-3.5 w-3.5" aria-hidden />
            Accessibility Options
          </span>
          <button
            ref={closeRef}
            type="button"
            className="a11y-panel-close"
            aria-label="Close accessibility options"
            onClick={() => setOpen(false)}
          >
            <X className="h-3 w-3" aria-hidden />
          </button>
        </div>

        {/* Body */}
        <div className="a11y-panel-body">
          {/* Text size */}
          <span className="a11y-section-label">Text Size</span>
          <div className="a11y-size-row">
            <span className="a11y-size-label">
              <ZoomOut className="h-3.5 w-3.5 opacity-60" aria-hidden />
              Text Size
            </span>
            <button
              type="button"
              className="a11y-size-btn"
              aria-label="Decrease text size"
              onClick={() => decreaseTextScale()}
            >
              A-
            </button>
            <button
              type="button"
              className="a11y-size-btn"
              aria-label="Reset text size"
              onClick={() => resetTextScale()}
            >
              A
            </button>
            <button
              type="button"
              className="a11y-size-btn"
              aria-label="Increase text size"
              onClick={() => increaseTextScale()}
            >
              A+
            </button>
          </div>

          {/* Content controls */}
          <span className="a11y-section-label">Content</span>

          <button
            type="button"
            className={btnCls(state.tts)}
            onClick={() => toggle("tts")}
            aria-pressed={state.tts}
          >
            <span className="a11y-ctrl__icon">
              <Volume2 className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">Text to Speech</span>
            {state.tts && <span className="a11y-ctrl__badge">On</span>}
          </button>

          <button
            type="button"
            className={btnCls(state.lineHeight)}
            onClick={() => toggle("lineHeight")}
            aria-pressed={state.lineHeight}
          >
            <span className="a11y-ctrl__icon">
              <AlignJustify className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">Line Height</span>
            {state.lineHeight && <span className="a11y-ctrl__badge">On</span>}
          </button>

          <button
            type="button"
            className={btnCls(state.highlightLinks)}
            onClick={() => toggle("highlightLinks")}
            aria-pressed={state.highlightLinks}
          >
            <span className="a11y-ctrl__icon">
              <Highlighter className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">Highlight Links</span>
            {state.highlightLinks && <span className="a11y-ctrl__badge">On</span>}
          </button>

          <button
            type="button"
            className={btnCls(state.textSpacing)}
            onClick={() => toggle("textSpacing")}
            aria-pressed={state.textSpacing}
          >
            <span className="a11y-ctrl__icon">
              <Type className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">Text Spacing</span>
            {state.textSpacing && <span className="a11y-ctrl__badge">On</span>}
          </button>

          <button
            type="button"
            className={btnCls(state.dyslexia)}
            onClick={() => toggle("dyslexia")}
            aria-pressed={state.dyslexia}
          >
            <span className="a11y-ctrl__icon">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">Dyslexia Friendly</span>
            {state.dyslexia && <span className="a11y-ctrl__badge">On</span>}
          </button>

          {/* Visual controls */}
          <span className="a11y-section-label">Visual</span>

          <button
            type="button"
            className={btnCls(state.hideImages)}
            onClick={() => toggle("hideImages")}
            aria-pressed={state.hideImages}
          >
            <span className="a11y-ctrl__icon">
              <EyeOff className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">Hide Images</span>
            {state.hideImages && <span className="a11y-ctrl__badge">On</span>}
          </button>

          <button
            type="button"
            className={btnCls(state.largeCursor)}
            onClick={() => toggle("largeCursor")}
            aria-pressed={state.largeCursor}
          >
            <span className="a11y-ctrl__icon">
              <MousePointer2 className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">Large Cursor</span>
            {state.largeCursor && <span className="a11y-ctrl__badge">On</span>}
          </button>

          <button
            type="button"
            className={btnCls(state.darkMode)}
            onClick={() => toggle("darkMode")}
            aria-pressed={state.darkMode}
          >
            <span className="a11y-ctrl__icon">
              <SunMoon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">Dark Mode</span>
            {state.darkMode && <span className="a11y-ctrl__badge">On</span>}
          </button>

          <button
            type="button"
            className={btnCls(state.invertColors)}
            onClick={() => toggle("invertColors")}
            aria-pressed={state.invertColors}
          >
            <span className="a11y-ctrl__icon">
              <Contrast className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">Invert Colors</span>
            {state.invertColors && <span className="a11y-ctrl__badge">On</span>}
          </button>

          <button
            type="button"
            className={btnCls(state.highContrast)}
            onClick={() => toggle("highContrast")}
            aria-pressed={state.highContrast}
          >
            <span className="a11y-ctrl__icon">
              <SunMoon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="a11y-ctrl__label">High Contrast</span>
            {state.highContrast && <span className="a11y-ctrl__badge">On</span>}
          </button>

          {/* Reset */}
          <button
            type="button"
            className="a11y-reset"
            onClick={resetAll}
          >
            <RotateCcw className="h-3 w-3" aria-hidden />
            Reset All Settings
          </button>
        </div>

        <div className="a11y-panel-footer">
          Powered by UX4G · NeGD | MeitY · Government of India
        </div>
      </div>
    </>
  );
}
