import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import BusCard from "../components/BusCard";
import SeatSelection from "../components/SeatSelection";

function SearchBus() {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  const navigate = useNavigate();

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

  // Go to Payment Page
const goToPayment = (seatCount, selectedSeats) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please Login First");
    navigate("/login");
    return;
  }

  navigate("/payment", {
    state: {
      bus: selectedBus,
      seatCount,
      selectedSeats,
    },
  });

};

  return (
    <>
      <Hero />

      <div className="container py-5" id="buses">

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
    busId={selectedBus.id}
    availableSeats={selectedBus.availableSeats}
    onConfirm={goToPayment}
/>
          </div>
        )}

      </div>
    </>
  );
}

export default SearchBus;