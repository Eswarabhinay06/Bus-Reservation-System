import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.removeItem("user");

    alert("Logged out Successfully!");

    navigate("/login");

  };

  return (

    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">

      <div className="container">

        {/* Logo */}

        <Link className="navbar-brand" to="/">
          🚌 <span>Bus Reservation</span>
        </Link>

        {/* Mobile Toggle */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* Home */}

            <li className="nav-item">

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                Home
              </NavLink>

            </li>

            {!user ? (

              <>

                {/* Register */}

                <li className="nav-item">

                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active-link" : ""}`
                    }
                  >
                    Register
                  </NavLink>

                </li>

                {/* Login */}

                <li className="nav-item">

                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active-link" : ""}`
                    }
                  >
                    Login
                  </NavLink>

                </li>

              </>

            ) : (

              <>

                {/* My Bookings */}

                <li className="nav-item">

                  <NavLink
                    to="/my-bookings"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active-link" : ""}`
                    }
                  >
                    My Bookings
                  </NavLink>

                </li>

                {/* Add Bus */}

                {user?.role === "ADMIN" && (
  <li className="nav-item">
    <NavLink
      to="/add-bus"
      className={({ isActive }) =>
        `nav-link ${isActive ? "active-link" : ""}`
      }
    >
      Add Bus
    </NavLink>
  </li>
)}

                {/* Welcome */}

                <li className="nav-item">

                  <span className="welcome-text">

                    👋 {user.name}

                  </span>

                </li>

                {/* Logout */}

                <li className="nav-item">

                  <button
                    className="btn btn-danger logout-btn"
                    onClick={logout}
                  >
                    Logout
                  </button>

                </li>

              </>

            )}

          </ul>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;