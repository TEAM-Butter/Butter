package com.ssafy.butter.domain.chat.handler;

import com.ssafy.butter.domain.chat.dto.ChatMessage;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

public interface ChatMessageHandler {
    /**
     * 핸들러가 처리할 메시지 타입을 반환한다
     */
    ChatMessage.MessageType getMessageType();

    /**
     * 메시지와 헤더 정보를 받아 적절한 처리를 수행한다
     *
     * @param message 채팅 메시지 객체 (streamId는 이미 설정되어 있다고 가정)
     * @param headerAccessor STOMP 헤더 정보 (세션 ID 등)
     */
    void handleMessage(ChatMessage message, StompHeaderAccessor headerAccessor);
}
