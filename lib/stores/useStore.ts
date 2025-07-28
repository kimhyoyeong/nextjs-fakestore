import { create } from 'zustand';
import { Product } from '@/types/product';

interface Store {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  loading: boolean;
  fetchProducts: () => Promise<void>;
  setSelectedCategory: (category: string | null) => void;
  getCategories: () => string[];
  getCategoryCounts: () => Record<string, number>;
}

export const useStore = create<Store>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedCategory: 'all',
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();

      // 테스트용 딜레이
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({
        products,
        filteredProducts:
          get().selectedCategory === 'all'
            ? products
            : products.filter((p) => p.category === get().selectedCategory),
        loading: false,
      });
    } catch (error) {
      console.error('상품을 가져오는데 실패했습니다:', error);
      set({ loading: false });
    }
  },

  setSelectedCategory: (category: string | null) => {
    const currentCategory = category ?? 'all';
    const { products } = get();
    const filtered =
      currentCategory === 'all' ? products : products.filter((p) => p.category === currentCategory);

    set({
      selectedCategory: currentCategory,
      filteredProducts: filtered,
    });
  },

  getCategories: () => {
    const { products } = get();
    return ['all', ...Array.from(new Set(products.map((p) => p.category)))];
  },

  getCategoryCounts: () => {
    const { products } = get();
    return products.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      acc['all'] = (acc['all'] || 0) + 1;
      return acc;
    }, {});
  },
}));
