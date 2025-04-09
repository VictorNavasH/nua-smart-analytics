
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DataEntryCard } from "@/components/data-entry/DataEntryCard";
import { SalesForm } from "@/components/data-entry/SalesForm";
import { ExpensesForm } from "@/components/data-entry/ExpensesForm";
import { CsvUploader } from "@/components/data-entry/CsvUploader";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

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
      
      // Get the current user's restaurant ID
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('restaurante_id')
        .single();
      
      if (profileError) throw profileError;
      
      const restaurantId = profileData?.restaurante_id;
      
      if (!restaurantId) {
        throw new Error("No hay restaurante asignado a este usuario");
      }

      // Prepare data entry based on type
      const entry = {
        restaurant_id: restaurantId,
        date: formattedDate,
        ...(type === 'sales' ? {
          sales: data.sales || 0,
          customers: data.customers || 0,
          comment: salesComment
        } : {
          expenses: data.expenses || 0,
          expense_category: data.category || 'otros',
          comment: expenseComment
        })
      };

      // Insert data into financial_data table
      const { error } = await supabase
        .from('financial_data')
        .insert(entry);

      if (error) throw error;

      toast({
        title: "Datos guardados",
        description: "Los datos se han guardado correctamente",
      });

      // Reset form if successful
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
      // Get the current user's restaurant ID
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('restaurante_id')
        .single();
      
      if (profileError) throw profileError;
      const restaurantId = profileData?.restaurante_id;
      
      if (!restaurantId) {
        throw new Error("No hay restaurante asignado a este usuario");
      }
      
      // Process each row from CSV
      for (const row of data) {
        // Format and validate the data
        if (!row.date) {
          errorCount++;
          continue;
        }
        
        const entry = {
          restaurant_id: restaurantId,
          date: row.date,
          sales: row.sales || row.ventas || 0,
          customers: row.customers || row.clientes || 0,
          expenses: row.expenses || row.gastos || 0,
          expense_category: row.category || row.categoria || 'otros',
          comment: row.comment || row.comentario || ''
        };
        
        const { error } = await supabase
          .from('financial_data')
          .insert(entry);
          
        if (error) {
          errorCount++;
          console.error("Error al importar fila:", error);
        } else {
          successCount++;
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
