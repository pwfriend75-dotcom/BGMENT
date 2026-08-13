export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">ABOUT BGM</h1>
      <p className="text-gray-500 mb-16">Creating Beyond Sound, Inspiring the World</p>

      {/* 비전 & 슬로건 */}
      <section className="mb-20">
        <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
          Vision & Slogan
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold leading-relaxed mb-6">
          "소리 그 이상의 가치를 창조하고, 글로벌 엔터테인먼트의 새로운 기준을 제시합니다."
        </h3>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          BGM Entertainment는 아티스트의 고유한 매력을 극대화하여 글로벌 대중문화를 선도하는 
          종합 엔터테인먼트 기업입니다. 체계적인 신인 발굴 시스템과 독창적인 콘텐츠 기획력을 바탕으로 
          음악, 방송, 미디어 아트를 아우르는 트렌드를 만들어갑니다.
        </p>
      </section>

      {/* CEO 메시지 */}
      <section className="border-t border-zinc-800 pt-16">
        <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
          CEO Message
        </h2>
        <h3 className="text-xl font-bold mb-6">대표이사 인사말</h3>
        <div className="space-y-4 text-gray-300 leading-relaxed max-w-3xl">
          <p>
            안녕하십니까, BGM Entertainment 홈페이지를 방문해주신 여러분을 진심으로 환영합니다.
          </p>
          <p>
            저희 BGM은 빠르게 변화하는 글로벌 엔터테인먼트 시장 속에서 혁신적인 아이디어와 
            아티스트 중심의 디렉팅을 통해 한계 없는 성장을 이뤄가고 있습니다.
          </p>
          <p>
            아티스트와 팬, 그리고 대중 모두가 공감할 수 있는 최고의 문화 콘텐츠를 선사할 것을 약속드립니다.
          </p>
          <p className="pt-6 font-semibold text-white">BGM Entertainment 대표이사 권영인</p>
        </div>
      </section>
    </div>
  );
}
