package com.chibbol.wtz.domain.shop.controller;

import com.chibbol.wtz.domain.shop.exception.AlreadyPurchasedException;
import com.chibbol.wtz.domain.shop.exception.InsufficientPointsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ShopControllerAdvice {
    @ExceptionHandler
    public ResponseEntity<String> handleInsufficientPointsException(InsufficientPointsException e) {
        return ResponseEntity.status(403).body("Insufficient Points");
    }

    @ExceptionHandler
    public ResponseEntity<String> handleAlreadyPurchasedException(AlreadyPurchasedException e) {
        return ResponseEntity.status(403).body("Already Purchased");
    }
}
