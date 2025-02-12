package com.ssafy.butter.domain.chat.service;

public interface ChatRoomService {
    void addUserToRoom(String streamId, String sessionId, String role);
    void removeUser(String sessionId);
    String getUserRole(String sessionId);
    int getUserCount(String streamId);
    String getStreamIdBySession(String sessionId);
    void clearRoom(String streamId);
}
