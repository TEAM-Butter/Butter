package com.ssafy.butter.infrastructure.emailAuth.service;

import com.ssafy.butter.infrastructure.emailAuth.dto.request.EmailDTO;
import com.ssafy.butter.infrastructure.emailAuth.dto.response.EmailWithAuthCodeDTO;
import java.util.concurrent.CompletableFuture;

public interface EmailService{
    public void deleteAfterExpireAuthCodes();
    public CompletableFuture<EmailWithAuthCodeDTO> sendEmail(EmailDTO to);
    public boolean verifyEmail(String email, String authCode);
}
