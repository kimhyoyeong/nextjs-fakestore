import { fetchProducts, fetchCategoryProducts, fetchCategories } from '@/lib/api/products';
import { ProductsPageClient } from '@/components/features/products/ProductsPageClient';
import { CategoryNav } from '@/components/features/navigation/CategoryNav';

interface Props {
  searchParams?: { category?: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  const category = (await searchParams)?.category || 'all';
  const categories = await fetchCategories();

  const products =
    category === 'all'
      ? await fetchProducts() // 전체 상품
      : await fetchCategoryProducts(category); // 카테고리별 상품

  return (
    <>
      <CategoryNav categories={categories} />
      <ProductsPageClient products={products} category={category} />
    </>
  );
}
