
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

interface ExpensesFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  expenseComment: string;
  setExpenseComment: (value: string) => void;
  onSave: () => void;
}

export function ExpensesForm({ date, setDate, expenseComment, setExpenseComment, onSave }: ExpensesFormProps) {
  return (
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
      
      <CommentField
        id="expense-notes"
        value={expenseComment}
        onChange={setExpenseComment}
        label="Comentarios sobre los gastos"
        placeholder="Ej: Gasto extraordinario, compra semestral, etc."
      />
      
      <Button onClick={onSave} className="w-full md:w-auto">
        <Save className="mr-2 h-4 w-4" /> Guardar
      </Button>
    </form>
  );
}
