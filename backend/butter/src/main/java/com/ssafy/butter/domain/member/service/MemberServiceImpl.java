package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.enums.Gender;
import com.ssafy.butter.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.domain.member.vo.BirthDate;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.domain.member.vo.Nickname;
import com.ssafy.butter.domain.member.vo.Password;
import com.ssafy.butter.global.util.encrypt.EncryptUtils;
import com.ssafy.butter.infrastructure.awsS3.ImageUploader;
import com.ssafy.butter.infrastructure.emailAuth.dto.request.EmailDTO;

import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final EncryptUtils encryptUtils;
    private final ImageUploader imageUploader;

    /**
     * 찾으려는 회원 ID를 받아 해당 회원 정보를 반환한다.
     * @param id 찾으려는 회원의 ID
     * @return 회원 정보를 담은 엔티티티
     */
    @Override
    public Member findById(Long id) {
        return memberRepository.findById(id).orElseThrow();
    }

    /**
     * 회원 가입을 한다
     * @param signUpDTO 회원 가입 요청에 필요한 DTO
     * @return 회원 가입 성공한 Member를 반환
     */
    @Override
    public Member signUp(SignUpDTO signUpDTO, MultipartFile profileImage) {
        Password encryptedPassword = createEncryptedPassword(signUpDTO.password().getValue());
        String imageUrl = insertProfileImage(profileImage);

        return memberRepository.save(Member.builder()
                .loginId(signUpDTO.loginId())
                .nickname(new Nickname(signUpDTO.nickname()))
                .email(new Email(signUpDTO.email()))
                .birthDate(new BirthDate(signUpDTO.birthDate()))
                .password(encryptedPassword)
                .gender(Gender.valueOf(signUpDTO.gender()))
                .imageUrl(imageUrl)
                .build());
    }

    /**
     * 멤버의 마이 페이지에 필요한 정보를 조회한다
     * @param memberId 회원의 ID 값
     * @return 회원의 마이페이지에 필요한 데이터
     * @throws BadRequestException
     */
    @Override
    @Transactional(readOnly = true)
    public MyPageResponseDTO getMyPageInfo(final Long memberId) throws BadRequestException {
        final Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException("ERR : 멤버를 찾을 수 없습니다"));

        return MyPageResponseDTO.builder()
                .member(findMember)
                .build();
    }

    /**
     * 파라미터 이메일과 동일한 이메일로 가입한 멤버의 존재 여부를 반환한다
     * @param emailDTO 이메일 DTO
     * @return 동일 이메일로 가입한 멤버의 존재 여부
     */
    @Override
    public boolean checkIfEmailExists(EmailDTO emailDTO) {
        Optional<Member> findMember = memberRepository.findByEmail(emailDTO.email());
        return findMember.isPresent();
    }

    /**
     * 사용자가 입력한 비밀번호를 암호화한다
     * @param rawPassword 회원이 로그인 할 때 사용하는 비밀 번호
     * @return 암호화된 비밀번호
     */
    private Password createEncryptedPassword(String rawPassword){
        Password password = Password.raw(rawPassword);
        return password.encrypt(encryptUtils);
    }

    /**
     * 프로필 이미지를 S3 버킷에 업로드하고, url을 반환한다
     * 사용자가 프로필 이미지를 설정하지 않은 경우, null을 반환한다
     * @param profileImage 회원이 설정한 프로필 이미지
     * @return S3 버킷에 이미지 업로드 여부
     */
    private String insertProfileImage(MultipartFile profileImage){
        if(profileImage!=null && !profileImage.isEmpty()){
            return imageUploader.uploadImage(profileImage);
        }
        return null;
    }
}
