import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import SearchBus from "./pages/SearchBus";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import AddBus from "./pages/AddBus";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark px-3"
      style={{ marginBottom: "20px" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Bus Reservation
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Buses
          </Link>

          {!user ? (
            <>
              <Link className="nav-link" to="/register">
                Register
              </Link>

              <Link className="nav-link" to="/login">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/my-bookings">
                My Bookings
              </Link>

              <Link className="nav-link" to="/add-bus">
                Add Bus
              </Link>

              <span className="navbar-text text-white me-3">
                Hi, {user.name}
              </span>

              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<SearchBus />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/add-bus" element={<AddBus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;