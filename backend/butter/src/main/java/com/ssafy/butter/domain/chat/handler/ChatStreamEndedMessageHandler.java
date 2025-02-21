package com.ssafy.butter.domain.chat.handler;

import com.ssafy.butter.domain.chat.dto.ChatMessage;
import com.ssafy.butter.domain.chat.dto.ChatMessage.MessageType;
import com.ssafy.butter.domain.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatStreamEndedMessageHandler implements ChatMessageHandler {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomService chatRoomService;


    @Override
    public MessageType getMessageType() {
        return MessageType.STREAM_ENDED;
    }

    @Override
    public void handleMessage(ChatMessage message, StompHeaderAccessor headerAccessor) {
        messagingTemplate.convertAndSend("/topic/stream/" + message.getStreamId(), message);
        chatRoomService.clearRoom(message.getStreamId());
    }
}