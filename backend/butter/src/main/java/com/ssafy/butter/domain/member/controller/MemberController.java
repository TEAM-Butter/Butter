package com.ssafy.butter.domain.member.controller;


import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.member.dto.request.CheckLoginIdDTO;
import com.ssafy.butter.domain.member.dto.request.ExtraInfoDTO;
import com.ssafy.butter.domain.member.dto.request.PasswordUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.request.ProfileUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.dto.response.CheckLoginIdResponseDTO;
import com.ssafy.butter.domain.member.dto.response.PasswordUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.response.ProfileUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.response.RegisterExtraInfoResponseDTO;
import com.ssafy.butter.domain.member.dto.response.SignUpResponseDTO;
import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.global.token.CurrentUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDTO> signUp(
            @Valid @RequestBody SignUpDTO signUpDTO) {

        SignUpResponseDTO responseDTO = memberService.signUp(signUpDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/my-page")
    public ResponseEntity<MyPageResponseDTO> getMyPage(
            @CurrentUser AuthInfoDTO authInfoDTO) {

        MyPageResponseDTO profile = memberService.getMyProfile(authInfoDTO.id());
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileUpdateResponseDTO> updateProfile(
            @CurrentUser AuthInfoDTO authInfoDTO,
            @ModelAttribute ProfileUpdateRequestDTO profileUpdateRequestDTO) {

        ProfileUpdateResponseDTO response = memberService.updateProfile(profileUpdateRequestDTO, authInfoDTO.id());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/password")
    public ResponseEntity<PasswordUpdateResponseDTO> updatePassword(
            @CurrentUser AuthInfoDTO authInfoDTO,
            @RequestBody PasswordUpdateRequestDTO passwordUpdateRequestDTO) {

        PasswordUpdateResponseDTO response = memberService.updatePassword(passwordUpdateRequestDTO, authInfoDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/extra-info")
    public ResponseEntity<RegisterExtraInfoResponseDTO> saveExtraUserInfo(
            @CurrentUser AuthInfoDTO authInfoDTO,
            @ModelAttribute ExtraInfoDTO extraInfoDTO) {

        RegisterExtraInfoResponseDTO response = memberService.saveExtraUserInfo(extraInfoDTO, authInfoDTO.id());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/check-loginId")
    public ResponseEntity<CheckLoginIdResponseDTO> checkEmailExists(@RequestBody CheckLoginIdDTO loginIdDTO) {
        CheckLoginIdResponseDTO response = memberService.checkIfLoginIdExists(loginIdDTO);

        return ResponseEntity.ok(response);
    }

}
