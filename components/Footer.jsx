export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-xs border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* 회사 정보 */}
          <div>

            <h2 className="text-white font-bold text-sm tracking-widest mb-4">
              BGM ENTERTAINMENT
            </h2>

            <p className="leading-6 text-gray-500">
              BOX GLOBAL MEDIA
            </p>

            <p className="mt-4 text-gray-600">
              © {new Date().getFullYear()} BGM Entertainment.
              All rights reserved.
            </p>

          </div>


          {/* 링크 */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-400">

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              INSTAGRAM
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              YOUTUBE
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}
