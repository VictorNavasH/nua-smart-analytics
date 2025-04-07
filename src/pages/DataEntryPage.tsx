
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DataEntryCard } from "@/components/data-entry/DataEntryCard";
import { SalesForm } from "@/components/data-entry/SalesForm";
import { ExpensesForm } from "@/components/data-entry/ExpensesForm";
import { CsvUploader } from "@/components/data-entry/CsvUploader";

export default function DataEntryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [salesComment, setSalesComment] = useState("");
  const [expenseComment, setExpenseComment] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Datos guardados",
      description: "Los datos se han guardado correctamente",
    });
  };

  const handleUploadComplete = (data: any[]) => {
    console.log("Upload completed with data:", data);
    // Here you would typically update your state with the imported data
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
                onSave={handleSave}
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
                onSave={handleSave}
              />
            </DataEntryCard>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
