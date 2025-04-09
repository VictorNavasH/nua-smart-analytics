
import { supabase } from '@/integrations/supabase/client';
import type { FinancialData } from './types';

export async function getFinancialData(restaurantId: string, startDate?: string, endDate?: string) {
  let query = supabase
    .from('financial_data')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('date', { ascending: false });
  
  if (startDate) {
    query = query.gte('date', startDate);
  }
  
  if (endDate) {
    query = query.lte('date', endDate);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
}

export async function createFinancialEntry(entry: Omit<FinancialData, 'id' | 'created_at' | 'net_profit'>) {
  const { data, error } = await supabase
    .from('financial_data')
    .insert(entry)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateFinancialEntry(id: string, updates: Partial<Omit<FinancialData, 'id' | 'created_at' | 'net_profit'>>) {
  const { data, error } = await supabase
    .from('financial_data')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteFinancialEntry(id: string) {
  const { error } = await supabase
    .from('financial_data')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
