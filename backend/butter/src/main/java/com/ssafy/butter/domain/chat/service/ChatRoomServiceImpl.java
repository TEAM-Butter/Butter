package com.ssafy.butter.domain.chat.service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CopyOnWriteArraySet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService{

    // 각 채팅방 별로 세션ID 집합을 관리
    private ConcurrentMap<String, CopyOnWriteArraySet<String>> roomSessions = new ConcurrentHashMap<>();
    // 각 세션ID가 어느 채팅방에 속하는지 저장
    private ConcurrentMap<String, String> sessionRoomMap = new ConcurrentHashMap<>();
    // 각 세션ID의 역할
    private ConcurrentMap<String, String> sessionRoleMap = new ConcurrentHashMap<>();

    @Override
    public void addUserToRoom(String streamId, String sessionId, String role) {
        roomSessions.computeIfAbsent(streamId, k -> new CopyOnWriteArraySet<>()).add(sessionId);
        sessionRoomMap.put(sessionId, streamId);
        sessionRoleMap.put(sessionId, role);
    }

    @Override
    public void removeUser(String sessionId) {
        String streamId = sessionRoomMap.get(sessionId);
        if (streamId != null) {
            CopyOnWriteArraySet<String> sessions = roomSessions.get(streamId);
            if (sessions != null) {
                sessions.remove(sessionId);
                if (sessions.isEmpty()) {
                    roomSessions.remove(streamId);
                }
            }
            sessionRoomMap.remove(sessionId);
            sessionRoleMap.remove(sessionId);
        }
    }

    @Override
    public int getUserCount(String streamId) {
        return roomSessions.getOrDefault(streamId, new CopyOnWriteArraySet<>()).size();
    }

    @Override
    public String getUserRole(String sessionId) {
        return sessionRoleMap.get(sessionId);
    }

    @Override
    public String getStreamIdBySession(String sessionId) {
        return sessionRoomMap.get(sessionId);
    }

    @Override
    public void clearRoom(String streamId) {
        CopyOnWriteArraySet<String> sessions = roomSessions.remove(streamId);
        if (sessions != null) {
            for (String sessionId : sessions) {
                sessionRoomMap.remove(sessionId);
                sessionRoleMap.remove(sessionId);
            }
        }
    }
}
