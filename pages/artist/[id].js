import Link from 'next/link';
import { getArtists, getArtistById } from '../../lib/notion';

export default function ArtistDetail({ artist }) {
  if (!artist) {
    return null;
  }

  return (
    <>
      <section className="page-header">
        <div className="site-container">
          <Link href="/artist" className="section-link">
            ← BACK TO ARTISTS
          </Link>
        </div>
      </section>

      <section className="artist-detail-hero">
        <div className="artist-detail-image">
          {artist.thumbnail && (
            <img
              src={artist.thumbnail}
              alt={artist.name}
            />
          )}
        </div>

        <div className="artist-detail-content">
          <div className="hero-subtitle">
            {artist.type || 'ARTIST'}
          </div>

          <h1 className="artist-detail-name">
            {artist.name}
          </h1>

          {artist.englishName && (
            <div className="artist-detail-en">
              {artist.englishName}
            </div>
          )}

          {artist.summary && (
            <p className="artist-detail-summary">
              {artist.summary}
            </p>
          )}

          <div style={{ marginTop: '36px' }}>
            {artist.debutDate && (
              <div className="body-copy">
                DEBUT · {formatDate(artist.debutDate)}
              </div>
            )}

            {artist.sns && (
              <div style={{ marginTop: '14px' }}>
                <a
                  href={artist.sns}
                  target="_blank"
                  rel="noreferrer"
                  className="section-link"
                >
                  SNS →
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {artist.detail && (
        <section className="section section-line">
          <div className="site-container">
            <div
              style={{
                maxWidth: '900px',
                fontSize: '18px',
                lineHeight: '1.9',
                whiteSpace: 'pre-line',
              }}
            >
              {artist.detail}
            </div>
          </div>
        </section>
      )}
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

export async function getStaticPaths() {
  const artists = await getArtists();

  const paths = (artists || []).map((artist) => ({
    params: {
      id: artist.id,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const artist = await getArtistById(params.id);

  if (!artist) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      artist,
    },

    revalidate: 60,
  };
}
