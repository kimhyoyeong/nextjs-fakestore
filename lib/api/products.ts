// src/lib/api/products.ts
const BASE_URL = 'https://fakestoreapi.com/products';
export const DEFAULT_LIMIT = '';

async function fetchAPI(url: string) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return res.json();
}

// 전체 제품 가져오기
export async function fetchProducts(limit: number = DEFAULT_LIMIT) {
  const query = limit ? `?limit=${limit}` : '';
  return fetchAPI(`${BASE_URL}${query}`);
}

// 카테고리 목록 가져오기
export async function fetchCategories() {
  return fetchAPI(`${BASE_URL}/categories`);
}

// 특정 카테고리 제품 가져오기
export async function fetchCategoryProducts(category: string, limit: number = DEFAULT_LIMIT) {
  const query = limit ? `?limit=${limit}` : '';
  return fetchAPI(`${BASE_URL}/category/${category}${query}`);
}

// 특정 제품 가져오기
export async function fetchProductById(id: number) {
  return fetchAPI(`${BASE_URL}/${id}`);
}
