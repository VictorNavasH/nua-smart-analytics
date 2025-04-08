
import { CategoryRevenue } from "@/components/dashboard/CategoryRevenue";

interface CategoryRevenueContainerProps {
  data: Array<{ name: string; value: number; change: number; color: string }>;
}

export function CategoryRevenueContainer({ data }: CategoryRevenueContainerProps) {
  return (
    <div className="w-full">
      <CategoryRevenue 
        data={data} 
        title="Ingresos por Categoría"
      />
    </div>
  );
}
