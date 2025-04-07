
import { DateRangeSelector } from "@/components/dashboard/DateRangeSelector";
import { ExportData } from "@/components/dashboard/ExportData";
import { DateRange } from "react-day-picker";
import { useState } from "react";

interface DashboardFiltersProps {
  onRangeChange: (range: DateRange | undefined) => void;
  onExport: (type: "csv" | "excel") => Promise<boolean>;
}

export function DashboardFilters({ onRangeChange, onExport }: DashboardFiltersProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  const handleRangeChange = (range: DateRange | undefined) => {
    setSelectedRange(range);
    onRangeChange(range);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <DateRangeSelector 
        selectedRange={selectedRange} 
        onRangeChange={handleRangeChange} 
      />
      <ExportData onExport={onExport} />
    </div>
  );
}
