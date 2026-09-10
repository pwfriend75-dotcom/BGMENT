import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-baseline hover:opacity-80 transition"
        >
          <span className="text-2xl font-black tracking-tighter text-white">
            BGM
          </span>

          <span className="hidden sm:inline text-xs text-gray-400 font-normal ml-2 tracking-wider">
            ENTERTAINMENT
          </span>
        </Link>


        {/* NAVIGATION */}
        <nav className="flex items-center gap-5 sm:gap-8 text-xs sm:text-sm font-semibold tracking-wider uppercase">

          <Link
            href="/company/about"
            className="text-gray-300 hover:text-white transition"
          >
            Company
          </Link>

          <Link
            href="/artist"
            className="text-gray-300 hover:text-white transition"
          >
            Artist
          </Link>

          <Link
            href="/news"
            className="text-gray-300 hover:text-white transition"
          >
            News
          </Link>

        </nav>

      </div>
    </header>
  );
}
