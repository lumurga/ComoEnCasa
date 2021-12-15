package com.integrador.grupo7.repository.impl;


import com.integrador.grupo7.model.Role;
import com.integrador.grupo7.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findRoleByName(RoleName roleName);


}
