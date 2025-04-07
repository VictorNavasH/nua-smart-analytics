
import { create } from 'zustand';
import { Restaurant } from '@/lib/supabase/auth';

interface RestaurantStore {
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant) => void;
}

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  selectedRestaurant: null,
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
}));
