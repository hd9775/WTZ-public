package com.chibbol.wtz.domain.user.exception;

public class LoginUserNotFoundException extends RuntimeException {
    public LoginUserNotFoundException(String message) {
        super(message);
    }
}
