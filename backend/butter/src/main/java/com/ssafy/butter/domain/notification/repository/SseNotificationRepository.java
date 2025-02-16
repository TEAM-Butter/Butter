package com.ssafy.butter.domain.notification.repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
public class SseNotificationRepository implements NotificationRepository {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>();

    @Override
    public SseEmitter save(String emitterId, SseEmitter sseEmitter) {
        emitters.put(emitterId, sseEmitter);
        return sseEmitter;
    }

    @Override
    public void saveEventCache(String eventCacheId, Object event) {
        eventCache.put(eventCacheId, event);
    }

    @Override
    public Map<String, SseEmitter> findAllEmitterStartsWithMemberId(Long memberId) {
        Map<String, SseEmitter> result = new ConcurrentHashMap<>();
        emitters.forEach((key, emitters) -> {
            if(key.startsWith(String.valueOf(memberId))){
                result.put(key, emitters);
            }
        });
        return result;
    }

    @Override
    public Map<String, Object> findAllEventCacheStartsWithMemberId(Long memberId) {
        Map<String, Object> result = new ConcurrentHashMap<>();
        eventCache.forEach((key, event) -> {
            if(key.startsWith(String.valueOf(memberId))){
                result.put(key, event);
            }
        });
        return result;
    }

    @Override
    public void deleteEmitterById(String id) {
        emitters.remove(id);
    }

    @Override
    public void deleteAllEventCacheStartsWithId(String id) {
        eventCache.remove(id);
    }

    @Override
    public void deleteAllEmitterStartsWithId(String id) {
        emitters.keySet().removeIf(key -> key.startsWith(id));
    }
}