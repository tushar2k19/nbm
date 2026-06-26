import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { PageHero } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";
import { Upload, FileText, Trash2, Download, CheckCircle2, Clock, XCircle, LogIn } from "lucide-react";

export const Route = createFileRoute("/beneficiary-dashboard")({
  head: () => ({
    meta: [
      { title: "Beneficiary Dashboard | National Bamboo Mission" },
      { name: "description", content: "Track your NBM beneficiary application status and upload supporting documents." },
    ],
  }),
  component: BeneficiaryDashboardPage,
});

const DOC_TYPES = [
  "Aadhaar Card",
  "Passport-size Photograph",
  "Land Record / Khasra / Patta",
  "Bank Passbook (front page)",
  "Caste Certificate (SC/ST/OBC)",
  "Component DPR / Quotation",
  "Other Supporting Document",
] as const;

function BeneficiaryDashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [b, setB] = useState<any | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    const { data } = await supabase.from("beneficiaries").select("*").eq("user_id", session.user.id).maybeSingle();
    setB(data);
    setLoading(false);
  }, [session]);

  useEffect(() => { load(); }, [load]);

  return (
    <>
      <PageHero title="Beneficiary Dashboard" subtitle="Your NBM application, status, and supporting documents." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        {!session ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <LogIn className="h-10 w-10 mx-auto text-saffron mb-3" />
            <h2 className="text-lg font-semibold text-primary">Please sign in</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in as a beneficiary to view your dashboard.</p>
            <Link to="/login" className="inline-block mt-4 bg-primary text-primary-foreground px-5 py-2 rounded font-semibold">Go to Login</Link>
          </div>
        ) : loading ? (
          <div className="text-sm text-muted-foreground">Loading your application…</div>
        ) : !b ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <FileText className="h-10 w-10 mx-auto text-saffron mb-3" />
            <h2 className="text-lg font-semibold text-primary">No application found</h2>
            <p className="text-sm text-muted-foreground mt-1">Submit your Beneficiary Registration Form first.</p>
            <Link to="/login" className="inline-block mt-4 bg-primary text-primary-foreground px-5 py-2 rounded font-semibold">Register now</Link>
          </div>
        ) : (
          <div className="space-y-8">
            <ApplicationCard b={b} />
            <DocumentsPanel beneficiaryId={b.id} userId={session.user.id} />
          </div>
        )}
      </section>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const cfg = s === "approved" || s === "verified"
    ? { Icon: CheckCircle2, cls: "bg-green-100 text-green-800 border-green-300" }
    : s === "rejected"
    ? { Icon: XCircle, cls: "bg-red-100 text-red-800 border-red-300" }
    : { Icon: Clock, cls: "bg-amber-100 text-amber-800 border-amber-300" };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded border ${cfg.cls}`}>
      <cfg.Icon className="h-3.5 w-3.5" /> {status}
    </span>
  );
}

function ApplicationCard({ b }: { b: any }) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <div className="text-xs text-muted-foreground">Registration No.</div>
          <div className="font-display text-xl font-bold text-primary">{b.registration_no}</div>
        </div>
        <StatusBadge status={b.status} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
        <Info label="Name" value={b.full_name} />
        <Info label="Father/Husband" value={b.father_husband_name} />
        <Info label="Mobile" value={b.mobile} />
        <Info label="State" value={b.state} />
        <Info label="District" value={b.district} />
        <Info label="Village" value={b.village} />
        <Info label="Component" value={b.component} />
        <Info label="Bamboo Species" value={b.bamboo_species || "—"} />
        <Info label="Area under Bamboo (ha)" value={String(b.area_under_bamboo_ha)} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded p-3 bg-background">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium text-foreground mt-0.5 truncate">{value || "—"}</div>
    </div>
  );
}

function DocumentsPanel({ beneficiaryId, userId }: { beneficiaryId: string; userId: string }) {
  const [docs, setDocs] = useState<any[]>([]);
  const [docType, setDocType] = useState<string>(DOC_TYPES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("beneficiary_documents")
      .select("*")
      .eq("beneficiary_id", beneficiaryId)
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setDocs(data ?? []);
  }, [beneficiaryId]);

  useEffect(() => { load(); }, [load]);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { toast.error("Choose a file"); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error("Max 10 MB per file"); return; }
    setUploading(true);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${userId}/${beneficiaryId}/${Date.now()}_${safeName}`;
    const { error: upErr } = await supabase.storage.from("beneficiary-docs").upload(path, file, {
      contentType: file.type || "application/octet-stream",
    });
    if (upErr) { setUploading(false); toast.error(upErr.message); return; }
    const { error: insErr } = await supabase.from("beneficiary_documents").insert({
      beneficiary_id: beneficiaryId,
      user_id: userId,
      doc_type: docType,
      file_path: path,
      file_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
    });
    setUploading(false);
    if (insErr) { toast.error(insErr.message); return; }
    toast.success("Document uploaded");
    setFile(null);
    (document.getElementById("doc-file-input") as HTMLInputElement | null)?.value && ((document.getElementById("doc-file-input") as HTMLInputElement).value = "");
    load();
  }

  async function onDownload(d: any) {
    const { data, error } = await supabase.storage.from("beneficiary-docs").createSignedUrl(d.file_path, 60);
    if (error) { toast.error(error.message); return; }
    window.open(data.signedUrl, "_blank", "noopener");
  }

  async function onDelete(d: any) {
    if (!confirm(`Delete ${d.file_name}?`)) return;
    await supabase.storage.from("beneficiary-docs").remove([d.file_path]);
    const { error } = await supabase.from("beneficiary_documents").delete().eq("id", d.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="h-5 w-5 text-saffron" />
        <h2 className="text-lg font-semibold text-primary">Supporting Documents</h2>
      </div>

      <form onSubmit={onUpload} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end p-4 bg-secondary border border-border rounded mb-5">
        <label className="block text-xs font-semibold">
          Document type
          <select value={docType} onChange={e=>setDocType(e.target.value)} className="mt-1 w-full border border-border rounded px-3 py-2 bg-background text-sm">
            {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block text-xs font-semibold">
          File (PDF / JPG / PNG, max 10 MB)
          <input id="doc-file-input" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>setFile(e.target.files?.[0] ?? null)} className="mt-1 w-full text-sm" />
        </label>
        <button disabled={uploading} className="w-full sm:w-auto bg-primary text-primary-foreground px-4 py-2 rounded font-semibold disabled:opacity-60">
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </form>

      {docs.length === 0 ? (
        <div className="text-sm text-muted-foreground text-center py-8">No documents uploaded yet.</div>
      ) : (
        <>
          {/* Mobile cards */}
          <ul className="sm:hidden divide-y divide-border border border-border rounded">
            {docs.map(d => (
              <li key={d.id} className="p-3 space-y-1">
                <div className="font-medium text-sm text-primary">{d.doc_type}</div>
                <div className="text-xs text-muted-foreground break-all">{d.file_name}</div>
                <div className="text-xs text-muted-foreground">
                  {d.size_bytes ? `${(d.size_bytes/1024).toFixed(0)} KB` : "—"} · {new Date(d.created_at).toLocaleDateString("en-IN")}
                </div>
                <div className="pt-1 flex gap-4">
                  <button onClick={()=>onDownload(d)} className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><Download className="h-3.5 w-3.5" />View</button>
                  <button onClick={()=>onDelete(d)} className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline"><Trash2 className="h-3.5 w-3.5" />Delete</button>
                </div>
              </li>
            ))}
          </ul>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left">
                <tr>
                  <th className="px-3 py-2 font-semibold text-primary">Type</th>
                  <th className="px-3 py-2 font-semibold text-primary">File</th>
                  <th className="px-3 py-2 font-semibold text-primary">Size</th>
                  <th className="px-3 py-2 font-semibold text-primary">Uploaded</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {docs.map(d => (
                  <tr key={d.id} className="hover:bg-secondary/40">
                    <td className="px-3 py-2">{d.doc_type}</td>
                    <td className="px-3 py-2 truncate max-w-[14rem]">{d.file_name}</td>
                    <td className="px-3 py-2">{d.size_bytes ? `${(d.size_bytes/1024).toFixed(0)} KB` : "—"}</td>
                    <td className="px-3 py-2">{new Date(d.created_at).toLocaleDateString("en-IN")}</td>
                    <td className="px-3 py-2 text-right">
                      <button onClick={()=>onDownload(d)} className="inline-flex items-center gap-1 text-primary hover:underline mr-3"><Download className="h-3.5 w-3.5" />View</button>
                      <button onClick={()=>onDelete(d)} className="inline-flex items-center gap-1 text-red-600 hover:underline"><Trash2 className="h-3.5 w-3.5" />Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
