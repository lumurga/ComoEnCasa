package com.integrador.grupo7.dto;

import com.integrador.grupo7.model.Role;
import io.swagger.annotations.ApiModelProperty;

public class UserDTO {

    /* Attributes */
    @ApiModelProperty(position = 0)
    private Long id;

    @ApiModelProperty(position = 1)
    private String name;

    @ApiModelProperty(position = 2)
    private String lastName;


    @ApiModelProperty(position = 5)
    private String email;

    @ApiModelProperty(position = 6)
    private String password;

    @ApiModelProperty(position = 7)
    private Role role;

    @ApiModelProperty(position = 8)
    private String username;


    /* Constructor */

    public UserDTO() {
    }

    public UserDTO(String lastName, String email, String password, Role role, String username) {
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.username = username;
    }
    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
