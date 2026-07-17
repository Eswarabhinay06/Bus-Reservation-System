import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "../styles/Payment.css";

function Payment() {

  const navigate = useNavigate();
  const location = useLocation();

  const { bus, seatCount } = location.state;

  const user = JSON.parse(localStorage.getItem("user"));

  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const payNow = async () => {

    setLoading(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await api.post("/bookings", {

        userId: user.id,
        busId: bus.id,
        seatCount: seatCount

      });

      alert("Payment Successful 🎉");

      navigate("/my-bookings");

    } catch (error) {

      console.log(error);

      alert("Payment Failed");

    }

    setLoading(false);

  };

  return (

    <div className="payment-page">

      <div className="payment-card">

        <h2>
          💳 Payment
        </h2>

        <hr />

        <h4>{bus.busName}</h4>

        <p>

          <strong>Route :</strong>

          {bus.source} ➜ {bus.destination}

        </p>

        <p>

          <strong>Seats :</strong>

          {seatCount}

        </p>

        <p>

          <strong>Total :</strong>

          ₹ {seatCount * bus.fare}

        </p>

        <hr />

        <h5>Select Payment Method</h5>

        <div className="payment-methods">

          <label>

            <input
              type="radio"
              checked={method === "UPI"}
              onChange={() => setMethod("UPI")}
            />

            UPI

          </label>

          <label>

            <input
              type="radio"
              checked={method === "Card"}
              onChange={() => setMethod("Card")}
            />

            Credit / Debit Card

          </label>

          <label>

            <input
              type="radio"
              checked={method === "Net Banking"}
              onChange={() => setMethod("Net Banking")}
            />

            Net Banking

          </label>

          <label>

            <input
              type="radio"
              checked={method === "Cash"}
              onChange={() => setMethod("Cash")}
            />

            Cash

          </label>

        </div>

        <button

          className="btn btn-success w-100 mt-4"

          onClick={payNow}

          disabled={loading}

        >

          {loading ? "Processing..." : "Pay Now"}

        </button>

      </div>

    </div>

  );

}

export default Payment;