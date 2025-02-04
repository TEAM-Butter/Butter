package com.ssafy.butter.infrastructure.email.controller;

import com.ssafy.butter.infrastructure.email.dto.response.SendCodeResponseDTO;
import com.ssafy.butter.infrastructure.email.dto.response.VerifyCodeResponseDTO;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import com.ssafy.butter.infrastructure.email.dto.request.VerifyCodeEmailDTO;
import com.ssafy.butter.infrastructure.email.service.EmailService;
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

    @PostMapping("/exists")
    public ResponseEntity<SendEmailDTO> existsEmail(@Valid @RequestBody SendEmailDTO email){
        if(memberService.checkIfEmailExists(email)){
            return ResponseEntity.badRequest()
                    .body(email);
        }
        return ResponseEntity.ok(email);
    }

    @PostMapping("/send-code")
    public ResponseEntity<SendCodeResponseDTO> sendVerificationCode(@Valid @RequestBody SendEmailDTO sendEmailDTO) {
        SendCodeResponseDTO response = emailService.sendVerificationCode(sendEmailDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<VerifyCodeResponseDTO> verifyEmailCode(@RequestBody VerifyCodeEmailDTO verifyCodeEmailDTO) {
        try {
            VerifyCodeResponseDTO responseDTO = emailService.verifyCodeAndHandleAction(verifyCodeEmailDTO);
            return ResponseEntity.ok(responseDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new VerifyCodeResponseDTO(e.getMessage(), verifyCodeEmailDTO.type().name(), null));
        }
    }
}
