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

  return (
    <div>
      <h1>Available Buses</h1>

      {buses.map((bus) => (
        <div
          key={bus.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{bus.busName}</h3>
          <p>{bus.source} → {bus.destination}</p>
          <p>Departure: {bus.departureTime}</p>
          <p>Arrival: {bus.arrivalTime}</p>
          <p>Fare: ₹{bus.fare}</p>
          <p>Available Seats: {bus.availableSeats}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchBus;