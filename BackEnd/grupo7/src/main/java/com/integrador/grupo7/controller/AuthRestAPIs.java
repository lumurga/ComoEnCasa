package com.integrador.grupo7.controller;

import com.integrador.grupo7.message.request.LoginForm;
import com.integrador.grupo7.message.request.SignUpForm;
import com.integrador.grupo7.message.response.JwtResponse;
import com.integrador.grupo7.message.response.ResponseMessage;
import com.integrador.grupo7.model.Role;
import com.integrador.grupo7.model.RoleName;
import com.integrador.grupo7.model.User;
import com.integrador.grupo7.repository.impl.IRoleRepository;
import com.integrador.grupo7.repository.impl.IUserRepository;
import com.integrador.grupo7.security.jwt.JwtProvider;
import com.integrador.grupo7.security.services.UserPrinciple;
import com.integrador.grupo7.service.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthRestAPIs {

    AuthenticationManager authenticationManager;
    IUserRepository userRepository;
    IRoleRepository roleRepository;
    PasswordEncoder encoder;
    JwtProvider jwtProvider;
    private EmailServiceImpl emailSenderService;


    @Autowired
    public AuthRestAPIs(AuthenticationManager authenticationManager, IUserRepository userRepository, IRoleRepository roleRepository, PasswordEncoder encoder, JwtProvider jwtProvider, EmailServiceImpl emailSenderService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtProvider = jwtProvider;
        this.emailSenderService = emailSenderService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserPrinciple) authentication.getPrincipal();

        User user = userRepository.findByEmail(userDetails.getUsername());


        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), user.getName(), user.getLastName(), userDetails.getAuthorities()));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }


        User user = new User(signUpRequest.getName(), signUpRequest.getLastName(),
                signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));


        Role role;


        String roleSignUp = signUpRequest.getRole();

        switch (roleSignUp) {
            case "admin":
                Role adminRole = roleRepository.findRoleByName(RoleName.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                role = adminRole;
                break;
            case "user":
                Role userRole = roleRepository.findRoleByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                role = userRole;
                break;
            default:
                Role defaultRole = roleRepository.findRoleByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                role = defaultRole;
        }


        user.setRole(role);
        userRepository.save(user);
        emailSenderService.sendSimpleEmail(user.getEmail(), "Confirmación de cuenta",
                "Hola " + user.getName() + "! Te damos la bienvenida a Como En Casa." + "\n\n" +
                        "-------------------------------------------------------------------------------" + "\n\n" +
                 "Hi " + user.getName() + "! Welcome to Como En Casa.");

        return new ResponseEntity<>(new ResponseMessage("User "+ signUpRequest.getName() + " was successfully registered!"), HttpStatus.CREATED);

    }

}