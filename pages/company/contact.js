export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">CONTACT US</h1>
      <p className="text-gray-500 mb-16">Get in Touch with BGM Entertainment</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 연락처 및 정보 */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Address</h2>
            <p className="text-lg font-medium text-white">서울특별시 강남구 테헤란로 123, BGM 타워</p>
          </div>
          <div>
            <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Inquiry</h2>
            <p className="text-gray-300">TEL: 02-1234-5678</p>
            <p className="text-gray-300">EMAIL: contact@bgment.com</p>
          </div>
          <div>
            <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Audition</h2>
            <p className="text-gray-300">EMAIL: audition@bgment.com</p>
          </div>
        </div>

        {/* 지도 영역 (구글맵 또는 네이버맵 임베드 가능) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg h-80 flex items-center justify-center text-gray-500 text-sm">
          [ 지도 영역 : Google Maps 또는 Kakao Maps API 연동 위치 ]
        </div>
      </div>
    </div>
  );
}
