package com.chibbol.wtz.domain.shop.exception;

public class ItemNotOwnedException extends RuntimeException {
    public ItemNotOwnedException(String message) {
        super(message);
    }
}
