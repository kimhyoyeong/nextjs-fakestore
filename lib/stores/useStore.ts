import { create } from 'zustand';

interface StoreState {
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedCategory: 'all',
  setSelectedCategory: (selectedCategory: string) => set({ selectedCategory }),
}));
