
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendIndicatorProps {
  value: number;
  size?: "sm" | "md";
  showValue?: boolean;
  className?: string;
}

export function TrendIndicator({
  value,
  size = "md",
  showValue = true,
  className
}: TrendIndicatorProps) {
  const Icon = value > 0 ? ArrowUpIcon : value < 0 ? ArrowDownIcon : MinusIcon;
  const colorClass = value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-gray-500";
  const sizeClass = size === "sm" ? "text-xs" : "text-sm";
  
  return (
    <div className={cn("flex items-center", colorClass, sizeClass, className)}>
      <Icon className={cn("mr-1", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      {showValue && <span>{Math.abs(value)}%</span>}
    </div>
  );
}
