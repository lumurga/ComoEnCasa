package com.integrador.grupo7.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrador.grupo7.dto.ReservationDTO;
import com.integrador.grupo7.model.Reservation;
import com.integrador.grupo7.model.User;
import com.integrador.grupo7.repository.impl.IReservationRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService implements IEntityService<ReservationDTO>{

    /* Attributes*/
    private IReservationRepository reservationRepository;
    Logger logger = Logger.getLogger(String.valueOf(ReservationService.class));
    private ObjectMapper mapper;

    /* Constructor */
    @Autowired
    public ReservationService(IReservationRepository reservationRepository, ObjectMapper mapper) {
        this.reservationRepository = reservationRepository;
        this.mapper = mapper;
    }


    /* Methods */
    @Override
    public ReservationDTO save(ReservationDTO reservationDTO) {
        reservationRepository.save(mapper.convertValue(reservationDTO, Reservation.class));
        logger.info("New reservation saved successfully");
        return reservationDTO;
    }

    @Override
    public Optional<ReservationDTO> findById(Long id) {
        logger.info("Search by id in the Reservations entity");
        ReservationDTO resDTO = null;
        Optional<Reservation> r = reservationRepository.findById(id);
        if(r.isPresent()) {
            resDTO = mapper.convertValue(r, ReservationDTO.class);
        }
        return Optional.ofNullable(resDTO);
    }

    @Override
    public List<ReservationDTO> findAll() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationDTO> resDTO = new ArrayList<>();
        for(Reservation r : reservations) {
            resDTO.add(mapper.convertValue(r, ReservationDTO.class));
        }
        logger.info("List of all Reservations");
        return resDTO;
    }

    @Override
    public ReservationDTO update(ReservationDTO reservationNew) {
        Reservation res = reservationRepository.findById(reservationNew.getId()).get();
        res.setProduct(reservationNew.getProduct());
        res.setArrivalDate(reservationNew.getArrivalDate());
        res.setDepartureDate(reservationNew.getDepartureDate());
        res.setUser(reservationNew.getUser());
        res.setStartTime(reservationNew.getStartTime());
        logger.info("Reservation with ID: "+ res.getId() + " has been successfully updated");
        reservationRepository.save(res);
        return mapper.convertValue(res, ReservationDTO.class);
    }

    @Override
    public void delete(Long id) {
        if(reservationRepository.findById(id).isPresent()){
            reservationRepository.deleteById(id);
            logger.info("Reservation deleted correctly!");
            System.out.println("Reservation deleted correctly!");
        } else {
            logger.error("Reservation not found!");
            System.out.println("Reservation not found!");
        }
    }

    public List<Reservation> listReservationsByProductId(Long id){
        logger.info("List all reservations filtered by product id");
        return reservationRepository.listReservationByProductId(id);
    }

    public List<Reservation> listReservationsByUserId(Long id){
        logger.info("List all reservations filtered by user id");
        return reservationRepository.listReservationsByUserId(id);
    }

    public String getUserEmail(Long id){
        return reservationRepository.getUserEmail(id);
    }

    public String getUserName(Long id){
        return reservationRepository.getUserName(id);
    }

    public String getProductName(Long id){
        return reservationRepository.getProductName(id);
    }
    public String getProductAddress(Long id){
        return reservationRepository.getProductAddress(id);
    }


}
