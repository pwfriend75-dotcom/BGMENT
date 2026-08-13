import Link from 'next/link';
import { getArtists } from '../../lib/notion';

export async function getStaticProps() {
  const artists = await getArtists();

  return {
    props: {
      artists,
    },
    revalidate: 60,
  };
}

export default function ArtistList({ artists }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">ARTISTS</h1>
      <p className="text-gray-500 mb-12">BGM Entertainment Roster</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {artists.map((artist) => (
          <Link key={artist.id} href={`/artist/${artist.id}`}>
            <div className="group cursor-pointer bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-600 transition">
              <div className="aspect-w-3 aspect-h-4 overflow-hidden bg-zinc-900">
                <img
                  src={artist.thumbnail}
                  alt={artist.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                  {artist.type}
                </span>
                <h2 className="text-xl font-bold mt-1 text-white">{artist.name}</h2>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{artist.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
