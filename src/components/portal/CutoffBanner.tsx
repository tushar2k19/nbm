import { Calendar, AlertCircle } from "lucide-react";

export function CutoffBanner() {
  // Hardcode logic for next cutoff for demo, but normally calculated:
  // Cutoff for current month is 7th of NEXT month.
  const now = new Date();
  const currentMonth = now.toLocaleString("default", { month: "short" });
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toLocaleString("default", {
    month: "short",
  });
  const currentYear = now.getFullYear();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-saffron/30 bg-saffron/10 px-4 py-3 text-saffron-900 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-saffron/20 p-2">
          <Calendar className="h-5 w-5 text-saffron-700" />
        </div>
        <div>
          <h3 className="font-semibold text-saffron-900">
            Reporting Period: {currentMonth} {currentYear}
          </h3>
          <p className="text-sm text-saffron-800">
            Ensure all entries are submitted for review by the cutoff date.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-md bg-white/60 px-3 py-1.5 text-sm font-medium shadow-sm ring-1 ring-black/5">
        <AlertCircle className="h-4 w-4 text-saffron-600" />
        Deadline: {nextMonth} 7, {currentYear}
      </div>
    </div>
  );
}
