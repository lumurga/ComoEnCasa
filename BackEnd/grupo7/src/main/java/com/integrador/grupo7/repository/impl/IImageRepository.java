package com.integrador.grupo7.repository.impl;

import com.integrador.grupo7.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IImageRepository extends JpaRepository<Image, Long> {

        @Query("SELECT i FROM Image i WHERE i.urlImage = ?1")
        Optional<Image> findImageByUrl(String urlImage);
}


