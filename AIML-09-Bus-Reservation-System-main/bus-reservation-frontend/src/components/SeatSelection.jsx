import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/SeatSelection.css";

function SeatSelection({
  busId,
  availableSeats,
  onConfirm,
}) {

  const totalSeats = 40;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const loadBookedSeats = async () => {
      try {
        const response = await api.get(`/bookings/bus/${busId}/seats`);

        // Convert ["1","2"] -> [1,2]
        setBookedSeats(response.data.map(Number));

      } catch (error) {
        console.error(error);
      }
    };

    loadBookedSeats();
  }, [busId]);

  const toggleSeat = (seatNo) => {

    if (bookedSeats.includes(seatNo)) {
      return;
    }

    if (selectedSeats.includes(seatNo)) {

      setSelectedSeats(
        selectedSeats.filter((seat) => seat !== seatNo)
      );

      return;
    }

    if (selectedSeats.length >= availableSeats) {

      alert("No more seats available");

      return;
    }

    setSelectedSeats([...selectedSeats, seatNo]);
  };

  const confirmBooking = () => {

    if (selectedSeats.length === 0) {

      alert("Please select at least one seat");

      return;
    }

    onConfirm(selectedSeats.length, selectedSeats);
  };

  return (

    <div className="seat-card">

      <h2>Select Your Seats</h2>

      <p className="available">
        Available Seats : {availableSeats}
      </p>

      <div className="driver">
        🚍 Driver
      </div>

      <div className="seat-grid">

        {Array.from({ length: totalSeats }, (_, i) => {

          const seatNo = i + 1;

          const booked = bookedSeats.includes(seatNo);

          const selected = selectedSeats.includes(seatNo);

          return (

            <div
              key={seatNo}
              className={
                booked
                  ? "seat booked"
                  : selected
                  ? "seat selected"
                  : "seat"
              }
              onClick={() => toggleSeat(seatNo)}
            >
              {seatNo}
            </div>

          );

        })}

      </div>

      <div className="summary">

        <h5>

          Selected Seats :

          {selectedSeats.length === 0
            ? " None"
            : " " + selectedSeats.join(", ")}

        </h5>

      </div>

      <button
        className="confirm-btn"
        onClick={confirmBooking}
      >
        Continue to Payment
      </button>

    </div>

  );

}

export default SeatSelection;