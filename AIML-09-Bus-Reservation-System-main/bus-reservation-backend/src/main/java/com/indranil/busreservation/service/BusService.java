package com.indranil.busreservation.service;

import com.indranil.busreservation.entity.Bus;
import com.indranil.busreservation.repository.BusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusService {

    private final BusRepository busRepository;

    public BusService(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Bus addBus(Bus bus) {
        return busRepository.save(bus);
    }

    public List<Bus> search(String source, String destination) {
        return busRepository.findBySourceAndDestination(source, destination);
    }
}