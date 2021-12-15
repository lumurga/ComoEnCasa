package com.integrador.grupo7.controller;


import com.integrador.grupo7.dto.ReservationDTO;
import com.integrador.grupo7.exception.BadRequestException;
import com.integrador.grupo7.model.Reservation;
import com.integrador.grupo7.security.services.UserDetailsServiceImpl;
import com.integrador.grupo7.service.EmailServiceImpl;
import com.integrador.grupo7.service.ProductService;
import com.integrador.grupo7.service.ReservationService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import java.awt.Font;
import javax.mail.MessagingException;


@CrossOrigin
@RestController
@RequestMapping("/reservations")
public class ReservationController {

    /* Attributes */
    private ReservationService reservationService;
    Logger logger = Logger.getLogger(String.valueOf(ReservationController.class));
    private UserDetailsServiceImpl userService;
    private EmailServiceImpl emailSenderService;
    private ProductService productService;



    /* Constructor */
    @Autowired
    public ReservationController(ReservationService reservationService, UserDetailsServiceImpl userService, EmailServiceImpl emailSenderService, ProductService productService) {
        this.reservationService = reservationService;
        this.userService = userService;
        this.emailSenderService = emailSenderService;
        this.productService = productService;
    }




    /* Methods */

    /* GET */

    @ApiOperation(value = "Search by id in the Reservations entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ReservationDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("id/{id}")
    public ReservationDTO findById(@PathVariable Long id) {
        logger.info("Search by id in the Reservations entity");
        return reservationService.findById(id).orElse(null);
    }



    @ApiOperation(value = "List of all Reservations"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ReservationDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping()
    public List<ReservationDTO> findAll() {
        logger.info("List of all Reservations");
        return reservationService.findAll();
    }



    @ApiOperation(value = "Search by product id in the Reservations entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ReservationDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("product/{id}")
    public List<Reservation> listReservationsByProductId(@PathVariable Long id) {
        logger.info("List all reservations by product id");
        return reservationService.listReservationsByProductId(id);
    }


    @ApiOperation(value = "Search by user id in the Reservations entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ReservationDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("user/{id}")
    public List<Reservation> listReservationsByUserId(@PathVariable Long id) {
        logger.info("List all reservations by user id");
        return reservationService.listReservationsByUserId(id);
    }




    /* POST */

    @ApiOperation(value = "Insertion of a new record in the Reservations entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ReservationDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping("/register")
    public ResponseEntity save(@RequestBody ReservationDTO res) throws MessagingException {
        ResponseEntity resp = new ResponseEntity(reservationService.save(res), HttpStatus.CREATED);
        logger.info("New reservation booked successfully");

        /*
        emailSenderService.sendSimpleEmail(reservationService.getUserEmail(res.getId()), "Confirmación de reserva - Reservation booked",
                "Hola " + reservationService.getUserName(res.getId()) + "! Tu reserva en " + reservationService.getProductName(res.getId()) + " ha sido agendada.\n" +

                        "A continuación encontrarás los detalles de la misma.\n" +
                        "Dirección: " + reservationService.getProductAddress(res.getId()) + ", " + productService.getProductCityName(res.getProduct().getId()) + ".\n"+
                        "Fecha de arribo: " + res.getArrivalDate()+ ".\n" +
                        "Fecha de partida: " + res.getDepartureDate() + ".\n" +
                        "Te deseamos excelente estadía!" +
                        "\n\n" +
                        "-------------------------------------------------------------------------------"+
                        "\n\n" +
                        "Hi " + reservationService.getUserName(res.getId()) + "! Your reservation at " + reservationService.getProductName(res.getId()) + " has been booked." + "\n" +
                        "Below you´ll find the details.\n" +
                        "Address: " + reservationService.getProductAddress(res.getId()) + ", " + productService.getProductCityName(res.getProduct().getId()) + "."+ "\n" +
                        "Arrival date: " + res.getArrivalDate()+ ".\n" +
                        "Departure date: " + res.getDepartureDate() + ".\n" +
                        "We hope you enjoy your stay.");*/

        return resp;
    }



    /* PUT */

    @ApiOperation(value = "Update of a record in the Reservations entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ReservationDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PutMapping("/update")
    public ResponseEntity updateReservation(@RequestBody ReservationDTO reservationNewDTO) throws BadRequestException, MessagingException {
        ResponseEntity resp = null;

        if(reservationService.findById(reservationNewDTO.getId()).isPresent()) {
            resp = new ResponseEntity(reservationService.update(reservationNewDTO), HttpStatus.OK);
            logger.info("Reservation updated correctly");
            /*
            emailSenderService.sendSimpleEmail(reservationService.getUserEmail(reservationNewDTO.getId()),
                    "Modificación de reserva - Reservation update", "Hola " + reservationService.getUserName(reservationNewDTO.getId()) + "! Tu reserva ha sido modificada.\n" +
                            "Alojamiento: " + reservationService.getProductName(reservationNewDTO.getId()) + ".\n" +
                            "Dirección: " + reservationService.getProductAddress(reservationNewDTO.getId()) + ", " + productService.getProductCityName(reservationNewDTO.getProduct().getId()) + ".\n" +
                            "Fecha de arribo: " + reservationNewDTO.getArrivalDate()+ ".\n" +
                            "Fecha de partida: " + reservationNewDTO.getDepartureDate() + ".\n" +
                            "Podés conocer más detalles ingresando en éste link" + "link" + ".\n" +
                            "Te deseamos excelente estadía!" +
                            "\n\n" +
                            "-------------------------------------------------------------------------------" +
                            "\n\n" +
                            "Hi " + reservationService.getUserName(reservationNewDTO.getId()) + "! Your reservation at " + reservationService.getProductName(reservationNewDTO.getId()) + " has been updated." + "\n" +
                            "Below you´ll find the details.\n" +
                            "Address: " + reservationService.getProductAddress(reservationNewDTO.getId()) + ", " + productService.getProductCityName(reservationNewDTO.getProduct().getId()) + "." + "\n" +
                            "Arrival date: " + reservationNewDTO.getArrivalDate()+ ".\n" +
                            "Departure date: " + reservationNewDTO.getDepartureDate() + ".\n" +
                            "More details entering the following link" + "link" + ".\n" +
                            "We hope you enjoy your stay.");*/

        } else {
            resp = new ResponseEntity("Reservation not found!", HttpStatus.NOT_FOUND);
            logger.error("Reservation not found!");
        }

        return resp;
    }




    /* DELETE */

    @ApiOperation(value = "Deletion of a record in the Reservation entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ReservationDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteReservation(@PathVariable Long id) throws MessagingException {
        ResponseEntity resp;

        if(reservationService.findById(id).isPresent()) {
            Optional<ReservationDTO> res = reservationService.findById(id);
            reservationService.delete(id);
            resp = new ResponseEntity(HttpStatus.NO_CONTENT);
            logger.info("Reservation deleted correctly");
            /*
           emailSenderService.sendSimpleEmail(reservationService.getUserEmail(id), "Modificación de reserva",
                    "Hola " + reservationService.getUserName(id) + "! Tu reserva ha sido cancelada.\n" +
                            "Ante cualquier consulta no dude en contactarse." +
                            "\n\n" +
                            "-------------------------------------------------------------------------------" +
                            "\n\n" +
                            "Hi " + reservationService.getUserName(id) + "! Your reservation has been cancelled.\n" +
                            "If you have any questions, do not hesitate to contact.");*/
        } else {
            resp = new ResponseEntity("Reservation not found!", HttpStatus.NOT_FOUND);
            logger.error("Reservation not found!");
        }
        return resp;
    }
}
