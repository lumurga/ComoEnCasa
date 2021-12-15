package com.integrador.grupo7.message.response;



import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;


public class JwtResponse {

    /* Attributes */
    private String token;
    private String type = "Bearer";
    private String email;
    private String name;
    private String lastName;
    private Collection<? extends GrantedAuthority> authorities;


    /* Constructor */
    public JwtResponse(String accessToken, String email, String name, String lastName, Collection<? extends GrantedAuthority> authorities) {
        this.token = accessToken;
        this.email = email;
        this.authorities = authorities;
        this.name = name;
        this.lastName = lastName;
    }

    /* Getters and Setters */

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

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

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}