import { create } from 'zustand';
import { Product } from '@/types/product';
import { fetchProducts } from '@/lib/api/products';

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
      const products = await fetchProducts();

      // 테스트용 딜레이
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const selectedCategory = get().selectedCategory;
      const filteredProducts =
        selectedCategory === 'all'
          ? products
          : products.filter((p: Product) => p.category === selectedCategory);

      set({
        products,
        filteredProducts,
        loading: false,
      });
      console.log('products', products);
    } catch (error) {
      console.error('상품을 가져오는데 실패했습니다:', error);
      set({ loading: false });
    }
  },

  setSelectedCategory: (category: string | null) => {
    const currentCategory = category ?? 'all';
    const { products } = get();
    const filteredProducts =
      currentCategory === 'all'
        ? products
        : products.filter((p: Product) => p.category === currentCategory);

    set({
      selectedCategory: currentCategory,
      filteredProducts,
    });
  },

  getCategories: () => {
    const { products } = get();
    if (products.length === 0) return ['all']; // 제품이 없으면 'all'만 반환
    return ['all', ...Array.from(new Set(products.map((p: Product) => p.category)))];
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
