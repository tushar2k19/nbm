import { Calendar, AlertCircle } from "lucide-react";
import { deadlineLabel, monthShort } from "@/lib/reporting-period";

type CutoffBannerProps = {
  year: number;
  month: number | null;
};

export function CutoffBanner({ year, month }: CutoffBannerProps) {
  if (month == null) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-saffron/30 bg-saffron/10 px-4 py-3 text-saffron-900 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-saffron/20 p-2">
            <Calendar className="h-5 w-5 text-saffron-700" />
          </div>
          <div>
            <h3 className="font-semibold text-saffron-900">All months of {year}</h3>
            <p className="text-sm text-saffron-800">Combined entries for the selected year.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-saffron/30 bg-saffron/10 px-4 py-3 text-saffron-900 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-saffron/20 p-2">
          <Calendar className="h-5 w-5 text-saffron-700" />
        </div>
        <div>
          <h3 className="font-semibold text-saffron-900">
            Reporting Period: {monthShort(month)} {year}
          </h3>
          <p className="text-sm text-saffron-800">Ensure all entries are submitted for review by the cutoff date.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-md bg-white/60 px-3 py-1.5 text-sm font-medium shadow-sm ring-1 ring-black/5">
        <AlertCircle className="h-4 w-4 text-saffron-600" />
        Deadline: {deadlineLabel(year, month)}
      </div>
    </div>
  );
}
