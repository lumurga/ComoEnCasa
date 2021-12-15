package com.integrador.grupo7.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrador.grupo7.dto.RoleDTO;
import com.integrador.grupo7.model.Role;
import com.integrador.grupo7.model.RoleName;
import com.integrador.grupo7.repository.impl.IRoleRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class RoleService implements IEntityService<RoleDTO>{

    /* Attributes*/
    private IRoleRepository roleRepository;
    Logger logger = Logger.getLogger(String.valueOf(RoleService.class));
    private ObjectMapper mapper;



    /* Constructor */
    @Autowired
    public RoleService(IRoleRepository roleRepository, ObjectMapper mapper) {
        this.roleRepository = roleRepository;
        this.mapper = mapper;
    }


    /* Methods */
    @Override
    public RoleDTO save(RoleDTO roleDTO) {
        roleRepository.save(mapper.convertValue(roleDTO, Role.class));
        logger.info("New role saved successfully");
        return roleDTO;
    }

    @Override
    public Optional<RoleDTO> findById(Long id) {
        logger.info("Search by id in the Roles entity");
        RoleDTO roleDTO = null;
        Optional<Role> r = roleRepository.findById(id);
        if(r.isPresent()) {
            roleDTO = mapper.convertValue(r, RoleDTO.class);
        }
        return Optional.ofNullable(roleDTO);
    }

    @Override
    public List<RoleDTO> findAll() {
        List<Role> roles = roleRepository.findAll();
        List<RoleDTO> rolesDTO = new ArrayList<>();
        for(Role r : roles) {
            rolesDTO.add(mapper.convertValue(r, RoleDTO.class));
        }
        logger.info("List of all Roles");
        return rolesDTO;
    }

    @Override
    public RoleDTO update(RoleDTO roleNew) {
        Role role = roleRepository.findById(roleNew.getId()).get();
        role.setName(roleNew.getName());
        logger.info("Role with ID: "+ role.getId() + " has been successfully updated");
        roleRepository.save(role);
        return mapper.convertValue(role, RoleDTO.class);
    }

    @Override
    public void delete(Long id) {
        if(roleRepository.findById(id).isPresent()){
            roleRepository.deleteById(id);
            logger.info("Role deleted correctly!");
            System.out.println("Role deleted correctly!");
        } else {
            logger.error("Role not found!");
            System.out.println("Role not found!");
        }
    }

    public RoleDTO findByName(RoleName name) {
        logger.info("Search by name in the Role entity");

        RoleDTO roleDTO = null;
        Optional<Role> r = roleRepository.findRoleByName(name);
        if(r != null) {
            roleDTO = mapper.convertValue(r, RoleDTO.class);
        }
        return roleDTO;
    }
}
