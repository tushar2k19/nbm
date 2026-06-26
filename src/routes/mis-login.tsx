import { createFileRoute } from "@tanstack/react-router";
import { Lock, User, ShieldCheck, HelpCircle } from "lucide-react";
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

function MisLoginPage() {
  return (
    <>
      <PageHero title="MIS Login" subtitle="Authorised access to the NBM Management Information System." />
      <section className="mx-auto max-w-5xl px-4 py-12 grid gap-8 md:grid-cols-2">
        <form
          className="bg-card border border-border rounded-lg shadow-soft p-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("This is a prototype — MIS authentication is not enabled.");
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-saffron" />
            <h2 className="text-lg font-semibold text-primary">Official Sign In</h2>
          </div>
          <label className="block text-xs font-semibold text-foreground mb-1">User ID</label>
          <div className="flex items-center gap-2 border border-border rounded px-3 py-2 mb-4 bg-background">
            <User className="h-4 w-4 text-muted-foreground" />
            <input type="text" className="flex-1 bg-transparent outline-none text-sm" placeholder="e.g. NBM-AS-001" />
          </div>
          <label className="block text-xs font-semibold text-foreground mb-1">Password</label>
          <div className="flex items-center gap-2 border border-border rounded px-3 py-2 mb-4 bg-background">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <input type="password" className="flex-1 bg-transparent outline-none text-sm" placeholder="••••••••" />
          </div>
          <label className="block text-xs font-semibold text-foreground mb-1">Captcha</label>
          <div className="flex items-center gap-2 mb-5">
            <div className="px-3 py-2 bg-secondary rounded font-mono tracking-widest text-sm select-none">4 G k 9 P 2</div>
            <input type="text" className="flex-1 border border-border rounded px-3 py-2 bg-background text-sm outline-none" placeholder="Enter captcha" />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded font-semibold hover:opacity-90">
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
              <HelpCircle className="h-4 w-4" /> Who can access?
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
              Contact the MIS Helpdesk on <strong>+91-11-2338-2651</strong> (10:00 AM – 6:00 PM, Mon–Fri) or write to <a href="mailto:mis-nbm@gov.in" className="text-primary hover:underline">mis-nbm@gov.in</a>.
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
