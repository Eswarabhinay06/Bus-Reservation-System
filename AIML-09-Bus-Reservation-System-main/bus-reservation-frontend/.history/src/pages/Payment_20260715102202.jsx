import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Payment.css";

function Payment() {

  const navigate = useNavigate();
  const location = useLocation();

  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const data = location.state;

  if (!data) {
    return <Navigate to="/" replace />;
  }

  const bus = data.bus;
  const seatCount = data.seatCount;
  const selectedSeats = data.selectedSeats || [];

  const user = JSON.parse(localStorage.getItem("user"));

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
        paymentMethod: method,
      });

      alert("🎉 Payment Successful!");

      navigate("/my-bookings");

    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">

        <h2 className="text-center mb-3">
          💳 Payment
        </h2>

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
          <strong>Fare Per Seat :</strong> ₹{bus.fare}
        </p>

        <h3 className="text-success mt-3">
          Total Amount : ₹{seatCount * bus.fare}
        </h3>

        <hr />

        <h5>Select Payment Method</h5>

        <div className="payment-methods">

          <div className="form-check">
            <input
              id="upi"
              className="form-check-input"
              type="radio"
              name="payment"
              value="UPI"
              checked={method === "UPI"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="upi">
              UPI
            </label>
          </div>

          <div className="form-check">
            <input
              id="card"
              className="form-check-input"
              type="radio"
              name="payment"
              value="Card"
              checked={method === "Card"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="card">
              Credit / Debit Card
            </label>
          </div>

          <div className="form-check">
            <input
              id="netbanking"
              className="form-check-input"
              type="radio"
              name="payment"
              value="Net Banking"
              checked={method === "Net Banking"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="netbanking">
              Net Banking
            </label>
          </div>

          <div className="form-check">
            <input
              id="cash"
              className="form-check-input"
              type="radio"
              name="payment"
              value="Cash"
              checked={method === "Cash"}
              onChange={(e) => setMethod(e.target.value)}
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

        <button
          className="btn btn-outline-secondary w-100 mt-2"
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          Back
        </button>

      </div>
    </div>
  );
}

export default Payment;