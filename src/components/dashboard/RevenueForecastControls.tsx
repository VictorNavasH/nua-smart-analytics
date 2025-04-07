
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

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
          <Label htmlFor="growth-rate">Tasa de Crecimiento</Label>
          <span className="text-sm font-medium">{growthRate}%</span>
        </div>
        <Slider 
          id="growth-rate"
          value={[growthRate]} 
          min={0} 
          max={10} 
          step={0.5}
          onValueChange={(values) => onGrowthRateChange(values[0])}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="seasonality">Factor de Estacionalidad</Label>
          <span className="text-sm font-medium">{seasonality}%</span>
        </div>
        <Slider 
          id="seasonality"
          value={[seasonality]} 
          min={0} 
          max={20} 
          step={1}
          onValueChange={(values) => onSeasonalityChange(values[0])}
        />
      </div>
    </div>
  );
}
