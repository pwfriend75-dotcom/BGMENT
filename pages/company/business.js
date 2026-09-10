export default function Business() {
  return (
    <>
      <section className="page-header">
        <div className="site-container">
          <div className="hero-subtitle">
            BOX GLOBAL MEDIA
          </div>

          <h1 className="page-title">
            BUSINESS
          </h1>
        </div>
      </section>

      <section className="section section-line">
        <div className="site-container">
          <div className="section-header">
            <h2 className="section-title">
              OUR BUSINESS
            </h2>
          </div>

          <div className="news-list">
            <div className="news-item">
              <div className="news-date">01</div>

              <div className="news-category">
                ARTIST
              </div>

              <div>
                <div className="news-title">
                  Artist Management
                </div>

                <p
                  className="body-copy"
                  style={{
                    marginTop: '10px',
                    maxWidth: '700px',
                  }}
                >
                  아티스트 발굴, 육성, 매니지먼트 및
                  활동 전반을 지원합니다.
                </p>
              </div>

              <div className="news-arrow">→</div>
            </div>

            <div className="news-item">
              <div className="news-date">02</div>

              <div className="news-category">
                MUSIC
              </div>

              <div>
                <div className="news-title">
                  Music Production
                </div>

                <p
                  className="body-copy"
                  style={{
                    marginTop: '10px',
                    maxWidth: '700px',
                  }}
                >
                  음원 기획, 제작, 레코딩 및
                  다양한 음악 프로젝트를 진행합니다.
                </p>
              </div>

              <div className="news-arrow">→</div>
            </div>

            <div className="news-item">
              <div className="news-date">03</div>

              <div className="news-category">
                CONTENT
              </div>

              <div>
                <div className="news-title">
                  Content Production
                </div>

                <p
                  className="body-copy"
                  style={{
                    marginTop: '10px',
                    maxWidth: '700px',
                  }}
                >
                  뮤직비디오, 디지털 콘텐츠,
                  아티스트 관련 미디어 콘텐츠를 제작합니다.
                </p>
              </div>

              <div className="news-arrow">→</div>
            </div>

            <div className="news-item">
              <div className="news-date">04</div>

              <div className="news-category">
                GLOBAL
              </div>

              <div>
                <div className="news-title">
                  Global Entertainment
                </div>

                <p
                  className="body-copy"
                  style={{
                    marginTop: '10px',
                    maxWidth: '700px',
                  }}
                >
                  다양한 국가와 시장을 연결하는
                  글로벌 엔터테인먼트 사업을 전개합니다.
                </p>
              </div>

              <div className="news-arrow">→</div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section-line"
        style={{
          background: '#111',
          color: '#fff',
        }}
      >
        <div className="site-container">
          <div className="hero-subtitle">
            BOX GLOBAL MEDIA
          </div>

          <div
            className="large-copy"
            style={{
              marginTop: '40px',
              maxWidth: '1100px',
            }}
          >
            MUSIC.
            <br />
            ARTISTS.
            <br />
            CONTENT.
            <br />
            <span className="bgm-accent">
              GLOBAL.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
