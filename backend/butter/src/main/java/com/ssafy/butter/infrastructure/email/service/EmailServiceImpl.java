package com.ssafy.butter.infrastructure.email.service;

import com.ssafy.butter.infrastructure.email.constants.EmailConstants;
import com.ssafy.butter.infrastructure.email.constants.EmailErrorMessages;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import com.ssafy.butter.infrastructure.email.dto.request.VerifyCodeEmailDTO;
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

    private final JavaMailSender javaMailSender;
    private final RedisManager redisManager;

    @Override
    public void sendVerificationCode(SendEmailDTO sendEmailDTO) {
        String email = sendEmailDTO.email();
        String type = sendEmailDTO.type().name();

        String verificationCode = createRandomCode();
        long expirationTime = (email.equals("signup")) ? EmailConstants.SIGNUP_EXPIRE_MIN : EmailConstants.ELSE_EXPIRE_MIN;

        saveCodeToRedis(email, type, verificationCode, expirationTime);

        sendEmail(email, verificationCode);
    }

    @Override
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
        }

        return sb.toString();
    }
}
