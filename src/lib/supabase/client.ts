
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Valores por defecto para desarrollo - en producción se configurarán mediante variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoxOTAwMDAwMDAwfQ.mock-key-for-dev';

// Verificación para evitar errores en tiempo de ejecución
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Las credenciales de Supabase no están configuradas correctamente.');
  console.error('Asegúrate de configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tus variables de entorno.');
}

// Creamos un cliente con valores por defecto, pero marcamos que es un mock para desarrollo
const isMockClient = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Si estamos usando el cliente mock, interceptamos las llamadas a Supabase
if (isMockClient) {
  console.warn('Usando cliente Supabase con valores ficticios para desarrollo. Las operaciones de base de datos no funcionarán.');
}
