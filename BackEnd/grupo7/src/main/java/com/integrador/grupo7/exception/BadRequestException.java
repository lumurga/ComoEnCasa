package com.integrador.grupo7.exception;

public class BadRequestException extends Exception {
    public BadRequestException(String mensaje){
        super(mensaje);
    }
}
