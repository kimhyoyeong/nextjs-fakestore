export function CartButton() {
  return (
    <button
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-3 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
      onClick={() => {
        // TODO: 장바구니 페이지로 이동 또는 모달 열기
        console.log('장바구니 열기');
      }}
      aria-label="장바구니 보기"
    >
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-red-500 shadow-md">
        0
      </span>
    </button>
  );
}
