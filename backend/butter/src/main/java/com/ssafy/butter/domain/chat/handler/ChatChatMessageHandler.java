package com.ssafy.butter.domain.chat.handler;

import com.ssafy.butter.domain.chat.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatChatMessageHandler implements ChatMessageHandler{

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public ChatMessage.MessageType getMessageType() {
        return ChatMessage.MessageType.CHAT;
    }

    @Override
    public void handleMessage(ChatMessage message, StompHeaderAccessor headerAccessor) {
        messagingTemplate.convertAndSend("/topic/stream/" + message.getStreamId(), message);
    }
}
