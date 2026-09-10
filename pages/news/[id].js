import Link from 'next/link';
import { getNews, getNewsById } from '../../lib/notion';

export default function NewsDetail({ newsItem }) {
  if (!newsItem) {
    return null;
  }

  return (
    <>
      <article className="article-wrap">
        <Link href="/news" className="section-link">
          ← BACK TO NEWS
        </Link>

        <div style={{ marginTop: '70px' }}>
          <div className="article-category">
            {newsItem.category}
          </div>

          <h1 className="article-title">
            {newsItem.title}
          </h1>

          <div className="article-date">
            {formatDate(newsItem.date)}
          </div>
        </div>

        {newsItem.media && (
          <div
            style={{
              marginTop: '60px',
              width: '100%',
              overflow: 'hidden',
              background: '#e9e9e5',
            }}
          >
            <img
              src={newsItem.media}
              alt={newsItem.title}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        )}

        <div className="article-body">
          <NotionBlocks blocks={newsItem.blocks} />
        </div>
      </article>
    </>
  );
}

function NotionBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block) => {
        const id = block.id;
        const type = block.type;

        if (type === 'paragraph') {
          const text = getRichText(block.paragraph?.rich_text);

          if (!text) return null;

          return <p key={id}>{text}</p>;
        }

        if (type === 'heading_1') {
          return (
            <h2
              key={id}
              style={{
                fontSize: '36px',
                marginTop: '55px',
                marginBottom: '22px',
              }}
            >
              {getRichText(block.heading_1?.rich_text)}
            </h2>
          );
        }

        if (type === 'heading_2') {
          return (
            <h3
              key={id}
              style={{
                fontSize: '28px',
                marginTop: '45px',
                marginBottom: '18px',
              }}
            >
              {getRichText(block.heading_2?.rich_text)}
            </h3>
          );
        }

        if (type === 'heading_3') {
          return (
            <h4
              key={id}
              style={{
                fontSize: '22px',
                marginTop: '35px',
                marginBottom: '15px',
              }}
            >
              {getRichText(block.heading_3?.rich_text)}
            </h4>
          );
        }

        if (type === 'bulleted_list_item') {
          return (
            <ul
              key={id}
              style={{
                paddingLeft: '24px',
                marginBottom: '12px',
              }}
            >
              <li>
                {getRichText(block.bulleted_list_item?.rich_text)}
              </li>
            </ul>
          );
        }

        if (type === 'numbered_list_item') {
          return (
            <ol
              key={id}
              style={{
                paddingLeft: '24px',
                marginBottom: '12px',
              }}
            >
              <li>
                {getRichText(block.numbered_list_item?.rich_text)}
              </li>
            </ol>
          );
        }

        if (type === 'quote') {
          return (
            <blockquote
              key={id}
              style={{
                margin: '35px 0',
                paddingLeft: '22px',
                borderLeft: '2px solid #111',
                fontSize: '20px',
              }}
            >
              {getRichText(block.quote?.rich_text)}
            </blockquote>
          );
        }

        if (type === 'image') {
          const image =
            block.image?.file?.url ||
            block.image?.external?.url ||
            '';

          if (!image) return null;

          return (
            <img
              key={id}
              src={image}
              alt=""
              style={{
                width: '100%',
                height: 'auto',
                margin: '45px 0',
              }}
            />
          );
        }

        return null;
      })}
    </>
  );
}

function getRichText(richText) {
  if (!richText) return '';

  return richText
    .map((item) => item.plain_text || '')
    .join('');
}

function formatDate(date) {
  if (!date) return '';

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return '';
  }

  return d
    .toLocaleDateString('en-CA')
    .replaceAll('-', '.');
}

export async function getStaticPaths() {
  const news = await getNews();

  const paths = (news || []).map((item) => ({
    params: {
      id: item.id,
    },
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
