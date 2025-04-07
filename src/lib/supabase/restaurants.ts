
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type Restaurant = Database['public']['Tables']['restaurantes']['Row'];

export async function getRestaurants() {
  const { data, error } = await supabase
    .from('restaurantes')
    .select('*')
    .order('nombre');
  
  if (error) throw error;
  return data || [];
}

export async function getRestaurantById(id: string) {
  const { data, error } = await supabase
    .from('restaurantes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createRestaurant(restaurant: Omit<Restaurant, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('restaurantes')
    .insert(restaurant)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateRestaurant(id: string, updates: Partial<Omit<Restaurant, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('restaurantes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteRestaurant(id: string) {
  const { error } = await supabase
    .from('restaurantes')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
