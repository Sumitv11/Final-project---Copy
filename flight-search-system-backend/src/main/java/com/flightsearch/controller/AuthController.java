package com.flightsearch.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightsearch.entity.ERole;
import com.flightsearch.entity.JwtRequest;
import com.flightsearch.entity.JwtResponse;
import com.flightsearch.entity.MessageResponse;
import com.flightsearch.entity.Role;
import com.flightsearch.entity.SignupRequest;
import com.flightsearch.entity.User;
import com.flightsearch.jwt.security.JwtHelper;
import com.flightsearch.repository.RoleRepository;
import com.flightsearch.repository.UserRepository;
import com.flightsearch.service.MyUserDetailService;
import com.flightsearch.service.RoleService;
import com.flightsearch.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private MyUserDetailService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;
    
    @Autowired
    private RoleService roleService;

    @Autowired
    private JwtHelper jwtHelper;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest request) {
        try {
            authenticate(request.getEmail(), request.getPassword());
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            String token = jwtHelper.generateToken(userDetails);
            String role = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst()
                    .orElse("USER");
            JwtResponse response = JwtResponse.builder()
                    .jwtToken(token)
                    .username(userDetails.getUsername())
                    .roles(role)
                    .build();
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            logger.error("Login attempt failed for user", request.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Invalid Username or Password" ,HttpStatus.UNAUTHORIZED));
        }
    }

    private void authenticate(String email, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        authenticationManager.authenticate(authenticationToken);
    }

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Validated @RequestBody SignupRequest signupRequest) {
        if (userService.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!",HttpStatus.BAD_REQUEST));
        }

        Set<Role> roles = new HashSet<>();
        Optional<Role> userRole = roleService.getRole(ERole.USER);
        if (userRole.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Error: Role not found",HttpStatus.BAD_REQUEST));
        }
        roles.add(userRole.get());

        String encodedPassword = passwordEncoder.encode(signupRequest.getPassword());
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setId((int) Math.round(Math.random() * 100000));
        user.setPassword(encodedPassword);
        user.setFullName(signupRequest.getFullName());
        user.setRoles(roles);

        userService.createUser(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!",HttpStatus.OK));
    }
}
