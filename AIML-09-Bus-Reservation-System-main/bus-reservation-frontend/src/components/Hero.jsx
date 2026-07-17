import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-7">

              <div className="hero-badge">
                🚍 India's Trusted Bus Booking Platform
              </div>

              <h1 className="hero-title">
                Travel Comfortably <br />
                Book Your Bus in Seconds
              </h1>

              <p className="hero-text">
                Search buses, compare fares, choose your seats,
                and book tickets instantly with a simple and
                secure online reservation system.
              </p>

              <div className="hero-buttons">

                <a href="#buses" className="btn btn-primary">
                  Search Buses
                </a>

                <a href="/register" className="btn btn-light">
                  Get Started
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;