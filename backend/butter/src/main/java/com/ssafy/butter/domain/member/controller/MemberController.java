package com.ssafy.butter.domain.member.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.member.dto.request.*;
import com.ssafy.butter.domain.member.dto.response.*;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.global.token.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
@Tag(name = "Member Controller", description = "회원 관련 API")
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "회원 가입", description = "새로운 회원을 등록합니다.")
    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDTO> signUp(
            @Valid @RequestBody SignUpDTO signUpDTO) {
        SignUpResponseDTO responseDTO = memberService.signUp(signUpDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @Operation(summary = "회원 프로필 조회", description = "현재 로그인한 사용자의 프로필을 반환합니다.")
    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> getMyProfile(
            @CurrentUser AuthInfoDTO authInfoDTO) {
        UserProfileResponseDTO profile = memberService.getMyProfile(authInfoDTO.id());
        return ResponseEntity.ok(profile);
    }

    @Operation(summary = "회원 프로필 수정", description = "회원의 프로필을 수정합니다. (폼 데이터)")
    @PutMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProfileUpdateResponseDTO> updateProfile(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO authInfoDTO,
            @Parameter(description = "크루 수정 요청 정보", content = @Content(mediaType = "multipart/form-data"))
            @ModelAttribute ProfileUpdateRequestDTO profileUpdateRequestDTO) {

        ProfileUpdateResponseDTO response = memberService.updateProfile(profileUpdateRequestDTO, authInfoDTO.id());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "비밀번호 변경", description = "현재 로그인한 사용자의 비밀번호를 변경합니다.")
    @PutMapping(value = "/password", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PasswordUpdateResponseDTO> updatePassword(
            @CurrentUser AuthInfoDTO authInfoDTO,
            @RequestBody PasswordUpdateRequestDTO passwordUpdateRequestDTO) {

        PasswordUpdateResponseDTO response = memberService.updatePassword(passwordUpdateRequestDTO, authInfoDTO);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "추가 정보 저장", description = "사용자의 추가 정보를 저장합니다. (폼 데이터)")
    @PostMapping(value = "/extra-info", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RegisterExtraInfoResponseDTO> saveExtraUserInfo(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO authInfoDTO,
            @Parameter(description = "추가 정보 저장 요청", content = @Content(mediaType = "multipart/form-data"))
            @ModelAttribute ExtraInfoDTO extraInfoDTO) {

        RegisterExtraInfoResponseDTO response = memberService.saveExtraUserInfo(extraInfoDTO, authInfoDTO.id());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "로그인 아이디 중복 체크", description = "회원 가입 시 로그인 ID 중복 여부를 확인합니다.")
    @PostMapping("/check-loginId")
    public ResponseEntity<CheckLoginIdResponseDTO> checkEmailExists(
            @RequestBody CheckLoginIdDTO loginIdDTO) {
        CheckLoginIdResponseDTO response = memberService.checkIfLoginIdExists(loginIdDTO);
        return ResponseEntity.ok(response);
    }
}
