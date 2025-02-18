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
        String prefix = memberId + "_";
        emitters.forEach((key, emitter) -> {
            if(key.startsWith(prefix)){
                result.put(key, emitter);
            }
        });
        return result;
    }

    @Override
    public Map<String, Object> findAllEventCacheStartsWithMemberId(Long memberId) {
        Map<String, Object> result = new ConcurrentHashMap<>();
        String prefix = memberId + "_";
        eventCache.forEach((key, event) -> {
            if(key.startsWith(prefix)){
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
    public void deleteEventCacheById(String id) {
        eventCache.remove(id);
    }

    @Override
    public void deleteAllEmitterStartsWithId(String id) {
        emitters.keySet().removeIf(key -> key.startsWith(id));
    }
}