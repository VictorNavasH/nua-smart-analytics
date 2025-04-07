
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommentField } from "./CommentField";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface SalesFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  salesComment: string;
  setSalesComment: (value: string) => void;
  onSave: () => void;
}

export function SalesForm({ date, setDate, salesComment, setSalesComment, onSave }: SalesFormProps) {
  return (
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
      
      <CommentField
        id="sales-notes"
        value={salesComment}
        onChange={setSalesComment}
        label="Comentarios sobre las ventas"
        placeholder="Ej: Semana Santa aumentó ingresos, promoción especial, etc."
      />
      
      <Button onClick={onSave} className="w-full md:w-auto">
        <Save className="mr-2 h-4 w-4" /> Guardar
      </Button>
    </form>
  );
}
