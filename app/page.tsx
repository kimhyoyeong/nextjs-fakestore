'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/stores/useStore';
import Image from 'next/image';

export default function Home() {
  const { products, loading, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          상품 목록
        </h1>

        {loading && (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-lg">상품을 불러오는 중...</div>
          </div>
        )}

        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex overflow-hidden bg-white p-8 duration-300 dark:bg-gray-800"
            >
              <div className="relative h-32 w-32 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-2"
                  sizes="128px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between px-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </h3>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </span>
                  <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
