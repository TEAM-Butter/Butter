package com.ssafy.butter.domain.notification.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.notification.service.NotificationService;
import com.ssafy.butter.global.token.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/notify")
public class SseNotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> subscribe(
            @CurrentUser AuthInfoDTO authInfoDTO,
            @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {

        SseEmitter sseEmitter = notificationService.subscribe(authInfoDTO.id(), lastEventId);

        return ResponseEntity.ok(sseEmitter);
    }
}
