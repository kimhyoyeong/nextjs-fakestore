import { useStore } from '@/lib/stores/useStore';

export function CategoryNav() {
  const { getCategories, selectedCategory, setSelectedCategory, getCategoryCounts } = useStore();
  const categories = getCategories();
  const counts = getCategoryCounts();

  return (
    <nav className="mb-6 flex justify-center">
      <ul className="flex items-center gap-2 overflow-x-auto border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
        {categories.map((category) => (
          <li key={category} className="inline-block">
            <button
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`block px-1 pb-2 text-base font-semibold transition-colors focus:outline-none ${
                category === selectedCategory
                  ? 'border-b-2 border-black text-black dark:border-white dark:text-white'
                  : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white'
              }`}
            >
              {category.toUpperCase()}({counts[category]})
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
