package com.integrador.grupo7.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "features")
public class Feature {

    /* Attributes */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id_feature")
    private Long id;
    private String name;
    private String icon;

    @ManyToMany(mappedBy = "features")
    @JsonIgnore
    private List<Product> products;


    /* Constructor */
    public Feature() {
    }

    public Feature(String name, String icon) {
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
