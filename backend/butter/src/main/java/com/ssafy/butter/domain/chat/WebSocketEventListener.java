package com.ssafy.butter.domain.chat;
import com.ssafy.butter.domain.chat.dto.ChatMessage;
import com.ssafy.butter.domain.chat.dto.ChatMessage.MessageType;
import com.ssafy.butter.domain.chat.service.ChatRoomService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomService chatRoomService;

    @Autowired
    public WebSocketEventListener(SimpMessagingTemplate messagingTemplate, ChatRoomService chatRoomService) {
        this.messagingTemplate = messagingTemplate;
        this.chatRoomService = chatRoomService;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        // STOMP 헤더에서 세션 ID 추출
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        log.info("세션 종료 이벤트 감지됨. sessionId: {}", sessionId);

        // 해당 세션이 속한 채팅방(스트림) 정보 조회
        String streamId = chatRoomService.getStreamIdBySession(sessionId);
        log.info("sessionId {}에 대한 streamId 조회 결과: {}", sessionId, streamId);

        if (streamId != null) {
            // 해당 세션의 사용자 역할 확인
            String role = chatRoomService.getUserRole(sessionId);
            log.info("sessionId {}의 사용자 역할: {}", sessionId, role);

            if ("STREAMER".equalsIgnoreCase(role)) {
                // 스트리머인 경우: 스트림 종료 메시지 전송 및 채팅방 초기화
                log.info("스트리머 연결 종료 감지됨. STREAM_ENDED 메시지를 브로드캐스트 합니다.");
                ChatMessage endMsg = new ChatMessage();
                endMsg.setType(MessageType.STREAM_ENDED);
                endMsg.setSender("System");
                endMsg.setContent("스트림이 종료되었습니다.");
                endMsg.setStreamId(streamId);
                messagingTemplate.convertAndSend("/topic/stream/" + streamId, endMsg);
                log.info("STREAM_ENDED 메시지 전송 완료. streamId: {}", streamId);

                log.info("채팅방 초기화(clearRoom) 시작. streamId: {}", streamId);
                chatRoomService.clearRoom(streamId);
                log.info("채팅방 초기화 완료. streamId: {}", streamId);
            } else {
                // 일반 사용자(USER)의 경우: 해당 사용자만 제거 후 접속자 수 업데이트 메시지 전송
                log.info("일반 사용자 연결 종료 감지됨. sessionId {}를 채팅방에서 제거합니다.", sessionId);
                chatRoomService.removeUser(sessionId);

                int userCount = chatRoomService.getUserCount(streamId);
                log.info("업데이트된 사용자 수 for streamId {}: {}", streamId, userCount);

                ChatMessage countMsg = new ChatMessage();
                countMsg.setType(MessageType.SYSTEM);
                countMsg.setSender("System");
                countMsg.setContent("현재 접속자 수: " + userCount);
                countMsg.setStreamId(streamId);
                messagingTemplate.convertAndSend("/topic/stream/" + streamId, countMsg);
                log.info("업데이트된 사용자 수 메시지 전송 완료. streamId: {}", streamId);
            }
        } else {
            log.warn("sessionId {}에 해당하는 streamId가 없습니다. 이미 제거되었거나 비정상적입니다.", sessionId);
        }
    }
}