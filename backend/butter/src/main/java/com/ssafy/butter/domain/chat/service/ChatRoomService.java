package com.ssafy.butter.domain.chat.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CopyOnWriteArraySet;

public interface ChatRoomService {
    void addUserToRoom(String streamId, String sessionId, String role);
    void removeUser(String sessionId);
    String getUserRole(String sessionId);
    int getUserCount(String streamId);
    String getStreamIdBySession(String sessionId);
    void clearRoom(String streamId);
    List<Map.Entry<String, CopyOnWriteArraySet<String>>> getRoomSessionsOrderBySessionCount();
}
