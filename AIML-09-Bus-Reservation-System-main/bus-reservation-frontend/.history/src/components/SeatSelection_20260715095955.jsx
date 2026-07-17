import { useState } from "react";
import "../styles/SeatSelection.css";

function SeatSelection({
  availableSeats,
  bookedSeats = [],
  onConfirm,
}) {
  const totalSeats = 40;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatNo) => {
    // Already booked
    if (bookedSeats.includes(seatNo)) {
      return;
    }

    // Unselect
    if (selectedSeats.includes(seatNo)) {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat !== seatNo)
      );
      return;
    }

    // Limit selection
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