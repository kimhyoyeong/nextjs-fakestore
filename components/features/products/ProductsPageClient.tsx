// app/products/ProductsPageClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // URL 파라미터를 읽기 위한 훅
import { ProductList } from '@/components/features/products/ProductList';
import { Product } from '@/types/product';

interface ProductsPageClientProps {
  products: Product[];
}

export function ProductsPageClient({ products }: ProductsPageClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all'; // URL 파라미터에서 카테고리 추출

  useEffect(() => {
    // 카테고리 파라미터가 바뀔 때마다 필터링
    const filtered =
      category === 'all' ? products : products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  }, [category, products]);

  return <ProductList products={filteredProducts} />;
}
