import { create } from 'zustand';
import { Product } from '@/types/product';

interface Store {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  categoryCounts: Record<string, number>;
  selectedCategory: string;
  setProducts: (products: Product[]) => void;
  setCategories: (categories: string[]) => void;
  setCategoryCounts: (categoryCounts: Record<string, number>) => void;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<Store>((set) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  categoryCounts: {},
  selectedCategory: 'all',
  setProducts: (products) => set({ products, filteredProducts: products }), // 전체 상품 설정
  setCategories: (categories) => {
    console.log('categories', categories);
    set({ categories });
  },
  setCategoryCounts: (categoryCounts) => set({ categoryCounts }),
  setSelectedCategory: (category) =>
    set((state) => {
      const filteredProducts = category
        ? state.products.filter((product) => product.category === category)
        : state.products;
      console.log('filteredProducts', filteredProducts);
      return { selectedCategory: category, filteredProducts };
    }),
}));
