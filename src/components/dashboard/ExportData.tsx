
import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notify } from "@/components/ui/toast-notification";

interface ExportDataProps {
  onExport: (type: "csv" | "excel") => Promise<boolean>;
  disabled?: boolean;
}

export function ExportData({ onExport, disabled = false }: ExportDataProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (type: "csv" | "excel") => {
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      const success = await onExport(type);
      
      if (success) {
        notify({
          message: `Exportación a ${type.toUpperCase()} completada`,
          description: "Los datos se han exportado correctamente.",
          type: "success"
        });
      } else {
        notify({
          message: "Error al exportar",
          description: "No se pudieron exportar los datos.",
          type: "error"
        });
      }
    } catch (error) {
      notify({
        message: "Error al exportar",
        description: "Ocurrió un error inesperado.",
        type: "error"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          disabled={disabled || isExporting}
          className="flex gap-2 hover:bg-background/80 transition-all"
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] animate-fade-in">
        <DropdownMenuItem onClick={() => handleExport("csv")} disabled={isExporting}
          className="transition-colors hover:bg-accent/60">
          <FileText className="mr-2 h-4 w-4" />
          <span>Exportar a CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("excel")} disabled={isExporting}
          className="transition-colors hover:bg-accent/60">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Exportar a Excel</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
