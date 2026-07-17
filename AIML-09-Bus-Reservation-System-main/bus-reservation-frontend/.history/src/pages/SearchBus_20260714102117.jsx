import { useEffect, useState } from "react";
import api from "../services/api";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import BusCard from "../components/BusCard";
import SeatSelection from "../components/SeatSelection";

function SearchBus() {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  // Fetch all buses
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
    if (!source && !destination) {
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
              <h3>No buses found.</h3>
            </div>
          ) : (
            filteredBuses.map((bus) => (
              <BusCard
                key={bus.id}
                bus={bus}
                onBook={() => setSelectedBus(bus)}
              />
            ))
          )}

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
    </>
  );
}

export default SearchBus;