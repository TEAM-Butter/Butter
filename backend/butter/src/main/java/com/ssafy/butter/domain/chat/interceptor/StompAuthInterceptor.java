package com.ssafy.butter.domain.chat.interceptor;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.chat.CustomPrincipal;
import com.ssafy.butter.global.token.JwtExtractor;
import com.ssafy.butter.global.token.JwtManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StompAuthInterceptor implements ChannelInterceptor {

    private final JwtManager jwtManager;
    private final JwtExtractor jwtExtractor;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            List<String> authHeaders = accessor.getNativeHeader("Authorization");
            if (authHeaders != null && !authHeaders.isEmpty()) {
                String authHeader = authHeaders.get(0);
                if (authHeader.startsWith("Bearer ")) {
                    String jwtToken = authHeader.substring(7);
                    AuthInfoDTO authInfo = jwtManager.getParsedClaims(jwtExtractor.extract(jwtToken));
                    if (authInfo != null) {
                        accessor.setUser(new CustomPrincipal(authInfo));
                    } else {
                        throw new IllegalArgumentException("STOMP ERR : 유효하지 않은 JWT");
                    }
                }
            } else {
                throw new IllegalArgumentException("STOMP ERR : 헤더에 JWT가 없음");
            }
        }
        return message;
    }
}