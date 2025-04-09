
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: number;
  icon?: ReactNode;
  progress?: number;
  progressMax?: number;
  colorClass?: string;
  highlight?: boolean;
  showProgressBar?: boolean;
  helpText?: string;
}

export function StatCard({ 
  title, 
  value, 
  trend, 
  icon, 
  progress, 
  progressMax = 100,
  colorClass = "rgba(2, 177, 196, 0.1)", 
  highlight = false,
  showProgressBar = false,
  helpText
}: StatCardProps) {
  const progressPercentage = progress !== undefined ? Math.min(Math.round((progress / progressMax) * 100), 100) : 0;
  
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg", 
      highlight ? "border-l-2 border-l-nua-turquoise" : ""
    )}>
      <CardContent className="p-2.5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1">
            <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
            {helpText && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="inline-flex h-3 w-3 items-center justify-center rounded-full text-muted-foreground hover:text-nua-turquoise">
                      <HelpCircle className="h-2.5 w-2.5" />
                      <span className="sr-only">Info</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    <p>{helpText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          {icon && (
            <div className={cn("p-1 rounded-full", colorClass)}>
              {icon}
            </div>
          )}
        </div>
        
        <div className="mt-1">
          <div className="flex items-end">
            <p className="text-lg font-semibold text-nua-navy">{value}</p>
            {trend !== undefined && (
              <div className={cn(
                "flex items-center ml-1.5 text-[10px] font-medium",
                trend >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {trend >= 0 ? (
                  <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                ) : (
                  <TrendingDown className="h-2.5 w-2.5 mr-0.5" />
                )}
                {Math.abs(trend)}%
              </div>
            )}
          </div>
          
          {showProgressBar && progress !== undefined && (
            <div className="mt-1 space-y-0.5">
              <Progress value={progressPercentage} className="h-1" />
              <p className="text-[10px] text-muted-foreground">{progressPercentage}% del objetivo</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
