package com.ssafy.butter.domain.chat.handler;

import com.ssafy.butter.domain.chat.dto.ChatMessage;
import com.ssafy.butter.domain.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatJoinMessageHandler implements ChatMessageHandler{

    private final ChatRoomService chatRoomService;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public ChatMessage.MessageType getMessageType() {
        return ChatMessage.MessageType.JOIN;
    }

    @Override
    public void handleMessage(ChatMessage message, StompHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();

        // 사용자를 채팅 방에 추가
        chatRoomService.addUserToRoom(message.getStreamId(), sessionId, message.getRole());

        // 입장 알림 메시지 전송
        ChatMessage joinMsg = new ChatMessage();
        joinMsg.setType(ChatMessage.MessageType.SYSTEM);
        joinMsg.setSender("System");
        joinMsg.setContent(message.getSender() + "님이 입장했습니다.");
        joinMsg.setStreamId(message.getStreamId());
        messagingTemplate.convertAndSend("/topic/stream/" + message.getStreamId(), joinMsg);

        // 최신 접속자 수 전송
        int userCount = chatRoomService.getUserCount(message.getStreamId());
        ChatMessage countMsg = new ChatMessage();
        countMsg.setType(ChatMessage.MessageType.SYSTEM);
        countMsg.setSender("System");
        countMsg.setContent("현재 접속자 수: " + userCount);
        countMsg.setStreamId(message.getStreamId());
        messagingTemplate.convertAndSend("/topic/stream/" + message.getStreamId(), countMsg);
    }
}
