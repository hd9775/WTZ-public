package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.exception.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RoomControllerAdvice {

    @ExceptionHandler({RoomNotFoundException.class})
    public ResponseEntity<String> handlerRoomNotFoundException(RoomNotFoundException e) {
        return ResponseEntity.status(404).body("Room Not Found");
    }

    @ExceptionHandler({GameNotFoundException.class})
    public ResponseEntity<String> handlerGameNotFoundException(GameNotFoundException e) {
        return ResponseEntity.status(404).body("Room Not Found");
    }

    @ExceptionHandler({SeatNotFoundException.class})
    public ResponseEntity<String> handlerSeatNotFoundException(SeatNotFoundException e) {
        return ResponseEntity.status(404).body("Seat Not Found");
    }

    @ExceptionHandler({UserAlreadyExitRoomException.class})
    public ResponseEntity<String> handlerUserAlreadyUnsubscribeException(UserAlreadyExitRoomException e) {
        return ResponseEntity.status(404).body("User Already Exit Room");
    }
    
    @ExceptionHandler({TitleValidationException.class})
    public ResponseEntity<String> handlerTitleValidationException(TitleValidationException e){
        return ResponseEntity.status(404).body("Title length not Valid");
    }

    @ExceptionHandler({GameInProgressException.class})
    public ResponseEntity<String> handlerGameInProgressException(GameInProgressException e) {
        return ResponseEntity.status(403).body("Game In Progress");
    }
}

