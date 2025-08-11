'use client';

import { ProductList } from '@/components/features/products/ProductList';
import { CategoryNav } from '@/components/features/navigation/CategoryNav';
import { Category, Product } from '@/types/product';
import { useStore } from '@/lib/stores/useStore';

interface ProductListClientProps {
  categories: Category[];
  selectedCategory: string;
  products: Product[];
}

export function ProductListClient({
  categories,
  selectedCategory,
  products,
}: ProductListClientProps) {
  const loadMoreProducts = useStore((state) => state.loadMoreProducts);

  return (
    <div className="mx-auto max-w-6xl bg-gray-50 p-4 dark:bg-gray-900">
      <CategoryNav categories={categories} selectedCategory={selectedCategory} />
      <ProductList products={products} />
      <div className="mt-6 text-center">
        <button
          className="w-full rounded-md bg-gray-100 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 active:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => loadMoreProducts()}
        >
          더보기
        </button>
      </div>
    </div>
  );
}
