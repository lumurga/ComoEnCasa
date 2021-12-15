package com.integrador.grupo7.message.request;

public class SignUpForm {

    /* Attributes */
    private String name;
    private String lastName;
    private String email;
    private String role;
    private String password;

    /* Constructor */

    public SignUpForm(String name, String lastName, String email, String role, String password) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    public SignUpForm() {
    }

    /* Getters and Setters */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}