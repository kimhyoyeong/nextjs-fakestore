'use client';

import Link from 'next/link';
import { Category } from '@/types/product';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
}

export function CategoryNav({ categories, selectedCategory }: CategoryNavProps) {
  return (
    <nav className="flex justify-center p-6">
      <ul className="flex items-center gap-2 overflow-x-auto border-b whitespace-nowrap">
        <li className="inline-block">
          <Link
            href="/products"
            className={`block px-1 pb-2 text-base font-semibold transition-colors focus:outline-none ${
              selectedCategory === 'all'
                ? 'border-b-2 border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400'
                : 'text-gray-400 hover:text-orange-500 dark:text-gray-500 dark:hover:text-orange-400'
            }`}
          >
            ALL
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id} className="inline-block">
            <Link
              href={`/products?category=${category.slug}`}
              className={`block px-1 pb-2 text-base font-semibold transition-colors focus:outline-none ${
                selectedCategory === category.slug
                  ? 'border-b-2 border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400'
                  : 'text-gray-400 hover:text-orange-500 dark:text-gray-500 dark:hover:text-orange-400'
              }`}
            >
              {category.name.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
