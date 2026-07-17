package com.indranil.busreservation.controller;

import com.indranil.busreservation.dto.LoginRequest;
import com.indranil.busreservation.dto.RegisterRequest;
import com.indranil.busreservation.entity.User;
import com.indranil.busreservation.repository.UserRepository;
import com.indranil.busreservation.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    // Constructor Injection
    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    // Register User
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        return userService.register(user);
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userService.login(request.getEmail(), request.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.badRequest().body("Invalid email or password");
    }

    // Get All Users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}