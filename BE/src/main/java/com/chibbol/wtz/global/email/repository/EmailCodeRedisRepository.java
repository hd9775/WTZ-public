package com.chibbol.wtz.global.email.repository;

import com.chibbol.wtz.global.email.entity.VerificationCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.io.IOException;

@Repository
public class EmailCodeRedisRepository {
    private static final String KEY_PREFIX = "emailVerificationCode:";

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public EmailCodeRedisRepository(RedisTemplate<String, String> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public VerificationCode findByEmail(String email) {
        String key = generateKey(email);
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();
        String savedJsonData = valueOps.get(key);
        if (savedJsonData != null) {
            try {
                return objectMapper.readValue(savedJsonData, VerificationCode.class);
            } catch (IOException e) {
                // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
            }
        }
        return null; // 데이터를 찾지 못하거나 역직렬화할 수 없는 경우 null 반환
    }

    public void save(VerificationCode verificationCode) {
        String email = verificationCode.getEmail();
        String key = generateKey(email);
        try {
            String jsonData = objectMapper.writeValueAsString(verificationCode);
            redisTemplate.opsForValue().set(key, jsonData);
        } catch (JsonProcessingException e) {
            // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
        }
    }

    public void deleteByEmail(String email) {
        String key = generateKey(email);
        redisTemplate.delete(key);
    }

    private String generateKey(String email) {
        return KEY_PREFIX + email;
    }
}
