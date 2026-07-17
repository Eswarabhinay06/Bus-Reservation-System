import { useEffect, useState } from "react";
import api from "../services/api";
import SeatSelection from "../components/SeatSelection";

function SearchBus() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

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
  const bookTicket = async (busId, seatCount) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first!");
    return;
  }

  try {
    await api.post("/bookings", {
      userId: user.id,
      busId,
      seatCount,
    });

    alert("Ticket booked successfully!");
    setSelectedBus(null);
    fetchBuses();
  } catch (error) {
    console.error(error);
    alert("Booking failed");
  }
};

  return (
  <div className="container mt-4">
    <h1 className="text-center mb-4">🚌 Bus Reservation System</h1>
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
  className="btn btn-primary"
  onClick={() => setSelectedBus(bus.id)}
  disabled={bus.availableSeats <= 0}
>
  {bus.availableSeats > 0 ? "Select Seats" : "Sold Out"}
</button>

{selectedBus === bus.id && (
  <div className="mt-3">
    <SeatSelection
      availableSeats={bus.availableSeats}
      onConfirm={(count) => bookTicket(bus.id, count)}
    />
  </div>
)}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default SearchBus;