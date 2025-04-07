import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

interface DateRangeSelectorProps {
  onRangeChange: (range: DateRange | undefined) => void;
}

export function DateRangeSelector({ onRangeChange }: DateRangeSelectorProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  
  const [preset, setPreset] = useState("current-month");

  useEffect(() => {
    onRangeChange(date);
  }, [date, onRangeChange]);

  const selectPreset = (value: string) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    switch (value) {
      case "today":
        setDate({ from: today, to: today });
        break;
      case "yesterday": {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        setDate({ from: yesterday, to: yesterday });
        break;
      }
      case "last-7-days": {
        const last7Days = new Date(today);
        last7Days.setDate(last7Days.getDate() - 6);
        setDate({ from: last7Days, to: today });
        break;
      }
      case "last-30-days": {
        const last30Days = new Date(today);
        last30Days.setDate(last30Days.getDate() - 29);
        setDate({ from: last30Days, to: today });
        break;
      }
      case "current-month": {
        setDate({
          from: new Date(currentYear, currentMonth, 1),
          to: today,
        });
        break;
      }
      case "last-month": {
        const firstDayLastMonth = new Date(currentYear, currentMonth - 1, 1);
        const lastDayLastMonth = new Date(currentYear, currentMonth, 0);
        setDate({
          from: firstDayLastMonth,
          to: lastDayLastMonth,
        });
        break;
      }
      case "current-quarter": {
        const currentQuarter = Math.floor(currentMonth / 3);
        const firstDayCurrentQuarter = new Date(currentYear, currentQuarter * 3, 1);
        setDate({
          from: firstDayCurrentQuarter,
          to: today,
        });
        break;
      }
      case "current-year": {
        setDate({
          from: new Date(currentYear, 0, 1),
          to: today,
        });
        break;
      }
      case "custom":
        // Keep the current selection for custom
        break;
    }
    
    setPreset(value);
  };

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) {
      return "Seleccionar fechas";
    }

    if (!range.to) {
      return format(range.from, "d 'de' MMMM, yyyy", { locale: es });
    }

    if (range.from.getMonth() === range.to.getMonth() && range.from.getFullYear() === range.to.getFullYear()) {
      return `${format(range.from, "d", { locale: es })} - ${format(range.to, "d 'de' MMMM, yyyy", { locale: es })}`;
    }

    return `${format(range.from, "d 'de' MMM", { locale: es })} - ${format(range.to, "d 'de' MMM, yyyy", { locale: es })}`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Select
        value={preset}
        onValueChange={selectPreset}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Hoy</SelectItem>
          <SelectItem value="yesterday">Ayer</SelectItem>
          <SelectItem value="last-7-days">Últimos 7 días</SelectItem>
          <SelectItem value="last-30-days">Últimos 30 días</SelectItem>
          <SelectItem value="current-month">Mes actual</SelectItem>
          <SelectItem value="last-month">Mes anterior</SelectItem>
          <SelectItem value="current-quarter">Trimestre actual</SelectItem>
          <SelectItem value="current-year">Año actual</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formatDateRange(date) : "Seleccionar fechas"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={es}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
