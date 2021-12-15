package com.integrador.grupo7.model;




import javax.persistence.*;

@Entity
@Table(name = "images")
public class Image {

    /* Attributes */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id_image")
    private Long id;
    private String title;
    private String urlImage;



    /* Constructor */
    public Image() {
    }

    public Image(String title, String urlImage) {
        this.title = title;
        this.urlImage = urlImage;
    }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
