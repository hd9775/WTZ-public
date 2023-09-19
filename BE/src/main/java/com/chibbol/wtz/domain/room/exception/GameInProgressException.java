package com.chibbol.wtz.domain.room.exception;

public class GameInProgressException extends RuntimeException {
    public GameInProgressException(String message) {
        super(message);
    }
}
