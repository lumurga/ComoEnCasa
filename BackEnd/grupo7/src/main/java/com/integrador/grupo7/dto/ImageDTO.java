package com.integrador.grupo7.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class ImageDTO {

    /* Attributes */
    @ApiModelProperty(position = 0)
    private Long id;
    @ApiModelProperty(position = 1)
    private String title;
    @ApiModelProperty(position = 2)
    private String urlImage;

    /* Constructor */
    public ImageDTO() {
    }

    public ImageDTO(String title, String urlImage) {
        this.title = title;
        this.urlImage = urlImage;
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

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }
}
