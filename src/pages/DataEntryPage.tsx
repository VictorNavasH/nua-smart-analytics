
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Receipt } from "lucide-react";
import { SalesTab } from "@/components/data-entry/SalesTab";
import { ExpensesTab } from "@/components/data-entry/ExpensesTab";
import { useDataEntry } from "@/hooks/useDataEntry";

export default function DataEntryPage() {
  const {
    date,
    setDate,
    salesComment,
    setSalesComment,
    expenseComment,
    setExpenseComment,
    isLoading,
    handleSave,
    handleUploadComplete
  } = useDataEntry();

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
            <SalesTab 
              date={date}
              setDate={setDate}
              salesComment={salesComment}
              setSalesComment={setSalesComment}
              onSave={handleSave}
              onUploadComplete={handleUploadComplete}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="expenses">
            <ExpensesTab 
              date={date}
              setDate={setDate}
              expenseComment={expenseComment}
              setExpenseComment={setExpenseComment}
              onSave={handleSave}
              onUploadComplete={handleUploadComplete}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
