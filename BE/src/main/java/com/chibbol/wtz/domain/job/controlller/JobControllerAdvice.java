package com.chibbol.wtz.domain.job.controlller;

import com.chibbol.wtz.domain.job.exception.JobNotExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class JobControllerAdvice {
    @ExceptionHandler(JobNotExistsException.class)
    public ResponseEntity<String> handleJobNotExistException(JobNotExistsException e) {
        return ResponseEntity.status(404).body("Job Not Exists");
    }
}
