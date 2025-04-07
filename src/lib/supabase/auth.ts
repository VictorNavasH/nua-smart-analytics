
import { supabase } from './client';

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
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

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
  
  if (!session?.user) return null;
  
  return {
    id: session.user.id,
    email: session.user.email || '',
    name: session.user.user_metadata?.name,
  };
}

export function subscribeToAuthChanges(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.user_metadata?.name,
      });
    } else if (event === 'SIGNED_OUT') {
      callback(null);
    }
  });
}
