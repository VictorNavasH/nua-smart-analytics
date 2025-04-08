
import { MonthlyNotes } from "@/components/dashboard/MonthlyNotes";

interface MonthlyNotesContainerProps {
  show: boolean;
}

export function MonthlyNotesContainer({ show }: MonthlyNotesContainerProps) {
  if (!show) return null;
  
  return (
    <div className="w-full">
      <MonthlyNotes />
    </div>
  );
}
