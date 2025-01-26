package com.ssafy.butter.infrastructure.emailAuth.controller;

import com.ssafy.butter.domain.member.service.MemberService;
import com.ssafy.butter.infrastructure.emailAuth.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/email")
public class EmailAuthController {
    private final EmailService emailService;
    private final MemberService memberService;
}
