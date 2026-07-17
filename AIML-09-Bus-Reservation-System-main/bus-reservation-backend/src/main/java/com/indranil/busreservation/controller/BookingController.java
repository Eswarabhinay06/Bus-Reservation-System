package com.indranil.busreservation.controller;

import com.indranil.busreservation.dto.BookingRequest;
import com.indranil.busreservation.entity.Booking;
import com.indranil.busreservation.repository.BookingRepository;
import com.indranil.busreservation.service.BookingService;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    private final BookingService bookingService;
    private final BookingRepository bookingRepository;

    public BookingController(BookingService bookingService,
                             BookingRepository bookingRepository) {
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
    }

    // Create booking
    @PostMapping
    public Booking bookTicket(@RequestBody BookingRequest request) {
        return bookingService.bookTicket(request);
    }

    // Get bookings of a user
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Cancel booking
    @PutMapping("/cancel/{bookingId}")
    public Booking cancelBooking(@PathVariable Long bookingId) {
        return bookingService.cancelBooking(bookingId);
    }

    // Get booked seats of a bus
    @GetMapping("/bus/{busId}/seats")
    public List<String> getBookedSeats(@PathVariable Long busId) {

        List<Booking> bookings = bookingRepository.findByBusId(busId);

        List<String> bookedSeats = new ArrayList<>();

        for (Booking booking : bookings) {

            if (!"CANCELLED".equals(booking.getStatus())
                    && booking.getSeatNumbers() != null) {

                String[] seats = booking.getSeatNumbers().split(",");

                for (String seat : seats) {
                    bookedSeats.add(seat.trim());
                }
            }
        }

        return bookedSeats;
    }
}