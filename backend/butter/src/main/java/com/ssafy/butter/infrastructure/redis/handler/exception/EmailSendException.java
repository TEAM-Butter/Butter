package com.ssafy.butter.infrastructure.redis.handler.exception;

public class EmailSendException extends RuntimeException {
    public EmailSendException(String message) {
        super(message);
    }
}
