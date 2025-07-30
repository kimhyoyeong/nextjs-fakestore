'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Category, Product } from '@/types/product';
import { ProductList } from './ProductList';
import { CategoryNav } from '../navigation/CategoryNav';

export function ProductsPageClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const slug = searchParams.get('category');

  const filtered = useMemo(() => {
    if (!slug) return products;
    return products.filter((product) => product.category.slug === slug);
  }, [slug, products]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900">
      <CategoryNav categories={categories} selectedCategory={slug || 'all'} />
      <ProductList products={filtered} />
    </div>
  );
}
