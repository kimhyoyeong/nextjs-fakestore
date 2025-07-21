import { create } from 'zustand';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface Store {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      set({ products, loading: false });
      console.log(products);
    } catch (error) {
      console.error('상품을 가져오는데 실패했습니다:', error);
      set({ loading: false });
    }
  },
}));
