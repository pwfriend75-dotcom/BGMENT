import Link from 'next/link';
import { getNews } from '../lib/notion';

export async function getStaticProps() {
  try {
    const newsList = await getNews();

    return {
      props: {
        newsList,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('News List getStaticProps Error:', error);

    return {
      props: {
        newsList: [],
      },
      revalidate: 60,
    };
  }
}

function formatDate(dateString) {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

export default function NewsList({ newsList = [] }) {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-5xl mx-auto px-6 pt-24 pb-12">

        <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">
          BGM Entertainment
        </p>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          NEWS & NOTICE
        </h1>

        <p className="text-gray-500 mt-4">
          BGM Entertainment Announcement
        </p>

      </section>


      <section className="max-w-5xl mx-auto px-6 pb-24">

        {newsList.length > 0 ? (

          <div className="border-t border-zinc-800">

            {newsList.map((item) => (

              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="block"
              >

                <article className="border-b border-zinc-800 py-6 px-2 hover:bg-zinc-950 transition">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div className="flex items-center gap-4 min-w-0">

                      <span
                        className={`shrink-0 text-[11px] px-2 py-1 rounded font-medium ${
                          item.category === '공지'
                            ? 'bg-red-900/40 text-red-400 border border-red-800/50'
                            : 'bg-zinc-800 text-gray-300'
                        }`}
                      >
                        {item.category}
                      </span>

                      <h2 className="text-sm md:text-base font-medium text-white truncate">
                        {item.title}
                      </h2>

                    </div>


                    <time className="text-xs text-gray-500 md:ml-6 whitespace-nowrap">
                      {formatDate(item.date)}
                    </time>

                  </div>

                </article>

              </Link>

            ))}

          </div>

        ) : (

          <div className="border border-zinc-800 rounded-xl py-20 text-center">

            <p className="text-gray-500">
              등록된 뉴스가 없습니다.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}
