const bookTicket = async (busId) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first!");
    return;
  }

  try {
    await api.post("/bookings", {
      userId: user.id,
      busId: busId,
      seatCount: 1,
    });

    alert("Ticket booked successfully!");
    fetchBuses();
  } catch (error) {
    console.error(error);
    alert("Booking failed");
  }
};