import Link from 'next/link';
import { getArtists, getArtistDetail } from '../../lib/notion';

export async function getStaticPaths() {
  const artists = await getArtists();
  const paths = artists.map((artist) => ({
    params: { id: artist.id },
  }));

  return {
    paths,
    fallback: 'blocking', // 새로운 데이터도 동적으로 빌드
  };
}

export async function getStaticProps({ params }) {
  const artist = await getArtistDetail(params.id);

  if (!artist) {
    return { notFound: true };
  }

  return {
    props: { artist },
    revalidate: 60,
  };
}

export default function ArtistDetailPage({ artist }) {
  return (
    <div className="bg-zinc-950 text-white min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* 뒤로 가기 버튼 */}
        <Link href="/artist" className="text-sm text-zinc-400 hover:text-white transition mb-8 inline-block">
          ← BACK TO ARTISTS
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mt-6">
          {/* 아티스트 이미지 */}
          <div className="md:col-span-5 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <img
              src={artist.thumbnail || '/placeholder.jpg'}
              alt={artist.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 아티스트 정보 */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">
                {artist.type}
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-1">
                {artist.name}
              </h1>
              {artist.englishName && (
                <p className="text-lg text-zinc-400 font-light mt-1">{artist.englishName}</p>
              )}
            </div>

            <div className="border-t border-b border-zinc-800 py-4 space-y-2 text-sm text-zinc-300">
              {artist.debutDate && (
                <p>
                  <span className="text-zinc-500 mr-4">데뷔일</span>
                  {artist.debutDate}
                </p>
              )}
              {artist.snsLink && (
                <p>
                  <span className="text-zinc-500 mr-4">공식 채널</span>
                  <a
                    href={artist.snsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-200 underline hover:text-white"
                  >
                    공식 링크 바로가기 ↗
                  </a>
                </p>
              )}
            </div>

            {/* 요약 정보 */}
            {artist.summary && (
              <p className="text-zinc-300 leading-relaxed font-light text-base">
                {artist.summary}
              </p>
            )}

            {/* 노션 페이지 본문 내용 (Paragraph Block) */}
            {artist.content && artist.content.length > 0 && (
              <div className="pt-6 border-t border-zinc-800 space-y-4">
                <h3 className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                  Biography & Profile
                </h3>
                {artist.content.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-zinc-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
