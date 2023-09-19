package com.chibbol.wtz.domain.room.exception;

public class UserAlreadyExitRoomException extends RuntimeException {
    public UserAlreadyExitRoomException(String message) {
        super(message);
    }
}
