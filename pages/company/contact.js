export default function Contact() {
  return (
    <>
      <section className="page-header">
        <div className="site-container">
          <div className="hero-subtitle">
            BOX GLOBAL MEDIA
          </div>

          <h1 className="page-title">
            CONTACT
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
                GET IN TOUCH
              </div>

              <h2
                className="large-copy"
                style={{
                  marginTop: '30px',
                }}
              >
                LET'S CREATE
                <br />
                SOMETHING
                <br />
                <span className="bgm-accent">
                  TOGETHER.
                </span>
              </h2>
            </div>

            <div>
              <div
                style={{
                  borderTop: '1px solid #bbb',
                }}
              >
                <div
                  style={{
                    padding: '28px 0',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  <div className="hero-subtitle">
                    COMPANY
                  </div>

                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '20px',
                    }}
                  >
                    BOX GLOBAL MEDIA
                  </div>
                </div>

                <div
                  style={{
                    padding: '28px 0',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  <div className="hero-subtitle">
                    EMAIL
                  </div>

                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '20px',
                    }}
                  >
                    contact@bgment.com
                  </div>
                </div>

                <div
                  style={{
                    padding: '28px 0',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  <div className="hero-subtitle">
                    LOCATION
                  </div>

                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '20px',
                    }}
                  >
                    SEOUL · HO CHI MINH CITY
                  </div>
                </div>

                <div
                  style={{
                    padding: '28px 0',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  <div className="hero-subtitle">
                    BUSINESS
                  </div>

                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '20px',
                      lineHeight: '1.7',
                    }}
                  >
                    Artist Management
                    <br />
                    Music Production
                    <br />
                    Content Production
                    <br />
                    Global Entertainment
                  </div>
                </div>
              </div>
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
          <div className="large-copy">
            BOX GLOBAL
            <br />
            <span className="bgm-accent">
              MEDIA.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
