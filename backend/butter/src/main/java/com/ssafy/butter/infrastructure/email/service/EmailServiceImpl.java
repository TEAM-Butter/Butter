package com.ssafy.butter.infrastructure.email.service;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.domain.member.vo.Password;
import com.ssafy.butter.infrastructure.email.constants.EmailConstants;
import com.ssafy.butter.infrastructure.email.constants.EmailErrorMessages;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import com.ssafy.butter.infrastructure.email.dto.request.VerifyCodeEmailDTO;
import com.ssafy.butter.infrastructure.email.dto.response.SendCodeResponseDTO;
import com.ssafy.butter.infrastructure.email.dto.response.VerifyCodeResponseDTO;
import com.ssafy.butter.infrastructure.email.enums.EmailType;
import com.ssafy.butter.infrastructure.redis.RedisManager;
import com.ssafy.butter.infrastructure.redis.handler.exception.CustomValidationException;
import com.ssafy.butter.infrastructure.redis.handler.exception.EmailSendException;
import com.ssafy.butter.infrastructure.redis.handler.exception.RedisServiceException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{

    private final MemberService memberService;
    private final JavaMailSender javaMailSender;
    private final RedisManager redisManager;

    /**
     * 이메일 인증 코드 검증 후, EmailType에 따른 후속 작업
     *
     * @param verifyCodeEmailDTO 요청 DTO (이메일, 인증코드, 이메일 타입)
     * @return VerifyCodeResponseDTO 결과 DTO (메시지, 타입, 추가 정보)
     */
    @Override
    public VerifyCodeResponseDTO verifyCodeAndHandleAction(VerifyCodeEmailDTO verifyCodeEmailDTO) {
        // 이메일 인증 코드 검증 (예외 발생 시 서비스 계층에서 처리)
        boolean isValid = verifyCode(verifyCodeEmailDTO);
        if (!isValid) {
            return new VerifyCodeResponseDTO("인증 실패", verifyCodeEmailDTO.type().name(), null);
        }

        String additionalInfo = null;
        EmailType type = verifyCodeEmailDTO.type();

        switch (type) {
            case SIGNUP:
                break;

            case FIND_ID:
                Member memberForFindId = memberService.findByEmail(new Email(verifyCodeEmailDTO.email()))
                        .orElseThrow(() ->
                                new IllegalArgumentException("ERR : 해당 이메일로 가입된 계정을 찾을 수 없습니다."));
                additionalInfo = memberForFindId.getLoginId();
                break;

            case RESET_PASSWORD:
                Member memberForReset = memberService.findByEmail(new Email(verifyCodeEmailDTO.email()))
                        .orElseThrow(() ->
                                new IllegalArgumentException("ERR : 해당 이메일로 가입된 계정을 찾을 수 없습니다."));
                String tempPassword = createRandomCode();
                memberForReset.changePassword(Password.raw(tempPassword));
                memberService.save(memberForReset);
                additionalInfo = tempPassword;
                break;

            default:
                throw new IllegalArgumentException("ERR : 지원하지 않는 이메일 타입입니다 : " + type);
        }

        return new VerifyCodeResponseDTO("인증 성공", type.name(), additionalInfo);
    }

    @Override
    public SendCodeResponseDTO sendVerificationCode(SendEmailDTO sendEmailDTO) {
        String email = sendEmailDTO.email();
        String type = sendEmailDTO.type().name();

        String verificationCode = createRandomCode();
        long expirationTime = (type.equals(EmailType.SIGNUP.name())) ? EmailConstants.SIGNUP_EXPIRE_MIN : EmailConstants.ELSE_EXPIRE_MIN;

        saveCodeToRedis(email, type, verificationCode, expirationTime);

        sendEmail(email, verificationCode);

        return new SendCodeResponseDTO("인증 코드가 성공적으로 전송되었습니다.", verificationCode);
    }

    public boolean verifyCode(VerifyCodeEmailDTO verifyCodeEmailDTO) {
        String email = verifyCodeEmailDTO.email();
        String type = verifyCodeEmailDTO.type().name();
        String code = verifyCodeEmailDTO.verifyCode();

        String storedCode = getCodeFromRedis(email, type);
        if (storedCode == null) {
            throw new CustomValidationException(EmailErrorMessages.INVALID_VERIFICATION_CODE);
        }
        if (!storedCode.equals(code)) {
            throw new CustomValidationException(EmailErrorMessages.MISMATCH_VERIFICATION_CODE);
        }
        redisManager.deleteData(email + ":" + type);
        return true;
    }

    private void saveCodeToRedis(String email, String type, String verificationCode, long expirationTime) {
        try {
            redisManager.setDataExpire(email + ":" + type, verificationCode, expirationTime);
        } catch (RedisConnectionFailureException e) {
            throw new RedisServiceException(EmailErrorMessages.REDIS_CONNECTION_ERROR);
        } catch (DataAccessException e) {
            throw new RedisServiceException(EmailErrorMessages.REDIS_SAVE_ERROR + e.getMessage());
        }
    }

    private String getCodeFromRedis(String email, String type) {
        try {
            return redisManager.getData(email + ":" + type);
        } catch (RedisConnectionFailureException e) {
            throw new RedisServiceException(EmailErrorMessages.REDIS_CONNECTION_ERROR);
        } catch (DataAccessException e) {
            throw new RedisServiceException(EmailErrorMessages.REDIS_READ_ERROR + e.getMessage());
        }
    }

    private void sendEmail(String email, String verificationCode) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject(EmailConstants.MAIL_SUBJECT);
            helper.setText("인증 코드: " + verificationCode, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new EmailSendException(EmailErrorMessages.EMAIL_SEND_ERROR);
        }
    }

    private String createRandomCode() {
        String alphabet = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        String number = "1234567890";
        StringBuilder sb = new StringBuilder();

        for (int cnt = 0; cnt < EmailConstants.RANDOM_CODE_LENGTH; cnt++) {
            int randomNumber = ThreadLocalRandom.current().nextInt(EmailConstants.TOTAL_PROBABILITY);
            if (randomNumber < EmailConstants.ALPHABET_PROBABILITY) {
                int idx = ThreadLocalRandom.current().nextInt(alphabet.length());
                sb.append(alphabet.charAt(idx));
                continue;
            }

            int idx = ThreadLocalRandom.current().nextInt(number.length());
            sb.append(number.charAt(idx));
            sb.append("1!");
        }

        return sb.toString();
    }
}
