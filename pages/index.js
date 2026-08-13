import Link from 'next/link';
import { getArtists, getNews } from '../lib/notion';

export async function getStaticProps() {
  const artists = await getArtists();
  const newsList = await getNews();

  return {
    props: {
      artists: artists.slice(0, 4), // 메인에는 최대 4명만 노출
      newsList: newsList.slice(0, 5), // 메인에는 최신글 5개만 노출
    },
    revalidate: 60, // 60초마다 노션 데이터 자동 갱신
  };
}

export default function Home({ artists, newsList }) {
  return (
    <div>
      {/* Hero 메인 비주얼 배너 */}
      <section className="relative h-[70vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">
            BGM ENTERTAINMENT
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Create Beyond Sound, Inspire the Future
          </p>
        </div>
      </section>

      {/* 아티스트 미리보기 세션 */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
              Lineup
            </h2>
            <h3 className="text-3xl font-bold tracking-tight">ARTISTS</h3>
          </div>
          <Link href="/artist" className="text-sm text-gray-400 hover:text-white transition">
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <Link key={artist.id} href={`/artist/${artist.id}`}>
              <div className="group cursor-pointer bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition">
                <div className="aspect-w-3 aspect-h-4 overflow-hidden bg-zinc-900">
                  <img
                    src={artist.thumbnail}
                    alt={artist.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                    {artist.type}
                  </span>
                  <h4 className="text-lg font-bold mt-1 text-white">{artist.name}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 최신 소식 미리보기 세션 */}
      <section className="bg-zinc-950 border-t border-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
                Notice & News
              </h2>
              <h3 className="text-3xl font-bold tracking-tight">LATEST NEWS</h3>
            </div>
            <Link href="/news" className="text-sm text-gray-400 hover:text-white transition">
              VIEW ALL →
            </Link>
          </div>

          <div className="divide-y divide-zinc-800">
            {newsList.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`}>
                <div className="py-4 flex items-center justify-between hover:bg-zinc-900/50 px-2 transition rounded cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                        item.category === '공지'
                          ? 'bg-red-900/40 text-red-400 border border-red-800/50'
                          : 'bg-zinc-800 text-gray-300'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-sm font-medium text-zinc-200">{item.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
