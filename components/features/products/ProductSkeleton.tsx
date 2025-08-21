// 기본 스켈레톤 컴포넌트
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-gray-300 ${className}`}
      style={{
        background: 'linear-gradient(90deg, #d1d5db 25%, #e5e7eb 50%, #d1d5db 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
}

// 상품 카드 스켈레톤
export function ProductCardSkeleton() {
  return (
    <div className="flex overflow-hidden bg-white p-8 duration-300 dark:bg-gray-800">
      <div className="relative h-32 w-32 flex-shrink-0">
        <Skeleton className="h-full w-full rounded" />
      </div>
      <div className="flex flex-1 flex-col justify-between px-4">
        <div className="mb-2">
          <Skeleton className="mb-2 h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="mb-2 flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// 상품 목록 스켈레톤
export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
