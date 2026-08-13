import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-xs border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-white font-bold text-sm tracking-widest mb-2">BGM ENTERTAINMENT</h2>
          <p className="leading-relaxed">
            (주)비지에이엠 엔터테인먼트 | 대표자: 관리자<br />
            서울특별시 강남구 테헤란로 123 BGM 타워<br />
            Business License: 000-00-00000
          </p>
          <p className="mt-4 text-gray-500">
            © {new Date().getFullYear()} BGM Entertainment Inc. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-6 text-gray-300">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">INSTAGRAM</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">YOUTUBE</a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white">X (TWITTER)</a>
        </div>
      </div>
    </footer>
  );
}
