package com.ssafy.butter.domain.member.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.member.dto.request.CheckLoginIdDTO;
import com.ssafy.butter.domain.member.dto.request.CheckNicknameDuplicationRequestDTO;
import com.ssafy.butter.domain.member.dto.request.ExtraInfoDTO;
import com.ssafy.butter.domain.member.dto.request.MemberSearchRequestDTO;
import com.ssafy.butter.domain.member.dto.request.PasswordUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.request.ProfileUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.dto.response.CheckLoginIdResponseDTO;
import com.ssafy.butter.domain.member.dto.response.CheckNickNameDuplicationResponseDTO;
import com.ssafy.butter.domain.member.dto.response.PasswordUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.response.ProfileUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.response.RegisterExtraInfoResponseDTO;
import com.ssafy.butter.domain.member.dto.response.SearchMemberResponseDTO;
import com.ssafy.butter.domain.member.dto.response.SignUpResponseDTO;
import com.ssafy.butter.domain.member.dto.response.UserProfileResponseDTO;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.global.token.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/members")
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
    @PutMapping(value = "/password")
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
        CheckLoginIdResponseDTO response = memberService.validateLoginIdDuplication(loginIdDTO.loginId());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "닉네임 중복 체크", description = "닉네임 중복 여부를 확인합니다.")
    @PostMapping("/check-nickname")
    public ResponseEntity<CheckNickNameDuplicationResponseDTO> checkNicknameExists(
            @RequestBody CheckNicknameDuplicationRequestDTO nicknameDTO) {
        CheckNickNameDuplicationResponseDTO response = memberService.checkIfNicknameExists(nicknameDTO.nickname());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "회원 닉네임 검색", description = "닉네임에 해당 문자열이 포함된 회원들을 대소문자 구분 없이 조회합니다."
    )
    @GetMapping
    public ResponseEntity<Page<SearchMemberResponseDTO>> searchMemberByNickname(
            @ParameterObject @ModelAttribute MemberSearchRequestDTO memberSearchRequestDTO){
        return ResponseEntity.ok(memberService.findByNicknameContainingIgnoreCase(memberSearchRequestDTO));
    }
}
