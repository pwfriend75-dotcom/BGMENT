import Link from 'next/link';
import { getNews } from '../../lib/notion';

export default function NewsPage({ news }) {
  return (
    <>
      <section className="page-header">
        <div className="site-container">
          <div className="hero-subtitle">
            BOX GLOBAL MEDIA
          </div>

          <h1 className="page-title">
            NEWS
          </h1>
        </div>
      </section>

      <section className="section section-line">
        <div className="site-container">
          {news?.length > 0 ? (
            <div className="news-list">
              {news.map((item) => (
                <Link
                  href={`/news/${item.id}`}
                  className="news-item"
                  key={item.id}
                >
                  <div className="news-date">
                    {formatDate(item.date)}
                  </div>

                  <div className="news-category">
                    {item.category}
                  </div>

                  <div className="news-title">
                    {item.title}
                  </div>

                  <div className="news-arrow">
                    →
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="body-copy">
              News will be updated soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
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

export async function getStaticProps() {
  const news = await getNews();

  return {
    props: {
      news: news || [],
    },

    revalidate: 60,
  };
}
