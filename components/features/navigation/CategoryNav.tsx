'use client';

import Link from 'next/link';

interface CategoryProps {
  categories: string[];
  selectedCategory?: string;
  categoryCounts?: Record<string, number>;
}

export function CategoryNav({ categories, selectedCategory, categoryCounts }: CategoryProps) {
  return (
    <nav className="mb-6 flex justify-center">
      <ul className="flex items-center gap-2 overflow-x-auto border-b whitespace-nowrap">
        {categories.map((category) => (
          <li key={category} className="inline-block">
            <Link
              href={category === 'all' ? '/products' : `/products?category=${category}`}
              className={`block px-1 pb-2 text-base font-semibold transition-colors focus:outline-none ${
                category === selectedCategory
                  ? 'border-b-2 border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400'
                  : 'text-gray-400 hover:text-orange-500 dark:text-gray-500 dark:hover:text-orange-400'
              }`}
            >
              {category.toUpperCase()}
              {categoryCounts && `(${categoryCounts[category]})`}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
