package com.integrador.grupo7.controller;



import com.integrador.grupo7.dto.ProductDTO;
import com.integrador.grupo7.exception.BadRequestException;
import com.integrador.grupo7.model.Product;
import com.integrador.grupo7.service.ProductService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;


@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {

    /* Attributes */
    private ProductService productService;
    Logger logger = Logger.getLogger(String.valueOf(ProductController.class));


    /* Constructor */
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }



    /* Methods */
    /* GET */

    @ApiOperation(value = "Search by id in the Products entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("id/{id}")
    public ProductDTO findById(@PathVariable Long id) {
        logger.info("Search by id in the Products entity");
        return productService.findById(id).orElse(null);
    }




    @ApiOperation(value = "Search by name in the Products entity"
                ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("/{name}")
    public ProductDTO findProductByName(@PathVariable String name) {
        logger.info("Search by name in the Products entity");
        return productService.findProductByName(name);
    }




    @ApiOperation(value = "Search by city in the Products entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("city/{name}")
    public List<Product> listProductsByCity(@PathVariable String name) {
        logger.info("List all products by city");
        return productService.listProductsByCity(name);
    }



    @ApiOperation(value = "Search by category in the Products entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("category/{title}")
    public List<Product> listProductsByCategory(@PathVariable String title) {
        logger.info("List all products by category");
        return productService.listProductsByCategory(title);
    }


    @ApiOperation(value = "List of all products"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping()
    public List<ProductDTO> findAll() {
        logger.info("List of all Products");
        return productService.findAll();
    }


    @ApiOperation(value = "List of available products filtered by dates"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("available/dates")
    public List<Product> listAvailableProductsByDate(@RequestParam(required = false) String arrival, @RequestParam(required = false) String departure) {
        logger.info("List of all available Products by dates");
        return productService.listAvailableProductsByDate(arrival, departure);
    }


    @ApiOperation(value = "List of available products filtered by city and dates"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("available")
    public List<Product> getProductsAvailableByDatesAndCity(@RequestParam(required = false) String arrival, @RequestParam(required = false) String departure, @RequestParam(required = false) String city) {

        List<Product> filteredProducts = new ArrayList<>();

        if (arrival != null && departure != null && city != null) {
            LocalDate arrivalDate = LocalDate.parse(arrival);
            LocalDate departureDate = LocalDate.parse(departure);

            if (arrivalDate.isAfter(departureDate)) {
                logger.error("The arrival date must be prior to the departure date");
            }

            List<Product> filteredByDate =  productService.listAvailableProductsByDate(arrival, departure);
            for (Product p : filteredByDate) {
                if (p.getCity().getName().equalsIgnoreCase(city)) {
                    filteredProducts.add(p);
                }
            }
        }

        if (arrival != null && departure != null && city == null) {
            LocalDate arrivalDate = LocalDate.parse(arrival);
            LocalDate departureDate = LocalDate.parse(departure);

            if (arrivalDate.isAfter(departureDate)) {
                logger.error("The arrival date must be prior to the departure date");
            }
            filteredProducts = productService.listAvailableProductsByDate(arrival, departure);
        }



        if (arrival == null && departure == null && city != null) {
            filteredProducts = productService.listProductsByCity(city);
        }

        return filteredProducts;
    }





    /* POST */

    @ApiOperation(value = "Insertion of a new record in the Products entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/register")
    public ResponseEntity save(@RequestBody ProductDTO productDTO) {
        ResponseEntity resp;
        if (productService.findProductByName(productDTO.getName()) != null) {
            resp = new ResponseEntity("The product entered is already registered!", HttpStatus.CONFLICT);
            logger.error("The product is already registered!");
        } else {
            resp = new ResponseEntity(productService.save(productDTO), HttpStatus.CREATED);
            logger.info("New product saved successfully");
        }
        return resp;
    }




    /* PUT */
    @ApiOperation(value = "Update by id of a record in the Products entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/update")
    public ResponseEntity updateProduct(@RequestBody ProductDTO newProductDTO) throws BadRequestException {
        ResponseEntity resp = null;

        if(productService.findById(newProductDTO.getId()).isPresent()) {
            resp = new ResponseEntity(productService.update(newProductDTO), HttpStatus.OK);
            logger.info("Product updated correctly");
        }else{
            resp = new ResponseEntity("Product not found!", HttpStatus.NOT_FOUND);
            logger.error("Product not found!");
        }
        return resp;
    }




    /* DELETE */
    @ApiOperation(value = "Deletion by id of a record in the Products entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = ProductDTO.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        ResponseEntity resp;

        if(productService.findById(id).isPresent()) {
            productService.delete(id);
            resp = new ResponseEntity(HttpStatus.NO_CONTENT);
            logger.info("Product deleted correctly");
        } else {
            resp = new ResponseEntity("Product not found!", HttpStatus.NOT_FOUND);
            logger.error("Product not found!");
        }
        return resp;
    }
}
