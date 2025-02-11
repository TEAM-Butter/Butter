package com.ssafy.butter.domain.notification.repository;

import java.util.Map;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationRepository {
    SseEmitter save(String emitterId, SseEmitter sseEmitter);

    void saveEventCache(String eventCacheId, Object event);

    Map<String, SseEmitter> findAllEmitterStartsWithUsername(String username);

    Map<String, Object> findAllEventCacheStartsWithUsername(String username);

    void deleteEmitterById(String id);

    void deleteAllEmitterStartsWithId(String id);

    void deleteAllEventCacheStartsWithId(String id);
}
