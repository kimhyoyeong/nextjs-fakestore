export async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products', {
    cache: 'no-store',
  });
  return res.json();
}
