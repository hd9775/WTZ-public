package com.chibbol.wtz.domain.level.repository;

import com.chibbol.wtz.domain.level.entity.UserExpValue;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Slf4j
@Repository
@RequiredArgsConstructor
public class UserExpValueRedisRepository {
    private static final String KEY_PREFIX = "UserExpValue:game:";

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public void save(String gameCode, Long userSeq, UserExpValue userExpValue) {
        String key = generateKey(gameCode);
        try {
            String jsonData = objectMapper.writeValueAsString(userExpValue);
            redisTemplate.opsForHash().put(key, userSeq.toString(), jsonData);

            // TTL 설정 (5분 = 300초)
            redisTemplate.expire(key, 300, TimeUnit.SECONDS);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public UserExpValue findByUserSeq(String gameCode, Long userSeq) {
        String key = generateKey(gameCode);
        String jsonData = (String) redisTemplate.opsForHash().get(key, userSeq.toString());
        if (jsonData != null) {
            try {
                return objectMapper.readValue(jsonData, UserExpValue.class);
            } catch (Exception e) {
                // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
            }
        }
        return null;
    }

    private String generateKey(String gameCode) {
        return KEY_PREFIX + gameCode;
    }
}
