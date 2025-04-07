
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export function useDateRange(onChange?: (range: DateRange | undefined) => void) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  
  // Effect to handle range changes
  useEffect(() => {
    if (onChange) {
      onChange(dateRange);
    }
    console.log("Cargando datos para el rango:", dateRange);
  }, [dateRange, onChange]);

  return {
    dateRange,
    setDateRange
  };
}
