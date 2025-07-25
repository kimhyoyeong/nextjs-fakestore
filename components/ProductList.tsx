import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex overflow-hidden bg-white p-8 duration-300 dark:bg-gray-800">
      <div className="relative h-32 w-32 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-2"
          sizes="128px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between px-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {product.title}
        </h3>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>
          <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
