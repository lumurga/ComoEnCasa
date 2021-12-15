package com.integrador.grupo7.controller;

import com.integrador.grupo7.dto.*;
import com.integrador.grupo7.exception.BadRequestException;
import com.integrador.grupo7.service.ImageService;
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
@RequestMapping("/images")
public class ImageController {


    /* Attributes */
    private ImageService imageService;
    Logger logger = Logger.getLogger(String.valueOf(ImageController.class));




    /* Constructor */
    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }


    /* Methods */
    /* GET */

    @ApiOperation(value = "Search by id in the Images entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ImageDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("id/{id}")
    public ImageDTO findById(@PathVariable Long id) {
        logger.info("Search by id in the Images entity");
        return imageService.findById(id).orElse(null);
    }




    @ApiOperation(value = "List of all Images"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ImageDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping()
    public List<ImageDTO> findAll() {
        logger.info("List of all Images");
        return imageService.findAll();
    }

    @ApiOperation(value = "Search by url in the Images entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ImageDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("/{url}")
    public ImageDTO findImageByUrl(@PathVariable String url) {
        logger.info("Search by url in Images entity");
        return imageService.findImageByUrl(url);
    }



    /* POST */

    @ApiOperation(value = "Insertion of a new record in the Images entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ImageDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/register")
    public ResponseEntity save(@RequestBody ImageDTO image) {
        ResponseEntity resp;
        if(imageService.findImageByUrl(image.getUrlImage()) != null) {
            resp = new ResponseEntity("The image entered is already registered!", HttpStatus.CONFLICT);
            logger.error("The image is already registered!");
        } else {
            resp = new ResponseEntity(imageService.save(image), HttpStatus.CREATED);
            logger.info("New image saved successfully");
        }
        return resp;
    }



    /* PUT */

    @ApiOperation(value = "Update of a record in the Images entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ImageDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/update")
    public ResponseEntity updateImage(@RequestBody ImageDTO newImageDTO) throws BadRequestException {
        ResponseEntity resp = null;

        if(imageService.findById(newImageDTO.getId()).isPresent()) {
            resp = new ResponseEntity(imageService.update(newImageDTO), HttpStatus.OK);
            logger.info("Image updated correctly");
        }else{
            resp = new ResponseEntity("Image not found!", HttpStatus.NOT_FOUND);
            logger.error("Image not found!");
        }
        return resp;
    }




    /* DELETE */

    @ApiOperation(value = "Deletion of a record in the Images entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ImageDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteImage(@PathVariable Long id) {
        ResponseEntity resp;

        if(imageService.findById(id).isPresent()) {
            imageService.delete(id);
            resp = new ResponseEntity(HttpStatus.NO_CONTENT);
            logger.info("Image deleted correctly");
        } else {
            resp = new ResponseEntity("Image not found!", HttpStatus.NOT_FOUND);
            logger.error("Image not found!");
        }
        return resp;
    }
}
