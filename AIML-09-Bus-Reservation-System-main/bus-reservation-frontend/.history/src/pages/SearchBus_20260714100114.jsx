import { useEffect, useState } from "react";
import api from "../services/api";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import SeatSelection from "../components/SeatSelection";

function SearchBus() {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  // Fetch buses
  const fetchBuses = async () => {
    try {
      const response = await api.get("/buses");
      setBuses(response.data);
      setFilteredBuses(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch buses");
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // Search buses
  const searchBus = (source, destination) => {
    if (source === "" && destination === "") {
      setFilteredBuses(buses);
      return;
    }

    const result = buses.filter(
      (bus) =>
        bus.source.toLowerCase().includes(source.toLowerCase()) &&
        bus.destination.toLowerCase().includes(destination.toLowerCase())
    );

    setFilteredBuses(result);
  };

  // Book ticket
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

      alert("Ticket Booked Successfully!");

      setSelectedBus(null);

      fetchBuses();
    } catch (error) {
      console.error(error);
      alert("Booking Failed");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />

      <div className="container py-5">

        {/* Search Bar */}
        <SearchBar onSearch={searchBus} />

        <h2 className="text-center fw-bold mt-5 mb-4">
          Available Buses
        </h2>

        <div className="row">

          {filteredBuses.length === 0 ? (

            <div className="text-center mt-5">
              <h3>No buses found</h3>
            </div>

          ) : (

            filteredBuses.map((bus) => (

              <div className="col-lg-6 col-xl-4 mb-4" key={bus.id}>

                <div
                  className="card shadow border-0 rounded-4 h-100"
                  style={{ transition: "0.3s" }}
                >

                  <div className="card-body">

                    <h3 className="text-primary fw-bold">
                      🚌 {bus.busName}
                    </h3>

                    <hr />

                    <p>
                      <strong>Bus No:</strong> {bus.busNumber}
                    </p>

                    <p>
                      <strong>From:</strong> {bus.source}
                    </p>

                    <p>
                      <strong>To:</strong> {bus.destination}
                    </p>

                    <div className="d-flex justify-content-between">

                      <div>
                        <small className="text-muted">
                          Departure
                        </small>

                        <h6>{bus.departureTime}</h6>
                      </div>

                      <div>
                        <small className="text-muted">
                          Arrival
                        </small>

                        <h6>{bus.arrivalTime}</h6>
                      </div>

                    </div>

                    <hr />

                    <h4 className="text-success">
                      ₹ {bus.fare}
                    </h4>

                    <p className="fw-bold">
                      Seats Left :
                      <span className="text-danger">
                        {" "}
                        {bus.availableSeats}
                      </span>
                    </p>

                    <button
                      className="btn btn-primary w-100"
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

            ))

          )}

        </div>

        {/* Seat Selection */}

        {selectedBus && (

          <div className="mt-5">

            <SeatSelection
              availableSeats={selectedBus.availableSeats}
              onConfirm={bookTicket}
            />

          </div>

        )}

      </div>
    </>
  );
}

export default SearchBus;