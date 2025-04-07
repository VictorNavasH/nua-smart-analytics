
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Valores por defecto para desarrollo - en producción se configurarán mediante variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verificación para evitar errores en tiempo de ejecución
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Las credenciales de Supabase no están configuradas correctamente.');
  console.error('Asegúrate de configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tus variables de entorno.');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);
