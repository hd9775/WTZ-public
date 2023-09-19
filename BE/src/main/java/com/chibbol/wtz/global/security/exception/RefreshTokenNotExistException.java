package com.chibbol.wtz.global.security.exception;

public class RefreshTokenNotExistException extends RuntimeException {
    public RefreshTokenNotExistException(String message) {
        super(message);
    }
}
