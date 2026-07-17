import { useEffect, useState } from "react";
import api from "../services/api";

function SearchBus() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await api.get("/buses");
      setBuses(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch buses");
    }
  };

  const bookTicket = async (busId) => {
    try {
      await api.post("/bookings", {
        userId: 2,
        busId: busId,
        seatCount: 1,
      });

      alert("Ticket booked successfully!");
      fetchBuses(); // Refresh bus list
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Available Buses</h1>

      {buses.map((bus) => (
        <div
          key={bus.id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{bus.busName}</h2>

          <p><b>Bus Number:</b> {bus.busNumber}</p>
          <p><b>Route:</b> {bus.source} → {bus.destination}</p>
          <p><b>Departure:</b> {bus.departureTime}</p>
          <p><b>Arrival:</b> {bus.arrivalTime}</p>
          <p><b>Fare:</b> ₹{bus.fare}</p>
          <p><b>Available Seats:</b> {bus.availableSeats}</p>

          <button
            onClick={() => bookTicket(bus.id)}
            disabled={bus.availableSeats <= 0}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            {bus.availableSeats > 0 ? "Book Ticket" : "Sold Out"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SearchBus;