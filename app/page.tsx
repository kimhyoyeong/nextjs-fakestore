'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/stores/useStore';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductList } from '@/components/ProductList';
import { ProductListSkeleton, CategoryNavSkeleton } from '@/components/Skeleton';

export default function Home() {
  const { filteredProducts, loading, fetchProducts, products } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-full bg-gradient-to-tr from-orange-400 via-red-500 to-pink-500 p-2 shadow-lg">
              <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect width="40" height="40" rx="12" fill="url(#logo-gradient)" />
                <path
                  d="M12 16h16M12 20h16M12 24h12"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="32" cy="16" r="2" fill="#fff" />
                <circle cx="32" cy="20" r="2" fill="#fff" />
                <circle cx="32" cy="24" r="2" fill="#fff" />
                <defs>
                  <linearGradient
                    id="logo-gradient"
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="40"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fb923c" />
                    <stop offset="0.5" stopColor="#ef4444" />
                    <stop offset="1" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="bg-gradient-to-tr from-orange-400 via-red-500 to-pink-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent select-none">
              Store
            </span>
          </div>
        </div>

        {loading || products.length === 0 ? <CategoryNavSkeleton /> : <CategoryNav />}

        {loading ? <ProductListSkeleton /> : <ProductList products={filteredProducts} />}
      </div>
    </div>
  );
}
