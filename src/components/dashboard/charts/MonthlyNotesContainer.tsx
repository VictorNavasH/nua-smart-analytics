
import { MonthlyNotes } from "@/components/dashboard/MonthlyNotes";

interface MonthlyNotesContainerProps {
  show: boolean;
}

export function MonthlyNotesContainer({ show }: MonthlyNotesContainerProps) {
  if (!show) return null;
  
  return (
    <div className="col-span-1">
      <MonthlyNotes />
    </div>
  );
}
