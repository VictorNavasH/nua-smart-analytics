
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

// Historical comparison data
export const historicalComparisonData = {
  sales: [
    { month: "Ene", thisYear: 12000, lastYear: 10200, change: 17.6 },
    { month: "Feb", thisYear: 14000, lastYear: 11800, change: 18.6 },
    { month: "Mar", thisYear: 13000, lastYear: 12000, change: 8.3 },
    { month: "Abr", thisYear: 15000, lastYear: 12500, change: 20.0 },
    { month: "May", thisYear: 17000, lastYear: 13800, change: 23.2 },
    { month: "Jun", thisYear: 16000, lastYear: 14200, change: 12.7 },
  ],
  customers: [
    { month: "Ene", thisYear: 950, lastYear: 820, change: 15.9 },
    { month: "Feb", thisYear: 1050, lastYear: 880, change: 19.3 },
    { month: "Mar", thisYear: 980, lastYear: 900, change: 8.9 },
    { month: "Abr", thisYear: 1100, lastYear: 950, change: 15.8 },
    { month: "May", thisYear: 1280, lastYear: 1020, change: 25.5 },
    { month: "Jun", thisYear: 1200, lastYear: 1080, change: 11.1 },
  ],
  avgTicket: [
    { month: "Ene", thisYear: 12.6, lastYear: 12.4, change: 1.6 },
    { month: "Feb", thisYear: 13.3, lastYear: 13.4, change: -0.7 },
    { month: "Mar", thisYear: 13.2, lastYear: 13.3, change: -0.8 },
    { month: "Abr", thisYear: 13.6, lastYear: 13.1, change: 3.8 },
    { month: "May", thisYear: 13.3, lastYear: 13.5, change: -1.5 },
    { month: "Jun", thisYear: 13.8, lastYear: 13.1, change: 5.3 },
  ],
};

// Product performance data
export const productPerformanceData = [
  { 
    name: "Hamburguesa Clásica", 
    sales: 2450, 
    revenue: 12250, 
    margin: 42, 
    growth: 8.5,
    category: "Comidas" 
  },
  { 
    name: "Pizza Margarita", 
    sales: 1850, 
    revenue: 14800, 
    margin: 48, 
    growth: 12.3,
    category: "Comidas" 
  },
  { 
    name: "Ensalada César", 
    sales: 1200, 
    revenue: 9600, 
    margin: 65, 
    growth: 15.7,
    category: "Comidas" 
  },
  { 
    name: "Refresco Cola", 
    sales: 3200, 
    revenue: 6400, 
    margin: 70, 
    growth: 5.2,
    category: "Bebidas" 
  },
  { 
    name: "Cerveza Artesanal", 
    sales: 2100, 
    revenue: 8400, 
    margin: 55, 
    growth: 18.9,
    category: "Bebidas" 
  },
  { 
    name: "Tarta de Chocolate", 
    sales: 980, 
    revenue: 4900, 
    margin: 60, 
    growth: -2.3,
    category: "Postres" 
  },
  { 
    name: "Helado Vainilla", 
    sales: 1450, 
    revenue: 4350, 
    margin: 72, 
    growth: 7.8,
    category: "Postres" 
  },
  { 
    name: "Patatas Fritas Extra", 
    sales: 1850, 
    revenue: 3700, 
    margin: 80, 
    growth: 9.6,
    category: "Extras" 
  }
];

// Revenue forecast data (base data for interactive chart)
export const revenueForecastData = {
  historical: [
    { month: "Ene", revenue: 12000 },
    { month: "Feb", revenue: 14000 },
    { month: "Mar", revenue: 13000 },
    { month: "Abr", revenue: 15000 },
    { month: "May", revenue: 17000 },
    { month: "Jun", revenue: 16000 },
  ],
  forecast: [
    { month: "Jul", revenue: 16800, min: 15500, max: 18100 },
    { month: "Ago", revenue: 17500, min: 16000, max: 19000 },
    { month: "Sep", revenue: 18200, min: 16500, max: 19900 },
    { month: "Oct", revenue: 19000, min: 17000, max: 21000 },
    { month: "Nov", revenue: 21000, min: 18500, max: 23500 },
    { month: "Dic", revenue: 24000, min: 21000, max: 27000 },
  ]
};
