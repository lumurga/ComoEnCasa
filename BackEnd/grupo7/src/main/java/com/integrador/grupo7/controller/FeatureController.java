package com.integrador.grupo7.controller;

import com.integrador.grupo7.dto.*;
import com.integrador.grupo7.exception.BadRequestException;
import com.integrador.grupo7.service.FeatureService;
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
@RequestMapping("/features")
public class FeatureController {

    /* Attributes */
    private FeatureService featureService;
    Logger logger = Logger.getLogger(String.valueOf(FeatureController.class));




    /* Constructor */
    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }


    /* Methods */
    /* GET */

    @ApiOperation(value = "Search by id in the Features entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = FeatureDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("id/{id}")
    public FeatureDTO findById(@PathVariable Long id) {
        logger.info("Search by id in the Features entity");
        return featureService.findById(id).orElse(null);
    }



    @ApiOperation(value = "List of all Features"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = FeatureDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping()
    public List<FeatureDTO> findAll() {
        logger.info("List of all Features");
        return featureService.findAll();
    }



    /* POST */

    @ApiOperation(value = "Insertion of a new record in the Features entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = FeatureDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/register")
    public ResponseEntity save(@RequestBody FeatureDTO feature) {
        ResponseEntity resp;
        if (featureService.findFeatureByName(feature.getName()) != null) {
            resp = new ResponseEntity("The feature entered is already registered!", HttpStatus.CONFLICT);
            logger.error("The feature is already registered!");
        } else {
            resp = new ResponseEntity(featureService.save(feature), HttpStatus.CREATED);
            logger.info("New feature saved successfully");
        }
        return resp;

    }




    /* PUT */

    @ApiOperation(value = "Update of a record in the Features entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = FeatureDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/update")
    public ResponseEntity updateFeature(@RequestBody FeatureDTO newFeatureDTO) throws BadRequestException {
        ResponseEntity resp = null;

        if(featureService.findById(newFeatureDTO.getId()).isPresent()) {
            resp = new ResponseEntity(featureService.update(newFeatureDTO), HttpStatus.OK);
        }
         else{
             resp = new ResponseEntity("Feature not found!", HttpStatus.NOT_FOUND);
        }
        return resp;
    }




    /* DELETE */

    @ApiOperation(value = "Deletion of a record in the Features entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = FeatureDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteFeature(@PathVariable Long id) {
        ResponseEntity resp;

        if(featureService.findById(id).isPresent()) {
            featureService.delete(id);
            resp = new ResponseEntity(HttpStatus.NO_CONTENT);
            logger.info("Feature deleted correctly");
        } else {
            resp = new ResponseEntity("Feature not found!", HttpStatus.NOT_FOUND);
            logger.error("Feature not found!");
        }
        return resp;
    }
}

