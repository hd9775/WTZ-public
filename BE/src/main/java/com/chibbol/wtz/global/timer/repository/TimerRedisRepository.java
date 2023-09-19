package com.chibbol.wtz.global.timer.repository;

import com.chibbol.wtz.global.timer.entity.Timer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Repository
@RequiredArgsConstructor
public class TimerRedisRepository {
    private static final String KEY_PREFIX = "GameTimer:";
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    // 타이머 정보 업데이트
    public void updateTimer(String gameCode, Timer timer) {
        try {
            String jsonData = objectMapper.writeValueAsString(timer);
            redisTemplate.opsForValue().set(generateKey(gameCode), jsonData);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }


    // 타이머 정보 조회
    public Timer getGameTimerInfo(String gameCode) {
        String key = generateKey(gameCode);
        Object jsonData = redisTemplate.opsForValue().get(key);
        if (jsonData == null) {
            return null;
        }
        return convertJsonDataToTimer(jsonData);
    }

    public List<String> getAllGameCode() {
        List<String> gameCodeList = new ArrayList<>();

        // Redis에서 방 정보의 키 값을 조회하여 KEY_PREFIX로 시작하는 모든 키를 가져옴
        List<String> gameKeys = new ArrayList<>(Objects.requireNonNull(redisTemplate.keys(KEY_PREFIX + "game:*")));

        for (String gameKey : gameKeys) {
            String[] splitKey = gameKey.split(":");
            if (splitKey.length >= 2) {
                String gameCode = splitKey[2];
                gameCodeList.add(gameCode);
            }
        }

        return gameCodeList;
    }

    // 초기 상태로 타이머 생성
    public void createGameTimer(String gameCode) {
        if(getGameTimerInfo(gameCode) != null) {
            return;
        }

        Timer timer = Timer.builder()
                .timerType("NONE")
                .remainingTime(0)
                .turn(0)
                .startAt(LocalDateTime.now())
                .build();
        String key = generateKey(gameCode);

        try {
            String jsonData = objectMapper.writeValueAsString(timer);
            redisTemplate.opsForValue().set(key, jsonData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    // 타이머 시간 5초 감소
    public boolean decreaseGameTimer(String gameCode, int decreaseTime) {
        Timer timer = getGameTimerInfo(gameCode);
        timer.setRemainingTime(timer.getRemainingTime() - decreaseTime);
        updateTimer(gameCode, timer);

        return false;
    }

    // 타이머 삭제
    public void deleteGameTimer(String gameCode) {
        redisTemplate.delete(generateKey(gameCode));
    }

    public String generateKey(String gameCode) {
        return KEY_PREFIX + "game:" + gameCode;
    }

    private Timer convertJsonDataToTimer(Object jsonData) {
        if(jsonData instanceof String) {
            try {
                Timer timer = objectMapper.readValue((String) jsonData, Timer.class);
                return objectMapper.readValue((String) jsonData, Timer.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    private List<Timer> convertJsonDataToTimerList(List<Object> jsonDatas) {
        List<Timer> timerList = new ArrayList<>();
        for (Object jsonData : jsonDatas) {
            Timer timer = convertJsonDataToTimer(jsonData);
            if(timer != null) {
                timerList.add(timer);
            }
        }
        return timerList;
    }
}
