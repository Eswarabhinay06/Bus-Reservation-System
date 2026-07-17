import { useState } from "react";

function SeatSelection({ availableSeats, onConfirm }) {

  const [seatCount, setSeatCount] = useState(1);

  return (

    <div className="card shadow-lg p-4">

      <h3 className="text-center mb-4">
        Select Seats
      </h3>

      <h5 className="text-success">
        Available Seats : {availableSeats}
      </h5>

      <label className="form-label mt-3">
        Number of Seats
      </label>

      <input
        type="number"
        className="form-control"
        min="1"
        max={availableSeats}
        value={seatCount}
        onChange={(e) => setSeatCount(Number(e.target.value))}
      />

      <button
        className="btn btn-success mt-4"
        onClick={() => onConfirm(seatCount)}
      >
        Confirm Booking
      </button>

    </div>

  );
}

export default SeatSelection;