package com.integrador.grupo7.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.integrador.grupo7.model.Product;
import io.swagger.annotations.ApiModelProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FeatureDTO {

    /* Attributes */
    @ApiModelProperty(position = 0)
    private Long id;
    @ApiModelProperty(position = 1)
    private String name;
    @ApiModelProperty(position = 2)
    private String icon;
    @ApiModelProperty(position = 3)
    private List<Product> products;

    /* Constructor */
    public FeatureDTO() {
    }

    public FeatureDTO(String name, String icon) {
        this.name = name;
        this.icon = icon;
        this.products = new ArrayList<>();
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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
