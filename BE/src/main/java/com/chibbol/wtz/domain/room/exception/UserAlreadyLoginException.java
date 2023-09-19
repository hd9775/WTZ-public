package com.chibbol.wtz.domain.room.exception;

public class UserAlreadyLoginException extends RuntimeException{
    public UserAlreadyLoginException(String message) {
        super(message);
    }
}
