import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "../styles/Payment.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if page is opened directly
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const {
    bus,
    seatCount,
    selectedSeats = [],
  } = location.state;

  const user = JSON.parse(localStorage.getItem("user"));

  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const payNow = async () => {
    if (!user) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // Fake payment delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await api.post("/bookings", {
        userId: user.id,
        busId: bus.id,
        seatCount: seatCount,
        seatNumbers: selectedSeats.join(","),
      });

      alert("🎉 Payment Successful!");

      navigate("/my-bookings");

    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    }

    setLoading(false);
  };

  return (
    <div className="payment-page">

      <div className="payment-card">

        <h2>💳 Payment</h2>

        <hr />

        <h4>{bus.busName}</h4>

        <p>
          <strong>Bus Number :</strong> {bus.busNumber}
        </p>

        <p>
          <strong>Route :</strong>{" "}
          {bus.source} ➜ {bus.destination}
        </p>

        <p>
          <strong>Selected Seats :</strong>{" "}
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "Not Selected"}
        </p>

        <p>
          <strong>Number of Seats :</strong> {seatCount}
        </p>

        <p>
          <strong>Fare per Seat :</strong> ₹{bus.fare}
        </p>

        <h4 className="text-success mt-3">
          Total Amount : ₹{seatCount * bus.fare}
        </h4>

        <hr />

        <h5>Select Payment Method</h5>

        <div className="payment-methods">

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="upi"
              checked={method === "UPI"}
              onChange={() => setMethod("UPI")}
            />
            <label className="form-check-label" htmlFor="upi">
              UPI
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="card"
              checked={method === "Card"}
              onChange={() => setMethod("Card")}
            />
            <label className="form-check-label" htmlFor="card">
              Credit / Debit Card
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="net"
              checked={method === "Net Banking"}
              onChange={() => setMethod("Net Banking")}
            />
            <label className="form-check-label" htmlFor="net">
              Net Banking
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="cash"
              checked={method === "Cash"}
              onChange={() => setMethod("Cash")}
            />
            <label className="form-check-label" htmlFor="cash">
              Cash
            </label>
          </div>

        </div>

        <button
          className="btn btn-success w-100 mt-4"
          onClick={payNow}
          disabled={loading}
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>

      </div>

    </div>
  );
}

export default Payment;