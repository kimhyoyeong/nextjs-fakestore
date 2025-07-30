import { Product } from '@/types/product';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/products');
  return res.json();
}
/* 
export async function fetchProducts(offset = 0, limit = 4) {
  const res = await fetch(`https://api.주소/products?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error('상품을 불러오는 데 실패함');
  return res.json();
} */

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/categories');
  return res.json();
}

export async function fetchProductsByCategorySlug(slug: string): Promise<Product[]> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/slug/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch category');
  const data = await res.json();
  return data.products;
}
