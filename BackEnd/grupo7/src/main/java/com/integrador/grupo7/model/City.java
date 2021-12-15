package com.integrador.grupo7.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "cities")
public class City {

    /* Attributes */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id_city")
    private Long id;
    private String name;
    private String country;

    @OneToMany(mappedBy = "city")//orphanRemoval = true
    @JsonIgnore
    private List<Product> products = new ArrayList<>();

    /* Constructor */
    public City() {
    }

    public City(String name, String country) {
        this.name = name;
        this.country = country;

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


    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
