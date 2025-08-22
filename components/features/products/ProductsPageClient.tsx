'use client';

import { useEffect } from 'react';
import { ProductList } from '@/components/features/products/ProductList';
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

  useEffect(() => {
    setSelectedCategory(category);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [category, setSelectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {loading ? <ProductListSkeleton count={4} /> : <ProductList products={products} />}
      </div>
    </div>
  );
}
