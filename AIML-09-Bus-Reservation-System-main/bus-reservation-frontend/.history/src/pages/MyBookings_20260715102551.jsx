import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // Fetch Bookings
  const fetchBookings = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Login First");
      return;
    }

    try {
      const response = await api.get(`/bookings/user/${user.id}`);
      setBookings(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to Fetch Bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel Booking
  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await api.put(`/bookings/cancel/${bookingId}`);

      alert("Booking Cancelled Successfully");

      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Unable to Cancel Booking");
    }
  };

  return (
    <div className="booking-page">
      <div className="container">

        <h1 className="booking-title">
          🎫 My Bookings
        </h1>

        {bookings.length === 0 ? (

          <div className="no-booking">
            <h3>No Bookings Found</h3>
            <p>Book your first journey today.</p>
          </div>

        ) : (

          <div className="row">

            {bookings.map((booking) => (

              <div
                className="col-lg-6 mb-4"
                key={booking.id}
              >

                <div className="booking-card">

                  <div className="booking-header">

                    <h3>{booking.bus.busName}</h3>

                    <span
                      className={`status ${
                        booking.status === "CANCELLED"
                          ? "bg-danger"
                          : "bg-success"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                  <hr />

                  <p>
                    <strong>Booking ID :</strong> #{booking.id}
                  </p>

                  <p>
                    <strong>Bus Number :</strong> {booking.bus.busNumber}
                  </p>

                  <p>
                    <strong>Route :</strong> {booking.bus.source} ➜{" "}
                    {booking.bus.destination}
                  </p>

                  <div className="row">

                    <div className="col-6">
                      <p><strong>Departure</strong></p>
                      <h6>{booking.bus.departureTime}</h6>
                    </div>

                    <div className="col-6">
                      <p><strong>Arrival</strong></p>
                      <h6>{booking.bus.arrivalTime}</h6>
                    </div>

                  </div>

                  <hr />

                  <p>
                    <strong>Seats Booked :</strong> {booking.seatCount}
                  </p>

                  <p>
                    <strong>Total Amount :</strong>
                    <span className="price">
                      ₹ {booking.totalAmount}
                    </span>
                  </p>

                  <p>
                    <strong>Booked On :</strong>
                    <br />
                    {new Date(booking.bookingDate).toLocaleString()}
                  </p>

                  <div className="mt-4">

                    <button
                      className={
                        booking.status === "CANCELLED"
                          ? "btn btn-secondary w-100"
                          : "btn btn-danger w-100"
                      }
                      disabled={booking.status === "CANCELLED"}
                      onClick={() => cancelBooking(booking.id)}
                    >
                      {booking.status === "CANCELLED"
                        ? "Booking Cancelled"
                        : "Cancel Booking"}
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default MyBookings;