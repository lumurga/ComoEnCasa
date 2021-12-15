package com.integrador.grupo7.repository.impl;



import com.integrador.grupo7.model.Reservation;
import com.integrador.grupo7.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE r.product.id = ?1")
    List<Reservation> listReservationByProductId(Long id);

    @Query("SELECT r FROM Reservation r WHERE r.user.id = ?1")
    List<Reservation> listReservationsByUserId(Long id);

    @Query(value = "SELECT users.email FROM reservations INNER JOIN users ON reservations.user_id = users.id WHERE reservations.id_reservation = ?1", nativeQuery = true)
    String getUserEmail(Long id);

    @Query(value = "SELECT users.name FROM reservations INNER JOIN users ON reservations.user_id = users.id WHERE reservations.id_reservation = ?1", nativeQuery = true)
    String getUserName(Long id);

    @Query(value = "SELECT products.name FROM reservations INNER JOIN products ON reservations.product_id = products.id_product WHERE reservations.id_reservation = ?1", nativeQuery = true)
    String getProductName(Long id);

    @Query(value = "SELECT products.address FROM reservations INNER JOIN products ON reservations.product_id = products.id_product WHERE reservations.id_reservation = ?1", nativeQuery = true)
    String getProductAddress(Long id);



}
