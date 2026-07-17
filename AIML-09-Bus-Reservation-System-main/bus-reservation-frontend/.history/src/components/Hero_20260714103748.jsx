import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay">

        <div className="container">

          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-lg-6">

              <span className="hero-badge">
                🚌 India's Smart Bus Booking Platform
              </span>

              <h1 className="hero-title">
                Travel Smarter
                <br />
                Travel Better
              </h1>

              <p className="hero-text">
                Search buses, compare fares, choose your seats,
                and book tickets in just a few clicks.
                Fast, secure and reliable.
              </p>

              <div className="hero-buttons">

                <button className="btn btn-primary btn-lg me-3">
                  Book Now
                </button>

                <button className="btn btn-outline-light btn-lg">
                  Explore Routes
                </button>

              </div>

            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">

              <img
                src="https://cdn-icons-png.flaticon.com/512/741/741407.png"
                alt="Bus"
                className="hero-image"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;