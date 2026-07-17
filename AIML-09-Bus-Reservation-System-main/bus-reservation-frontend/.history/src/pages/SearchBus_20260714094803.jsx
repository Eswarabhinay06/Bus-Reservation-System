import { useEffect, useState } from "react";
import api from "../services/api";
import SeatSelection from "../components/SeatSelection";
import SearchBar from "../components/SearchBar";

function SearchBus() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [filteredBuses, setFilteredBuses] = useState([]);

  const fetchBuses = async () => {
    try {
      const response = await api.get("/buses");
      setBuses(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch buses");
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const bookTicket = async (seatCount) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Login First");
      return;
    }

    try {
      await api.post("/bookings", {
        userId: user.id,
        busId: selectedBus.id,
        seatCount: seatCount,
      });

      alert("Ticket Booked Successfully");

      setSelectedBus(null);

      fetchBuses();
    } catch (err) {
      console.log(err);
      alert("Booking Failed");
    }
  };

  return (
    <div className="container py-5">

      <h1 className="text-center fw-bold mb-5">
        🚌 Bus Reservation System
      </h1>

      <div className="row">

        {buses.map((bus) => (

          <div className="col-lg-6 mb-4" key={bus.id}>

            <div className="card shadow-lg border-0 rounded-4">

              <div className="card-body">

                <h3 className="text-primary fw-bold">
                  {bus.busName}
                </h3>

                <hr />

                <p>
                  <strong>Bus Number:</strong> {bus.busNumber}
                </p>

                <p>
                  <strong>Route:</strong><br />
                  {bus.source} ➜ {bus.destination}
                </p>

                <div className="row">

                  <div className="col-6">
                    <h6>Departure</h6>
                    <h5>{bus.departureTime}</h5>
                  </div>

                  <div className="col-6">
                    <h6>Arrival</h6>
                    <h5>{bus.arrivalTime}</h5>
                  </div>

                </div>

                <hr />

                <h5 className="text-success">
                  ₹ {bus.fare}
                </h5>

                <h6>
                  Available Seats :
                  <span className="text-danger">
                    {" "}
                    {bus.availableSeats}
                  </span>
                </h6>

                <button
                  className="btn btn-primary mt-3 w-100"
                  disabled={bus.availableSeats <= 0}
                  onClick={() => setSelectedBus(bus)}
                >
                  {bus.availableSeats > 0
                    ? "Book Ticket"
                    : "Sold Out"}
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {selectedBus && (

        <div className="mt-5">

          <SeatSelection
            availableSeats={selectedBus.availableSeats}
            onConfirm={bookTicket}
          />

        </div>

      )}

    </div>
  );
}

export default SearchBus;