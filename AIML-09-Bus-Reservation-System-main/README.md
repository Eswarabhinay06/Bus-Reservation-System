# 🚌 Bus Reservation System

A Full Stack Bus Reservation System developed using **ReactJS**, **Spring Boot**, and **MySQL**. This application allows users to search buses, reserve seats, make payments, and manage their bookings through a modern web interface.

---

## 📌 Features

- 👤 User Registration & Login
- 🔍 Search Buses
- 🚌 View Available Buses
- 💺 Seat Selection
- 💳 Payment Page
- 🎫 Book Ticket
- 📋 My Bookings
- ❌ Cancel Booking
- ➕ Admin Add Bus
- 📱 Responsive User Interface

---

## 🛠️ Technologies Used

### Frontend
- ReactJS
- React Router DOM
- Axios
- Bootstrap 5
- CSS

### Backend
- Spring Boot
- Spring Data JPA
- REST API
- Maven

### Database
- MySQL

---

## 📂 Project Structure

```
BusReservationSystem
│
├── bus-reservation-backend
├── bus-reservation-frontend
└── README.md
```

---

## 🚀 How to Run

### Backend

1. Open the backend project in Eclipse/STS.
2. Configure MySQL database.
3. Run the Spring Boot application.

### Frontend

```bash
cd bus-reservation-frontend
npm install
npm run dev
```

---

## 📡 REST APIs

### Authentication

- POST /api/auth/register
- POST /api/auth/login

### Bus

- GET /api/buses
- POST /api/buses

### Booking

- POST /api/bookings
- GET /api/bookings/user/{id}
- PUT /api/bookings/cancel/{bookingId}

---

## 🔮 Future Enhancements

- JWT Authentication
- Email Ticket Confirmation
- PDF Ticket Download
- Razorpay/Stripe Payment Integration
- Admin Dashboard
- Bus Tracking
- Ratings & Reviews
- Live Seat Availability

---

## 👨‍💻 Developer

**Indranil Goud**

B.Tech (Artificial Intelligence & Machine Learning)

GitHub:
https://github.com/indranilgoud