import { Product, Category } from '@/types/product';

export async function fetchProducts(offset = 0, limit = 4) {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchProductsByCategorySlug(
  slug: string,
  offset = 0,
  limit = 4
): Promise<Product[]> {
  const categories = await fetchCategories();
  const category = categories.find((cat) => cat.slug === slug);
  if (!category) throw new Error('Category not found');
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/categories/${category.id}/products?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) throw new Error('Failed to fetch products by category');
  return res.json();
}

export async function fetchMoreFn(offset: number): Promise<Product[]> {
  const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=4`);
  const data = await response.json();
  return data; // data가 이미 Product[] 배열임
}
