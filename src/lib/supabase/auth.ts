
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Definiciones de tipos
export type UserRole = 'admin' | 'manager' | 'analyst';

export type Profile = {
  id: string;
  email: string;
  rol: UserRole;
  nombre_completo: string | null;
  restaurante_id: string | null;
};

export type Restaurant = {
  id: string;
  nombre: string;
  ubicacion: string;
  activo: boolean | null;
};

export async function signUp(email: string, password: string, userData: { nombre_completo?: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
  
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<{ user: any, profile: Profile | null }> {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error fetching current user:', error);
    return { user: null, profile: null };
  }
  
  if (!session?.user) return { user: null, profile: null };
  
  // Obtener el perfil del usuario
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
    
  if (profileError) {
    console.error('Error fetching user profile:', profileError);
  }
  
  return { 
    user: session.user,
    profile: profile as Profile || null
  };
}

export async function getUserProfile(): Promise<Profile | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
    
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data as Profile;
}

export async function getUserRestaurant(restaurantId: string | null): Promise<Restaurant | null> {
  if (!restaurantId) return null;
  
  const { data, error } = await supabase
    .from('restaurantes')
    .select('*')
    .eq('id', restaurantId)
    .single();
    
  if (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
  
  return data as Restaurant;
}

export function subscribeToAuthChanges(callback: (user: any, profile: Profile | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      // Cuando un usuario inicia sesión, obtener su perfil
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) {
        console.error('Error fetching user profile on auth change:', error);
        callback(session.user, null);
      } else {
        callback(session.user, data as Profile);
      }
    } else if (event === 'SIGNED_OUT') {
      callback(null, null);
    }
  });
}

// Verifica si los proveedores de OAuth están disponibles
export async function getEnabledAuthProviders(): Promise<string[]> {
  try {
    // Intenta iniciar un flujo OAuth con Google pero sin redirección
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        skipBrowserRedirect: true
      }
    });
    
    // Si data.url existe, significa que el proveedor Google está habilitado
    return data.url ? ['google'] : [];
  } catch (error) {
    console.error('Error fetching auth providers:', error);
    return [];
  }
}

// Inicio de sesión con Google
export async function signInWithGoogle(redirectTo?: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth`
    }
  });
  
  if (error) throw error;
  return data;
}

export function isAdmin(profile: Profile | null): boolean {
  return profile?.rol === 'admin';
}

export function isManager(profile: Profile | null): boolean {
  return profile?.rol === 'manager';
}

export function isAnalyst(profile: Profile | null): boolean {
  return profile?.rol === 'analyst';
}
