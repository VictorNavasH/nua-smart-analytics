
import { ReactNode } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  trend?: number;
  icon?: ReactNode;
  colorClass?: string;
}

export function StatCard({ title, value, trend, icon, colorClass = "bg-primary/10" }: StatCardProps) {
  return (
    <div className="nua-stat-card animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: colorClass }}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={trend >= 0 ? "nua-stat-trend-up" : "nua-stat-trend-down"}>
            {trend >= 0 ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="nua-stat-value">{value}</div>
      <div className="nua-stat-label">{title}</div>
    </div>
  );
}
