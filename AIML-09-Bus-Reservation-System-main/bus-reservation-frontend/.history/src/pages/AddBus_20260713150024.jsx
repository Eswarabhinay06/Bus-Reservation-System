import { useState } from "react";
import api from "../services/api";

function AddBus() {
  const [bus, setBus] = useState({
    busName: "",
    busNumber: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: "",
    availableSeats: "",
    fare: "",
  });

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/buses", {
        ...bus,
        totalSeats: Number(bus.totalSeats),
        availableSeats: Number(bus.availableSeats),
        fare: Number(bus.fare),
      });

      alert("Bus added successfully!");

      setBus({
        busName: "",
        busNumber: "",
        source: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        totalSeats: "",
        availableSeats: "",
        fare: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add bus");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2 className="mb-4">Add New Bus</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Bus Name</label>
            <input
              className="form-control"
              name="busName"
              value={bus.busName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Bus Number</label>
            <input
              className="form-control"
              name="busNumber"
              value={bus.busNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Source</label>
            <input
              className="form-control"
              name="source"
              value={bus.source}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Destination</label>
            <input
              className="form-control"
              name="destination"
              value={bus.destination}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Departure Time</label>
            <input
              className="form-control"
              name="departureTime"
              value={bus.departureTime}
              onChange={handleChange}
              placeholder="08:00 AM"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Arrival Time</label>
            <input
              className="form-control"
              name="arrivalTime"
              value={bus.arrivalTime}
              onChange={handleChange}
              placeholder="01:00 PM"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Total Seats</label>
            <input
              type="number"
              className="form-control"
              name="totalSeats"
              value={bus.totalSeats}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Available Seats</label>
            <input
              type="number"
              className="form-control"
              name="availableSeats"
              value={bus.availableSeats}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fare</label>
            <input
              type="number"
              className="form-control"
              name="fare"
              value={bus.fare}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success" type="submit">
            Add Bus
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBus;