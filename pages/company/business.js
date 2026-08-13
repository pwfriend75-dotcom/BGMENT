export default function Business() {
  const businessList = [
    {
      no: '01',
      title: '음반 기획 및 제작',
      desc: '국내외 최정상 프로듀서진과 함께 독창적인 컨셉의 음반을 기획, 제작 및 유통합니다.',
    },
    {
      no: '02',
      title: '방송 & 미디어 콘텐츠 제작',
      desc: '예능, 숏폼, 미디어 아트 등 플랫폼에 최적화된 고품질 영상 콘텐츠를 자체 제작합니다.',
    },
    {
      no: '03',
      title: '신인 발굴 및 아티스트 육성',
      desc: '글로벌 오디션 시스템 및 체계적인 트레이닝 프로그램을 통해 차세대 글로벌 스타를 육성합니다.',
    },
    {
      no: '04',
      title: '글로벌 매니지먼트 & 공연',
      desc: '국내외 라이브 공연, 팬미팅, 월드 투어 등 아티스트의 글로벌 활동을 전방위로 지원합니다.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">OUR BUSINESS</h1>
      <p className="text-gray-500 mb-16">BGM Entertainment's Core Competencies</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {businessList.map((item) => (
          <div key={item.no} className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg">
            <span className="text-xs font-mono text-gray-500 mb-2 block">{item.no}</span>
            <h2 className="text-xl font-bold mb-3 text-white">{item.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
