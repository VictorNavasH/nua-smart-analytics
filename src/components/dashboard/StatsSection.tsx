
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  CreditCard, DollarSign, Users, TrendingUp, 
  Percent, Target
} from "lucide-react";

interface StatsSectionProps {
  currentSales: number;
  monthlyGoal: number;
  showProgressBars: boolean;
}

export function StatsSection({ 
  currentSales, 
  monthlyGoal, 
  showProgressBars 
}: StatsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div className="col-span-2">
        <StatCard 
          title="Ingresos" 
          value="€2,854.00" 
          trend={12.5} 
          icon={<DollarSign className="h-5 w-5 text-nua-turquoise" />}
          progress={showProgressBars ? currentSales : undefined}
          progressMax={monthlyGoal}
          showProgressBar={showProgressBars}
        />
      </div>
      <div className="col-span-2">
        <StatCard 
          title="Clientes" 
          value="210" 
          trend={8.2} 
          icon={<Users className="h-5 w-5 text-nua-pink" />}
          colorClass="#FF4797/10"
        />
      </div>
      <div className="col-span-2">
        <StatCard 
          title="Ticket Medio" 
          value="€13.59" 
          trend={3.7} 
          icon={<CreditCard className="h-5 w-5 text-nua-yellow" />}
          colorClass="#FFCE85/10"
        />
      </div>
      <div className="col-span-2">
        <StatCard 
          title="Margen Neto" 
          value="24.8%" 
          trend={-1.2} 
          icon={<Percent className="h-5 w-5 text-nua-blue" />}
          colorClass="#364F6B/10"
        />
      </div>
      <div className="col-span-2">
        <StatCard 
          title="Beneficio Operativo" 
          value="€705.75" 
          trend={7.3} 
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          colorClass="rgba(34, 197, 94, 0.1)"
        />
      </div>
      <div className="col-span-2">
        <StatCard 
          title="% Punto Equilibrio" 
          value="76%" 
          icon={<Target className="h-5 w-5 text-orange-500" />}
          colorClass="rgba(249, 115, 22, 0.1)"
        />
      </div>
    </div>
  );
}
