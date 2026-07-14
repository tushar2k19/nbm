import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, User, ShieldCheck, HelpCircle, RefreshCw } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/mis-login")({
  head: () => ({
    meta: [
      { title: "MIS Login | National Bamboo Mission" },
      { name: "description", content: "Management Information System login for State Bamboo Missions and authorised NBM officials." },
    ],
  }),
  component: MisLoginPage,
});

function generateChallenge(): [number, number] {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return [a, b];
}

function MisLoginPage() {
  const [num1, setNum1] = useState(() => generateChallenge()[0]);
  const [num2, setNum2] = useState(() => generateChallenge()[1]);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  function refreshCaptcha() {
    const [a, b] = generateChallenge();
    setNum1(a);
    setNum2(b);
    setCaptchaInput("");
    setCaptchaError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const expected = num1 + num2;
    if (parseInt(captchaInput, 10) !== expected) {
      setCaptchaError(`Incorrect. The answer to ${num1} + ${num2} is ${expected}. Please try again.`);
      refreshCaptcha();
      return;
    }
    setCaptchaError("");
    alert("This is a prototype — MIS authentication is not enabled.");
  }

  const captchaId = "mis-captcha";
  const captchaDescId = "mis-captcha-desc";
  const captchaErrId = "mis-captcha-err";

  return (
    <>
      <PageHero title="MIS Login" subtitle="Authorised access to the NBM Management Information System." />
      <section className="mx-auto max-w-5xl px-4 py-12 grid gap-8 md:grid-cols-2">
        <form
          className="bg-card border border-border rounded-lg shadow-soft p-6"
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby="mis-form-title"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-saffron" aria-hidden />
            <h2 id="mis-form-title" className="text-lg font-semibold text-primary">Official Sign In</h2>
          </div>

          {/* User ID */}
          <div className="mb-4">
            <label
              htmlFor="mis-userid"
              className="block text-xs font-semibold text-foreground mb-1"
            >
              User ID
            </label>
            <div className="flex items-center gap-2 border border-border rounded px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-ring">
              <User className="h-4 w-4 text-muted-foreground" aria-hidden />
              <input
                id="mis-userid"
                type="text"
                name="username"
                autoComplete="username"
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="e.g. NBM-AS-001"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                aria-required="true"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="mis-password"
              className="block text-xs font-semibold text-foreground mb-1"
            >
              Password
            </label>
            <div className="flex items-center gap-2 border border-border rounded px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-ring">
              <Lock className="h-4 w-4 text-muted-foreground" aria-hidden />
              <input
                id="mis-password"
                type="password"
                name="password"
                autoComplete="current-password"
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>
          </div>

          {/* Accessible math CAPTCHA (replaces visual-only CAPTCHA) */}
          <div className="mb-5">
            <label
              htmlFor={captchaId}
              className="block text-xs font-semibold text-foreground mb-1"
            >
              Security Check
            </label>
            <p id={captchaDescId} className="text-xs text-muted-foreground mb-2">
              What is <strong>{num1} + {num2}</strong>? Enter the number to verify you are human.
            </p>
            <div className="flex items-center gap-2">
              <input
                id={captchaId}
                type="number"
                name="captcha"
                autoComplete="off"
                inputMode="numeric"
                className="w-24 border border-border rounded px-3 py-2 bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="Answer"
                value={captchaInput}
                onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(""); }}
                required
                aria-required="true"
                aria-describedby={`${captchaDescId}${captchaError ? ` ${captchaErrId}` : ""}`}
                aria-invalid={captchaError ? "true" : undefined}
              />
              <button
                type="button"
                onClick={refreshCaptcha}
                className="flex items-center gap-1 text-xs text-primary hover:underline"
                aria-label="Refresh security question"
              >
                <RefreshCw className="h-3 w-3" aria-hidden />
                New question
              </button>
            </div>
            {captchaError && (
              <p
                id={captchaErrId}
                role="alert"
                className="mt-1.5 text-xs text-destructive font-medium"
              >
                {captchaError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2.5 rounded font-semibold hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            Sign In
          </button>
          <div className="flex justify-between mt-3 text-xs">
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
            <a href="#" className="text-primary hover:underline">Request new ID</a>
          </div>
        </form>

        <div className="space-y-4">
          <div className="bg-secondary border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <HelpCircle className="h-4 w-4" aria-hidden /> Who can access?
            </div>
            <ul className="mt-2 text-sm text-foreground/90 list-disc pl-5 space-y-1">
              <li>State Nodal Officers, State Bamboo Missions</li>
              <li>District Bamboo Mission Coordinators</li>
              <li>NBM Headquarters officials</li>
              <li>Empanelled Implementing Agencies</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="font-semibold text-primary">Need help?</div>
            <p className="text-sm text-muted-foreground mt-1">
              Contact the MIS Helpdesk on <strong>+91-11-2338-2651</strong> (10:00 AM – 6:00 PM, Mon–Fri) or write to{" "}
              <a href="mailto:mis-nbm@gov.in" className="text-primary hover:underline">mis-nbm@gov.in</a>.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            ⚠ For security, do not share your credentials. All access is logged and audited.
          </div>
        </div>
      </section>
    </>
  );
}
