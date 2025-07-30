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
  setSelectedCategory: (category: string) => void;
}

// 카테고리별 개수 계산 함수
const calculateCategoryCounts = (products: Product[]): Record<string, number> => {
  return products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    acc['all'] = (acc['all'] || 0) + 1;
    return acc;
  }, {});
};

export const useStore = create<Store>((set) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  categoryCounts: {},
  selectedCategory: 'all',
  setProducts: (products) => {
    const categoryCounts = calculateCategoryCounts(products);
    set({
      products,
      filteredProducts: products,
      categoryCounts,
    });
  },
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (category) =>
    set((state) => {
      const filteredProducts =
        category === 'all'
          ? state.products
          : state.products.filter((product) => product.category === category);

      return { selectedCategory: category, filteredProducts };
    }),
}));
