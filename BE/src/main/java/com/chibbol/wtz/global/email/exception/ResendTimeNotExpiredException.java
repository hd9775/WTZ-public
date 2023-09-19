package com.chibbol.wtz.global.email.exception;

public class ResendTimeNotExpiredException extends RuntimeException {
    public ResendTimeNotExpiredException(String message) {
        super(message);
    }
}
