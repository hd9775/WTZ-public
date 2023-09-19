package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.dto.JobSettingDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
@RequiredArgsConstructor
public class RoomJobSettingRedisRepository {

    private static final String KEY_PREFIX = "roomExcludeJobSetting";
    private final RedisTemplate<String, Long> redisTemplate;
    private final GameRepository gameRepository;

    public Map<Object, Object> findRoomJobSettingByRoomCode(String roomCode) {
        String key = generateKey(roomCode);
        Map<Object, Object> excludeJobSettings = redisTemplate.opsForHash().entries(key);
        return excludeJobSettings;
    }

    public List<Long> findExcludeJobSettingByRoomCode(String roomCode) {
        Map<Object, Object> jobSettings = findRoomJobSettingByRoomCode(roomCode);
        log.info("jobSettings : ", jobSettings.toString());
        List<Long> excludeJob = new ArrayList<>();
        for(Object l : jobSettings.keySet()) {
            if(!(boolean)jobSettings.get(l)) {
                excludeJob.add(Long.parseLong(l.toString()));
            }
        }
        log.info("excludeJob : ", excludeJob.toString());
        return excludeJob;
    }

    public List<Long> findExcludeJobSeqByGameCode(String gameCode) {
        String roomCode = gameRepository.findRoomByGameCode(gameCode).getRoomCode();

        Map<Object, Object> jobSettings = findRoomJobSettingByRoomCode(roomCode);
        log.info("jobSettings : ", jobSettings.toString());
        List<Long> excludeJob = new ArrayList<>();
        for(Object l : jobSettings.keySet()) {
            if(!(boolean)jobSettings.get(l)) {
                excludeJob.add(Long.parseLong(l.toString()));
            }
        }
        log.info("excludeJob : ", excludeJob.toString());
        return excludeJob;
    }

    public void deleteJobSetting(String code) {
        String key = generateKey(code);
        redisTemplate.delete(key);
    }

    public void setExcludeJobSeq(String gameCode, Long excludeJobSeq, boolean exclude) {
        String key = generateKey(gameCode);
        redisTemplate.opsForHash().put(key, excludeJobSeq, exclude);
    }

    public void setAllJobSetting(String code, JobSettingDTO jobSettingDTOs) {
        String key = generateKey(code);
        for (String field : jobSettingDTOs.getJobSetting().keySet()) {
            redisTemplate.opsForHash().put(key, field, jobSettingDTOs.getJobSetting().get(field));
        }
    }

    private String generateKey(String gameCode) {
        return KEY_PREFIX + ":game:" + gameCode;
    }
}
