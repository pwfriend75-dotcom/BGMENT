import Link from 'next/link';
import { getArtists } from '../../lib/notion';

export default function ArtistPage({ artists }) {
  return (
    <>
      <section className="page-header">
        <div className="site-container">
          <div className="hero-subtitle">
            BOX GLOBAL MEDIA
          </div>

          <h1 className="page-title">
            ARTISTS
          </h1>
        </div>
      </section>

      <section className="section section-line">
        <div className="site-container">
          {artists?.length > 0 ? (
            <div className="artist-grid">
              {artists.map((artist) => (
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
    </>
  );
}

export async function getStaticProps() {
  const artists = await getArtists();

  return {
    props: {
      artists: artists || [],
    },

    revalidate: 60,
  };
}
