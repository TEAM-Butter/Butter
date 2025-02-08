package com.ssafy.butter.domain.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;
    private String streamId;
    private String role;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        SYSTEM,
        STREAM_ENDED
    }
}