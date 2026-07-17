import "../styles/BusCard.css";

function BusCard({ bus, onBook }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="bus-card">

        {/* Header */}
        <div className="bus-header">
          <div>
            <h3 className="bus-name">{bus.busName}</h3>
            <p className="bus-number">{bus.busNumber}</p>
          </div>
        </div>

        {/* Route */}
        <div className="route-section">

          <div className="route-box">
            <small>From</small>
            <h5>{bus.source}</h5>
            <span>{bus.departureTime}</span>
          </div>

          <div className="route-arrow">
            ➜
          </div>

          <div className="route-box">
            <small>To</small>
            <h5>{bus.destination}</h5>
            <span>{bus.arrivalTime}</span>
          </div>

        </div>

        <hr />

        {/* Fare & Seats */}
        <div className="bus-info">

          <div>
            <h4 className="fare">₹ {bus.fare}</h4>

            <p className="seat-text">
              Seats Left :
              <span className="seat-count">
                {bus.availableSeats}
              </span>
            </p>
          </div>

          <button
            className="book-btn"
            disabled={bus.availableSeats <= 0}
            onClick={onBook}
          >
            {bus.availableSeats > 0 ? "Book Ticket" : "Sold Out"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default BusCard;