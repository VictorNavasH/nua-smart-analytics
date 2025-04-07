
import { DateRangeSelector } from "@/components/dashboard/DateRangeSelector";
import { ExportData } from "@/components/dashboard/ExportData";
import { DateRange } from "react-day-picker";

interface DashboardFiltersProps {
  onRangeChange: (range: DateRange | undefined) => void;
  onExport: (type: "csv" | "excel") => Promise<boolean>;
}

export function DashboardFilters({ onRangeChange, onExport }: DashboardFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <DateRangeSelector onRangeChange={onRangeChange} />
      <ExportData onExport={onExport} />
    </div>
  );
}
