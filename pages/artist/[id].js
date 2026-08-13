import Link from 'next/link';
import { getArtists, getArtistById } from '../../lib/notion';

export async function getStaticPaths() {
  const artists = await getArtists();
  const paths = artists.map((artist) => ({
    params: { id: artist.id },
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

export default function ArtistDetail({ artist }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <Link href="/artist" className="text-xs text-gray-500 hover:text-white transition mb-8 inline-block">
        ← BACK TO ARTISTS
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
          <img src={artist.thumbnail} alt={artist.name} className="w-full object-cover" />
        </div>

        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">{artist.type}</span>
          <h1 className="text-4xl font-black text-white mt-1 mb-6">{artist.name}</h1>
          <p className="text-gray-300 leading-relaxed mb-8 whitespace-pre-wrap">{artist.summary}</p>

          {artist.snsLinks && (
            <div className="pt-6 border-t border-zinc-800">
              <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Official Links</h2>
              <a
                href={artist.snsLinks}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded transition"
              >
                VISIT SOCIAL MEDIA →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
