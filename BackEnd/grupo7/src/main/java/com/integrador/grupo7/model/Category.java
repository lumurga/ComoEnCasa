package com.integrador.grupo7.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Entity
@Table(name="categories")
public class Category {


    /* Attributes */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id_category")
    private Long id;
    private String title;
    private String description;
    private String urlImage;

    @OneToMany(mappedBy = "category")//orphanRemoval = true
    @JsonIgnore
    private List<Product> products;


    /* Constructor */
    public Category() {
    }

    public Category(String title, String description, String urlImage) {
        this.title = title;
        this.description = description;
        this.urlImage = urlImage;
        this.products = new ArrayList<>();
    }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    /* Methods */
    @Override
    public String toString() {
        return "Category " +
                "Title: " + title + '\'' +
                "Description: " + description + '\'' +
                "Image url: " + urlImage + '\'' +
                '.';
    }
}
