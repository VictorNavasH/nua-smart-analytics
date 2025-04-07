
import { ReactNode } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  CreditCard, 
  BanknoteIcon, 
  Users, 
  TrendingUp, 
  Percent, 
  Target, 
  HeartPulse,
  Receipt,
  BarChart4,
  Scale
} from "lucide-react";

interface StatsSectionProps {
  currentSales: number;
  monthlyGoal: number;
  showProgressBars: boolean;
  customerLoyalty?: {
    retentionRate: number;
    previousRate: number;
    trend: number;
  };
}

export function StatsSection({ 
  currentSales, 
  monthlyGoal, 
  showProgressBars,
  customerLoyalty
}: StatsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {/* Primera fila: KPIs críticos (3 más importantes) */}
      <div className="col-span-2 order-1">
        <StatCard 
          title="Ingresos" 
          value="€2,854.00" 
          trend={12.5} 
          icon={<BanknoteIcon className="h-5 w-5 text-nua-turquoise" />}
          progress={showProgressBars ? currentSales : undefined}
          progressMax={monthlyGoal}
          showProgressBar={showProgressBars}
          highlight={true}
          helpText="Total de ventas en el periodo seleccionado"
        />
      </div>
      <div className="col-span-2 order-2">
        <StatCard 
          title="Margen Neto" 
          value="24.8%" 
          trend={-1.2} 
          icon={<Percent className="h-5 w-5 text-nua-blue" />}
          colorClass="#364F6B/10"
          highlight={true}
          helpText="Porcentaje de beneficio después de gastos"
        />
      </div>
      <div className="col-span-2 order-3">
        <StatCard 
          title="Beneficio Operativo" 
          value="€705.75" 
          trend={7.3} 
          icon={<BarChart4 className="h-5 w-5 text-green-500" />}
          colorClass="rgba(34, 197, 94, 0.1)"
          highlight={true}
          helpText="Beneficio antes de impuestos e intereses"
        />
      </div>
      
      {/* Segunda fila: KPIs secundarios */}
      <div className="col-span-2 order-4">
        <StatCard 
          title="Clientes" 
          value="210" 
          trend={8.2} 
          icon={<Users className="h-5 w-5 text-nua-pink" />}
          colorClass="#FF4797/10"
          helpText="Número total de clientes atendidos"
        />
      </div>
      <div className="col-span-2 order-5">
        <StatCard 
          title="Ticket Medio" 
          value="€13.59" 
          trend={3.7} 
          icon={<Receipt className="h-5 w-5 text-nua-yellow" />}
          colorClass="#FFCE85/10"
          helpText="Valor promedio por transacción"
        />
      </div>
      {customerLoyalty && (
        <div className="col-span-2 order-6">
          <StatCard 
            title="Fidelidad de Clientes" 
            value={`${customerLoyalty.retentionRate}%`} 
            trend={customerLoyalty.trend} 
            icon={<HeartPulse className="h-5 w-5 text-red-500" />}
            colorClass="rgba(239, 68, 68, 0.1)"
            progress={showProgressBars ? customerLoyalty.retentionRate : undefined}
            progressMax={100}
            showProgressBar={showProgressBars}
            helpText="Porcentaje de clientes que regresan al establecimiento"
          />
        </div>
      )}
      
      {/* Tercera fila: KPIs adicionales */}
      <div className="col-span-2 order-7">
        <StatCard 
          title="% Punto Equilibrio" 
          value="76%" 
          icon={<Scale className="h-5 w-5 text-orange-500" />}
          colorClass="rgba(249, 115, 22, 0.1)"
          helpText="Porcentaje alcanzado del punto de equilibrio"
        />
      </div>
    </div>
  );
}
