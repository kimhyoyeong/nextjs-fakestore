import { fetchProducts, fetchCategories } from '@/lib/api/products';
import { ProductList } from '@/components/features/products/ProductList';
import { CategoryNav } from '@/components/features/navigation/CategoryNav';
import { Product } from '@/types/product';

interface ProductsPageProps {
  searchParams: { category?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // 서버에서 데이터 받아오기
  const products: Product[] = await fetchProducts();
  const categories: string[] = await fetchCategories();

  // URL 파라미터에서 카테고리 추출
  const selectedCategory = searchParams.category || 'all';

  console.log('searchParams', selectedCategory);

  // 카테고리별 필터링
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product: Product) => product.category === selectedCategory);

  // 카테고리별 개수 계산
  const categoryCounts = products.reduce<Record<string, number>>(
    (acc: Record<string, number>, product: Product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      acc['all'] = (acc['all'] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <CategoryNav
          categories={['all', ...categories]}
          selectedCategory={selectedCategory}
          categoryCounts={categoryCounts}
        />
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
