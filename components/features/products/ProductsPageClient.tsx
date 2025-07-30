'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { CategoryNav } from '@/components/features/navigation/CategoryNav';
import { ProductList } from '@/components/features/products/ProductList';
import { ProductListSkeleton } from '@/components/features/products/ProductSkeleton';
import { useStore } from '@/lib/stores/useStore';

export function ProductsPageClient({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const selectedCategory = searchParams.get('category') || 'all';
  const { filteredProducts, categoryCounts, setProducts, setCategories, setSelectedCategory } =
    useStore();

  // 초기 데이터 설정
  useEffect(() => {
    setProducts(products);
    setCategories(categories);
  }, [products, categories, setProducts, setCategories]);

  // 카테고리 변경 시 필터링
  useEffect(() => {
    setIsLoading(true);
    setSelectedCategory(selectedCategory);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCategory, setSelectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <CategoryNav
          categories={['all', ...categories]}
          selectedCategory={selectedCategory}
          categoryCounts={categoryCounts}
        />
        {isLoading ? (
          <ProductListSkeleton count={6} />
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
