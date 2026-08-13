import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* BGM 브랜드 로고 */}
        <Link href="/" className="text-2xl font-black tracking-tighter hover:opacity-80 transition">
          BGM <span className="text-xs text-gray-400 font-normal ml-1">ENTERTAINMENT</span>
        </Link>

        {/* 상단 네비게이션 메뉴 */}
        <nav className="flex items-center space-x-8 text-sm font-semibold tracking-wider uppercase">
          <Link href="/company/about" className="hover:text-gray-400 transition">
            Company
          </Link>
          <Link href="/artist" className="hover:text-gray-400 transition">
            Artist
          </Link>
          <Link href="/news" className="hover:text-gray-400 transition">
            News
          </Link>
        </nav>
      </div>
    </header>
  );
}
