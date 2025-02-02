package com.ssafy.butter.infrastructure.email.service;

import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import com.ssafy.butter.infrastructure.email.dto.request.VerifyCodeEmailDTO;

public interface EmailService{

    void sendVerificationCode(SendEmailDTO sendEmailDTO);

    boolean verifyCode(VerifyCodeEmailDTO verifyCodeEmailDTO);
}
