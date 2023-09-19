package com.chibbol.wtz.domain.vote.repository;

import com.chibbol.wtz.domain.vote.entity.Vote;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Repository
@AllArgsConstructor
public class VoteRedisRepository {
    private static final String KEY_PREFIX = "Vote";

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public List<Vote> findAllByGameCode(String gameCode) {
        String pattern = generateKey(gameCode, -1);
        Set<String> keys = redisTemplate.keys(pattern);
        List<Vote> resultList = new ArrayList<>();

        if(keys != null) {
            for (String key : keys) {
                List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
                resultList.addAll(convertJsonDataListToVoteList(jsonDataList));
            }
        }
        return resultList;
    }

    public List<Vote> findAllByGameCodeAndTurn(String gameCode, int turn) {
        String key = generateKey(gameCode, turn);
        List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
        return convertJsonDataListToVoteList(jsonDataList);
    }

    public void deleteAllByGameCode(String gameCode) {
        Set<String> keys = redisTemplate.keys(generateKey(gameCode, -1));
        if(keys != null) {
            redisTemplate.delete(keys);
        }
    }

    public void save(Vote vote) {
        String gameCode = vote.getGameCode();
        int turn = vote.getTurn();
        String key = generateKey(gameCode, turn);
        String userSeqField = vote.getUserSeq().toString();

        try {
            String jsonData = objectMapper.writeValueAsString(vote);
            redisTemplate.opsForHash().put(key, userSeqField, jsonData);
        } catch (JsonProcessingException e) {
            // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
            e.printStackTrace();
        }
    }

    private List<Vote> convertJsonDataListToVoteList(List<Object> jsonDataList) {
        List<Vote> resultList = new ArrayList<>();
        for (Object jsonData : jsonDataList) {
            if (jsonData instanceof String) {
                try {
                    Vote vote = objectMapper.readValue((String) jsonData, Vote.class);
                    resultList.add(vote);
                } catch (IOException e) {
                    // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
                    e.printStackTrace();
                }
            }
        }
        return resultList;
    }

    private String generateKey(String gameCode, int turn) {
        if(turn == -1L) {
            return KEY_PREFIX + ":game:" + gameCode + ":turn:*";
        }
        return KEY_PREFIX + ":game:" + gameCode + ":turn:" + turn;
    }
}
