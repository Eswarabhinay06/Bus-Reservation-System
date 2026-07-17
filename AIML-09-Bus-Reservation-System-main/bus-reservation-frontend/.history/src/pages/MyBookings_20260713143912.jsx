import { useEffect, useState } from "react";
import api from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      const response = await api.get(`/bookings/user/${user.id}`);
      setBookings(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch bookings");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>{booking.bus.busName}</h3>

            <p><b>Booking ID:</b> {booking.id}</p>
            <p><b>Route:</b> {booking.bus.source} → {booking.bus.destination}</p>
            <p><b>Seats:</b> {booking.seatCount}</p>
            <p><b>Total Amount:</b> ₹{booking.totalAmount}</p>
            <p><b>Status:</b> {booking.status}</p>
            <p><b>Booked On:</b> {booking.bookingDate}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;