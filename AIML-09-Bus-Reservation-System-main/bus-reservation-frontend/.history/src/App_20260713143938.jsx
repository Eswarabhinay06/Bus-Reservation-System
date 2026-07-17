import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchBus from "./pages/SearchBus";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Buses</Link>
          <Link to="/register" style={{ marginRight: "15px" }}>Register</Link>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </nav>

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