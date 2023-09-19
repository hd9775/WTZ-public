package com.chibbol.wtz.domain.job.exception;

public class UserJobNotExistsException extends RuntimeException{
    public UserJobNotExistsException(String message) {
        super(message);
    }
}
