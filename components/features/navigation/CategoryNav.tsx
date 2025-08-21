'use client';

import Link from 'next/link';
import { useStore } from '@/lib/stores/useStore';

export function CategoryNav({ categories }: { categories: string[] }) {
  const { selectedCategory, setSelectedCategory } = useStore();
  const categoryList = ['all', ...categories.filter((c) => c !== 'all')];

  return (
    <nav className="mt-6 flex justify-center" aria-label="Product Categories">
      <ul className="flex items-center gap-2 overflow-x-auto border-b whitespace-nowrap">
        {categoryList.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <li key={category} className="inline-block">
              <Link
                href={category === 'all' ? '/products' : `/products?category=${category}`}
                onClick={() => setSelectedCategory(category)}
                className={`block px-2 pb-2 text-base font-semibold transition-colors focus:outline-none ${
                  isActive
                    ? 'border-b-2 border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400'
                    : 'text-gray-400 hover:text-orange-500 dark:text-gray-500 dark:hover:text-orange-400'
                }`}
              >
                {category.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
