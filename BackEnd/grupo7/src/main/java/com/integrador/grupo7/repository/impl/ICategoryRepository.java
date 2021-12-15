package com.integrador.grupo7.repository.impl;

import com.integrador.grupo7.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findCategoryByTitle(String title);
}
