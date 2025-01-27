package com.ssafy.butter.infrastructure.emailAuth.controller;

import com.ssafy.butter.domain.member.entity.Email;
import com.ssafy.butter.domain.member.service.MemberService;
import com.ssafy.butter.infrastructure.emailAuth.dto.request.AuthCodeEmailDTO;
import com.ssafy.butter.infrastructure.emailAuth.dto.request.EmailDTO;
import com.ssafy.butter.infrastructure.emailAuth.dto.response.EmailWithAuthCodeDTO;
import com.ssafy.butter.infrastructure.emailAuth.service.EmailService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/auth/email")
public class EmailAuthController {
    private final EmailService emailService;
    private final MemberService memberService;

    @PostMapping("/exist")
    public ResponseEntity<EmailDTO> existsEmail(@Valid @RequestBody EmailDTO email){
        if(memberService.checkIfEmailExists(email)){
            return ResponseEntity.badRequest()
                    .body(email);
        }

        return ResponseEntity.ok(email);
    }

    @PostMapping("/send")
    public ResponseEntity<EmailWithAuthCodeDTO> sendEmail(@Valid @RequestBody EmailDTO emailDTO){
        EmailWithAuthCodeDTO result = emailService.sendEmail(emailDTO).join();

        return ResponseEntity.ok(result);
    }

    @PostMapping("/verify")
    public ResponseEntity<EmailWithAuthCodeDTO> verifyEmail(@Valid @RequestBody AuthCodeEmailDTO authCodeEmailDTO){
        EmailWithAuthCodeDTO response = new EmailWithAuthCodeDTO(authCodeEmailDTO.email(), authCodeEmailDTO.authCode());

        if(emailService.verifyEmail(authCodeEmailDTO.email(), authCodeEmailDTO.authCode())){
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest()
                .body(response);
    }
}
