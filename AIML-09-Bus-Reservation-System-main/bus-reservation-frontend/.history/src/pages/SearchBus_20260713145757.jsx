import { useEffect, useState } from "react";
import api from "../services/api";

function SearchBus() {
  const [buses, setBuses] = useState([]);

  // Fetch all buses
  const fetchBuses = async () => {
    try {
      const response = await api.get("/buses");
      setBuses(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch buses");
    }
  };

  // Load buses when page opens
  useEffect(() => {
    fetchBuses();
  }, []);

  // Book a ticket
  const bookTicket = async (busId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      await api.post("/bookings", {
        userId: user.id,
        busId: busId,
        seatCount: 1,
      });

      alert("Ticket booked successfully!");
      fetchBuses(); // Refresh buses after booking
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  return (
  <div className="container mt-4">
    <h1 className="text-center mb-4">Available Buses</h1>

    <div className="row">
      {buses.map((bus) => (
        <div className="col-md-6 mb-4" key={bus.id}>
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">{bus.busName}</h3>

              <p><strong>Bus Number:</strong> {bus.busNumber}</p>
              <p><strong>Route:</strong> {bus.source} → {bus.destination}</p>
              <p><strong>Departure:</strong> {bus.departureTime}</p>
              <p><strong>Arrival:</strong> {bus.arrivalTime}</p>
              <p><strong>Fare:</strong> ₹{bus.fare}</p>
              <p><strong>Available Seats:</strong> {bus.availableSeats}</p>

              <button
                className={`btn ${bus.availableSeats > 0 ? "btn-primary" : "btn-secondary"}`}
                onClick={() => bookTicket(bus.id)}
                disabled={bus.availableSeats <= 0}
              >
                {bus.availableSeats > 0 ? "Book Ticket" : "Sold Out"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default SearchBus;