export async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products', {
    cache: 'no-store', // 최신 데이터
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch('https://fakestoreapi.com/products/categories', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchCategoryProducts(category: string) {
  const res = await fetch(`https://fakestoreapi.com/products/category/${category}`, {
    cache: 'no-store', // 최신 데이터
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
