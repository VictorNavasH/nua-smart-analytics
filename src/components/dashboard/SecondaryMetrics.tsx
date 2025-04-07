
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleDollarSign, Users, Percent } from "lucide-react";

// Datos de ejemplo para las métricas secundarias
const expenseCategories = [
  { category: "Personal", percentage: 45, amount: 5400 },
  { category: "Insumos", percentage: 25, amount: 3000 },
  { category: "Alquiler", percentage: 15, amount: 1800 },
  { category: "Servicios", percentage: 8, amount: 960 },
  { category: "Marketing", percentage: 7, amount: 840 },
];

export function SecondaryMetrics() {
  // Calcular el gasto medio por cliente (datos de ejemplo)
  const totalClients = 1200;
  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const avgExpensePerClient = totalExpenses / totalClients;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">Métricas Secundarias</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 bg-muted/40 p-3 rounded-md">
          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
            <CircleDollarSign className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Gasto Medio por Cliente</p>
            <p className="text-xl font-semibold">€{avgExpensePerClient.toFixed(2)}</p>
          </div>
        </div>
        
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Percent className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">% de Gasto sobre Ingresos por Categoría</h4>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Categoría</TableHead>
                <TableHead>Porcentaje</TableHead>
                <TableHead className="text-right">Importe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseCategories.map((category) => (
                <TableRow key={category.category}>
                  <TableCell className="font-medium">{category.category}</TableCell>
                  <TableCell>{category.percentage}%</TableCell>
                  <TableCell className="text-right">€{category.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold">100%</TableCell>
                <TableCell className="text-right font-bold">
                  €{totalExpenses.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
