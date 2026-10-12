import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/SiteLayout";
import { fetchPasswordReset, submitNewPassword } from "@/lib/portal-client";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/set-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  head: () => ({
    meta: [{ title: "Set password | National Bamboo Mission" }],
  }),
  component: SetPasswordPage,
});

const inputCls =
  "w-full border border-border rounded px-3 py-2 bg-background text-sm outline-none focus:ring-2 focus:ring-ring";

function SetPasswordPage() {
  const { token } = Route.useSearch();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "ready" | "invalid" | "done">("loading");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState<"invite" | "reset">("invite");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const result = await fetchPasswordReset(token);
      if (cancelled) return;
      if (!result.valid) {
        setStatus("invalid");
        return;
      }
      setEmail(result.email);
      setPurpose(result.purpose);
      setStatus("ready");
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("The two passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      await submitNewPassword(token, password);
      setStatus("done");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not set password");
    } finally {
      setSaving(false);
    }
  }

  async function goToLogin() {
    await signOut();
    void navigate({ to: "/login" });
  }

  return (
    <>
      <PageHero
        title={purpose === "reset" ? "Reset password" : "Set password"}
        subtitle="Choose a password for your National Bamboo Mission State Login."
      />
      <section className="mx-auto max-w-md px-4 py-10">
        {status === "loading" ? <p className="text-sm text-muted-foreground">Checking this link…</p> : null}
        {status === "invalid" ? (
          <div className="bg-card border border-border rounded-lg p-6 text-sm">
            <p>This link is invalid or has expired. Request a new one from the State Login page.</p>
            <Link to="/login" className="mt-3 inline-block text-primary font-semibold hover:underline">
              Back to State Login
            </Link>
          </div>
        ) : null}
        {status === "ready" ? (
          <form onSubmit={onSubmit} className="bg-card border border-border rounded-lg p-6 space-y-3">
            <p className="text-sm text-muted-foreground">
              Account: <span className="text-foreground font-medium">{email}</span>
            </p>
            <label className="block text-xs font-semibold">
              New password
              <input
                type="password"
                autoComplete="new-password"
                className={`${inputCls} mt-1`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label className="block text-xs font-semibold">
              Confirm password
              <input
                type="password"
                autoComplete="new-password"
                className={`${inputCls} mt-1`}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </label>
            <p className="text-xs text-muted-foreground">At least 8 characters, with an uppercase letter, a lowercase letter, and a digit.</p>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded font-semibold disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save password"}
            </button>
          </form>
        ) : null}
        {status === "done" ? (
          <div className="bg-card border border-border rounded-lg p-6 text-sm space-y-3">
            <p>Your password is saved. Sign in with {email}.</p>
            <button type="button" onClick={() => void goToLogin()} className="text-primary font-semibold hover:underline">
              Continue to State Login
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}
