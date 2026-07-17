package com.indranil.busreservation.service;

import com.indranil.busreservation.dto.BookingRequest;
import com.indranil.busreservation.entity.Booking;
import com.indranil.busreservation.entity.Bus;
import com.indranil.busreservation.entity.User;
import com.indranil.busreservation.repository.BookingRepository;
import com.indranil.busreservation.repository.BusRepository;
import com.indranil.busreservation.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BusRepository busRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          BusRepository busRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.busRepository = busRepository;
        this.userRepository = userRepository;
    }

    // ===================== BOOK TICKET =====================
    public Booking bookTicket(BookingRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bus bus = busRepository.findById(request.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        if (bus.getAvailableSeats() < request.getSeatCount()) {
            throw new RuntimeException("Not enough seats available");
        }

        bus.setAvailableSeats(bus.getAvailableSeats() - request.getSeatCount());
        busRepository.save(bus);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBus(bus);
        booking.setSeatCount(request.getSeatCount());
        booking.setSeatNumbers(request.getSeatNumbers());
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus("CONFIRMED");
        booking.setTotalAmount(bus.getFare() * request.getSeatCount());

        return bookingRepository.save(booking);
    }

    // ===================== CANCEL BOOKING =====================
    public Booking cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking Not Found"));

        if (booking.getStatus().equals("CANCELLED")) {
            throw new RuntimeException("Booking already cancelled");
        }

        Bus bus = booking.getBus();

        bus.setAvailableSeats(
                bus.getAvailableSeats() + booking.getSeatCount());

        busRepository.save(bus);

        booking.setStatus("CANCELLED");

        return bookingRepository.save(booking);
    }

}