package com.ssafy.butter.domain.chat.handler;


import com.ssafy.butter.domain.chat.dto.ChatMessage;
import com.ssafy.butter.domain.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatLeaveMessageHandler implements ChatMessageHandler{

    private final ChatRoomService chatRoomService;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public ChatMessage.MessageType getMessageType() {
        return ChatMessage.MessageType.LEAVE;
    }

    @Override
    public void handleMessage(ChatMessage message, StompHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();

        // 사용자를 채팅방에서 제거
        chatRoomService.removeUser(sessionId);

        // 퇴장 알림 메시지 전송
        ChatMessage leaveMsg = new ChatMessage();
        leaveMsg.setType(ChatMessage.MessageType.SYSTEM);
        leaveMsg.setSender("System");
        leaveMsg.setContent(message.getSender() + "님이 퇴장했습니다.");
        leaveMsg.setStreamId(message.getStreamId());
        messagingTemplate.convertAndSend("/topic/stream/" + message.getStreamId(), leaveMsg);

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
