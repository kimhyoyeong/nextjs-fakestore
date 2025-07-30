import { fetchProducts, fetchCategories } from '@/lib/api/products';
import { ProductsPageClient } from '@/components/features/products/ProductsPageClient';

export default async function ProductsPage() {
  const products = await fetchProducts(); // 전체 상품
  const categories = await fetchCategories(); // 카테고리

  return (
    <>
      <ProductsPageClient products={products} categories={categories} />
    </>
  );
}
