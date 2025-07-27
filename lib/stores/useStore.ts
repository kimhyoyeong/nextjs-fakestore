import { create } from 'zustand';
import { Product } from '@/types/product';

interface Store {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  loading: boolean;
  fetchProducts: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
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

      set({ products, filteredProducts: products, loading: false });
      console.log(products);
    } catch (error) {
      console.error('상품을 가져오는데 실패했습니다:', error);
      set({ loading: false });
    }
  },

  setSelectedCategory: (category: string) => {
    const { products } = get();
    const filteredProducts =
      category === 'all' ? products : products.filter((product) => product.category === category);

    set({ selectedCategory: category, filteredProducts });
  },

  getCategories: () => {
    const { products } = get();
    return Array.from(new Set(['all', ...products.map((p) => p.category)]));
  },

  getCategoryCounts: () => {
    const { products } = get();
    const counts: Record<string, number> = { all: products.length };

    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });

    return counts;
  },
}));
