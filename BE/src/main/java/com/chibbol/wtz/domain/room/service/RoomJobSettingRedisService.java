package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.JobSettingDTO;
import com.chibbol.wtz.domain.room.repository.RoomJobSettingRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class RoomJobSettingRedisService {
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;

    public Map<Object, Object> findRoomJobSettingByRoomCode(String roomCode) {
        return roomJobSettingRedisRepository.findRoomJobSettingByRoomCode(roomCode);
    }

    public Map<Long, Boolean> findExcludeJobSettingByRoomCode(String roomCode) {
        List<Long> excludeJobSetting = roomJobSettingRedisRepository.findExcludeJobSettingByRoomCode(roomCode);
        Map<Long, Boolean> jobSetting = new HashMap<>();
        for (long i = 1; i <= 7; i++) {
            jobSetting.put(i, true);
        }
        for (Long ex : excludeJobSetting) {
            jobSetting.put(ex, false);
        }
        return jobSetting;
    }

    public void setExcludeJobSeq(String gameCode, Long excludeJobSeq, boolean exclude) {
        roomJobSettingRedisRepository.setExcludeJobSeq(gameCode, excludeJobSeq, exclude);
    }

    public void setAllJobSetting(String roomCode, JobSettingDTO jobSettingDTO) {
        roomJobSettingRedisRepository.setAllJobSetting(roomCode, jobSettingDTO);
    }
}
