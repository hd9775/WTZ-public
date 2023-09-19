package com.chibbol.wtz.domain.job.exception;

public class JobNotExistsException extends RuntimeException {
    public JobNotExistsException(String message) {
        super(message);
    }
}
