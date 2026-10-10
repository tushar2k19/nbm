import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { AuthGuard } from "@/components/AuthGuard";
import { getStatusLabel, getStatusColor, ENTRY_STATUS } from "@/data/dropdowns";
import { CheckCircle, XCircle, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CommentsDrawer } from "@/components/portal/CommentsDrawer";

export const Route = createFileRoute("/portal/reviewer")({
  component: ReviewerPortal,
});

function ReviewerPortal() {
  return (
    <AuthGuard allowedRoles={["state_reviewer"]}>
      <ReviewerDashboard />
    </AuthGuard>
  );
}

function ReviewerDashboard() {
  const { profile, stateName } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const fetchEntries = async () => {
    if (!profile?.state_code) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("monthly_entries")
      .select("*")
      .eq("state_code", profile.state_code)
      .neq("status", ENTRY_STATUS.DRAFT) // Reviewer doesn't see drafts
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

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("monthly_entries")
      .update({ status })
      .eq("id", id);
      
    if (error) {
      toast.error(`Failed to update status: ${error.message}`);
    } else {
      toast.success(`Entry marked as ${getStatusLabel(status)}`);
      await fetchEntries();
    }
  };

  const pendingCount = entries.filter(e => e.status === ENTRY_STATUS.SUBMITTED || e.status === ENTRY_STATUS.UNDER_REVIEW).length;
  const approvedCount = entries.filter(e => e.status === ENTRY_STATUS.APPROVED).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Reviewer Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {profile?.full_name} ({stateName})</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Submitted</div>
          <div className="text-2xl font-bold mt-1">{entries.length}</div>
        </div>
        <div className="bg-card border border-amber-200 p-4 rounded-xl shadow-sm bg-amber-50/50">
          <div className="text-sm font-medium text-amber-700">Pending Review</div>
          <div className="text-2xl font-bold mt-1 text-amber-800">{pendingCount}</div>
        </div>
        <div className="bg-card border border-emerald-200 p-4 rounded-xl shadow-sm bg-emerald-50/50">
          <div className="text-sm font-medium text-emerald-700">Approved</div>
          <div className="text-2xl font-bold mt-1 text-emerald-800">{approvedCount}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
          <h2 className="font-semibold">Review Queue</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium">S.No</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Activity</th>
                <th className="px-4 py-3 font-medium">Beneficiary</th>
                <th className="px-4 py-3 font-medium">Investment</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading queue...</td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No submissions to review.</td>
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
                    <td className="px-4 py-3 text-muted-foreground">
                      {entry.total_project_investment_lakhs ? `₹${entry.total_project_investment_lakhs} L` : '-'}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground"
                        title="Comments / Queries"
                        onClick={() => {
                          setSelectedEntryId(entry.id);
                          setIsCommentsOpen(true);
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      
                      {entry.status === ENTRY_STATUS.SUBMITTED || entry.status === ENTRY_STATUS.UNDER_REVIEW ? (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            title="Approve"
                            onClick={() => updateStatus(entry.id, ENTRY_STATUS.APPROVED)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            title="Request Revision"
                            onClick={() => updateStatus(entry.id, ENTRY_STATUS.REVISION_REQUESTED)}
                          >
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Decline"
                            onClick={() => updateStatus(entry.id, ENTRY_STATUS.DECLINED)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      ) : null}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

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
