package com.ssafy.butter.domain.chat.controller;

import com.ssafy.butter.domain.chat.dto.ChatMessage;
import com.ssafy.butter.domain.chat.dto.ChatMessage.MessageType;
import com.ssafy.butter.domain.chat.handler.ChatMessageHandler;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class ChatController {

    private final Map<MessageType, ChatMessageHandler> handlerMap = new HashMap<>();

    @Autowired
    public ChatController(List<ChatMessageHandler> handlers){
        for(ChatMessageHandler handler : handlers){
            handlerMap.put(handler.getMessageType(), handler);
        }
    }

    @MessageMapping("/chat.sendMessage/{streamId}")
    public void sendMessage(@DestinationVariable String streamId,
                            @Payload ChatMessage message,
                            StompHeaderAccessor headerAccessor) {

        message.setStreamId(streamId);
        ChatMessageHandler handler = handlerMap.get(message.getType());

        if(handler != null){
            handler.handleMessage(message, headerAccessor);
            return;
        }

        System.err.println("ERR : 알 수 없는 메시지 타입 입니다" + message.getType());
    }
}