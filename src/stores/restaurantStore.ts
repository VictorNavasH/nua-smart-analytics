
import { create } from 'zustand';
import { Restaurant } from '@/lib/supabase/types';

interface RestaurantStore {
  selectedRestaurantId: string;
  setSelectedRestaurantId: (id: string) => void;
}

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  selectedRestaurantId: '',
  setSelectedRestaurantId: (id) => set({ selectedRestaurantId: id }),
}));
