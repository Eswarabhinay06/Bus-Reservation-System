import { useState } from "react";

function SeatSelection({ availableSeats, onConfirm }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const totalSeats = 40;

  const toggleSeat = (seat) => {
    if (seat > availableSeats) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div>
      <h5>Select Seats</h5>

      <div className="d-flex flex-wrap" style={{ maxWidth: "300px" }}>
        {[...Array(totalSeats)].map((_, index) => {
          const seat = index + 1;
          const booked = seat > availableSeats;
          const selected = selectedSeats.includes(seat);

          return (
            <button
              key={seat}
              className={`btn m-1 ${
                booked
                  ? "btn-secondary"
                  : selected
                  ? "btn-success"
                  : "btn-outline-primary"
              }`}
              style={{ width: "50px", height: "50px" }}
              disabled={booked}
              onClick={() => toggleSeat(seat)}
            >
              {seat}
            </button>
          );
        })}
      </div>

      <button
        className="btn btn-primary mt-3"
        disabled={selectedSeats.length === 0}
        onClick={() => onConfirm(selectedSeats.length)}
      >
        Confirm {selectedSeats.length} Seat(s)
      </button>
    </div>
  );
}

export default SeatSelection;