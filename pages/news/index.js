import Link from 'next/link';
import { getNews } from '../../lib/notion';

export async function getStaticProps() {
  const newsList = await getNews();

  return {
    props: {
      newsList,
    },
    revalidate: 60,
  };
}

export default function NewsList({ newsList }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">NEWS & NOTICE</h1>
      <p className="text-gray-500 mb-12">BGM Entertainment Announcement</p>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="divide-y divide-zinc-800">
          {newsList.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-900/60 transition cursor-pointer">
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500 font-mono w-8">#{item.no}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                      item.category === '공지'
                        ? 'bg-red-900/40 text-red-400 border border-red-800/50'
                        : 'bg-zinc-800 text-gray-300'
                    }`}
                  >
                    {item.category}
                  </span>
                  <h2 className="text-sm font-medium text-white">{item.title}</h2>
                </div>
                <div className="flex items-center space-x-6 text-xs text-gray-500 pl-12 md:pl-0">
                  <span>{item.author}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
