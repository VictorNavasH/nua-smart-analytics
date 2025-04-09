
import type { FinancialData } from './types';

// Mock data para desarrollo mientras no tengamos conexión a Supabase
const mockFinancialData: FinancialData[] = [
  {
    id: '1',
    restaurant_id: 'restaurant-1',
    date: '2025-04-01',
    revenue: 1500,
    expenses: 800,
    net_profit: 700,
    clients: 120,
    avg_ticket: 12.5,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    restaurant_id: 'restaurant-1',
    date: '2025-04-02',
    revenue: 1700,
    expenses: 900,
    net_profit: 800,
    clients: 140,
    avg_ticket: 12.1,
    created_at: new Date().toISOString()
  }
];

export async function getFinancialData(restaurantId: string, startDate?: string, endDate?: string): Promise<FinancialData[]> {
  // Simular delay como en una llamada a API real
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredData = [...mockFinancialData];
  
  // Filtrar por restaurante
  if (restaurantId) {
    filteredData = filteredData.filter(item => item.restaurant_id === restaurantId);
  }
  
  // Filtrar por fecha de inicio
  if (startDate) {
    filteredData = filteredData.filter(item => item.date >= startDate);
  }
  
  // Filtrar por fecha final
  if (endDate) {
    filteredData = filteredData.filter(item => item.date <= endDate);
  }
  
  // Ordenar por fecha descendente
  filteredData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return filteredData;
}

export async function createFinancialEntry(entry: Omit<FinancialData, 'id' | 'created_at' | 'net_profit'>): Promise<FinancialData> {
  // Simular delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Crear entrada con ID generado y calcular net_profit
  const newEntry: FinancialData = {
    id: `id-${Date.now()}`,
    created_at: new Date().toISOString(),
    net_profit: entry.revenue - entry.expenses,
    ...entry
  };
  
  // En una implementación real, aquí se insertaría en la base de datos
  mockFinancialData.push(newEntry);
  
  return newEntry;
}

export async function updateFinancialEntry(id: string, updates: Partial<Omit<FinancialData, 'id' | 'created_at' | 'net_profit'>>): Promise<FinancialData> {
  // Simular delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Buscar entrada existente
  const existingEntryIndex = mockFinancialData.findIndex(item => item.id === id);
  
  if (existingEntryIndex === -1) {
    throw new Error('Entrada no encontrada');
  }
  
  // Actualizar entrada
  const updatedEntry: FinancialData = {
    ...mockFinancialData[existingEntryIndex],
    ...updates
  };
  
  // Recalcular net_profit si se actualizaron revenue o expenses
  if ('revenue' in updates || 'expenses' in updates) {
    updatedEntry.net_profit = updatedEntry.revenue - updatedEntry.expenses;
  }
  
  // Actualizar en el array
  mockFinancialData[existingEntryIndex] = updatedEntry;
  
  return updatedEntry;
}

export async function deleteFinancialEntry(id: string): Promise<void> {
  // Simular delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Buscar índice
  const existingEntryIndex = mockFinancialData.findIndex(item => item.id === id);
  
  if (existingEntryIndex === -1) {
    throw new Error('Entrada no encontrada');
  }
  
  // Eliminar del array
  mockFinancialData.splice(existingEntryIndex, 1);
}
