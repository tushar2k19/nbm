import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { listMonthlyEntries } from "@/lib/portal-data";
import { StateUsersAdmin } from "@/components/portal/StateUsersAdmin";
import { AuthGuard } from "@/components/AuthGuard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getStateName } from "@/data/indianStates";
import { Download, Users, Bell, Database } from "lucide-react";
import { PeriodFilter } from "@/components/portal/PeriodFilter";
import { CentralStateFilter, type CentralStateFilterValue } from "@/components/portal/CentralStateFilter";
import {
  formatMonthYear,
  indiaYearMonth,
  mergeReportingPeriods,
  monthAfterYearChange,
  periodDate,
  type ReportingPeriods,
} from "@/lib/reporting-period";
import * as XLSX from "xlsx";
import { PortalTablePagination } from "@/components/portal/PortalTablePagination";
import { CentralComplianceBoard } from "@/components/portal/CentralComplianceBoard";
import { useClientPagination } from "@/hooks/useClientPagination";

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
  const opened = indiaYearMonth();
  const [year, setYear] = useState(opened.year);
  const [month, setMonth] = useState<number | null>(opened.month);
  const [periods, setPeriods] = useState<ReportingPeriods>(() => mergeReportingPeriods([]));
  const [stateCode, setStateCode] = useState<CentralStateFilterValue>(null);

  const onYearChange = (nextYear: number) => {
    setMonth((currentMonth) => monthAfterYearChange(nextYear, currentMonth, periods));
    setYear(nextYear);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">NBM Central Portal</h1>
          <p className="text-muted-foreground">Welcome, {profile?.full_name} (HQ Admin)</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <CentralStateFilter value={stateCode} onChange={setStateCode} />
          <PeriodFilter
            year={year}
            month={month}
            periods={periods}
            onYearChange={onYearChange}
            onMonthChange={setMonth}
          />
        </div>
      </div>

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-4">
          <TabsTrigger value="data" className="flex gap-2"><Database className="h-4 w-4"/> Data</TabsTrigger>
          <TabsTrigger value="users" className="flex gap-2"><Users className="h-4 w-4"/> Users</TabsTrigger>
          <TabsTrigger value="reminders" className="flex gap-2"><Bell className="h-4 w-4"/> Reminders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data">
          <AllStatesDataTab
            year={year}
            month={month}
            stateCode={stateCode}
            onPeriods={setPeriods}
          />
        </TabsContent>
        
        <TabsContent value="users">
          <StateUsersAdmin stateCode={stateCode} />
        </TabsContent>

        <TabsContent value="reminders">
          <CentralComplianceBoard year={year} month={month} stateCode={stateCode} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AllStatesDataTab({
  year,
  month,
  stateCode,
  onPeriods,
}: {
  year: number;
  month: number | null;
  stateCode: CentralStateFilterValue;
  onPeriods: (periods: ReportingPeriods) => void;
}) {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const data = await listMonthlyEntries({
        approvedOnly: true,
        year,
        month,
        stateCode,
      });
      setEntries(data.entries || []);
      onPeriods(data.periods);
    } catch {
      toast.error("Failed to fetch entries");
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchEntries();
  }, [year, month, stateCode]);

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems,
    total: entryTotal,
  } = useClientPagination(entries, [year, month, stateCode]);

  const exportToExcel = () => {
    if (entries.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(entries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Approved_Data");
    const period = month == null ? `${year}_all` : periodDate(year, month).slice(0, 7);
    const statePart = stateCode ? stateCode : "All_States";
    XLSX.writeFile(workbook, `NBM_Approved_Data_${statePart}_${period}.xlsx`);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
        <div>
          <h2 className="font-semibold">Approved National Data</h2>
          <p className="text-xs text-muted-foreground">
            {stateCode
              ? `${getStateName(stateCode)} — entries verified by State Reviewers`
              : "All states — entries verified by State Reviewers"}
          </p>
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
              paginatedItems.map((entry) => (
                <tr key={entry.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{getStateName(entry.state_code)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatMonthYear(entry.month_year)}</td>
                  <td className="px-4 py-3 truncate max-w-[200px]" title={entry.activity}>{entry.activity}</td>
                  <td className="px-4 py-3">{entry.beneficiary_name}</td>
                  <td className="px-4 py-3">₹{entry.total_project_investment_lakhs} L</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <PortalTablePagination
        page={page}
        totalPages={totalPages}
        total={entryTotal}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        disabled={loading}
      />
    </div>
  );
}

