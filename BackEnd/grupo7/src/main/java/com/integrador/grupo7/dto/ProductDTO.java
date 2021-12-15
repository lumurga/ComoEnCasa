package com.integrador.grupo7.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.integrador.grupo7.model.*;
import io.swagger.annotations.ApiModelProperty;

import java.util.ArrayList;
import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDTO {


    /* Attributes */
    @ApiModelProperty(position = 0)
    private Long id;
    @ApiModelProperty(position = 1)
    private String name;
    @ApiModelProperty(position = 2)
    private String description;
    @ApiModelProperty(position = 3)
    private Category category;
    @ApiModelProperty(position = 4)
    private String latitude;
    @ApiModelProperty(position = 5)
    private String longitude;
    @ApiModelProperty(position = 6)
    private String address;
    @ApiModelProperty(position = 7)
    private City city;
    @ApiModelProperty(position = 8)
    private double nightPrice;
    @ApiModelProperty(position = 9)
    private String legals;
    @ApiModelProperty(position = 10)
    private String safetyAndHygiene;
    @ApiModelProperty(position = 11)
    private String cancellationPolicies;
    @ApiModelProperty(position = 12)
    private List<Image> images;
    @ApiModelProperty(position = 13)
    private List<Feature> features = new ArrayList<>();
    @ApiModelProperty(position = 14)
    private int score;
    @ApiModelProperty(position = 15)
    private List<Reservation> reservations = new ArrayList<>();
    ;

    /* Constructor */
    public ProductDTO() {
    }

    public ProductDTO(String name, String description, String latitude, String longitude, String address, double nightPrice, List<Image> images, int score, List<Feature> features, List<Reservation> reservations, String legals, String safetyAndHygiene, String cancellationPolicies) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.address = address;
        this.nightPrice = nightPrice;
        this.cancellationPolicies = cancellationPolicies;
        this.legals = legals;
        this.safetyAndHygiene = safetyAndHygiene;
        this.longitude = longitude;
        this.images = images;
        this.reservations = reservations;
    }

    public ProductDTO(String name, String description, String latitude, String longitude) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public double getNightPrice() {
        return nightPrice;
    }

    public void setNightPrice(double nightPrice) {
        this.nightPrice = nightPrice;
    }
}
