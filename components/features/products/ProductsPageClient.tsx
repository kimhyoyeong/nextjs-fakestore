'use client';

import { ProductList } from '@/components/features/products/ProductList';
import { CartButton } from '@/components/features/cart/CartButton';
import { Product } from '@/types/product';

export function ProductsPageClient({ products }: { products: Product[] }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <ProductList products={products} />
      </div>
      <CartButton />
    </div>
  );
}
