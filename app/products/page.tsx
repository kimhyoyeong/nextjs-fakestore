import { fetchProducts, fetchCategories, fetchProductsByCategorySlug } from '@/lib/api/products';
import { ProductListClient } from '@/components/features/products/ProductListClient';

interface Props {
  // URL 쿼리 파라미터로 category 값을 받을 수 있음.
  // Promise 타입인 이유는 Next.js 13의 서버 컴포넌트가 searchParams를 비동기로 받기 때문.
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  // 1. 모든 카테고리 정보를 서버에서 가져옴
  const categories = await fetchCategories();

  // 2. URL에 category가 있으면 그걸 쓰고, 없으면 'all'로 정함
  const categorySlug = (await searchParams).category ?? 'all';

  let products;

  // 3. category가 'all'이면 전체 상품 4개 가져오고,
  //    아니면 그 카테고리에 맞는 상품 4개만 가져옴
  if (categorySlug === 'all') {
    products = await fetchProducts(0, 4);
  } else {
    products = await fetchProductsByCategorySlug(categorySlug, 0, 4);
  }

  console.log('categorySlug', categorySlug);
  console.log('categories', categories);
  console.log('products', products);

  // 4. 카테고리 목록과 상품 목록을 화면에 보여줌
  return (
    <div className="mx-auto max-w-6xl bg-gray-50 p-4 dark:bg-gray-900">
      <ProductListClient
        categories={categories}
        selectedCategory={categorySlug}
        products={products}
      />
    </div>
  );
}
