package com.integrador.grupo7.repository.impl;

import com.integrador.grupo7.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface IUserRepository extends JpaRepository<User, Long> {


    Boolean existsByEmail(String email);

    User findByEmail(String email);

}


