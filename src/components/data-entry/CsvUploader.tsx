
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CsvUploaderProps {
  type: "sales" | "expenses";
  onUploadComplete?: (data: any[]) => void;
}

export function CsvUploader({ type, onUploadComplete }: CsvUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!fileSelected) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un archivo primero",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate CSV parsing (in a real app, this would actually parse the CSV)
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setUploading(false);

      // Here we would normally parse the CSV and return the data
      const mockData = [
        { date: "2025-04-01", amount: 1500, category: "Ingresos" },
        { date: "2025-04-02", amount: 2200, category: "Ingresos" },
      ];
      
      if (onUploadComplete) {
        onUploadComplete(mockData);
      }

      toast({
        title: "Subida completada",
        description: `El archivo de ${type === "sales" ? "ventas" : "gastos"} ha sido procesado correctamente`,
      });
      
      setFileSelected(null);
      // Reset file input
      const fileInput = document.getElementById("csv-file") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="w-full md:flex-1">
          <input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary/90
              cursor-pointer"
            disabled={uploading}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Formatos aceptados: .csv
          </p>
        </div>
        <Button
          onClick={handleUpload}
          disabled={!fileSelected || uploading}
          className="min-w-24"
        >
          <Upload className="mr-2 h-4 w-4" />
          Subir CSV
        </Button>
      </div>
      
      {(uploading || progress > 0) && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Subiendo archivo...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}
    </div>
  );
}
