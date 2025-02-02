package com.ssafy.butter.infrastructure.redis.handler.exception;

import com.ssafy.butter.infrastructure.email.constants.EmailErrorMessages;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RedisExceptionHandler {

    @ExceptionHandler(RedisServiceException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleRedisException(RedisServiceException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(EmailSendException.class)
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    public String handleEmailSendException(EmailSendException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(CustomValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleValidationException(CustomValidationException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleGeneralException(Exception ex) {
        return EmailErrorMessages.REDIS_CONNECTION_ERROR;
    }
}

