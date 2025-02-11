package com.ssafy.butter.infrastructure.email.controller;

import com.ssafy.butter.infrastructure.email.dto.response.SendCodeResponseDTO;
import com.ssafy.butter.infrastructure.email.dto.response.VerifyCodeResponseDTO;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import com.ssafy.butter.infrastructure.email.dto.request.VerifyCodeEmailDTO;
import com.ssafy.butter.infrastructure.email.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/auth/email")
@Tag(name = "Email Authentication", description = "이메일 인증 관련 API")
public class EmailAuthController {
    private final EmailService emailService;
    private final MemberService memberService;

    @Operation(
            summary = "이메일 존재 여부 확인",
            description = "입력한 이메일이 기존 회원 데이터베이스에 존재하는지 확인합니다."
    )
    @PostMapping("/exists")
    public ResponseEntity<SendEmailDTO> existsEmail(@Valid @RequestBody SendEmailDTO email){
        if(memberService.checkIfEmailExists(email.email())){
            return ResponseEntity.badRequest().body(email);
        }
        return ResponseEntity.ok(email);
    }

    @Operation(
            summary = "이메일 인증 코드 전송",
            description = "사용자가 입력한 이메일로 인증 코드를 전송합니다."
    )
    @PostMapping("/send-code")
    public ResponseEntity<SendCodeResponseDTO> sendVerificationCode(@Valid @RequestBody SendEmailDTO sendEmailDTO) {
        SendCodeResponseDTO response = emailService.sendVerificationCode(sendEmailDTO);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "이메일 인증 코드 검증",
            description = "사용자가 입력한 인증 코드가 올바른지 검증하고, 인증 결과를 반환합니다."
    )
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
