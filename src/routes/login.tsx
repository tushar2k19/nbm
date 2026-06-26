import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Mail, ShieldCheck, UserPlus, LogIn, Building2, CheckCircle2, LogOut, FileText } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login & Beneficiary Registration | National Bamboo Mission" },
      { name: "description", content: "State login and Beneficiary registration portal under the National Bamboo Mission (NBM)." },
    ],
  }),
  component: LoginPage,
});

type Tab = "beneficiary" | "state" | "register";

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman & Nicobar","Delhi","J&K","Ladakh",
];

const COMPONENTS = [
  "Bamboo Plantation",
  "Accredited Nursery",
  "Tissue Culture Lab",
  "Primary Processing Unit",
  "Treatment & Seasoning Plant",
  "Agarbatti / Stick Unit",
  "Common Facility Centre (Handicrafts)",
  "Product Development & Marketing",
];

function LoginPage() {
  const [tab, setTab] = useState<Tab>("beneficiary");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const h = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (h === "state" || h === "beneficiary" || h === "register") setTab(h as Tab);
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <>
      <PageHero
        title="Login & Beneficiary Registration"
        subtitle="State Bamboo Mission login and Beneficiary Registration under the National Bamboo Mission."
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        {session ? (
          <SignedInPanel session={session} />
        ) : (
          <>
            <div className="flex flex-wrap gap-2 border-b border-border mb-6">
              <TabBtn active={tab === "beneficiary"} onClick={() => setTab("beneficiary")} icon={<LogIn className="h-4 w-4" />}>Beneficiary Login</TabBtn>
              <TabBtn active={tab === "register"} onClick={() => setTab("register")} icon={<UserPlus className="h-4 w-4" />}>Beneficiary Registration</TabBtn>
              <TabBtn active={tab === "state"} onClick={() => setTab("state")} icon={<Building2 className="h-4 w-4" />}>State Login</TabBtn>
            </div>
            {tab === "beneficiary" && <BeneficiaryLogin />}
            {tab === "register" && <RegisterAccount onDone={() => setTab("beneficiary")} />}
            {tab === "state" && <StateLogin />}
          </>
        )}
      </section>
    </>
  );
}

function TabBtn({ active, onClick, children, icon }: { active: boolean; onClick: () => void; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 -mb-px text-sm font-medium border-b-2 transition ${
        active ? "border-saffron text-primary" : "border-transparent text-muted-foreground hover:text-primary"
      }`}
    >
      {icon} {children}
    </button>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-foreground mb-1">
      {label}{required && <span className="text-saffron"> *</span>}
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputCls = "w-full border border-border rounded px-3 py-2 bg-background text-sm outline-none focus:border-primary";

function BeneficiaryLogin() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Signed in");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="h-5 w-5 text-saffron" />
        <h2 className="text-lg font-semibold text-primary">Beneficiary Sign In</h2>
      </div>
      <Field label="Registered Email" required>
        <div className="flex items-center gap-2 border border-border rounded px-3 py-2 bg-background">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <input required type="email" className="flex-1 bg-transparent outline-none text-sm" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
      </Field>
      <Field label="Password" required>
        <div className="flex items-center gap-2 border border-border rounded px-3 py-2 bg-background">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <input required type="password" className="flex-1 bg-transparent outline-none text-sm" value={pwd} onChange={e=>setPwd(e.target.value)} />
        </div>
      </Field>
      <button disabled={loading} className="mt-2 w-full bg-primary text-primary-foreground py-2.5 rounded font-semibold hover:opacity-90 disabled:opacity-60">
        {loading ? "Signing in…" : "Sign In"}
      </button>
      <p className="text-xs text-muted-foreground mt-3">New here? Use the <strong>Beneficiary Registration</strong> tab to create your account and submit your application.</p>
    </form>
  );
}

function StateLogin() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Signed in. Welcome, State Officer.");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form onSubmit={onSubmit} className="bg-card border border-border rounded-lg shadow-soft p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-saffron" />
          <h2 className="text-lg font-semibold text-primary">State Bamboo Mission — Sign In</h2>
        </div>
        <Field label="Official Email" required>
          <input required type="email" className={inputCls} value={email} onChange={e=>setEmail(e.target.value)} placeholder="officer@nbm.state.gov.in" />
        </Field>
        <Field label="Password" required>
          <input required type="password" className={inputCls} value={pwd} onChange={e=>setPwd(e.target.value)} />
        </Field>
        <button disabled={loading} className="mt-2 w-full bg-primary text-primary-foreground py-2.5 rounded font-semibold hover:opacity-90 disabled:opacity-60">
          {loading ? "Signing in…" : "Sign In"}
        </button>
        <p className="text-xs text-muted-foreground mt-3">State Officer accounts are provisioned by NBM Headquarters. Contact <a href="mailto:mis-nbm@gov.in" className="text-primary hover:underline">mis-nbm@gov.in</a> for credentials.</p>
      </form>
      <div className="bg-secondary border border-border rounded-lg p-5">
        <div className="font-semibold text-primary">State Login provides access to</div>
        <ul className="mt-2 text-sm text-foreground/90 list-disc pl-5 space-y-1">
          <li>Beneficiary applications received in the State</li>
          <li>Verification & sanction workflow</li>
          <li>Component-wise physical and financial progress</li>
          <li>Fund release tracking against AAP</li>
          <li>Quarterly Progress Reports (QPR) submission</li>
        </ul>
      </div>
    </div>
  );
}

function RegisterAccount({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pwd.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password: pwd,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { full_name: name },
      },
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Account created. You can now fill the registration form below.");
    onDone();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form onSubmit={onSubmit} className="bg-card border border-border rounded-lg shadow-soft p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="h-5 w-5 text-saffron" />
          <h2 className="text-lg font-semibold text-primary">Create Beneficiary Account</h2>
        </div>
        <Field label="Full Name (as per Aadhaar)" required>
          <input required className={inputCls} value={name} onChange={e=>setName(e.target.value)} />
        </Field>
        <Field label="Email" required>
          <input required type="email" className={inputCls} value={email} onChange={e=>setEmail(e.target.value)} />
        </Field>
        <Field label="Password (min 6 chars)" required>
          <input required type="password" minLength={6} className={inputCls} value={pwd} onChange={e=>setPwd(e.target.value)} />
        </Field>
        <button disabled={loading} className="mt-2 w-full bg-primary text-primary-foreground py-2.5 rounded font-semibold hover:opacity-90 disabled:opacity-60">
          {loading ? "Creating…" : "Create Account"}
        </button>
        <p className="text-xs text-muted-foreground mt-3">After creating your account, sign in and complete your <strong>Beneficiary Registration Form</strong> (Aadhaar, land, bank & component details — as per the MIDH/NBM beneficiary registration format).</p>
      </form>
      <div className="bg-secondary border border-border rounded-lg p-5 text-sm">
        <div className="font-semibold text-primary mb-2">Registration Form — Sections you'll fill</div>
        <ul className="list-disc pl-5 space-y-1 text-foreground/90">
          <li><strong>Personal:</strong> Name, Father/Husband's name, Gender, DOB, Category (Gen/SC/ST/OBC), Aadhaar, Mobile, Email</li>
          <li><strong>Address:</strong> State, District, Block, Gram Panchayat, Village, PIN code</li>
          <li><strong>Land:</strong> Khasra No., Total land area (ha), Area under bamboo (ha), Land type</li>
          <li><strong>Component:</strong> Plantation / Nursery / Processing etc., Bamboo species, Year, Spacing</li>
          <li><strong>Bank:</strong> Bank, Branch, Account No., IFSC (for DBT)</li>
        </ul>
      </div>
    </div>
  );
}

function SignedInPanel({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [existing, setExisting] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("beneficiaries").select("*").eq("user_id", session.user.id).maybeSingle();
      setExisting(data);
      setLoading(false);
    })();
  }, [session.user.id]);

  async function signOut() {
    await supabase.auth.signOut();
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading your account…</div>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-secondary border border-border rounded-lg">
        <div className="text-sm">
          Signed in as <strong>{session.user.email}</strong>
        </div>
        <button onClick={signOut} className="inline-flex items-center gap-2 text-sm bg-card border border-border px-3 py-1.5 rounded hover:bg-background">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      {existing ? (
        <SubmittedView b={existing} onEdit={() => setExisting(null)} />
      ) : (
        <RegistrationForm session={session} onSaved={(b) => setExisting(b)} />
      )}
    </div>
  );
}

function SubmittedView({ b, onEdit }: { b: any; onEdit: () => void }) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
        <CheckCircle2 className="h-5 w-5 text-green-600" /> Registration submitted successfully
      </div>
      <div className="grid sm:grid-cols-2 gap-3 text-sm mt-4">
        <Info label="Registration No." value={b.registration_no} />
        <Info label="Status" value={b.status} />
        <Info label="Name" value={b.full_name} />
        <Info label="State" value={b.state} />
        <Info label="District" value={b.district} />
        <Info label="Component" value={b.component} />
        <Info label="Area under bamboo (ha)" value={String(b.area_under_bamboo_ha)} />
        <Info label="Mobile" value={b.mobile} />
      </div>
      <div className="mt-5 flex gap-3">
        <button onClick={onEdit} className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90">
          <FileText className="h-4 w-4" /> Edit / Re-submit
        </button>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded p-3 bg-background">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium text-foreground mt-0.5">{value || "—"}</div>
    </div>
  );
}

function RegistrationForm({ session, onSaved }: { session: Session; onSaved: (b: any) => void }) {
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({
    full_name: "",
    father_husband_name: "",
    gender: "Male",
    date_of_birth: "",
    category: "General",
    aadhaar_no: "",
    mobile: "",
    email: session.user.email ?? "",
    state: "",
    district: "",
    block: "",
    gram_panchayat: "",
    village: "",
    pincode: "",
    khasra_no: "",
    total_land_area_ha: "",
    area_under_bamboo_ha: "",
    land_type: "Own",
    component: "Bamboo Plantation",
    bamboo_species: "",
    year_of_plantation: "",
    spacing: "",
    bank_name: "",
    bank_branch: "",
    account_no: "",
    ifsc: "",
  });

  function set<K extends keyof typeof f>(k: K, v: string) { setF((p) => ({ ...p, [k]: v })); }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{12}$/.test(f.aadhaar_no)) { toast.error("Aadhaar must be 12 digits"); return; }
    if (!/^\d{10}$/.test(f.mobile)) { toast.error("Mobile must be 10 digits"); return; }
    if (!/^\d{6}$/.test(f.pincode)) { toast.error("PIN code must be 6 digits"); return; }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(f.ifsc)) { toast.error("Invalid IFSC code"); return; }
    setSaving(true);
    const payload = {
      user_id: session.user.id,
      ...f,
      total_land_area_ha: Number(f.total_land_area_ha),
      area_under_bamboo_ha: Number(f.area_under_bamboo_ha),
      year_of_plantation: f.year_of_plantation ? Number(f.year_of_plantation) : null,
    };
    const { data, error } = await supabase.from("beneficiaries").insert(payload).select().single();
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Beneficiary registration submitted");
    onSaved(data);
  }

  return (
    <form onSubmit={onSubmit} className="bg-card border border-border rounded-lg shadow-soft p-6 space-y-8">
      <div>
        <div className="text-lg font-semibold text-primary mb-1">Beneficiary Registration Form</div>
        <p className="text-xs text-muted-foreground">As per NBM / MIDH beneficiary registration format. All fields marked * are mandatory.</p>
      </div>

      <Section title="A. Personal Details">
        <Field label="Full Name (as per Aadhaar)" required><input required className={inputCls} value={f.full_name} onChange={e=>set("full_name", e.target.value)} /></Field>
        <Field label="Father's / Husband's Name" required><input required className={inputCls} value={f.father_husband_name} onChange={e=>set("father_husband_name", e.target.value)} /></Field>
        <Field label="Gender" required>
          <select required className={inputCls} value={f.gender} onChange={e=>set("gender", e.target.value)}>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </Field>
        <Field label="Date of Birth" required><input required type="date" className={inputCls} value={f.date_of_birth} onChange={e=>set("date_of_birth", e.target.value)} /></Field>
        <Field label="Social Category" required>
          <select required className={inputCls} value={f.category} onChange={e=>set("category", e.target.value)}>
            <option>General</option><option>SC</option><option>ST</option><option>OBC</option>
          </select>
        </Field>
        <Field label="Aadhaar Number (12 digits)" required><input required pattern="\d{12}" maxLength={12} className={inputCls} value={f.aadhaar_no} onChange={e=>set("aadhaar_no", e.target.value.replace(/\D/g,""))} /></Field>
        <Field label="Mobile Number (10 digits)" required><input required pattern="\d{10}" maxLength={10} className={inputCls} value={f.mobile} onChange={e=>set("mobile", e.target.value.replace(/\D/g,""))} /></Field>
        <Field label="Email"><input type="email" className={inputCls} value={f.email} onChange={e=>set("email", e.target.value)} /></Field>
      </Section>

      <Section title="B. Address">
        <Field label="State" required>
          <select required className={inputCls} value={f.state} onChange={e=>set("state", e.target.value)}>
            <option value="">-- Select State --</option>
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="District" required><input required className={inputCls} value={f.district} onChange={e=>set("district", e.target.value)} /></Field>
        <Field label="Block / Tehsil" required><input required className={inputCls} value={f.block} onChange={e=>set("block", e.target.value)} /></Field>
        <Field label="Gram Panchayat"><input className={inputCls} value={f.gram_panchayat} onChange={e=>set("gram_panchayat", e.target.value)} /></Field>
        <Field label="Village" required><input required className={inputCls} value={f.village} onChange={e=>set("village", e.target.value)} /></Field>
        <Field label="PIN Code (6 digits)" required><input required pattern="\d{6}" maxLength={6} className={inputCls} value={f.pincode} onChange={e=>set("pincode", e.target.value.replace(/\D/g,""))} /></Field>
      </Section>

      <Section title="C. Land Details">
        <Field label="Khasra / Survey No."><input className={inputCls} value={f.khasra_no} onChange={e=>set("khasra_no", e.target.value)} /></Field>
        <Field label="Total Land Area (in hectare)" required><input required type="number" step="0.001" min="0" className={inputCls} value={f.total_land_area_ha} onChange={e=>set("total_land_area_ha", e.target.value)} /></Field>
        <Field label="Area Proposed under Bamboo (ha)" required><input required type="number" step="0.001" min="0" className={inputCls} value={f.area_under_bamboo_ha} onChange={e=>set("area_under_bamboo_ha", e.target.value)} /></Field>
        <Field label="Land Type" required>
          <select required className={inputCls} value={f.land_type} onChange={e=>set("land_type", e.target.value)}>
            <option>Own</option><option>Leased</option><option>Community / Forest</option>
          </select>
        </Field>
      </Section>

      <Section title="D. Component / Crop">
        <Field label="Component applied for" required>
          <select required className={inputCls} value={f.component} onChange={e=>set("component", e.target.value)}>
            {COMPONENTS.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Bamboo Species"><input className={inputCls} placeholder="e.g. Bambusa balcooa, Dendrocalamus strictus" value={f.bamboo_species} onChange={e=>set("bamboo_species", e.target.value)} /></Field>
        <Field label="Year of Plantation"><input type="number" min="2000" max="2099" className={inputCls} value={f.year_of_plantation} onChange={e=>set("year_of_plantation", e.target.value)} /></Field>
        <Field label="Spacing (m x m)"><input className={inputCls} placeholder="e.g. 5 x 4" value={f.spacing} onChange={e=>set("spacing", e.target.value)} /></Field>
      </Section>

      <Section title="E. Bank Details (for DBT)">
        <Field label="Bank Name" required><input required className={inputCls} value={f.bank_name} onChange={e=>set("bank_name", e.target.value)} /></Field>
        <Field label="Branch" required><input required className={inputCls} value={f.bank_branch} onChange={e=>set("bank_branch", e.target.value)} /></Field>
        <Field label="Account Number" required><input required className={inputCls} value={f.account_no} onChange={e=>set("account_no", e.target.value.replace(/\D/g,""))} /></Field>
        <Field label="IFSC Code" required><input required maxLength={11} className={inputCls} value={f.ifsc} onChange={e=>set("ifsc", e.target.value.toUpperCase())} /></Field>
      </Section>

      <div className="flex gap-3 pt-2 border-t border-border">
        <button disabled={saving} className="bg-primary text-primary-foreground px-6 py-2.5 rounded font-semibold hover:opacity-90 disabled:opacity-60">
          {saving ? "Submitting…" : "Submit Registration"}
        </button>
        <p className="text-xs text-muted-foreground self-center">By submitting, you declare the information is true and consent to its use by NBM / State Bamboo Mission for processing your application.</p>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-1.5 bg-saffron rounded" />
        <h3 className="font-semibold text-primary">{title}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}
