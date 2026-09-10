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

      {/* NOTION PAGE CONTENT */}
      {artist.blocks && artist.blocks.length > 0 && (
        <section className="section section-line">
          <div className="site-container">
            <div className="artist-notion-content">
              <NotionBlocks blocks={artist.blocks} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}


/* =====================================================
   NOTION BLOCK RENDERER
===================================================== */

function NotionBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block) => {
        const type = block.type;

        if (type === 'paragraph') {
          const text = getRichText(block.paragraph?.rich_text);

          if (!text) {
            return <div key={block.id} style={{ height: '18px' }} />;
          }

          return (
            <p key={block.id}>
              {text}
            </p>
          );
        }

        if (type === 'heading_1') {
          return (
            <h2 key={block.id}>
              {getRichText(block.heading_1?.rich_text)}
            </h2>
          );
        }

        if (type === 'heading_2') {
          return (
            <h3 key={block.id}>
              {getRichText(block.heading_2?.rich_text)}
            </h3>
          );
        }

        if (type === 'heading_3') {
          return (
            <h4 key={block.id}>
              {getRichText(block.heading_3?.rich_text)}
            </h4>
          );
        }

        if (type === 'bulleted_list_item') {
          return (
            <ul key={block.id}>
              <li>
                {getRichText(
                  block.bulleted_list_item?.rich_text
                )}
              </li>
            </ul>
          );
        }

        if (type === 'numbered_list_item') {
          return (
            <ol key={block.id}>
              <li>
                {getRichText(
                  block.numbered_list_item?.rich_text
                )}
              </li>
            </ol>
          );
        }

        if (type === 'quote') {
          return (
            <blockquote key={block.id}>
              {getRichText(block.quote?.rich_text)}
            </blockquote>
          );
        }

        if (type === 'divider') {
          return <hr key={block.id} />;
        }

        if (type === 'image') {
          const imageUrl =
            block.image?.file?.url ||
            block.image?.external?.url ||
            '';

          if (!imageUrl) return null;

          return (
            <figure key={block.id}>
              <img
                src={imageUrl}
                alt=""
              />

              {block.image?.caption?.length > 0 && (
                <figcaption>
                  {getRichText(block.image.caption)}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </>
  );
}


/* =====================================================
   NOTION RICH TEXT
===================================================== */

function getRichText(richText) {
  if (!richText) return '';

  return richText
    .map((item) => item.plain_text || '')
    .join('');
}


/* =====================================================
   DATE
===================================================== */

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


/* =====================================================
   NEXT.JS
===================================================== */

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
