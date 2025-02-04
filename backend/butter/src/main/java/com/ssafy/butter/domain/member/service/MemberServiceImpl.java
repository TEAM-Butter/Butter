package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.entity.Genre;
import com.ssafy.butter.domain.crew.repository.genre.GenreRepository;
import com.ssafy.butter.domain.member.dto.request.ExtraInfoDTO;
import com.ssafy.butter.domain.member.dto.request.PasswordUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.request.ProfileUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.dto.response.PasswordUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.response.ProfileUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.response.RegisterExtraInfoResponseDTO;
import com.ssafy.butter.domain.member.dto.response.UserProfileResponseDTO;
import com.ssafy.butter.domain.member.entity.AvatarType;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.enums.Gender;
import com.ssafy.butter.domain.member.repository.avatarType.AvatarTypeRepository;
import com.ssafy.butter.domain.member.repository.member.MemberRepository;
import com.ssafy.butter.domain.member.vo.BirthDate;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.domain.member.vo.Nickname;
import com.ssafy.butter.domain.member.vo.Password;
import com.ssafy.butter.global.token.JwtManager;
import com.ssafy.butter.global.util.encrypt.EncryptUtils;
import com.ssafy.butter.infrastructure.awsS3.ImageUploader;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final TransactionalMemberService transactionalMemberService;
    private final JwtManager jwtManager;
    private final MemberRepository memberRepository;
    private final GenreRepository genreRepository;
    private final AvatarTypeRepository avatarTypeRepository;
    private final EncryptUtils encryptUtils;
    private final ImageUploader imageUploader;

    @Override
    public Member save(Member member) {
        return memberRepository.save(member);
    }

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
     * 찾으려는 회원의 email로 해당 회원 정보를 반환한다
     * @param email 찾으려는 회원 email
     * @return 회원 정보 엔티티
     */
    @Override
    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    /**
     * 회원 가입을 한다
     * @param signUpDTO 회원 가입 요청에 필요한 DTO
     * @return 회원 가입 성공한 Member를 반환
     */
    @Override
    public Member signUp(SignUpDTO signUpDTO, MultipartFile profileImage) {
        Password encryptedPassword = createEncryptedPassword(signUpDTO.password().getValue());

        return memberRepository.save(Member.builder()
                .loginId(signUpDTO.loginId())
                .email(new Email(signUpDTO.email()))
                .birthDate(new BirthDate(signUpDTO.birthDate()))
                .password(encryptedPassword)
                .gender(Gender.valueOf(signUpDTO.gender()))
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
    public UserProfileResponseDTO getMyProfile(final Long memberId) throws BadRequestException {
        final Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException("ERR : 멤버를 찾을 수 없습니다"));

        return UserProfileResponseDTO.from(findMember);
    }

    /**
     * 프로필 업데이트 후, 업데이트한 회원의 정보를 반환한다
     *
     * @param profileUpdateRequestDTO 업데이트 할 회원의 프로필 정보
     * @param memberId 회원의 데이터베이스 상 고유 id
     * @return
     */
    @Override
    public ProfileUpdateResponseDTO updateProfile(ProfileUpdateRequestDTO profileUpdateRequestDTO, Long memberId) {
        Member findMember = getMember(memberId);

        String imageUrl = insertProfileImage(profileUpdateRequestDTO.profileImage());

        return transactionalMemberService.updateProfileInTransaction(findMember, profileUpdateRequestDTO, imageUrl);
    }

    @Override
    @Transactional
    public PasswordUpdateResponseDTO updatePassword(PasswordUpdateRequestDTO passwordUpdateRequestDTO, AuthInfoDTO authInfoDTO) {
        Member findMember = getMember(authInfoDTO.id());

        if(!findMember.getPassword().match(encryptUtils, passwordUpdateRequestDTO.currentPassword())){
            throw new IllegalStateException("ERR : 현재 비밀 번호가 일치하지 않습니다");
        }

        Password newPassword = createEncryptedPassword(passwordUpdateRequestDTO.newPassword());
        findMember.changePassword(newPassword);

        String accessToken = jwtManager.createAccessToken(authInfoDTO);
        String refreshToken = jwtManager.createRefreshToken();

        return new PasswordUpdateResponseDTO(accessToken, refreshToken);
    }

    @Override
    public RegisterExtraInfoResponseDTO saveExtraUserInfo(ExtraInfoDTO extraInfoDTO, Long memberId) {
        Member findMember = getMember(memberId);

        validateNicknameDuplication(extraInfoDTO.nickname());

        List<Genre> validGenres = getValidGenres(extraInfoDTO.genres());

        AvatarType avatarType = getAvatarType(extraInfoDTO.avatarType());

        findMember.saveExtraInfo(new Nickname(extraInfoDTO.nickname()), extraInfoDTO.profileImage(), avatarType, validGenres);

        return RegisterExtraInfoResponseDTO.from(findMember);
    }

    /**
     * 파라미터 이메일과 동일한 이메일로 가입한 멤버의 존재 여부를 반환한다
     * @param emailDTO 이메일 DTO
     * @return 동일 이메일로 가입한 멤버의 존재 여부
     */
    @Override
    public boolean checkIfEmailExists(SendEmailDTO emailDTO) {
        Optional<Member> findMember = memberRepository.findByEmail(emailDTO.email());
        return findMember.isPresent();
    }

    private Member getMember(Long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("ERR : 존재하지 않는 회원입니다."));
        return findMember;
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

    private void validateNicknameDuplication(String nickname){
        Optional<Member> findMember = memberRepository.findByNickname(nickname);

        if(findMember.isPresent())throw new IllegalStateException("ERR : "+nickname+"은 중복 닉네임 입니다");
    }

    private List<Genre> getValidGenres(List<String> genres) {
        return genres.stream()
                .map(genreName -> genreRepository.findByName(genreName)
                        .orElseThrow(() -> new IllegalArgumentException("ERR : "+genreName+"은 존재하지 않는 장르입니다")))
                .toList();
    }

    private AvatarType getAvatarType(String avatarTypeName) {
        return avatarTypeRepository.findByName(avatarTypeName)
                .orElseThrow(() -> new IllegalArgumentException("ERR : "+ avatarTypeName+"은 존재하지 않는 장르입니다"));
    }
}
