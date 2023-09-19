package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.CurrentSeatsDTO;
import com.chibbol.wtz.domain.room.dto.CurrentSeatsDTOList;
import com.chibbol.wtz.domain.room.exception.SeatNotFoundException;
import com.chibbol.wtz.domain.room.repository.RoomEnterInfoRedisRepository;
import com.chibbol.wtz.domain.shop.service.ShopService;
import com.chibbol.wtz.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoomEnterInfoRedisService {
    private final RoomEnterInfoRedisRepository roomEnterInfoRedisRepository;
    private final ShopService shopService;

    public void createCurrentSeat(String roomCode, int maxUserNum) {
        roomEnterInfoRedisRepository.createCurrentSeat(roomCode, maxUserNum);
    }

    public CurrentSeatsDTO enterUser(String roomCode, User user) {
        CurrentSeatsDTO currentSeatsDTO = roomEnterInfoRedisRepository.enterUser(roomCode, user, shopService.getEquippedItemsByUserSeq(user.getUserSeq()));
     
        if (currentSeatsDTO == null) {
            throw new SeatNotFoundException("빈 자리가 없습니다!");
        }

        log.info(currentSeatsDTO.toString());
        return currentSeatsDTO;
    }

    public void setUserExitInfo(String roomCode, Long userSeq) {
        roomEnterInfoRedisRepository.setUserExitInfo(roomCode, userSeq);
    }

    public List<CurrentSeatsDTO> updateCurrentSeatsDTO(String roomCode, CurrentSeatsDTOList currentSeatsDTOList) {
        return roomEnterInfoRedisRepository.updateCurrentSeat(roomCode, currentSeatsDTOList);
    }

    public boolean increaseUserCount(String roomCode) {
        return roomEnterInfoRedisRepository.increaseUserCount(roomCode);
    }

    public boolean decreaseUserCount(String roomCode) {
        return roomEnterInfoRedisRepository.decreaseUserCount(roomCode);
    }

    public int getMaxUserNum(String roomCode) {
        return roomEnterInfoRedisRepository.getMaxUserNum(roomCode);
    }

    public List<CurrentSeatsDTO> getUserEnterInfo(String roomCode) {
        return roomEnterInfoRedisRepository.getUserEnterInfo(roomCode);
    }

    public int getUsingSeats(String roomCode) {
        return roomEnterInfoRedisRepository.getUsingSeats(roomCode);
    }

    public List<CurrentSeatsDTO> toCurrentSeatsDTO(List<Object> jsonList) {
        return roomEnterInfoRedisRepository.toCurrentSeatsDTO(jsonList);
    }

    public void setDefaultReady(String roomCode) {
        roomEnterInfoRedisRepository.setDefaultReady(roomCode);
    }
}
