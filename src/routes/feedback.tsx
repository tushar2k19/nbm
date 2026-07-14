import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { useState, useId, useEffect, useRef } from "react";
import {
  MessageSquare,
  Star,
  CheckCircle2,
  RefreshCw,
  Send,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Share your feedback about the National Bamboo Mission portal. Report issues, suggest improvements or rate your experience.",
      },
    ],
  }),
  component: FeedbackPage,
});

const CATEGORIES = [
  { value: "", label: "Select a category…" },
  { value: "general", label: "General Feedback" },
  { value: "content", label: "Content / Information" },
  { value: "technical", label: "Technical Issue" },
  { value: "accessibility", label: "Accessibility Issue" },
  { value: "scheme", label: "Scheme / Programme Query" },
  { value: "other", label: "Other" },
];

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
}

function generateRefNum() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NBM-FB-${ts}-${rand}`;
}

function StarRating({
  value,
  onChange,
  id,
}: {
  value: number;
  onChange: (v: number) => void;
  id: string;
}) {
  const [hover, setHover] = useState(0);
  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
  return (
    <div className="flex items-center gap-1" role="group" aria-labelledby={id}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${n} star — ${labels[n - 1]}`}
          aria-pressed={value === n}
          className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Star
            className={`h-7 w-7 transition-colors ${
              n <= (hover || value)
                ? "fill-amber-400 text-amber-400"
                : "fill-none text-foreground/30"
            }`}
            aria-hidden
          />
        </button>
      ))}
      {(hover || value) > 0 && (
        <span className="ml-2 text-xs text-foreground/70">
          {labels[(hover || value) - 1]}
        </span>
      )}
    </div>
  );
}

function FeedbackPage() {
  const formId = useId();

  /* form state */
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  /* captcha */
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  /* submission */
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [refNum, setRefNum] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  function refreshCaptcha() {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!category) errs.category = "Please select a category.";
    if (!message.trim()) errs.message = "Please enter your feedback message.";
    if (message.trim().length < 10) errs.message = "Please enter at least 10 characters.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email address.";
    if (!captchaInput) {
      errs.captcha = "Please solve the security question.";
    } else if (parseInt(captchaInput, 10) !== captcha.answer) {
      errs.captcha = `Incorrect answer. ${captcha.a} + ${captcha.b} = ?`;
      setCaptchaError(`Incorrect answer. ${captcha.a} + ${captcha.b} = ?`);
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setRefNum(generateRefNum());
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="feedback-page">
        <PageHero
          eyebrow={
            <>
              <MessageSquare className="h-3.5 w-3.5" aria-hidden />
              GIGW 3.0 · Citizen Feedback
            </>
          }
          title="Feedback"
          subtitle="Help us improve the National Bamboo Mission portal."
        />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 text-center">
          <div
            ref={successRef}
            tabIndex={-1}
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 shadow-sm outline-none"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold text-emerald-900">
              Thank you for your feedback!
            </h2>
            <p className="mt-2 text-sm text-emerald-800">
              Your feedback has been recorded. We will review it and respond (if contact details were provided) within <strong>5 working days</strong>.
            </p>
            <div className="mt-5 rounded-lg bg-white border border-emerald-200 px-5 py-3 inline-block">
              <p className="text-xs text-foreground/60">Reference Number</p>
              <p className="text-lg font-mono font-bold text-primary tracking-wider">{refNum}</p>
              <p className="text-xs text-foreground/50 mt-0.5">Save this number for future correspondence</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setCategory("");
                  setName("");
                  setEmail("");
                  setMessage("");
                  setRating(0);
                  setCaptchaInput("");
                  setCaptcha(generateCaptcha());
                  setErrors({});
                }}
                className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 transition-colors"
              >
                Submit Another
              </button>
              <Link
                to="/"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <PageHero
        eyebrow={
          <>
            <MessageSquare className="h-3.5 w-3.5" aria-hidden />
            GIGW 3.0 · Citizen Feedback
          </>
        }
        title="Feedback"
        subtitle="Help us improve the National Bamboo Mission portal. Your feedback is reviewed and used to enhance services."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">

          {/* ── Form ── */}
          <div>
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden />
              <p>
                Fields marked <span aria-hidden>*</span><span className="sr-only">with an asterisk</span> are required. Name and email are optional — provide them if you would like a reply.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Feedback form"
              className="space-y-6"
            >
              {/* Category */}
              <div>
                <label
                  htmlFor={`${formId}-category`}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Category <span aria-hidden className="text-red-600">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <select
                  id={`${formId}-category`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-required="true"
                  aria-describedby={errors.category ? `${formId}-category-err` : undefined}
                  aria-invalid={!!errors.category}
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    errors.category ? "border-red-400" : "border-border"
                  }`}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value} disabled={c.value === ""}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p id={`${formId}-category-err`} role="alert" className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3 w-3" aria-hidden /> {errors.category}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor={`${formId}-name`}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Your Name <span className="text-xs text-foreground/50">(optional)</span>
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full rounded-lg border border-border px-3 py-2.5 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor={`${formId}-email`}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Email Address{" "}
                  <span className="text-xs text-foreground/50">
                    (optional — required for a reply)
                  </span>
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  aria-describedby={errors.email ? `${formId}-email-err` : `${formId}-email-hint`}
                  aria-invalid={!!errors.email}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    errors.email ? "border-red-400" : "border-border"
                  }`}
                />
                <p id={`${formId}-email-hint`} className="mt-1 text-xs text-foreground/55">
                  Your email will only be used to respond to your feedback. It will not be shared.
                </p>
                {errors.email && (
                  <p id={`${formId}-email-err`} role="alert" className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3 w-3" aria-hidden /> {errors.email}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div>
                <p id={`${formId}-rating-label`} className="mb-1.5 block text-sm font-medium text-foreground">
                  Overall Rating <span className="text-xs text-foreground/50">(optional)</span>
                </p>
                <StarRating
                  value={rating}
                  onChange={setRating}
                  id={`${formId}-rating-label`}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor={`${formId}-message`}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Your Feedback <span aria-hidden className="text-red-600">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <textarea
                  id={`${formId}-message`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  aria-required="true"
                  aria-describedby={
                    errors.message
                      ? `${formId}-message-err`
                      : `${formId}-message-hint`
                  }
                  aria-invalid={!!errors.message}
                  placeholder="Please describe your feedback, question or suggestion in detail…"
                  className={`w-full resize-y rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    errors.message ? "border-red-400" : "border-border"
                  }`}
                />
                <p id={`${formId}-message-hint`} className="mt-1 text-xs text-foreground/55">
                  Minimum 10 characters. {message.length} characters entered.
                </p>
                {errors.message && (
                  <p id={`${formId}-message-err`} role="alert" className="mt-1 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3 w-3" aria-hidden /> {errors.message}
                  </p>
                )}
              </div>

              {/* CAPTCHA */}
              <fieldset className="rounded-lg border border-border p-4">
                <legend className="px-2 text-sm font-medium text-foreground">
                  Security Verification <span aria-hidden className="text-red-600">*</span>
                  <span className="sr-only">(required)</span>
                </legend>
                <p id={`${formId}-captcha-question`} className="mb-3 text-sm text-foreground/80">
                  What is{" "}
                  <strong aria-label={`${captcha.a} plus ${captcha.b}`}>
                    {captcha.a} + {captcha.b}
                  </strong>
                  ?
                </p>
                <div className="flex items-center gap-3">
                  <input
                    id={`${formId}-captcha`}
                    type="number"
                    inputMode="numeric"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setCaptchaError("");
                    }}
                    aria-required="true"
                    aria-describedby={
                      errors.captcha
                        ? `${formId}-captcha-err`
                        : `${formId}-captcha-question`
                    }
                    aria-invalid={!!errors.captcha}
                    aria-label={`Answer to ${captcha.a} + ${captcha.b}`}
                    className={`w-24 rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      errors.captcha ? "border-red-400" : "border-border"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground/70 hover:bg-accent transition-colors"
                    aria-label="Get a new security question"
                  >
                    <RefreshCw className="h-3 w-3" aria-hidden />
                    New question
                  </button>
                </div>
                {errors.captcha && (
                  <p id={`${formId}-captcha-err`} role="alert" className="mt-2 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle className="h-3 w-3" aria-hidden /> {errors.captcha}
                  </p>
                )}
              </fieldset>

              {/* Submit */}
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg"
                >
                  <Send className="h-4 w-4" aria-hidden />
                  Submit Feedback
                </button>
                <button
                  type="reset"
                  onClick={() => {
                    setCategory("");
                    setName("");
                    setEmail("");
                    setMessage("");
                    setRating(0);
                    setCaptchaInput("");
                    setCaptcha(generateCaptcha());
                    setErrors({});
                  }}
                  className="text-sm text-foreground/60 hover:text-foreground hover:underline"
                >
                  Reset form
                </button>
              </div>
            </form>
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-5" aria-label="Feedback sidebar">

            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-bold text-foreground">Contact Us Directly</h2>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">Kisan Call Centre</p>
                    <a href="tel:18001801551" className="text-primary hover:underline">
                      1800-180-1551
                    </a>
                    <p className="text-xs text-foreground/55">Toll-free · Mon–Fri, 9 AM–6 PM</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:nbm-agri@gov.in" className="text-primary hover:underline break-all">
                      nbm-agri@gov.in
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">Office</p>
                    <p className="text-xs leading-relaxed">
                      National Bamboo Mission Cell (NBMC),<br />
                      Krishi Bhawan, Dr. Rajendra Prasad Road,<br />
                      New Delhi – 110001
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 shadow-sm text-xs text-foreground/70 space-y-1.5">
              <p className="font-semibold text-foreground text-sm">Response Time</p>
              <p>We aim to respond to feedback within <strong>5 working days</strong>.</p>
              <p>For accessibility issues, we aim to resolve confirmed barriers within <strong>30 days</strong>.</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Related Pages</h3>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/accessibility" className="text-primary underline hover:opacity-80">Accessibility Statement</Link></li>
                <li><Link to="/contact/head-quarter" className="text-primary underline hover:opacity-80">Contact HQ</Link></li>
                <li><Link to="/rti" className="text-primary underline hover:opacity-80">Right to Information</Link></li>
                <li>
                  <a
                    href="https://pgportal.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:opacity-80"
                  >
                    Public Grievances Portal (pgportal.gov.in)
                  </a>
                </li>
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
