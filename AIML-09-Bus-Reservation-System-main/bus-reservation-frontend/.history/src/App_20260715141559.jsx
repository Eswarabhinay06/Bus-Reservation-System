import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import SearchBus from "./pages/SearchBus";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import AddBus from "./pages/AddBus";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<SearchBus />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        const user = JSON.parse(localStorage.getItem("user"));

<Route
  path="/add-bus"
  element={
    user?.role === "ADMIN"
      ? <AddBus />
      : <Navigate to="/" replace />
  }
/>

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;