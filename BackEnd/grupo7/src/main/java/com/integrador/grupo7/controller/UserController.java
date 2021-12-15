package com.integrador.grupo7.controller;



import com.integrador.grupo7.model.User;
import com.integrador.grupo7.repository.impl.IUserRepository;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    /* Attributes */
    private IUserRepository userRepository;
    Logger logger = Logger.getLogger(String.valueOf(UserController.class));


    /* Constructor */
    @Autowired
    public UserController(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }



    /* Methods */
    /* GET */

    @ApiOperation(value = "Search by id in the Users entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = User.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("id/{id}")
    public User findById(@PathVariable Long id) {
        logger.info("Search by id in the Users entity");
        return userRepository.findById(id).orElse(null);
    }



    @ApiOperation(value = "Search by email in the Users entity"
            ,notes = "")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK. The resource is obtained correctly", response = User.class ),
            @ApiResponse(code = 400, message = "Bad Request", response = String.class),
            @ApiResponse(code = 500, message = "Unexpected error") })
    @GetMapping("/{email}")
    public User findUserByEmail(@PathVariable String email) {
        logger.info("Search by email in Users entity");
        return userRepository.findByEmail(email);
    }



}
