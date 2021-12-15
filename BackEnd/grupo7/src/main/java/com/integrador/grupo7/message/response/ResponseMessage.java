package com.integrador.grupo7.message.response;

public class ResponseMessage {

    /* Attributes */

    private String message;


    /* Constructor */

    public ResponseMessage(String message) {
        this.message = message;
    }


    /* Getters and Setters */

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
