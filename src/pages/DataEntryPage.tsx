
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, FileText, Receipt, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function DataEntryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Datos guardados",
      description: "Los datos se han guardado correctamente",
    });
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
            <Card>
              <CardHeader>
                <CardTitle>Registro de Ventas</CardTitle>
                <CardDescription>
                  Ingresa las ventas diarias de tu restaurante
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="sales-date">Fecha</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="restaurant">Restaurante</Label>
                      <Select defaultValue="main">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar restaurante" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Mi Restaurante</SelectItem>
                          <SelectItem value="center">Sucursal Centro</SelectItem>
                          <SelectItem value="north">Sucursal Norte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="total-sales">Ventas Totales (€)</Label>
                      <Input id="total-sales" placeholder="0.00" type="number" step="0.01" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="num-clients">Número de Clientes</Label>
                      <Input id="num-clients" placeholder="0" type="number" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="avg-ticket">Ticket Medio (€)</Label>
                      <Input id="avg-ticket" placeholder="0.00" type="number" step="0.01" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Método de Pago Principal</Label>
                      <Select defaultValue="card">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Tarjeta</SelectItem>
                          <SelectItem value="cash">Efectivo</SelectItem>
                          <SelectItem value="transfer">Transferencia</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas</Label>
                    <textarea 
                      id="notes" 
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Información adicional sobre las ventas"
                    />
                  </div>
                  
                  <Button onClick={handleSave} className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" /> Guardar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Gastos</CardTitle>
                <CardDescription>
                  Ingresa los gastos de tu restaurante
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="expense-date">Fecha</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="restaurant">Restaurante</Label>
                      <Select defaultValue="main">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar restaurante" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Mi Restaurante</SelectItem>
                          <SelectItem value="center">Sucursal Centro</SelectItem>
                          <SelectItem value="north">Sucursal Norte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expense-category">Categoría</Label>
                      <Select defaultValue="supplies">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="staff">Personal</SelectItem>
                          <SelectItem value="supplies">Insumos</SelectItem>
                          <SelectItem value="rent">Alquiler</SelectItem>
                          <SelectItem value="utilities">Servicios</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="other">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expense-amount">Importe (€)</Label>
                      <Input id="expense-amount" placeholder="0.00" type="number" step="0.01" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Proveedor</Label>
                      <Input id="supplier" placeholder="Nombre del proveedor" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="payment-status">Estado de Pago</Label>
                      <Select defaultValue="paid">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid">Pagado</SelectItem>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="partial">Pago Parcial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expense-notes">Descripción</Label>
                    <textarea 
                      id="expense-notes" 
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Descripción del gasto"
                    />
                  </div>
                  
                  <Button onClick={handleSave} className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" /> Guardar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
