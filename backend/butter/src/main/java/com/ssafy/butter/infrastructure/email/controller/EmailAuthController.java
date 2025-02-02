package com.ssafy.butter.infrastructure.email.controller;

import com.ssafy.butter.infrastructure.email.dto.response.VerifyCodeResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.repository.MemberJpaRepository;
import com.ssafy.butter.domain.member.service.MemberService;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import com.ssafy.butter.infrastructure.email.dto.request.VerifyCodeEmailDTO;
import com.ssafy.butter.infrastructure.email.enums.EmailType;
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
    public ResponseEntity<String> sendVerificationCode(@Valid @RequestBody SendEmailDTO sendEmailDTO) {
        emailService.sendVerificationCode(sendEmailDTO);
        return ResponseEntity.ok("인증 코드가 전송되었습니다.");
    }

    @PostMapping("/verify-code")
    public ResponseEntity<VerifyCodeResponseDTO> verifyCode(@RequestBody VerifyCodeEmailDTO verifyCodeEmailDTO) {
        boolean isValid = emailService.verifyCode(verifyCodeEmailDTO);

        if(!isValid) {
            return ResponseEntity.badRequest()
                    .body(new VerifyCodeResponseDTO("인증 실패", verifyCodeEmailDTO.type().name(), null));
        }

        String loginId = null;
        if(verifyCodeEmailDTO.type().equals(EmailType.FIND_ID)) {
            loginId = memberService.findByEmail(verifyCodeEmailDTO.email())
                    .map(Member::getLoginId)
                    .orElseThrow(() -> new IllegalArgumentException("ERR : 해당 이메일로 가입된 계정을 찾을 수 없습니다."));
        }

        return ResponseEntity.ok(new VerifyCodeResponseDTO("인증 성공", verifyCodeEmailDTO.type().name(), loginId));
    }
}
