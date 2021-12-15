package com.integrador.grupo7.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.integrador.grupo7.model.Product;
import com.integrador.grupo7.model.User;
import io.swagger.annotations.ApiModelProperty;

import java.time.LocalDate;


@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservationDTO {

    /* Attributes */
    @ApiModelProperty(position = 0)
    private Long id;
    @ApiModelProperty(position = 1)
    private String startTime;
    @ApiModelProperty(position = 2)
    private LocalDate arrivalDate;
    @ApiModelProperty(position = 3)
    private LocalDate departureDate;
    @ApiModelProperty(position = 4)
    private Product product;
    @ApiModelProperty(position = 5)
    private User user;
    //Electivas
    @ApiModelProperty(position = 6)
    private boolean isVaccinated;
    @ApiModelProperty(position = 7)
    private String extraData;


    /* Constructor */

    public ReservationDTO() {
    }

    public ReservationDTO(String startTime, LocalDate arrivalDate, LocalDate departureDate, Product product, User user) {
        this.startTime = startTime;
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
        this.product = product;
        this.user = user;
    }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public LocalDate getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(LocalDate arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isVaccinated() {
        return isVaccinated;
    }

    public void setVaccinated(boolean vaccinated) {
        isVaccinated = vaccinated;
    }

    public String getExtraData() {
        return extraData;
    }

    public void setExtraData(String extraData) {
        this.extraData = extraData;
    }
}