package com.ssafy.butter.infrastructure.redis.handler.exception;

public class CustomValidationException extends RuntimeException {
    public CustomValidationException(String message) {
        super(message);
    }
}
