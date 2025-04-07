
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Restaurant } from '@/lib/supabase/types';

interface RestaurantState {
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant) => void;
}

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      selectedRestaurant: null,
      setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
    }),
    {
      name: 'restaurant-storage',
    }
  )
);
