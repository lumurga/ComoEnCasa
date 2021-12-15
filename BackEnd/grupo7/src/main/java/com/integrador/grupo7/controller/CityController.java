package com.integrador.grupo7.controller;



import com.integrador.grupo7.dto.CityDTO;
import com.integrador.grupo7.exception.BadRequestException;
import com.integrador.grupo7.service.CityService;
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
@RequestMapping("/cities")
public class CityController {

    /* Attributes */
    private CityService cityService;
    Logger logger = Logger.getLogger(String.valueOf(CityController.class));

    /* Constructor */
    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    /* Methods */
    /* GET */

    @ApiOperation(value = "Search by id in the Cities entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CityDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("id/{id}")
    public CityDTO findById(@PathVariable Long id) {
        logger.info("Search by id in the Cities entity");
        return cityService.findById(id).orElse(null);
    }



    @ApiOperation(value = "Search by name in the Cities entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CityDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("/{name}")
    public CityDTO findCityByName(@PathVariable String name) {
        logger.info("Search by name in the Cities entity");
        return cityService.findCityByName(name);
    }



    @ApiOperation(value ="List of all Cities"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CityDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping()
    public List<CityDTO> findAll() {
        logger.info("List of all Cities");
        return cityService.findAll();
    }




    /* POST */

    @ApiOperation(value = "Insertion of a new record in the Cities entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CityDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/register")
    public ResponseEntity save(@RequestBody CityDTO city) {
        ResponseEntity resp;
        if(cityService.findCityByName(city.getName()) != null) {
            resp = new ResponseEntity("The city entered is already registered!", HttpStatus.CONFLICT);
            logger.error("The city is already registered!");
        } else {
            resp = new ResponseEntity(cityService.save(city), HttpStatus.CREATED);
            logger.info("New city saved successfully");
        }
        return resp;
    }




    /* PUT */

    @ApiOperation(value = "Update of a record in the Cities entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CityDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity updateCity(@RequestBody CityDTO newCityDTO) throws BadRequestException {
        ResponseEntity resp;

        if(cityService.findById(newCityDTO.getId()).isPresent()) {
            resp = new ResponseEntity(cityService.update(newCityDTO), HttpStatus.OK);
        } else {

            resp = new ResponseEntity("City not found!", HttpStatus.NOT_FOUND);
        }
        return resp;
    }



    /* DELETE */

    @ApiOperation(value = "Deletion of a record in the Cities entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CityDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteCity(@PathVariable Long id) {
        ResponseEntity resp;

        if(cityService.findById(id).isPresent()) {
            cityService.delete(id);
            resp = new ResponseEntity(HttpStatus.NO_CONTENT);
            logger.info("City deleted correctly");
        } else {
            resp = new ResponseEntity("City not found!", HttpStatus.NOT_FOUND);
            logger.error("City not found!");
        }
        return resp;
    }
}
