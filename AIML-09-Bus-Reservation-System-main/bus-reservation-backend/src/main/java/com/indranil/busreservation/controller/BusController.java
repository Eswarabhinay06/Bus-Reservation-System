package com.indranil.busreservation.controller;

import com.indranil.busreservation.entity.Bus;
import com.indranil.busreservation.service.BusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin("*")
public class BusController {

    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping
    public List<Bus> getAll() {
        return busService.getAllBuses();
    }

    @PostMapping
    public Bus add(@RequestBody Bus bus) {
        return busService.addBus(bus);
    }

    @GetMapping("/search")
    public List<Bus> search(@RequestParam String source,
                            @RequestParam String destination) {
        return busService.search(source, destination);
    }
}