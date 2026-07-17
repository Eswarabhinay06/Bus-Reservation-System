import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import SearchBus from "./pages/SearchBus";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Buses</Link>

      {!user && (
        <>
          <Link to="/register" style={{ marginRight: "15px" }}>Register</Link>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
        </>
      )}

      {user && (
        <>
          <Link to="/my-bookings" style={{ marginRight: "15px" }}>My Bookings</Link>
          <span style={{ marginRight: "15px" }}>Hi, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<SearchBus />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;