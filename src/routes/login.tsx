import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2 } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { getPortalPath } from "@/lib/roles";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "State Login | National Bamboo Mission" },
      { name: "description", content: "Secure login for State Bamboo Mission officials under the National Bamboo Mission (NBM)." },
    ],
  }),
  component: LoginPage,
});

const inputCls =
  "w-full border border-border rounded px-3 py-2 bg-background text-sm outline-none focus:ring-2 focus:ring-ring focus:border-primary";

function LoginPage() {
  return (
    <>
      <PageHero
        title="State Login"
        subtitle="Secure login for State Bamboo Mission officials under the National Bamboo Mission."
      />
      <section id="state" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10">
        <StateLogin />
      </section>
    </>
  );
}

function StateLogin() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, role, loading: authLoading } = useAuth();

  // Redirect to portal if already authenticated
  useEffect(() => {
    if (!authLoading && user && role) {
      void navigate({ to: getPortalPath(role), replace: true });
    }
  }, [user, role, authLoading, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Signed in. Redirecting to portal...");
  }

  const helperId = "state-login-helper";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form
        onSubmit={onSubmit}
        className="bg-card border border-border rounded-lg shadow-soft p-6"
        aria-labelledby="state-login-title"
        noValidate
      >
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-saffron" aria-hidden />
          <h2 id="state-login-title" className="text-lg font-semibold text-primary">
            State Bamboo Mission — Sign In
          </h2>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label
            htmlFor="state-email"
            className="block text-xs font-semibold text-foreground mb-1"
          >
            Official Email <span className="text-saffron" aria-hidden>*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="state-email"
            type="email"
            name="email"
            autoComplete="email"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="officer@nbm.state.gov.in"
            required
            aria-required="true"
            aria-describedby={helperId}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="state-password"
            className="block text-xs font-semibold text-foreground mb-1"
          >
            Password <span className="text-saffron" aria-hidden>*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="state-password"
            type="password"
            name="password"
            autoComplete="current-password"
            className={inputCls}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-primary text-primary-foreground py-2.5 rounded font-semibold hover:opacity-90 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>

        <p id={helperId} className="text-xs text-muted-foreground mt-3">
          State Officer accounts are provisioned by NBM Headquarters. Contact{" "}
          <a href="mailto:mis-nbm@gov.in" className="text-primary hover:underline">
            mis-nbm@gov.in
          </a>{" "}
          for credentials.
        </p>
      </form>

      <div className="bg-secondary border border-border rounded-lg p-5">
        <div className="font-semibold text-primary">State Login provides access to</div>
        <ul className="mt-2 text-sm text-foreground/90 list-disc pl-5 space-y-1">
          <li>Verification &amp; sanction workflow</li>
          <li>Component-wise physical and financial progress</li>
          <li>Fund release tracking against AAP</li>
          <li>Quarterly Progress Reports (QPR) submission</li>
        </ul>
      </div>
    </div>
  );
}
