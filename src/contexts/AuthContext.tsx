import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getCurrentUser, 
  subscribeToAuthChanges, 
  signIn, 
  signOut, 
  signUp, 
  signInWithGoogle,
  Profile,
  Restaurant,
  getUserRestaurant,
  getEnabledAuthProviders
} from '@/lib/supabase/auth';

interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  restaurant: Restaurant | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData: { nombre_completo?: string }) => Promise<any>;
  signOut: () => Promise<void>;
  signInWithGoogle: (redirectTo?: string) => Promise<any>;
  refreshUserData: () => Promise<void>;
  isAdmin: boolean;
  isManager: boolean;
  isAnalyst: boolean;
  enabledAuthProviders: string[];
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  restaurant: null,
  loading: true,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  refreshUserData: () => Promise.resolve(),
  isAdmin: false,
  isManager: false,
  isAnalyst: false,
  enabledAuthProviders: []
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [enabledAuthProviders, setEnabledAuthProviders] = useState<string[]>([]);

  const refreshUserData = async () => {
    try {
      const { user, profile } = await getCurrentUser();
      setUser(user);
      setProfile(profile);
      
      if (profile?.restaurante_id) {
        const restaurantData = await getUserRestaurant(profile.restaurante_id);
        setRestaurant(restaurantData);
      } else {
        setRestaurant(null);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function loadAuthProviders() {
      try {
        const providers = await getEnabledAuthProviders();
        setEnabledAuthProviders(providers);
      } catch (error) {
        console.error('Error loading auth providers:', error);
      }
    }
    
    loadAuthProviders();
  }, []);

  useEffect(() => {
    const { data: authListener } = subscribeToAuthChanges(async (authUser, authProfile) => {
      setUser(authUser);
      setProfile(authProfile);
      
      if (authProfile?.restaurante_id) {
        const restaurantData = await getUserRestaurant(authProfile.restaurante_id);
        setRestaurant(restaurantData);
      } else {
        setRestaurant(null);
      }
      
      setLoading(false);
    });

    refreshUserData();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const isAdmin = profile?.rol === 'admin';
  const isManager = profile?.rol === 'manager';
  const isAnalyst = profile?.rol === 'analyst';

  const value = {
    user,
    profile,
    restaurant,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut: async () => {
      await signOut();
      setUser(null);
      setProfile(null);
      setRestaurant(null);
    },
    refreshUserData,
    isAdmin,
    isManager,
    isAnalyst,
    enabledAuthProviders
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
