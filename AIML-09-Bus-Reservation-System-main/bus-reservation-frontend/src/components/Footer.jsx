import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h4>🚌 Bus Reservation</h4>
            <p>
              Book your journey quickly and securely.
              Travel comfortably across cities with
              real-time seat availability.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h4>Quick Links</h4>

            <ul className="footer-links">
              <li>Home</li>
              <li>Search Bus</li>
              <li>My Bookings</li>
              <li>Login</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h4>Contact</h4>

            <p>📧 Eswar@gmail.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 Hyderabad, India</p>
          </div>

        </div>

        <hr />

        <div className="text-center">
          © 2026 Bus Reservation System | Developed by <b> Eswar </b>
        </div>

      </div>

    </footer>
  );
}

export default Footer;