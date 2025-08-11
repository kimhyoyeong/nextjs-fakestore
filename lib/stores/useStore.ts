import { create } from 'zustand';
import { Product, Category } from '@/types/product';
import { fetchMoreFn } from '@/lib/api/products';

interface Store {
  products: Product[]; // 전체 상품 목록
  filteredProducts: Product[]; // 선택한 카테고리에 따른 필터링된 상품 목록
  categories: Category[]; // 카테고리 목록
  selectedCategory: string; // 현재 선택된 카테고리명 (또는 'all' 전체)
  hasMore: boolean;
  categoryOffsets: Record<string, number>; // 카테고리별 offset 관리

  // 상태 변경 함수들
  setProducts: (products: Product[]) => void; // 전체 상품 상태 설정
  setCategories: (categories: Category[]) => void; // 카테고리 목록 상태 설정
  setSelectedCategory: (category: string) => void; // 선택된 카테고리 변경
  setHasMore: (hasMore: boolean) => void;
  loadMoreProducts: () => Promise<void>; // 더보기 상품 로드
}

export const useStore = create<Store>((set, get) => ({
  //초기값 설정
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: 'all', // 초기값 all
  hasMore: true,
  categoryOffsets: {}, // 카테고리별 offset 초기화

  setHasMore: (hasMore) => set({ hasMore }),

  // 전체 상품 목록 설정 함수
  setProducts: (products) => {
    set({
      products, // 전체 상품 목록 업데이트
      filteredProducts: products, // 필터된 상품도 전체 상품으로 초기화
      hasMore: products.length >= 4, // 4개 이상이면 더 있을 가능성이 있음
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
        hasMore: filteredProducts.length >= 4, // 4개 이상이면 더 있을 가능성이 있음
      };
    }),
  loadMoreProducts: async () => {
    const state = get();
    const { selectedCategory, filteredProducts } = state;

    // 현재 필터링된 상품의 개수를 offset으로 사용
    const offset = filteredProducts.length;

    const moreProducts = await fetchMoreFn(offset, selectedCategory);

    // 카테고리별로 상품 관리
    if (selectedCategory === 'all') {
      const newProducts = [...state.products, ...moreProducts];
      set({
        products: newProducts,
        filteredProducts: newProducts,
        hasMore: moreProducts.length > 0, // 0이면 더 이상 없음 → false
      });
    } else {
      const newFilteredProducts = [...filteredProducts, ...moreProducts];
      set({
        filteredProducts: newFilteredProducts,
        hasMore: moreProducts.length > 0, // 0이면 더 이상 없음 → false
      });
    }
  },
}));
