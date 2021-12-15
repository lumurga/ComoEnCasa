package com.integrador.grupo7.repository.impl;


import com.integrador.grupo7.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Long> {
    Optional<Feature> findFeatureByName(String name);
}
