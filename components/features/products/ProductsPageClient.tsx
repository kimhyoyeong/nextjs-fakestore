'use client';

import { useEffect } from 'react';
import { ProductList } from '@/components/features/products/ProductList';
import { CartButton } from '@/components/features/cart/CartButton';
import { Product } from '@/types/product';
import { useStore } from '@/lib/stores/useStore';
import { useState } from 'react';
import { ProductListSkeleton } from './ProductSkeleton';

interface Props {
  products: Product[];
  category: string;
}
export function ProductsPageClient({ products, category }: Props) {
  const { setSelectedCategory } = useStore();
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined);

  useEffect(() => {
    setSelectedCategory(category);
    setSortOrder(undefined);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [category, setSelectedCategory]);

  const getPriceSortedProducts = () => {
    if (sortOrder === 'asc') return [...products].sort((a, b) => a.price - b.price);
    if (sortOrder === 'desc') return [...products].sort((a, b) => b.price - a.price);
    return products;
  };

  const displayProducts = getPriceSortedProducts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* 정렬 */}
        <div className="mb-3 flex items-center justify-end gap-2 text-base select-none">
          <span
            className={`cursor-pointer ${sortOrder === 'asc' ? 'font-bold text-black' : 'text-gray-400'}`}
            onClick={() => setSortOrder((prev) => (prev === 'asc' ? undefined : 'asc'))}
          >
            낮은 가격순
          </span>
          <span className="text-gray-300">|</span>
          <span
            className={`cursor-pointer ${sortOrder === 'desc' ? 'font-bold text-black' : 'text-gray-400'}`}
            onClick={() => setSortOrder((prev) => (prev === 'desc' ? undefined : 'desc'))}
          >
            높은 가격순
          </span>
        </div>
        {loading ? (
          <ProductListSkeleton count={4} />
        ) : (
          <>
            <ProductList products={displayProducts} />
          </>
        )}
      </div>
      <CartButton />
    </div>
  );
}
