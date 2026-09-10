import Link from 'next/link';
import { getArtists } from '../lib/notion';

export async function getStaticProps() {
  try {
    const artists = await getArtists();

    return {
      props: {
        artists,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Artist List getStaticProps Error:', error);

    return {
      props: {
        artists: [],
      },
      revalidate: 60,
    };
  }
}

export default function ArtistListPage({ artists = [] }) {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-12">

        <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-3">
          BGM Entertainment
        </p>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          ARTISTS
        </h1>

      </section>


      <section className="max-w-7xl mx-auto px-6 pb-24">

        {artists.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {artists.map((artist) => (

              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className="group"
              >

                <article className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden transition hover:border-zinc-600">

                  <div className="aspect-[4/5] bg-zinc-900 overflow-hidden">

                    <img
                      src={artist.thumbnail}
                      alt={artist.name}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />

                  </div>


                  <div className="p-5">

                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                      {artist.type}
                    </p>

                    <h2 className="text-xl font-bold mt-2">
                      {artist.name}
                    </h2>


                    {artist.englishName && (
                      <p className="text-sm text-gray-500 mt-1">
                        {artist.englishName}
                      </p>
                    )}


                    {artist.summary && (
                      <p className="text-sm text-gray-400 mt-4 leading-6 line-clamp-3">
                        {artist.summary}
                      </p>
                    )}

                  </div>

                </article>

              </Link>

            ))}

          </div>

        ) : (

          <div className="border border-zinc-800 rounded-xl py-20 text-center">

            <p className="text-gray-500">
              등록된 아티스트가 없습니다.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}
