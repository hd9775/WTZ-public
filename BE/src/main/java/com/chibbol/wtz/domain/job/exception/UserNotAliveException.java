package com.chibbol.wtz.domain.job.exception;

public class UserNotAliveException extends RuntimeException {
    public UserNotAliveException(String message) {
        super(message);
    }
}
