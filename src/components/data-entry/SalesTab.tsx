
import { ReactNode } from "react";
import { DataEntryCard } from "@/components/data-entry/DataEntryCard";
import { SalesForm } from "@/components/data-entry/SalesForm";
import { CsvUploader } from "@/components/data-entry/CsvUploader";
import { DataEntryType } from "@/hooks/useDataEntry";

interface SalesTabProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  salesComment: string;
  setSalesComment: (value: string) => void;
  onSave: (data: any, type: DataEntryType) => void;
  onUploadComplete: (data: any[]) => Promise<void>;
  isLoading: boolean;
}

export function SalesTab({
  date,
  setDate,
  salesComment,
  setSalesComment,
  onSave,
  onUploadComplete,
  isLoading
}: SalesTabProps) {
  const handleSave = (data: any) => {
    onSave(data, 'sales');
  };

  return (
    <DataEntryCard 
      title="Registro de Ventas"
      description="Ingresa las ventas diarias de tu restaurante"
      footer={
        <div className="w-full">
          <h4 className="text-sm font-medium mb-2">Importar desde CSV</h4>
          <CsvUploader type="sales" onUploadComplete={onUploadComplete} />
        </div>
      }
    >
      <SalesForm 
        date={date}
        setDate={setDate}
        salesComment={salesComment}
        setSalesComment={setSalesComment}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </DataEntryCard>
  );
}
