package com.chibbol.wtz.global.email.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@RedisHash("emailVerificationCode")
public class VerificationCode {
    @Id
    private String email;
    private String code;    // 인증번호
    private LocalDateTime sendTime;   // 젼송시간

    @TimeToLive
    private long expiration; // 만료 시간(초 단위)을 저장하는 필드

    @Builder
    public VerificationCode(String email, String code, long expiration) {
        this.email = email;
        this.code = code;
        this.sendTime = LocalDateTime.now();
        this.expiration = expiration;
    }

    // 키가 만료되었는지 확인하는 메서드
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(sendTime.plusSeconds(expiration));
    }
}
