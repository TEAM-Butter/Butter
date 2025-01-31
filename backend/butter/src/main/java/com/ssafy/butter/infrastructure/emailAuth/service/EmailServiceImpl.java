package com.ssafy.butter.infrastructure.emailAuth.service;

import com.ssafy.butter.infrastructure.emailAuth.dto.request.EmailDTO;
import com.ssafy.butter.infrastructure.emailAuth.dto.response.EmailWithAuthCodeDTO;
import com.ssafy.butter.infrastructure.emailAuth.entity.EmailAuth;
import com.ssafy.butter.infrastructure.emailAuth.handler.EmailSendFailureException;
import com.ssafy.butter.infrastructure.emailAuth.repository.EmailAuthRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{
    private static final String MAIL_SUBJECT = "[Butter] 이메일 인증 코드를 발송해 드립니다.";
    private static final long EXPIRE_MINUTE = 30;
    private static final int RANDOM_CODE_LENGTH = 6;
    private static final int ALPHABET_PROBABILITY = 24;
    private static final int TOTAL_PROBABILITY = 36;

    private final JavaMailSender javaMailSender;
    private final EmailAuthRepository emailAuthRepository;

    @Override
    @Transactional
    @Scheduled(cron = "0 0 12 * * ?")// 인증 코드 만료
    public void deleteAfterExpireAuthCodes() {
        emailAuthRepository.deleteByExpireDateTimeBefore(LocalDateTime.now());
    }

    @Override
    @Async
    public CompletableFuture<EmailWithAuthCodeDTO> sendEmail(EmailDTO to) {
        String randomAuthCode = createRandomCode();
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(to.email());
            mimeMessageHelper.setSubject(MAIL_SUBJECT);
            mimeMessageHelper.setText(randomAuthCode);
            javaMailSender.send(mimeMessage);

            log.info("이메일 전송 성공 to={}, message={}", to.email(), randomAuthCode);
            emailAuthRepository.save(EmailAuth.builder()
                    .email(to.email())
                    .authCode(randomAuthCode)
                    .expireDateTime(LocalDateTime.now().plusMinutes(EXPIRE_MINUTE))
                    .build());
        } catch (MessagingException e) {
            throw new EmailSendFailureException();
        }

        return CompletableFuture.completedFuture(new EmailWithAuthCodeDTO(to.email(), randomAuthCode));
    }

    @Override
    @Transactional
    public boolean verifyEmail(String email, String authCode) {
        Optional<EmailAuth> authEmail = emailAuthRepository.findByEmailAndAuthCode(email, authCode);
        if (authEmail.isEmpty()) {
            throw new NoSuchElementException();
        }

        String code = authEmail.get().getVerifyCode();
        LocalDateTime expire = authEmail.get().getExpireDateTime();
        if (expire.isBefore(LocalDateTime.now())) {
            return false;
        }

        return authCode.equals(code);
    }

    private String createRandomCode() {
        String alphabet = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        String number = "1234567890";
        StringBuilder sb = new StringBuilder();

        for (int cnt = 0; cnt < RANDOM_CODE_LENGTH; cnt++) {
            int randomNumber = ThreadLocalRandom.current().nextInt(TOTAL_PROBABILITY);
            if (randomNumber < ALPHABET_PROBABILITY) {
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
