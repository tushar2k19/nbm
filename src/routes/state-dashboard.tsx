import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { PageHero } from "@/components/SiteLayout";
import { MetricAccent } from "@/components/MetricAccent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";
import { Building2, Search, Eye, CheckCircle2, XCircle, Clock, ShieldCheck, FileText, Download, LogIn } from "lucide-react";

export const Route = createFileRoute("/state-dashboard")({
  head: () => ({
    meta: [
      { title: "State Dashboard | National Bamboo Mission" },
      { name: "description", content: "State Bamboo Mission dashboard: review beneficiary applications, documents and update status." },
    ],
  }),
  component: StateDashboardPage,
});

function StateDashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isOfficer, setIsOfficer] = useState<boolean | null>(null);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const checkRole = useCallback(async () => {
    if (!session) { setIsOfficer(null); return; }
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .in("role", ["state", "admin"]);
    setIsOfficer((data ?? []).length > 0);
  }, [session]);

  useEffect(() => { checkRole(); }, [checkRole]);

  async function claimRole() {
    setClaiming(true);
    const { error } = await supabase.rpc("claim_state_role");
    setClaiming(false);
    if (error) { toast.error(error.message); return; }
    toast.success("State Officer role granted");
    checkRole();
  }

  if (!session) {
    return (
      <>
        <PageHero title="State Dashboard" subtitle="State Bamboo Mission portal." />
        <section className="mx-auto max-w-3xl px-4 py-10">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <LogIn className="h-10 w-10 mx-auto text-saffron mb-3" />
            <h2 className="text-lg font-semibold text-primary">Please sign in</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in via State Login to access the dashboard.</p>
            <Link to="/login" className="inline-block mt-4 bg-primary text-primary-foreground px-5 py-2 rounded font-semibold">Go to Login</Link>
          </div>
        </section>
      </>
    );
  }

  if (isOfficer === null) return <div className="px-4 py-10 text-sm text-muted-foreground">Checking access…</div>;

  if (!isOfficer) {
    return (
      <>
        <PageHero title="State Dashboard" subtitle="State Bamboo Mission portal." />
        <section className="mx-auto max-w-2xl px-4 py-10">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <ShieldCheck className="h-10 w-10 mx-auto text-saffron mb-3" />
            <h2 className="text-lg font-semibold text-primary">State Officer access required</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Your account does not yet have the State Officer role. In production, this role is granted by NBM HQ.
              For this demo portal, you may claim the role to view & verify beneficiary applications across States.
            </p>
            <button onClick={claimRole} disabled={claiming} className="mt-5 bg-primary text-primary-foreground px-5 py-2 rounded font-semibold disabled:opacity-60">
              {claiming ? "Granting…" : "Claim State Officer role (demo)"}
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title="State Dashboard" subtitle="Review beneficiary applications, documents and update verification status." />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <BeneficiariesTable />
      </section>
    </>
  );
}

function BeneficiariesTable() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<any | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("beneficiaries").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rows.filter(r => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (!q) return true;
    const t = q.toLowerCase();
    return [r.registration_no, r.full_name, r.state, r.district, r.village, r.mobile, r.aadhaar_no].some(v => String(v ?? "").toLowerCase().includes(t));
  });

  async function setStatus(row: any, status: string) {
    const { error } = await supabase.from("beneficiaries").update({ status }).eq("id", row.id);
    if (error) { toast.error(error.message); return; }
    toast.success(`Marked ${status}`);
    setRows(rs => rs.map(r => r.id === row.id ? { ...r, status } : r));
    if (selected?.id === row.id) setSelected({ ...selected, status });
  }

  const counts = {
    total: rows.length,
    pending: rows.filter(r => r.status === "pending").length,
    approved: rows.filter(r => r.status === "approved" || r.status === "verified").length,
    rejected: rows.filter(r => r.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <Kpi label="Total Applications" value={counts.total} icon={Building2} />
        <Kpi label="Pending Review" value={counts.pending} icon={Clock} />
        <Kpi label="Approved / Verified" value={counts.approved} icon={CheckCircle2} />
        <Kpi label="Rejected" value={counts.rejected} icon={XCircle} />
      </div>

      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="px-4 sm:px-5 py-3 bg-primary text-primary-foreground flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="font-semibold">Beneficiary Applications</span>
          <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto sm:items-center">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, reg. no, state…" className="w-full sm:w-64 pl-8 pr-3 py-1.5 rounded text-sm text-foreground bg-background border border-border" />
            </div>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="rounded text-sm text-foreground bg-background border border-border px-2 py-1.5">
              <option value="all">All status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground text-center">No applications found.</div>
        ) : (
          <>
            {/* Mobile card view */}
            <ul className="md:hidden divide-y divide-border">
              {filtered.map(r => (
                <li key={r.id} className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-primary truncate">{r.full_name}</div>
                    <StatusPill status={r.status} />
                  </div>
                  <div className="text-xs text-muted-foreground">{r.registration_no}</div>
                  <div className="text-sm">{r.state} · {r.district}</div>
                  <div className="text-xs text-muted-foreground">{r.component} · {r.area_under_bamboo_ha} ha</div>
                  <button onClick={()=>setSelected(r)} className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    <Eye className="h-3.5 w-3.5" />Review
                  </button>
                </li>
              ))}
            </ul>
            {/* Desktop table view */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-left">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-primary">Reg. No.</th>
                    <th className="px-3 py-2 font-semibold text-primary">Name</th>
                    <th className="px-3 py-2 font-semibold text-primary">State / District</th>
                    <th className="px-3 py-2 font-semibold text-primary">Component</th>
                    <th className="px-3 py-2 font-semibold text-primary">Area (ha)</th>
                    <th className="px-3 py-2 font-semibold text-primary">Status</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map(r => (
                    <tr key={r.id} className="hover:bg-secondary/40">
                      <td className="px-3 py-2 font-medium">{r.registration_no}</td>
                      <td className="px-3 py-2">{r.full_name}</td>
                      <td className="px-3 py-2">{r.state}<div className="text-xs text-muted-foreground">{r.district}</div></td>
                      <td className="px-3 py-2">{r.component}</td>
                      <td className="px-3 py-2">{r.area_under_bamboo_ha}</td>
                      <td className="px-3 py-2"><StatusPill status={r.status} /></td>
                      <td className="px-3 py-2 text-right">
                        <button onClick={()=>setSelected(r)} className="inline-flex items-center gap-1 text-primary hover:underline"><Eye className="h-3.5 w-3.5" />Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {selected && (
        <ReviewModal row={selected} onClose={()=>setSelected(null)} onStatus={(s)=>setStatus(selected, s)} />
      )}
    </div>
  );
}

function Kpi({ label, value, icon: Icon }: { label: string; value: number; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <MetricAccent icon={Icon as any} iconClassName="h-4 w-4">
        {label}
      </MetricAccent>
      <div className="mt-1 text-2xl font-display font-bold text-primary">{value}</div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const cls = s === "approved" || s === "verified"
    ? "bg-green-100 text-green-800 border-green-300"
    : s === "rejected"
    ? "bg-red-100 text-red-800 border-red-300"
    : "bg-amber-100 text-amber-800 border-amber-300";
  return <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border ${cls}`}>{status}</span>;
}

function ReviewModal({ row, onClose, onStatus }: { row: any; onClose: () => void; onStatus: (s: string) => void }) {
  const [docs, setDocs] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("beneficiary_documents").select("*").eq("beneficiary_id", row.id).order("created_at", { ascending: false })
      .then(({ data }) => setDocs(data ?? []));
  }, [row.id]);

  async function viewDoc(d: any) {
    const { data, error } = await supabase.storage.from("beneficiary-docs").createSignedUrl(d.file_path, 60);
    if (error) { toast.error(error.message); return; }
    window.open(data.signedUrl, "_blank", "noopener");
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start sm:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-card max-w-4xl w-full rounded-lg shadow-lg my-8" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
          <div>
            <div className="text-xs opacity-80">{row.registration_no}</div>
            <div className="font-display font-bold">{row.full_name}</div>
          </div>
          <button onClick={onClose} className="text-primary-foreground hover:opacity-80">✕</button>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <Cell label="Father / Husband" value={row.father_husband_name} />
            <Cell label="Gender / DOB" value={`${row.gender} · ${row.date_of_birth}`} />
            <Cell label="Category" value={row.category} />
            <Cell label="Mobile" value={row.mobile} />
            <Cell label="Email" value={row.email || "—"} />
            <Cell label="Aadhaar" value={`••• ${String(row.aadhaar_no).slice(-4)}`} />
            <Cell label="State / District" value={`${row.state} / ${row.district}`} />
            <Cell label="Block / Village" value={`${row.block} / ${row.village}`} />
            <Cell label="PIN" value={row.pincode} />
            <Cell label="Khasra No." value={row.khasra_no || "—"} />
            <Cell label="Total land (ha)" value={String(row.total_land_area_ha)} />
            <Cell label="Area under bamboo (ha)" value={String(row.area_under_bamboo_ha)} />
            <Cell label="Component" value={row.component} />
            <Cell label="Species" value={row.bamboo_species || "—"} />
            <Cell label="Year of plantation" value={row.year_of_plantation || "—"} />
            <Cell label="Bank" value={`${row.bank_name} (${row.bank_branch})`} />
            <Cell label="A/c · IFSC" value={`${row.account_no} · ${row.ifsc}`} />
            <Cell label="Current status" value={row.status} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-saffron" />
              <h3 className="font-semibold text-primary">Uploaded Documents ({docs.length})</h3>
            </div>
            {docs.length === 0 ? (
              <div className="text-sm text-muted-foreground border border-dashed border-border rounded p-4 text-center">No documents uploaded by this beneficiary.</div>
            ) : (
              <ul className="divide-y divide-border border border-border rounded">
                {docs.map(d => (
                  <li key={d.id} className="flex items-center justify-between px-3 py-2 text-sm">
                    <div>
                      <div className="font-medium">{d.doc_type}</div>
                      <div className="text-xs text-muted-foreground">{d.file_name} · {d.size_bytes ? `${(d.size_bytes/1024).toFixed(0)} KB` : ""} · {new Date(d.created_at).toLocaleDateString("en-IN")}</div>
                    </div>
                    <button onClick={()=>viewDoc(d)} className="inline-flex items-center gap-1 text-primary hover:underline"><Download className="h-3.5 w-3.5" />View</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
            <button onClick={()=>onStatus("verified")} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90">Mark Verified</button>
            <button onClick={()=>onStatus("approved")} className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90">Approve</button>
            <button onClick={()=>onStatus("rejected")} className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90">Reject</button>
            <button onClick={()=>onStatus("pending")} className="bg-amber-500 text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-90">Reset to Pending</button>
            <button onClick={onClose} className="ml-auto bg-secondary text-foreground px-4 py-2 rounded text-sm">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-border rounded p-2 bg-background">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium truncate">{value || "—"}</div>
    </div>
  );
}
