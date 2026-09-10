import Link from 'next/link';
import { getNews, getNewsById } from '../lib/notion';

export async function getStaticPaths() {
  try {
    const newsList = await getNews();

    const paths = newsList.map((item) => ({
      params: {
        id: item.id,
      },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('News getStaticPaths Error:', error);

    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const news = await getNewsById(params.id);

    if (!news) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    return {
      props: {
        news,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('News Detail getStaticProps Error:', error);

    return {
      notFound: true,
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

function renderRichText(richText = []) {
  return richText.map((item, index) => {
    const text = item.plain_text || '';

    let content = text;

    if (item.annotations?.bold) {
      content = <strong>{content}</strong>;
    }

    if (item.annotations?.italic) {
      content = <em>{content}</em>;
    }

    if (item.annotations?.underline) {
      content = <u>{content}</u>;
    }

    if (item.href) {
      content = (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-gray-300 hover:text-white"
        >
          {content}
        </a>
      );
    }

    return (
      <span key={index}>
        {content}
      </span>
    );
  });
}

function renderBlock(block) {
  const type = block.type;
  const data = block[type];

  if (!data) return null;

  switch (type) {
    case 'paragraph':
      return (
        <p
          key={block.id}
          className="text-gray-300 leading-8 mb-5 whitespace-pre-line"
        >
          {renderRichText(data.rich_text)}
        </p>
      );

    case 'heading_1':
      return (
        <h2
          key={block.id}
          className="text-3xl font-bold mt-12 mb-5"
        >
          {renderRichText(data.rich_text)}
        </h2>
      );

    case 'heading_2':
      return (
        <h3
          key={block.id}
          className="text-2xl font-bold mt-10 mb-4"
        >
          {renderRichText(data.rich_text)}
        </h3>
      );

    case 'heading_3':
      return (
        <h4
          key={block.id}
          className="text-xl font-bold mt-8 mb-3"
        >
          {renderRichText(data.rich_text)}
        </h4>
      );

    case 'bulleted_list_item':
      return (
        <li
          key={block.id}
          className="text-gray-300 leading-7 ml-6 list-disc mb-2"
        >
          {renderRichText(data.rich_text)}
        </li>
      );

    case 'numbered_list_item':
      return (
        <li
          key={block.id}
          className="text-gray-300 leading-7 ml-6 list-decimal mb-2"
        >
          {renderRichText(data.rich_text)}
        </li>
      );

    case 'quote':
      return (
        <blockquote
          key={block.id}
          className="border-l-4 border-zinc-700 pl-5 my-8 text-gray-400 italic leading-8"
        >
          {renderRichText(data.rich_text)}
        </blockquote>
      );

    case 'divider':
      return (
        <hr
          key={block.id}
          className="border-zinc-800 my-10"
        />
      );

    case 'image': {
      const src =
        data?.file?.url ||
        data?.external?.url ||
        '';

      if (!src) return null;

      return (
        <div
          key={block.id}
          className="my-8"
        >
          <img
            src={src}
            alt=""
            className="w-full rounded-xl"
          />
        </div>
      );
    }

    default:
      return null;
  }
}

export default function NewsDetailPage({ news }) {
  if (!news) return null;

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-4xl mx-auto px-6 pt-20 pb-8">

        <Link
          href="/news"
          className="inline-block text-sm text-gray-500 hover:text-white transition mb-10"
        >
          ← NEWS
        </Link>

        <div className="border-b border-zinc-800 pb-10">

          <div className="flex items-center gap-3 mb-5">

            <span
              className={`text-[11px] px-2 py-1 rounded font-medium ${
                news.category === '공지'
                  ? 'bg-red-900/40 text-red-400 border border-red-800/50'
                  : 'bg-zinc-800 text-gray-300'
              }`}
            >
              {news.category}
            </span>

            <span className="text-xs text-gray-500">
              {formatDate(news.date)}
            </span>

          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            {news.title}
          </h1>

        </div>

      </section>


      <section className="max-w-4xl mx-auto px-6 pb-24">

        {news.media && (
          <div className="mb-10">

            <img
              src={news.media}
              alt={news.title}
              className="w-full rounded-xl"
            />

          </div>
        )}


        {news.blocks && news.blocks.length > 0 ? (

          <article>
            {news.blocks.map((block) => renderBlock(block))}
          </article>

        ) : (

          <div className="py-16 text-center text-gray-500">
            내용이 없습니다.
          </div>

        )}

      </section>

    </main>
  );
}
