package com.integrador.grupo7.message.request;

public class LoginForm {


    /* Attributes */
    private String email;
    private String password;

    /* Constructor */
    public LoginForm(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LoginForm() {
    }

    /* Getters and Setters */
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}