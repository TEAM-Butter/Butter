package com.ssafy.butter.domain.notification.repository;

import java.util.Map;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationRepository {
    SseEmitter save(String emitterId, SseEmitter sseEmitter);

    void saveEventCache(String eventCacheId, Object event);

    Map<String, SseEmitter> findAllEmitterStartsWithMemberId(Long memberId);

    Map<String, Object> findAllEventCacheStartsWithMemberId(Long memberId);

    void deleteEmitterById(String id);

    void deleteAllEmitterStartsWithId(String id);

    void deleteEventCacheById(String id);
}
