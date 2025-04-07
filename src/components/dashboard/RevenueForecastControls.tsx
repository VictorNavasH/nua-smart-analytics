
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RevenueForecastControlsProps {
  growthRate: number;
  seasonality: number;
  onGrowthRateChange: (value: number) => void;
  onSeasonalityChange: (value: number) => void;
}

export function RevenueForecastControls({
  growthRate,
  seasonality,
  onGrowthRateChange,
  onSeasonalityChange
}: RevenueForecastControlsProps) {
  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Label htmlFor="growth-rate">Growth Rate</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">Adjust the annual revenue growth rate assumption</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-sm font-medium">{growthRate}%</span>
        </div>
        <Slider 
          id="growth-rate"
          value={[growthRate]} 
          min={0} 
          max={10} 
          step={0.5}
          onValueChange={(values) => onGrowthRateChange(values[0])}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Conservative</span>
          <span>Moderate</span>
          <span>Aggressive</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Label htmlFor="seasonality">Seasonality Factor</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">Adjust how much seasonal trends affect revenue projections</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-sm font-medium">{seasonality}%</span>
        </div>
        <Slider 
          id="seasonality"
          value={[seasonality]} 
          min={0} 
          max={20} 
          step={1}
          onValueChange={(values) => onSeasonalityChange(values[0])}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Low Impact</span>
          <span>Medium Impact</span>
          <span>High Impact</span>
        </div>
      </div>
    </div>
  );
}
