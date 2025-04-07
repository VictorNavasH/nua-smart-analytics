
import { Button } from "@/components/ui/button";
import { LineChart, RefreshCw } from "lucide-react";

interface NoDataPlaceholderProps {
  onGenerate: () => void;
  isLoading: boolean;
}

export function NoDataPlaceholder({
  onGenerate,
  isLoading
}: NoDataPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center space-y-4">
      <LineChart className="h-16 w-16 text-gray-400" />
      <h3 className="text-lg font-medium text-gray-800">
        No hay predicciones disponibles
      </h3>
      <p className="text-sm text-gray-600 max-w-md">
        No se encontraron datos de predicción para el restaurante y período seleccionados.
        Genera nuevas predicciones para visualizar el análisis de ventas futuras.
      </p>
      <Button
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-4 bg-gradient-to-r from-[#02f2d2] to-[#02b1c4] hover:from-[#02b1c4] hover:to-[#02f2d2]"
      >
        {isLoading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Generar Predicciones
          </>
        )}
      </Button>
    </div>
  );
}
