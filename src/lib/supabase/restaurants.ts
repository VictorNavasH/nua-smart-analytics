
import { supabase } from './client';
import type { Restaurant } from './types';

export async function getRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data || [];
}

export async function getRestaurantById(id: string) {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createRestaurant(restaurant: Omit<Restaurant, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('restaurants')
    .insert(restaurant)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateRestaurant(id: string, updates: Partial<Omit<Restaurant, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('restaurants')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteRestaurant(id: string) {
  const { error } = await supabase
    .from('restaurants')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
