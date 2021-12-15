package com.integrador.grupo7.controller;



import com.integrador.grupo7.dto.RoleDTO;
import com.integrador.grupo7.exception.BadRequestException;
import com.integrador.grupo7.service.RoleService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.apache.log4j.Logger;

@CrossOrigin
@RestController
@RequestMapping("/roles")
public class RoleController {

    /* Attributes */
    private RoleService roleService;
    Logger logger = Logger.getLogger(String.valueOf(RoleController.class));


    /* Constructor */
    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }



    /* Methods */
    /* GET */

    @ApiOperation(value = "Search by id in the Roles entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = RoleDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("id/{id}")
    public RoleDTO findById(@PathVariable Long id) {
        logger.info("Search by id in the Roles entity");
        return roleService.findById(id).orElse(null);
    }



    @ApiOperation(value = "List of all Roles"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = RoleDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping()
    public List<RoleDTO> findAll() {
        logger.info("List of all Roles");
        return roleService.findAll();
    }





    /* POST */

    @ApiOperation(value = "Insertion of a new record in the Roles entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = RoleDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PostMapping("/register")
    public ResponseEntity save(@RequestBody RoleDTO r) {
        ResponseEntity resp;
        if(roleService.findById(r.getId()).isPresent()) {
            resp = new ResponseEntity("The role entered is already registered!", HttpStatus.CONFLICT);
            logger.error("The role is already registered!");
        } else {
            resp = new ResponseEntity(roleService.save(r), HttpStatus.CREATED);
            logger.info("New role saved successfully");
        }
        return resp;
    }




    /* PUT */

    @ApiOperation(value = "Update of a record in the Roles entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = RoleDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PutMapping("/update")
    public ResponseEntity updateRole(@RequestBody RoleDTO roleNewDTO) throws BadRequestException {
        ResponseEntity resp = null;

        if(roleService.findById(roleNewDTO.getId()).isPresent()) {
            resp = new ResponseEntity(roleService.update(roleNewDTO), HttpStatus.OK);
            logger.info("Role updated correctly");
        }else{
            resp = new ResponseEntity("Role not found!", HttpStatus.NOT_FOUND);
            logger.error("Role not found!");
        }
        return resp;
    }




    /* DELETE */

    @ApiOperation(value = "Deletion of a record in the Role entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = RoleDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteRole(@PathVariable Long id) {
        ResponseEntity resp;

        if(roleService.findById(id).isPresent()) {
            roleService.delete(id);
            resp = new ResponseEntity(HttpStatus.NO_CONTENT);
            logger.info("Role deleted correctly");
        } else {
            resp = new ResponseEntity("Role not found!", HttpStatus.NOT_FOUND);
            logger.error("Role not found!");
        }
        return resp;
    }
}
