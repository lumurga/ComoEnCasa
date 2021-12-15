package com.integrador.grupo7.model;




import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.ArrayList;

import java.util.List;


@Entity
@Table(name="products")
public class Product {

    /* Attributes */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id_product")
    private Long id;
    private String name;
    private String description;
    private String address;
    private String latitude;
    private String longitude;
    private double nightPrice;
    @Min(1)
    @Max(5)
    private int score;
    private String legals;
    private String safetyAndHygiene;
    private String cancellationPolicies;

    @ManyToOne//(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Category category;

    @ManyToOne//(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private City city;


    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="product_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Image> images = new ArrayList<>();



    @JoinTable(name = "rel_product_feature",

            joinColumns = {@JoinColumn(name = "product_id")},
            inverseJoinColumns = {@JoinColumn(name = "feature_id", nullable = false)}
    )
    @ManyToMany(cascade = CascadeType.MERGE)
    private List<Feature> features = new ArrayList<>();


    @JoinTable(name = "favourite_products",

            joinColumns = {@JoinColumn(name = "product_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", nullable = false)}
    )
    @ManyToMany(cascade = CascadeType.MERGE)
    private List<User> users = new ArrayList<>();




    @OneToMany(mappedBy = "product")//orphanRemoval = true
    @JsonIgnore
    private List<Reservation> reservations = new ArrayList<>();



    /* Constructor */
    public Product() {
    }

    public Product(String name, String description, String latitude, int score, String longitude, double nightPrice, String address, Category category, City city, String legals, String safetyAndHygiene, String cancellationPolicies, List<Image> images, List<Feature> features, List<Reservation> reservations ) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.score = score;
        this.longitude = longitude;
        this.nightPrice = nightPrice;
        this.address = address;
        this.category = category;
        this.city = city;
        this.cancellationPolicies = cancellationPolicies;
        this.legals = legals;
        this.safetyAndHygiene = safetyAndHygiene;
        this.images = images;
        this.features = features;
        this.reservations = reservations;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getLegals() {
        return legals;
    }

    public void setLegals(String legals) {
        this.legals = legals;
    }

    public String getSafetyAndHygiene() {
        return safetyAndHygiene;
    }

    public void setSafetyAndHygiene(String safetyAndHygiene) {
        this.safetyAndHygiene = safetyAndHygiene;
    }

    public String getCancellationPolicies() {
        return cancellationPolicies;
    }

    public void setCancellationPolicies(String cancellationPolicies) {
        this.cancellationPolicies = cancellationPolicies;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public double getNightPrice() {
        return nightPrice;
    }

    public void setNightPrice(double nightPrice) {
        this.nightPrice = nightPrice;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
