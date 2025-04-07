
// Mock data for the dashboard

export const salesData = [
  { name: "Ene", ventas: 12000 },
  { name: "Feb", ventas: 14000 },
  { name: "Mar", ventas: 13000 },
  { name: "Abr", ventas: 15000 },
  { name: "May", ventas: 17000 },
  { name: "Jun", ventas: 16000 },
  { name: "Jul", ventas: 18000 },
];

export const clientsData = [
  { name: "Lun", clientes: 120 },
  { name: "Mar", clientes: 180 },
  { name: "Mié", clientes: 140 },
  { name: "Jue", clientes: 210 },
  { name: "Vie", clientes: 260 },
  { name: "Sáb", clientes: 290 },
  { name: "Dom", clientes: 190 },
];

export const expensesData = [
  { name: "Personal", value: 45 },
  { name: "Insumos", value: 25 },
  { name: "Alquiler", value: 15 },
  { name: "Servicios", value: 15 },
];

export const financeConstants = {
  monthlyGoal: 15000,
  currentSales: 12000,
  breakEvenPoint: 9500,
};

// New data for enhanced dashboard

export const salesVsGoalsData = [
  { name: "Ene", actual: 12000, goal: 13000 },
  { name: "Feb", actual: 14000, goal: 13500 },
  { name: "Mar", actual: 13000, goal: 14000 },
  { name: "Abr", actual: 15000, goal: 14500 },
  { name: "May", actual: 17000, goal: 15000 },
  { name: "Jun", actual: 16000, goal: 15500 },
];

export const categoryRevenueData = [
  { name: "Comidas", value: 7800, change: 12.5, color: "#02B1C4" },
  { name: "Bebidas", value: 5600, change: 8.3, color: "#FF4797" },
  { name: "Postres", value: 2400, change: -3.2, color: "#FFCE85" },
  { name: "Extras", value: 1200, change: 15.7, color: "#364F6B" },
];

export const customerLoyaltyData = {
  retentionRate: 78,
  previousRate: 72,
  repeatVisits: 3.2,
  previousVisits: 2.8,
  trend: 8.3
};
