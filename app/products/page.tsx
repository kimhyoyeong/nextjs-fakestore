import { fetchProducts, fetchCategoryProducts, fetchCategories } from '@/lib/api/products';
import { ProductsPageClient } from '@/components/features/products/ProductsPageClient';
import { CategoryNav } from '@/components/features/navigation/CategoryNav';

interface Props {
  // Next.js 서버 컴포넌트에서 URL 쿼리스트링(?category=value)을 props로 받아오는 객체 비동기임
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const category = (await searchParams)?.category || 'all';
  const categories = await fetchCategories();

  const products =
    category === 'all'
      ? await fetchProducts() // 전체 상품
      : await fetchCategoryProducts(category); // 카테고리별 상품

  console.log('✅ [SERVER] products:', products);

  return (
    <>
      <CategoryNav categories={categories} />
      <ProductsPageClient products={products} category={category} />
    </>
  );
}
