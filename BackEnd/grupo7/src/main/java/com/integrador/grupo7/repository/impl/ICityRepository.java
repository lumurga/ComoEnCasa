package com.integrador.grupo7.repository.impl;


import com.integrador.grupo7.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICityRepository extends JpaRepository<City, Long> {
    Optional<City> findCityByName(String name);
}
