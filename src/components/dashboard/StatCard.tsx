
import { ReactNode } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  title: string;
  value: string;
  trend?: number;
  icon?: ReactNode;
  colorClass?: string;
  progress?: number;
  progressMax?: number;
  showProgressBar?: boolean;
}

export function StatCard({ 
  title, 
  value, 
  trend, 
  icon, 
  colorClass = "bg-primary/10", 
  progress,
  progressMax = 100,
  showProgressBar = false
}: StatCardProps) {
  // Calculate progress percentage
  const progressPercentage = progress !== undefined ? Math.min((progress / progressMax) * 100, 100) : undefined;
  
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
      
      {showProgressBar && progressPercentage !== undefined && (
        <div className="mt-3">
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-right mt-1 text-muted-foreground">
            {Math.round(progressPercentage)}%
          </div>
        </div>
      )}
    </div>
  );
}
