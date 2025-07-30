'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/stores/useStore';
import { CategoryNav } from '@/components/features/navigation/CategoryNav';
import { ProductList } from '@/components/features/products/ProductList';
import {
  ProductListSkeleton,
  CategoryNavSkeleton,
} from '@/components/features/products/ProductSkeleton';
import { CartButton } from '@/components/features/cart/CartButton';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';

  const { filteredProducts, loading, fetchProducts, products, setSelectedCategory } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      setSelectedCategory(category);
    }
  }, [category, products.length, setSelectedCategory]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {loading || products.length === 0 ? <CategoryNavSkeleton /> : <CategoryNav />}

          {loading ? <ProductListSkeleton /> : <ProductList products={filteredProducts} />}
        </div>
      </div>
      <CartButton />
    </>
  );
}
