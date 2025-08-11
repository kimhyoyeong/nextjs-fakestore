import { create } from 'zustand';
import { Product, Category } from '@/types/product';
import { fetchMoreFn } from '@/lib/api/products';

interface Store {
  products: Product[]; // 전체 상품 목록
  filteredProducts: Product[]; // 선택한 카테고리에 따른 필터링된 상품 목록
  categories: Category[]; // 카테고리 목록
  selectedCategory: string; // 현재 선택된 카테고리명 (또는 'all' 전체)

  // 상태 변경 함수들
  setProducts: (products: Product[]) => void; // 전체 상품 상태 설정
  setCategories: (categories: Category[]) => void; // 카테고리 목록 상태 설정
  setSelectedCategory: (category: string) => void; // 선택된 카테고리 변경
  loadMoreProducts: (
    fetchMoreFn: (offset: number, limit: number) => Promise<Product[]>,
    limit?: number
  ) => Promise<void>; // 더보기 상품 로드
}

export const useStore = create<Store>((set, get) => ({
  //초기값 설정
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: 'all', // 초기값 all

  // 전체 상품 목록 설정 함수
  setProducts: (products) => {
    set({
      products, // 전체 상품 목록 업데이트
      filteredProducts: products, // 필터된 상품도 전체 상품으로 초기화
    });
  },

  // 카테고리 목록 상태 설정
  setCategories: (categories) => set({ categories }),

  // 선택된 카테고리 변경 함수
  setSelectedCategory: (category) =>
    set((state) => {
      // 선택 카테고리가 'all'이면 전체 상품 보여주고,
      // 아니면 해당 카테고리명과 일치하는 상품만 필터링
      const filteredProducts =
        category === 'all'
          ? state.products
          : state.products.filter((product) => product.category.name === category);

      return {
        selectedCategory: category, // 선택 카테고리 업데이트
        filteredProducts, // 필터된 상품 목록 업데이트
      };
    }),
  loadMoreProducts: async () => {
    console.log('loadMoreProducts 실행 -> fetchMoreFn');

    /* const state = get();
    const offset = state.products.length;

    const moreProducts = await fetchMoreFn(offset);

    const newProducts = [...state.products, ...moreProducts];
    const filteredProducts =
      state.selectedCategory === 'all'
        ? newProducts
        : newProducts.filter((product) => product.category.name === state.selectedCategory);

    set({
      products: newProducts,
      filteredProducts,
    }); */
  },
}));
