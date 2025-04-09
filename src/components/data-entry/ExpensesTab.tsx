
import { ReactNode } from "react";
import { DataEntryCard } from "@/components/data-entry/DataEntryCard";
import { ExpensesForm } from "@/components/data-entry/ExpensesForm";
import { CsvUploader } from "@/components/data-entry/CsvUploader";
import { DataEntryType } from "@/hooks/useDataEntry";

interface ExpensesTabProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  expenseComment: string;
  setExpenseComment: (value: string) => void;
  onSave: (data: any, type: DataEntryType) => void;
  onUploadComplete: (data: any[]) => Promise<void>;
  isLoading: boolean;
}

export function ExpensesTab({
  date,
  setDate,
  expenseComment,
  setExpenseComment,
  onSave,
  onUploadComplete,
  isLoading
}: ExpensesTabProps) {
  const handleSave = (data: any) => {
    onSave(data, 'expenses');
  };

  return (
    <DataEntryCard 
      title="Registro de Gastos"
      description="Ingresa los gastos de tu restaurante"
      footer={
        <div className="w-full">
          <h4 className="text-sm font-medium mb-2">Importar desde CSV</h4>
          <CsvUploader type="expenses" onUploadComplete={onUploadComplete} />
        </div>
      }
    >
      <ExpensesForm 
        date={date}
        setDate={setDate}
        expenseComment={expenseComment}
        setExpenseComment={setExpenseComment}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </DataEntryCard>
  );
}
