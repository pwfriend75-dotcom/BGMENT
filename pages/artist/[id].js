import Link from 'next/link';
import { getArtists, getArtistById } from '../../lib/notion';

export async function getStaticPaths() {
  try {
    const artists = await getArtists();

    const paths = artists.map((artist) => ({
      params: {
        id: artist.id,
      },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Artist getStaticPaths Error:', error);

    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const artist = await getArtistById(params.id);

    if (!artist) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    return {
      props: {
        artist,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Artist Detail getStaticProps Error:', error);

    return {
      notFound: true,
      revalidate: 60,
    };
  }
}

export default function ArtistDetailPage({ artist }) {
  if (!artist) return null;

  return (
    <main className="min-h-screen bg-black text-white">

      {/* 상단 */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-8">

        <Link
          href="/artist"
          className="inline-block text-sm text-gray-500 hover:text-white transition mb-8"
        >
          ← ARTISTS
        </Link>

      </section>


      {/* 아티스트 프로필 */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* 이미지 */}
          <div>

            <div className="aspect-[4/5] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">

              <img
                src={artist.thumbnail}
                alt={artist.name}
                className="w-full h-full object-cover"
              />

            </div>

          </div>


          {/* 정보 */}
          <div className="flex flex-col justify-center">

            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">
              {artist.type}
            </p>


            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              {artist.name}
            </h1>


            {artist.englishName && (
              <p className="text-lg text-gray-500 mt-3">
                {artist.englishName}
              </p>
            )}


            {artist.debutDate && (
              <div className="mt-8">

                <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">
                  DEBUT
                </p>

                <p className="text-sm text-gray-300">
                  {artist.debutDate}
                </p>

              </div>
            )}


            {artist.summary && (
              <div className="mt-10">

                <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
                  PROFILE
                </p>

                <p className="text-base text-gray-300 leading-8 whitespace-pre-line">
                  {artist.summary}
                </p>

              </div>
            )}


            {artist.detail && (
              <div className="mt-8">

                <p className="text-base text-gray-400 leading-8 whitespace-pre-line">
                  {artist.detail}
                </p>

              </div>
            )}


            {artist.sns && (
              <div className="mt-10">

                <a
                  href={artist.sns}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 border border-zinc-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-zinc-500 transition"
                >
                  SNS →
                </a>

              </div>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}
