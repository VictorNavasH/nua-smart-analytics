
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import type { Restaurant } from './auth';

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

export async function createRestaurant(restaurant: { nombre: string, ubicacion: string, activo?: boolean }) {
  const { data, error } = await supabase
    .from('restaurantes')
    .insert(restaurant)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateRestaurant(id: string, updates: Partial<{ nombre: string, ubicacion: string, activo?: boolean }>) {
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
