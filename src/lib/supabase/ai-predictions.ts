
import { supabase } from './client';
import type { AIPrediction } from './types';

export async function getAIPredictions() {
  const { data, error } = await supabase
    .from('ai_predictions')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function createAIPrediction(prediction: Omit<AIPrediction, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('ai_predictions')
    .insert(prediction)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateAIPrediction(id: string, updates: Partial<Omit<AIPrediction, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('ai_predictions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteAIPrediction(id: string) {
  const { error } = await supabase
    .from('ai_predictions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
