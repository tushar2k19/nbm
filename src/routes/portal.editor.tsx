import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { AuthGuard } from "@/components/AuthGuard";
import { CutoffBanner } from "@/components/portal/CutoffBanner";
import { EditorEntryForm } from "@/components/portal/EditorEntryForm";
import { CommentsDrawer } from "@/components/portal/CommentsDrawer";
import { getStatusLabel, getStatusColor, ENTRY_STATUS } from "@/data/dropdowns";
import { Plus, Download, Edit, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/portal/editor")({
  component: EditorPortal,
});

function EditorPortal() {
  return (
    <AuthGuard allowedRoles={["state_editor"]}>
      <EditorDashboard />
    </AuthGuard>
  );
}

function EditorDashboard() {
  const { user, profile, stateName } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  // Month year filter
  const currentMonthYear = new Date();
  currentMonthYear.setDate(1); // Set to 1st of month

  const fetchEntries = async () => {
    if (!profile?.state_code) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("monthly_entries")
      .select("*")
      .eq("state_code", profile.state_code)
      //.eq("month_year", currentMonthYear.toISOString().split("T")[0])
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch entries");
      console.error(error);
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchEntries();
  }, [profile?.state_code]);

  const handleAddSubmit = async (formData: any) => {
    if (!profile?.state_code || !user?.id) return;
    
    // Default format date to 1st of current month
    const formattedDate = currentMonthYear.toISOString().split("T")[0];

    const { error } = await supabase.from("monthly_entries").insert({
      ...formData,
      state_code: profile.state_code,
      month_year: formattedDate,
      created_by: user.id,
      updated_by: user.id,
      age: formData.age ? parseInt(formData.age, 10) : null,
      total_project_investment_lakhs: formData.total_project_investment_lakhs ? parseFloat(formData.total_project_investment_lakhs) : null,
      center_share_lakhs: formData.center_share_lakhs ? parseFloat(formData.center_share_lakhs) : null,
      state_share_lakhs: formData.state_share_lakhs ? parseFloat(formData.state_share_lakhs) : null,
      employment_generated: formData.employment_generated ? parseInt(formData.employment_generated, 10) : null,
      status: ENTRY_STATUS.DRAFT
    });

    if (error) {
      toast.error(error.message);
      throw error;
    } else {
      toast.success("Entry added successfully");
      await fetchEntries();
    }
  };

  const handleSubmitAll = async () => {
    const draftIds = entries.filter((e) => e.status === ENTRY_STATUS.DRAFT || e.status === ENTRY_STATUS.REVISION_REQUESTED).map((e) => e.id);
    if (draftIds.length === 0) {
      toast.info("No drafts or revisions to submit");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase
      .from("monthly_entries")
      .update({ status: ENTRY_STATUS.SUBMITTED, submitted_at: new Date().toISOString() })
      .in("id", draftIds);
    
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Submitted ${draftIds.length} entries for review.`);
      await fetchEntries();
    }
  };

  const exportToExcel = () => {
    if (entries.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(entries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entries");
    XLSX.writeFile(workbook, `NBM_Entries_${stateName}.xlsx`);
  };

  const draftCount = entries.filter(e => e.status === ENTRY_STATUS.DRAFT).length;
  const submittedCount = entries.filter(e => e.status === ENTRY_STATUS.SUBMITTED).length;
  const reviewReqCount = entries.filter(e => e.status === ENTRY_STATUS.REVISION_REQUESTED).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Editor Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {profile?.full_name} ({stateName})</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToExcel}>
            <Download className="mr-2 h-4 w-4" /> Export Excel
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Entry
          </Button>
        </div>
      </div>

      <CutoffBanner />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Entries</div>
          <div className="text-2xl font-bold mt-1">{entries.length}</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Drafts</div>
          <div className="text-2xl font-bold mt-1 text-muted-foreground">{draftCount}</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Submitted</div>
          <div className="text-2xl font-bold mt-1 text-amber-600">{submittedCount}</div>
        </div>
        <div className="bg-card border border-red-200 p-4 rounded-xl shadow-sm bg-red-50/50">
          <div className="text-sm font-medium text-red-600">Revision Requested</div>
          <div className="text-2xl font-bold mt-1 text-red-700">{reviewReqCount}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
          <h2 className="font-semibold">Data Entries</h2>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleSubmitAll}
            disabled={submitting || (draftCount === 0 && reviewReqCount === 0)}
          >
            {submitting ? "Submitting..." : "Submit All Drafts"}
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium">S.No</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Activity</th>
                <th className="px-4 py-3 font-medium">Beneficiary</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">District</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Loading entries...</td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No entries found. Click "Add Entry" to begin.</td>
                </tr>
              ) : (
                entries.map((entry, idx) => (
                  <tr key={entry.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted ${getStatusColor(entry.status)} bg-opacity-20`}>
                        {getStatusLabel(entry.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium truncate max-w-[200px]" title={entry.activity}>{entry.activity}</td>
                    <td className="px-4 py-3">{entry.beneficiary_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{entry.beneficiary_type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{entry.district}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          setSelectedEntryId(entry.id);
                          setIsCommentsOpen(true);
                        }}
                      >
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={entry.status !== ENTRY_STATUS.DRAFT && entry.status !== ENTRY_STATUS.REVISION_REQUESTED}>
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditorEntryForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSubmit={handleAddSubmit} 
        defaultStateCode={stateName}
      />
      
      <CommentsDrawer 
        entryId={selectedEntryId}
        isOpen={isCommentsOpen}
        onClose={() => {
          setIsCommentsOpen(false);
          setSelectedEntryId(null);
        }}
      />
    </div>
  );
}
