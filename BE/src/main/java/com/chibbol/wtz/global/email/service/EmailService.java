package com.chibbol.wtz.global.email.service;

import com.chibbol.wtz.global.email.entity.VerificationCode;
import com.chibbol.wtz.global.email.exception.EmailCodeNotMatchException;
import com.chibbol.wtz.global.email.exception.EmailSendingFailedException;
import com.chibbol.wtz.global.email.exception.ResendTimeNotExpiredException;
import com.chibbol.wtz.global.email.message.EmailMessage;
import com.chibbol.wtz.global.email.repository.EmailCodeRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final EmailMessage emailMessage;
    private final EmailCodeRedisRepository emailCodeRedisRepository;

    private final int VERIFICATION_CODE_EXPIRE_TIME = 60 * 5; // 5분

    public void sendEmailCode(String email, String type) {
        if(!sendVerificationEmail(email, type)) {
            throw new EmailSendingFailedException("이메일 전송에 실패했습니다.");
        }
    }

    // 인증번호 확인
    public void checkEmailVerificationCode(String email, String code) {
        if(!isVerificationCodeValid(email, code)) {
            throw new EmailCodeNotMatchException("이메일 인증번호가 일치하지 않습니다.");
        }
    }

    // 인증번호 삭제
    public void removeEmailVerificationCode(String email) {
        emailCodeRedisRepository.deleteByEmail(email);
    }

    // 인증번호 저장
    public void storeVerificationCode(String email, String code) {
        emailCodeRedisRepository.save(VerificationCode.builder()
                .email(email)
                .code(code)
                .expiration(VERIFICATION_CODE_EXPIRE_TIME)
                .build());
    }

    // 인증번호가 유효한지
    public boolean isVerificationCodeValid(String email, String code) {
        VerificationCode verificationCode = emailCodeRedisRepository.findByEmail(email);

        if(verificationCode == null) {
            throw new EmailCodeNotMatchException("이메일 인증번호가 만료되었습니다.");
        }

        if(!verificationCode.getCode().equals(code)) {
            throw new EmailCodeNotMatchException("이메일 인증번호가 일치하지 않습니다.");
        } else {
            return true;
        }
    }

    // 재전송 시간 확인
    public boolean isResendTimeNotExpired(LocalDateTime sendTime) {
        LocalDateTime currentTime = LocalDateTime.now();
        Duration timeSinceLastResend = Duration.between(sendTime, currentTime);
        Duration resendInterval = Duration.ofMinutes(1);
        return timeSinceLastResend.compareTo(resendInterval) < 0;
    }

    public boolean sendVerificationEmail(String email, String type) {
        VerificationCode verificationCode = emailCodeRedisRepository.findByEmail(email);

        if (verificationCode != null && isResendTimeNotExpired(verificationCode.getSendTime())) {
            throw new ResendTimeNotExpiredException("Resend time has not expired yet for email: " + email + "\nexpired time: " + verificationCode.getSendTime());
        }

        String code = generateCode();
        String subject = "[Who's The ZARA] 인증코드";
        String info = generateEmailMessage(type, code);

        boolean messageSend = sendMessage(email, subject, info);

        if (messageSend) {
            storeVerificationCode(email, code);
            logEmailInfo(email, code);
        }

        return messageSend;
    }

    private String generateEmailMessage(String type, String code) {
        if ("register".equals(type)) {
            return emailMessage.registerEmailMessage(code);
        } else if ("passwordChange".equals(type)) {
            return emailMessage.passwordChangeEmailMessage(code);
        }

        return null;
    }

    private boolean sendMessage(String email, String subject, String info) {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setSubject(subject);
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(email, "", "UTF-8"));
            message.setText(info, "UTF-8", "html");

            javaMailSender.send(message);
            return true;
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            return false;
        }
    }

    private String generateCode() {
        StringBuilder key = new StringBuilder();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤, rnd 값에 따라서 아래 switch 문이 실행됨

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    // a~z (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    // A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }

    private void logEmailInfo(String email, String code) {
        log.info("==================================================");
        log.info("SEND EMAIL VERIFICATION CODE");
        log.info("EMAIL : " + email);
        log.info("CODE  : " + code);
        log.info("==================================================");
    }
}
