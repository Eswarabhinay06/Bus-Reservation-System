import { useState } from "react";
import api from "../services/api";
import "../styles/AddBus.css";

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
    setBus({
      ...bus,
      [e.target.name]: e.target.value,
    });
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

      alert("🚌 Bus Added Successfully!");

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
      alert("Failed to Add Bus");

    }
  };

  return (

    <div className="addbus-page">

      <div className="container">

        <div className="addbus-card">

          <h2 className="text-center mb-4">
            🚌 Add New Bus
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Bus Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="busName"
                  value={bus.busName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Bus Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="busNumber"
                  value={bus.busNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Source</label>
                <input
                  type="text"
                  className="form-control"
                  name="source"
                  value={bus.source}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Destination</label>
                <input
                  type="text"
                  className="form-control"
                  name="destination"
                  value={bus.destination}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Departure Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="departureTime"
                  value={bus.departureTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Arrival Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="arrivalTime"
                  value={bus.arrivalTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Total Seats</label>
                <input
                  type="number"
                  className="form-control"
                  name="totalSeats"
                  value={bus.totalSeats}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Available Seats</label>
                <input
                  type="number"
                  className="form-control"
                  name="availableSeats"
                  value={bus.availableSeats}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Fare (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="fare"
                  value={bus.fare}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <button
              className="btn btn-success addbus-btn"
              type="submit"
            >
              ➕ Add Bus
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default AddBus;