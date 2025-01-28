package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.domain.member.vo.BirthDate;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.vo.Nickname;
import com.ssafy.butter.domain.member.vo.Password;
import com.ssafy.butter.domain.member.vo.PhoneNumber;
import com.ssafy.butter.domain.member.repository.MemberRepository;
import com.ssafy.butter.global.util.encrypt.EncryptUtils;
import com.ssafy.butter.infrastructure.emailAuth.dto.request.EmailDTO;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final EncryptUtils encryptUtils;

    /**
     * 회원 가입을 한다
     * @param signUpDTO
     * @return
     */
    @Override
    public Member signUp(SignUpDTO signUpDTO) {
        Password encryptedPassword = createEncryptedPassword(signUpDTO.password().getValue());

        return memberRepository.save(Member.builder()
                .loginId(signUpDTO.loginId())
                .nickname(new Nickname(signUpDTO.nickname()))
                .email(new Email(signUpDTO.email()))
                .phoneNumber(new PhoneNumber(signUpDTO.phoneNumber()))
                .birthDate(new BirthDate(signUpDTO.birthDate()))
                .password(encryptedPassword)
                .gender(signUpDTO.gender())
                .build());
    }

    /**
     * 멤버의 마이 페이지에 필요한 정보를 조회한다
     * @param memberId
     * @return
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
     * @param emailDTO
     * @return
     */
    @Override
    public boolean checkIfEmailExists(EmailDTO emailDTO) {
        Optional<Member> findMember = memberRepository.findByEmail(emailDTO.email());
        return findMember.isPresent();
    }

    private Password createEncryptedPassword(String rawPassword){
        Password password = Password.raw(rawPassword);
        return password.encrypt(encryptUtils);
    }
}
