import Link from 'next/link';
import { getNews, getNewsById } from '../../lib/notion';

export async function getStaticPaths() {
  const newsList = await getNews();
  const paths = newsList.map((item) => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const newsItem = await getNewsById(params.id);

  if (!newsItem) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      newsItem,
    },
    revalidate: 60,
  };
}

export default function NewsDetail({ newsItem }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/news" className="text-xs text-gray-500 hover:text-white transition mb-8 inline-block">
        ← BACK TO NEWS
      </Link>

      <div className="border-b border-zinc-800 pb-6 mb-8">
        <span
          className={`text-[11px] px-2 py-0.5 rounded font-medium ${
            newsItem.category === '공지'
              ? 'bg-red-900/40 text-red-400 border border-red-800/50'
              : 'bg-zinc-800 text-gray-300'
          }`}
        >
          {newsItem.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4">{newsItem.title}</h1>
        <div className="flex space-x-4 text-xs text-gray-500">
          <span>작성자: {newsItem.author}</span>
          <span>•</span>
          <span>작성일: {newsItem.date}</span>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-8 text-gray-300 leading-relaxed">
        <p className="text-sm">
          본 게시글은 BGM Entertainment 공식 노션 데이터베이스에서 연동되어 표시되는 공지사항입니다.
        </p>
      </div>
    </div>
  );
}
