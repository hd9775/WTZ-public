package com.chibbol.wtz.global.email.exception;

public class EmailCodeNotMatchException extends RuntimeException {
    public EmailCodeNotMatchException(String message) {
        super(message);
    }
}