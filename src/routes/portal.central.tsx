import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { AuthGuard } from "@/components/AuthGuard";
import { ENTRY_STATUS } from "@/data/dropdowns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getStateName } from "@/data/indianStates";
import { Download, Users, Bell, Database } from "lucide-react";
import * as XLSX from "xlsx";
import { getRoleLabel } from "@/lib/roles";

export const Route = createFileRoute("/portal/central")({
  component: CentralPortal,
});

function CentralPortal() {
  return (
    <AuthGuard allowedRoles={["nbm_central"]}>
      <CentralDashboard />
    </AuthGuard>
  );
}

function CentralDashboard() {
  const { profile } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">NBM Central Portal</h1>
          <p className="text-muted-foreground">Welcome, {profile?.full_name} (HQ Admin)</p>
        </div>
      </div>

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-4">
          <TabsTrigger value="data" className="flex gap-2"><Database className="h-4 w-4"/> Data</TabsTrigger>
          <TabsTrigger value="users" className="flex gap-2"><Users className="h-4 w-4"/> Users</TabsTrigger>
          <TabsTrigger value="reminders" className="flex gap-2"><Bell className="h-4 w-4"/> Reminders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data">
          <AllStatesDataTab />
        </TabsContent>
        
        <TabsContent value="users">
          <StateUsersTab />
        </TabsContent>

        <TabsContent value="reminders">
          <div className="bg-card border border-border p-8 rounded-xl shadow-sm text-center">
            <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium">Reminders Module</h3>
            <p className="text-muted-foreground mt-1">Select a state to send cutoff reminders.</p>
            <Button className="mt-4" disabled>Send Reminder</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AllStatesDataTab() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("monthly_entries")
      .select("*")
      .eq("status", ENTRY_STATUS.APPROVED) // Central only sees approved data
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch entries");
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchEntries();
  }, []);

  const exportToExcel = () => {
    if (entries.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(entries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Approved_Data");
    XLSX.writeFile(workbook, `NBM_All_States_Data.xlsx`);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
        <div>
          <h2 className="font-semibold">Approved National Data</h2>
          <p className="text-xs text-muted-foreground">Entries verified by State Reviewers</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportToExcel} disabled={entries.length === 0}>
          <Download className="mr-2 h-4 w-4" /> Export All
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">State</th>
              <th className="px-4 py-3 font-medium">Month/Year</th>
              <th className="px-4 py-3 font-medium">Activity</th>
              <th className="px-4 py-3 font-medium">Beneficiary</th>
              <th className="px-4 py-3 font-medium">Investment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading data...</td></tr>
            ) : entries.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No approved entries available.</td></tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{getStateName(entry.state_code)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{entry.month_year}</td>
                  <td className="px-4 py-3 truncate max-w-[200px]" title={entry.activity}>{entry.activity}</td>
                  <td className="px-4 py-3">{entry.beneficiary_name}</td>
                  <td className="px-4 py-3">₹{entry.total_project_investment_lakhs} L</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StateUsersTab() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("state_users")
      .select("*")
      .order("state_code", { ascending: true });

    if (error) {
      toast.error("Failed to fetch users");
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
        <div>
          <h2 className="font-semibold">State Users Directory</h2>
          <p className="text-xs text-muted-foreground">Manage Editors and Reviewers across all states</p>
        </div>
        <Button size="sm" disabled>+ Invite User</Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">State</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No users found.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{u.state_code ? getStateName(u.state_code) : "National (HQ)"}</td>
                  <td className="px-4 py-3">{u.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {getRoleLabel(u.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${u.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {u.is_active ? "Active" : "Disabled"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
