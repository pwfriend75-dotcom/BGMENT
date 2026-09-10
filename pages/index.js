import Link from 'next/link';
import { getArtists, getNews } from '../lib/notion';

export default function Home({ artists, news }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="site-container hero-inner">
          <div className="hero-subtitle">
            BOX GLOBAL MEDIA
          </div>

          <h1 className="display-title">
            BOX<br />
            GLOBAL<br />
            <span className="bgm-accent">MEDIA</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">
              We create music, artists and content
              that connect with audiences around the world.
            </p>

            <div className="hero-subtitle">
              MUSIC · ARTIST · CONTENT
            </div>
          </div>
        </div>
      </section>

      {/* ARTISTS */}
      <section className="section section-line">
        <div className="site-container">
          <div className="section-header">
            <h2 className="section-title">ARTISTS</h2>

            <Link href="/artist" className="section-link">
              VIEW ALL →
            </Link>
          </div>

          {artists?.length > 0 ? (
            <div className="artist-grid">
              {artists.slice(0, 6).map((artist) => (
                <Link
                  href={`/artist/${artist.id}`}
                  className="artist-card"
                  key={artist.id}
                >
                  <div className="artist-image-wrap">
                    {artist.thumbnail && (
                      <img
                        src={artist.thumbnail}
                        alt={artist.name}
                      />
                    )}
                  </div>

                  <div className="artist-card-info">
                    <div className="artist-name">
                      {artist.name}
                    </div>

                    <div className="artist-type">
                      {artist.englishName || artist.type}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="body-copy">
              Artist information will be updated soon.
            </p>
          )}
        </div>
      </section>

      {/* NEWS */}
      <section className="section section-line">
        <div className="site-container">
          <div className="section-header">
            <h2 className="section-title">LATEST NEWS</h2>

            <Link href="/news" className="section-link">
              VIEW ALL →
            </Link>
          </div>

          {news?.length > 0 ? (
            <div className="news-list">
              {news.slice(0, 5).map((item) => (
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

      {/* COMPANY */}
      <section className="section section-line">
        <div className="site-container company-statement">
          <div className="large-copy">
            WE CREATE<br />
            MUSIC, ARTISTS<br />
            <span className="bgm-accent">AND STORIES.</span>
          </div>

          <div className="company-statement-small">
            BOX GLOBAL MEDIA
          </div>
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
  const [artists, news] = await Promise.all([
    getArtists(),
    getNews(),
  ]);

  return {
    props: {
      artists: artists || [],
      news: news || [],
    },

    revalidate: 60,
  };
}
