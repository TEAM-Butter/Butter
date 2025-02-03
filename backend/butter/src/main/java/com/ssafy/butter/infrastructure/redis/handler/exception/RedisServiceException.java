package com.ssafy.butter.infrastructure.redis.handler.exception;

public class RedisServiceException extends RuntimeException {
  public RedisServiceException(String message) {
    super(message);
  }
}
