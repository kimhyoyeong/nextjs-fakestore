import { fetchProductById } from '@/lib/api/products';
import Image from 'next/image';

interface ProductPageProps {
  params: Promise<{ id: number }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-lg text-gray-500">
        상품 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="flex flex-col gap-8 rounded-lg bg-white p-6 md:flex-row dark:bg-gray-800">
        <div className="flex flex-shrink-0 items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            priority
            className="rounded border bg-gray-50 object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              {product.title}
            </h1>
            <p className="mb-4 text-gray-600 dark:text-gray-300">{product.description}</p>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-gradient-to-r from-orange-100 to-pink-100 px-2 py-1 text-xs text-orange-700 dark:from-orange-900/30 dark:to-pink-900/30 dark:text-orange-300">
                {product.category}
              </span>
              <span className="inline-block rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                평점: {product.rating?.rate ?? '-'} ({product.rating?.count ?? 0}명)
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">
              ${product.price}
            </span>
            <button className="ml-auto rounded-lg bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 px-6 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg">
              장바구니 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
