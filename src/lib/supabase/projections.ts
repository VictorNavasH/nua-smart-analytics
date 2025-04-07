
import { supabase } from './client';
import type { Projection } from './types';

export async function getProjections(restaurantId: string) {
  const { data, error } = await supabase
    .from('projections')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function createProjection(projection: Omit<Projection, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('projections')
    .insert(projection)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateProjection(id: string, updates: Partial<Omit<Projection, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('projections')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteProjection(id: string) {
  const { error } = await supabase
    .from('projections')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
