import { useStore } from '@/lib/stores/useStore';
import Link from 'next/link';

export function CategoryNav() {
  const { getCategories, selectedCategory, getCategoryCounts } = useStore();
  const categories = getCategories();
  const counts = getCategoryCounts();

  return (
    <nav className="mb-6 flex justify-center">
      <ul className="flex items-center gap-2 overflow-x-auto border-b whitespace-nowrap">
        {categories.map((category) => (
          <li key={category} className="inline-block">
            <Link
              href={category === 'all' ? '/' : `/?category=${category}`}
              className={`block px-1 pb-2 text-base font-semibold transition-colors focus:outline-none ${
                category === selectedCategory
                  ? 'border-b-2 border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400'
                  : 'text-gray-400 hover:text-orange-500 dark:text-gray-500 dark:hover:text-orange-400'
              }`}
            >
              {category.toUpperCase()}({counts[category]})
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
