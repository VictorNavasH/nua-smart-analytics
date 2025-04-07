
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
    <div className="relative p-5 rounded-lg border bg-card text-card-foreground shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center transition-transform hover:scale-110 duration-300`} style={{ backgroundColor: colorClass }}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center rounded-full px-2 py-1 text-xs font-medium transition-all duration-300",
            trend >= 0 
              ? "text-green-700 bg-green-100 animate-pulse-subtle" 
              : "text-red-700 bg-red-100 animate-pulse-subtle"
          )}>
            {trend >= 0 ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-3 text-2xl font-bold transition-all hover:scale-105 duration-200">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
      
      {showProgressBar && progressPercentage !== undefined && (
        <div className="mt-3">
          <Progress value={progressPercentage} className="h-2 animate-pulse-subtle" />
          <div className="text-xs text-right mt-1 text-muted-foreground">
            {Math.round(progressPercentage)}%
          </div>
        </div>
      )}
    </div>
  );
}
