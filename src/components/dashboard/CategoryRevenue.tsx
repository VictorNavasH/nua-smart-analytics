
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendIndicator } from "@/components/dashboard/TrendIndicator";

interface CategoryData {
  name: string;
  value: number;
  change: number;
  color: string;
}

interface CategoryRevenueProps {
  data: CategoryData[];
  title: string;
}

export function CategoryRevenue({ data, title }: CategoryRevenueProps) {
  const totalRevenue = data.reduce((sum, category) => sum + category.value, 0);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {data.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">
                  €{category.value.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">
                  {Math.round((category.value / totalRevenue) * 100)}%
                </span>
                <TrendIndicator value={category.change} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
