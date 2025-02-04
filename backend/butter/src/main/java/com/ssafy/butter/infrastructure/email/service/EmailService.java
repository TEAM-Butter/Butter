package com.ssafy.butter.infrastructure.email.service;

import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import com.ssafy.butter.infrastructure.email.dto.request.VerifyCodeEmailDTO;
import com.ssafy.butter.infrastructure.email.dto.response.VerifyCodeResponseDTO;

public interface EmailService{

    VerifyCodeResponseDTO verifyCodeAndHandleAction(VerifyCodeEmailDTO verifyCodeEmailDTO);

    void sendVerificationCode(SendEmailDTO sendEmailDTO);
}
