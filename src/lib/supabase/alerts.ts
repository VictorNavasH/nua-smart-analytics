
import { supabase } from './client';
import type { Alert } from './types';

export async function getAlerts(restaurantId: string) {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function createAlert(alert: Omit<Alert, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('alerts')
    .insert(alert)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function markAlertAsRead(id: string) {
  const { data, error } = await supabase
    .from('alerts')
    .update({ read: true })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteAlert(id: string) {
  const { error } = await supabase
    .from('alerts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
