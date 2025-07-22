'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/stores/useStore';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductList } from '@/components/ProductList';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Home() {
  const { filteredProducts, loading, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          상품 목록
        </h1>

        <CategoryNav />

        {loading ? <LoadingSpinner /> : <ProductList products={filteredProducts} />}
      </div>
    </div>
  );
}
