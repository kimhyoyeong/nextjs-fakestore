import { create } from 'zustand';
import { Product } from '@/types/product';

interface StoreState {
  products: Product[];
  filteredProducts: Product[];
}

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  filteredProducts: [],
}));
