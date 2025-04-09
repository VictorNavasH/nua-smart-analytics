
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DataEntryCard } from "@/components/data-entry/DataEntryCard";
import { SalesForm } from "@/components/data-entry/SalesForm";
import { ExpensesForm } from "@/components/data-entry/ExpensesForm";
import { CsvUploader } from "@/components/data-entry/CsvUploader";
import { format } from "date-fns";
import { createFinancialEntry } from "@/lib/supabase/financial-data";

export default function DataEntryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [salesComment, setSalesComment] = useState("");
  const [expenseComment, setExpenseComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formatDate = (date?: Date) => {
    return date ? format(date, 'yyyy-MM-dd') : '';
  };

  const handleSave = async (data: any, type: 'sales' | 'expenses') => {
    if (!date) {
      toast({
        title: "Error",
        description: "Por favor selecciona una fecha",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formattedDate = formatDate(date);
      
      // Simulamos obtener el ID del restaurante del usuario actual
      const restaurantId = "restaurant-1"; // ID fijo para desarrollo
      
      // Preparamos los datos según el tipo de entrada
      let entryData;
      
      if (type === 'sales') {
        entryData = {
          restaurant_id: restaurantId,
          date: formattedDate,
          revenue: Number(data.sales) || 0,
          expenses: 0,
          clients: Number(data.customers) || 0,
          avg_ticket: Number(data.sales) / (Number(data.customers) || 1)
        };
      } else {
        entryData = {
          restaurant_id: restaurantId,
          date: formattedDate,
          revenue: 0,
          expenses: Number(data.expenses) || 0,
          clients: 0,
          avg_ticket: 0
        };
      }
      
      // Usamos la función para crear una entrada financiera
      await createFinancialEntry(entryData);

      toast({
        title: "Datos guardados",
        description: "Los datos se han guardado correctamente",
      });

      // Resetear formulario si fue exitoso
      if (type === 'sales') {
        setSalesComment("");
      } else {
        setExpenseComment("");
      }
    } catch (error: any) {
      console.error("Error al guardar datos:", error);
      toast({
        title: "Error al guardar",
        description: error.message || "Ha ocurrido un error al guardar los datos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadComplete = async (data: any[]) => {
    if (!data.length) return;
    
    setIsLoading(true);
    let successCount = 0;
    let errorCount = 0;
    
    try {
      // Simulamos obtener el ID del restaurante del usuario actual
      const restaurantId = "restaurant-1"; // ID fijo para desarrollo
      
      // Procesamos cada fila del CSV
      for (const row of data) {
        // Formato y validación de datos
        if (!row.date) {
          errorCount++;
          continue;
        }
        
        try {
          // Preparar datos financieros
          const entryData = {
            restaurant_id: restaurantId,
            date: row.date,
            revenue: Number(row.sales || row.ventas || 0),
            expenses: Number(row.expenses || row.gastos || 0),
            clients: Number(row.customers || row.clientes || 0),
            avg_ticket: Number(row.sales || row.ventas || 0) / (Number(row.customers || row.clientes || 1) || 1)
          };
          
          // Crear entrada financiera
          await createFinancialEntry(entryData);
          successCount++;
        } catch (err) {
          errorCount++;
          console.error("Error al importar fila:", err);
        }
      }
      
      toast({
        title: "Importación completada",
        description: `${successCount} registros importados. ${errorCount} errores.`,
      });
    } catch (error: any) {
      console.error("Error en la importación:", error);
      toast({
        title: "Error en la importación",
        description: error.message || "Ha ocurrido un error al importar los datos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carga de Datos</h1>
          <p className="text-muted-foreground">
            Registra ventas, gastos y otros datos financieros
          </p>
        </div>

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sales" className="flex gap-2 items-center">
              <Receipt className="h-4 w-4" />
              <span>Ventas</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex gap-2 items-center">
              <FileText className="h-4 w-4" />
              <span>Gastos</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales">
            <DataEntryCard 
              title="Registro de Ventas"
              description="Ingresa las ventas diarias de tu restaurante"
              footer={
                <div className="w-full">
                  <h4 className="text-sm font-medium mb-2">Importar desde CSV</h4>
                  <CsvUploader type="sales" onUploadComplete={handleUploadComplete} />
                </div>
              }
            >
              <SalesForm 
                date={date}
                setDate={setDate}
                salesComment={salesComment}
                setSalesComment={setSalesComment}
                onSave={(data) => handleSave(data, 'sales')}
                isLoading={isLoading}
              />
            </DataEntryCard>
          </TabsContent>
          
          <TabsContent value="expenses">
            <DataEntryCard 
              title="Registro de Gastos"
              description="Ingresa los gastos de tu restaurante"
              footer={
                <div className="w-full">
                  <h4 className="text-sm font-medium mb-2">Importar desde CSV</h4>
                  <CsvUploader type="expenses" onUploadComplete={handleUploadComplete} />
                </div>
              }
            >
              <ExpensesForm 
                date={date}
                setDate={setDate}
                expenseComment={expenseComment}
                setExpenseComment={setExpenseComment}
                onSave={(data) => handleSave(data, 'expenses')}
                isLoading={isLoading}
              />
            </DataEntryCard>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
