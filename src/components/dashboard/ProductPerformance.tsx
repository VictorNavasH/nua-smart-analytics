
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TrendIndicator } from "@/components/dashboard/TrendIndicator";
import { productPerformanceData } from "@/data/dashboardData";

interface ProductPerformanceProps {
  title?: string;
}

export function ProductPerformance({ title = "Rendimiento de Productos" }: ProductPerformanceProps) {
  const [sortKey, setSortKey] = useState<string>("revenue");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const sortOptions = [
    { value: "revenue", label: "Ingresos" },
    { value: "sales", label: "Unidades Vendidas" },
    { value: "margin", label: "Margen" },
    { value: "growth", label: "Crecimiento" }
  ];
  
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(productPerformanceData.map(product => product.category))];
    return ["all", ...uniqueCategories];
  }, []);
  
  const handleSortChange = (value: string) => {
    if (value === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(value);
      setSortDirection("desc"); // Default to descending for new sort
    }
  };
  
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...productPerformanceData];
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term)
      );
    }
    
    // Sort data
    return filtered.sort((a, b) => {
      const valueA = a[sortKey as keyof typeof a];
      const valueB = b[sortKey as keyof typeof b];
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
      
      return 0;
    });
  }, [productPerformanceData, categoryFilter, searchTerm, sortKey, sortDirection]);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription>Analiza el rendimiento de tus productos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Todas" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortKey} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-auto max-h-[360px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-right">Unidades</TableHead>
                <TableHead className="text-right">Ingresos</TableHead>
                <TableHead className="text-right">Margen</TableHead>
                <TableHead className="text-right">Crecimiento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProducts.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                  </TableCell>
                  <TableCell className="text-right">{product.sales.toLocaleString()}</TableCell>
                  <TableCell className="text-right">€{product.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{product.margin}%</TableCell>
                  <TableCell className="text-right">
                    <TrendIndicator 
                      value={product.growth} 
                      size="sm" 
                      className="justify-end"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {filteredAndSortedProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No se encontraron productos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
