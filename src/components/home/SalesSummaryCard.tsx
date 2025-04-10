
import { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Receipt, HelpCircle, Calendar, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SalesSummaryCard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [viewType, setViewType] = useState("week");

  return (
    <Card className="md:col-span-1 shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div>
            <CardTitle className="text-nua-navy flex items-center gap-2">
              Resumen de ventas
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-nua-navy/60 hover:text-nua-turquoise">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total de ventas registradas en el periodo seleccionado</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[130px] h-7 mt-1 text-xs">
                  <SelectValue placeholder="Últimos 7 días" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Último día</SelectItem>
                  <SelectItem value="7d">Últimos 7 días</SelectItem>
                  <SelectItem value="30d">Últimos 30 días</SelectItem>
                  <SelectItem value="90d">Último trimestre</SelectItem>
                  <SelectItem value="1y">Último año</SelectItem>
                </SelectContent>
              </Select>
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                {viewType === "day" && <Calendar className="h-3 w-3" />}
                {viewType === "week" && <BarChart3 className="h-3 w-3" />}
                {viewType === "month" && <PieChart className="h-3 w-3" />}
                <span>
                  {viewType === "day" && "Día"}
                  {viewType === "week" && "Semana"}
                  {viewType === "month" && "Mes"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[100px]">
              <DropdownMenuItem onClick={() => setViewType("day")} className="flex items-center gap-1.5 cursor-pointer">
                <Calendar className="h-3.5 w-3.5" />
                <span>Día</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType("week")} className="flex items-center gap-1.5 cursor-pointer">
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Semana</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType("month")} className="flex items-center gap-1.5 cursor-pointer">
                <PieChart className="h-3.5 w-3.5" />
                <span>Mes</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Receipt className="h-12 w-12 text-white bg-nua-turquoise p-2 rounded-md" />
          <div className="ml-4">
            <p className="text-2xl font-bold text-nua-navy">€8,459.32</p>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% respecto a la semana anterior
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          variant="outline" 
          className="w-full justify-between hover:bg-nua-turquoise/5 hover:border-nua-turquoise"
        >
          <Link to="/dashboard">
            <span>Ver detalles</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
