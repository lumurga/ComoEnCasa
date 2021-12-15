package com.integrador.grupo7.controller;



import com.integrador.grupo7.dto.CategoryDTO;
import com.integrador.grupo7.exception.BadRequestException;
import com.integrador.grupo7.service.CategoryService;
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
@RequestMapping("/categories")
public class CategoryController {

    /* Attributes */
    private CategoryService categoryService;
    Logger logger = Logger.getLogger(String.valueOf(CategoryController.class));

    /* Constructor */
    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    /* Methods */
    /* GET */

    @ApiOperation(value = "Search by id in the Categories entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CategoryDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("id/{id}")
    public CategoryDTO findById(@PathVariable Long id) {
        logger.info("Search by id in the Categories entity");
        return categoryService.findById(id).orElse(null);
    }




    @ApiOperation(value = "Search by title in the Categories entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CategoryDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("/{title}")
    public CategoryDTO findCategoryByTitle(@PathVariable String title) {
        logger.info("Search by title in the Categories entity");
        return categoryService.findCategoryByTitle(title);
    }



    @ApiOperation(value ="List of all Categories"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CategoryDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping()
        public List<CategoryDTO> findAll() {
            logger.info("List of all Categories");
            return categoryService.findAll();
        }




    /* POST */

    @ApiOperation(value = "Insertion of a new record in the Categories entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CategoryDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/register")
    public ResponseEntity save(@RequestBody CategoryDTO category) {
        ResponseEntity response;
        if(categoryService.findCategoryByTitle(category.getTitle()) != null) {
            response = new ResponseEntity("Category already exist!", HttpStatus.CONFLICT);
        }
        else if(category.getTitle().isEmpty() || category.getDescription().isEmpty() || category.getUrlImage().isEmpty()){
            response = new ResponseEntity("Cannot have empty/void spaces", HttpStatus.BAD_REQUEST);
        } else {
            response = new ResponseEntity(categoryService.save(category), HttpStatus.CREATED);
        }
        return response;
    }




    /* PUT */

    @ApiOperation(value = "Update of a record in the Categories entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CategoryDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/update")
    public ResponseEntity updateCategory(@RequestBody CategoryDTO newCategoryDTO) throws BadRequestException {
        ResponseEntity resp;

        if(categoryService.findById(newCategoryDTO.getId()).isPresent()) {
            resp = new ResponseEntity(categoryService.update(newCategoryDTO), HttpStatus.OK);
        } else {

            resp = new ResponseEntity("Category not found!", HttpStatus.NOT_FOUND);
        }
        return resp;
    }



    /* DELETE */

    @ApiOperation(value = "Deletion of a record in the Categories entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = CategoryDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteCategory(@PathVariable Long id) {
        ResponseEntity resp;

        if(categoryService.findById(id).isPresent()) {
            categoryService.delete(id);
            resp = new ResponseEntity(HttpStatus.NO_CONTENT);
            logger.info("Category deleted correctly");
        } else {
            resp = new ResponseEntity("Category not found!", HttpStatus.NOT_FOUND);
            logger.error("Category not found!");
        }
        return resp;
    }

}
