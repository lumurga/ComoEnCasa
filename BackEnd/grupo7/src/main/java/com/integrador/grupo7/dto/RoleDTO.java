package com.integrador.grupo7.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.integrador.grupo7.model.RoleName;
import io.swagger.annotations.ApiModelProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RoleDTO {

    /* Attributes */
    @ApiModelProperty(position = 0)
    private Long id;
    @ApiModelProperty(position = 1)
    private RoleName name;

    /* Constructor */
    public RoleDTO() {
    }

    public RoleDTO(RoleName name) {
        this.name = name;
    }

    /* Getters and Setters */
    public Long getId() {
        return id;
    }

    public RoleName getName() {
        return name;
    }

    public void setName(RoleName name) {
        this.name = name;
    }


}

