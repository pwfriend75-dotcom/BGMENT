import Link from 'next/link';

export default function About() {
  return (
    <>
      <section className="page-header">
        <div className="site-container">
          <div className="hero-subtitle">
            BOX GLOBAL MEDIA
          </div>

          <h1 className="page-title">
            ABOUT
          </h1>
        </div>
      </section>

      <section className="section section-line">
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'start',
            }}
          >
            <div>
              <div className="hero-subtitle">
                WHO WE ARE
              </div>
            </div>

            <div>
              <h2 className="large-copy">
                WE CREATE
                <br />
                MUSIC,
                <br />
                ARTISTS
                <br />
                <span className="bgm-accent">
                  AND CONTENT.
                </span>
              </h2>

              <p
                className="body-copy"
                style={{
                  marginTop: '50px',
                  maxWidth: '620px',
                }}
              >
                BOX GLOBAL MEDIA는 아티스트와 음악,
                콘텐츠를 통해 새로운 가치를 만들어가는
                엔터테인먼트 회사입니다.
              </p>

              <p
                className="body-copy"
                style={{
                  marginTop: '20px',
                  maxWidth: '620px',
                }}
              >
                아티스트의 개성과 가능성을 발견하고,
                음악과 다양한 미디어 콘텐츠를 통해
                더 많은 사람들과 연결되는 것을 목표로 합니다.
              </p>
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
            OUR VISION
          </div>

          <div
            className="large-copy"
            style={{
              marginTop: '45px',
              maxWidth: '1100px',
            }}
          >
            CONNECTING
            <br />
            ARTISTS AND
            <br />
            AUDIENCES
            <br />
            <span className="bgm-accent">
              BEYOND BORDERS.
            </span>
          </div>
        </div>
      </section>

      <section className="section section-line">
        <div className="site-container">
          <div className="section-header">
            <h2 className="section-title">
              WHAT WE DO
            </h2>
          </div>

          <div className="news-list">
            <div className="news-item">
              <div className="news-date">01</div>
              <div className="news-category">
                MUSIC
              </div>
              <div className="news-title">
                Music Production &amp; Distribution
              </div>
              <div className="news-arrow">→</div>
            </div>

            <div className="news-item">
              <div className="news-date">02</div>
              <div className="news-category">
                ARTIST
              </div>
              <div className="news-title">
                Artist Management &amp; Development
              </div>
              <div className="news-arrow">→</div>
            </div>

            <div className="news-item">
              <div className="news-date">03</div>
              <div className="news-category">
                CONTENT
              </div>
              <div className="news-title">
                Media &amp; Entertainment Content
              </div>
              <div className="news-arrow">→</div>
            </div>
          </div>

          <div style={{ marginTop: '70px' }}>
            <Link
              href="/company/business"
              className="section-link"
            >
              VIEW OUR BUSINESS →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
