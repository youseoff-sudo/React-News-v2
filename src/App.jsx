import Header from "./components/Header";
import NewsGrid from "./components/NewsGrid";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app" id="home">
      <Header />

      <main>
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <p className="hero-label">
                THE FOOTBALL WORLD IS HERE
              </p>

              <h1>
                DON'T JUST READ
                <span> FOOTBALL.</span>
              </h1>

              <h2>عيـش كل لحظة.</h2>

              <p className="hero-description">
                أحدث أخبار كرة القدم من مصر والعالم،
                لحظة بلحظة، في مكان واحد.
              </p>

              <a href="#news" className="hero-button">
                EXPLORE NEWS →
              </a>
            </div>

            <div className="hero-visual">
              <div className="hero-circle"></div>

              <div className="hero-card">
                <span className="hero-live">
                  <span></span> LIVE
                </span>

                <strong>FOOTBALL</strong>
                <small>NEWS</small>
              </div>
            </div>
          </div>
        </section>

        <NewsGrid />
      </main>

      <Footer />
    </div>
  );
}

export default App;