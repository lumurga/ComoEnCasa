package com.integrador.grupo7.repository.impl;


import com.integrador.grupo7.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.name = ?1")
    Optional<Product> findProductByName(String name);

    @Query("SELECT p FROM Product p WHERE p.city.name = ?1")
    List<Product> listProductsByCity(String name);

    @Query("SELECT p FROM Product p WHERE p.category.title = ?1")
    List<Product> listProductsByCategory(String title);

    @Query(value = "SELECT * FROM products INNER JOIN reservations ON reservations.product_id = products.id_product " +
                "WHERE reservations.departure_date>=?1 AND reservations.arrival_date<=?2", nativeQuery = true)
    List<Product> listNotAvailableProductsByDate(String arrival, String departure);

    @Query(value = "SELECT cities.name FROM products INNER JOIN cities ON products.city_id = cities.id_city WHERE products.id_product = ?1", nativeQuery = true)
    String getProductCityName(Long id);

}
