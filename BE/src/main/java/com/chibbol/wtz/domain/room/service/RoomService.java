package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.dto.CreateRoomDTO;
import com.chibbol.wtz.domain.room.dto.CurrentSeatsDTO;
import com.chibbol.wtz.domain.room.dto.RoomListDTO;
import com.chibbol.wtz.domain.room.entity.Game;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.exception.RoomNotFoundException;
import com.chibbol.wtz.domain.room.exception.TitleValidationException;
import com.chibbol.wtz.domain.room.repository.GameRepository;
import com.chibbol.wtz.domain.room.repository.RoomEnterInfoRedisRepository;
import com.chibbol.wtz.domain.room.repository.RoomJobSettingRedisRepository;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.exception.UserNotFoundException;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;
    private final RoomEnterInfoRedisRepository roomEnterInfoRedisRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public List<RoomListDTO> findAllRooms() {
        // 채팅방 생성 순서 최근순으로 (채팅방이 존재하는 경우: endAt이 null이 아닌 경우)
        List<Room> roomList = roomRepository.findAllByEndAtIsNullOrderByStartAt().orElse(new ArrayList<>());
        List<RoomListDTO> list = new ArrayList<>();
        for (Room room : roomList) {
//            if (room.isGameInProgress()) {
//                continue;
//            }
            list.add(RoomListDTO.builder()
                            .curUserNum(roomEnterInfoRedisRepository.getUsingSeats(room.getRoomCode()))
                            .maxUserNum(room.getMaxUserNum())
//                            .gameInProgress(room.isGameInProgress())
                            .title(room.getTitle())
                            .roomCode(room.getRoomCode())
                        .build()
            );
        }
        Collections.reverse(list);
        return list;
    }

    public void validateRoom(String roomCode) {
        Room room = roomRepository.findByRoomCode(roomCode).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));
    }

    public Room createChatRoomDTO(CreateRoomDTO createRoomDTO) {

        // 코드 생성
        String roomCode = UUID.randomUUID().toString().replaceAll("-", "").substring(0,6);
        createRoomDTO.setRoomCode(roomCode);

        // 방장 정보 확인
        User user = userService.getLoginUser();
        if(user == null){
            throw new UserNotFoundException("사용자를 찾을 수 없습니다");
        }
        createRoomDTO.setOwnerSeq(user.getUserSeq());

        // db에 room 정보 저장
        roomRepository.save(Room.builder()
                .roomCode(roomCode)
                .title(createRoomDTO.getTitle())
                .maxUserNum(createRoomDTO.getMaxUserNum())
                .owner(user)
                .build());
        Room room = roomRepository.findByRoomCode(roomCode).orElse(null);

        // redis에 저장
//        HashOperations<String, Object, Object> hashOperations = stompRedisTemplate.opsForHash();
//        String hashKey = "ROOM";
//        hashOperations.put(hashKey, roomCode, createRoomDTO);


        // redis에 jobSetting 저장
        // roomJobSettingRedisRepository.
        for(String key : createRoomDTO.getJobSetting().keySet()){
            roomJobSettingRedisRepository.setExcludeJobSeq(roomCode, Long.parseLong(key), createRoomDTO.getJobSetting().get(key));
        }

        // CurrentSeatsDTO redis에 저장
        roomEnterInfoRedisRepository.createCurrentSeat(roomCode, createRoomDTO.getMaxUserNum());

        return room;
    }


    public Room findRoomByCode(String code) {
        Room room = roomRepository.findByRoomCode(code).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));
        return room;
    }

    public String generateGameCode(String roomCode) {
        // 코드 생성
        String gameCode = UUID.randomUUID().toString().replaceAll("-", "").substring(0,10);
        Room room = roomRepository.findByRoomCode(roomCode).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));
        gameRepository.save(Game.builder().gameCode(gameCode).room(room).build());
        return gameCode;
    }

    public Long changeRoomOwner(String roomCode) {
        // 방장 바뀜
        Long newOwnerSeq = (long) -1;
        for (CurrentSeatsDTO currentSeatsDTO : roomEnterInfoRedisRepository.getUserEnterInfo(roomCode)) {
            if (currentSeatsDTO.getState() == 1) {
                newOwnerSeq = currentSeatsDTO.getUserSeq();
                Room room = roomRepository.findByRoomCode(roomCode).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));
                User user = userRepository.findByUserSeq(newOwnerSeq);
                room.update(Room.builder().owner(user).build());
                roomRepository.save(room);
                break;
            }
        }
        return newOwnerSeq;
    }

    public void deleteRoom(String roomCode) {
        // 종료시간 설정
        Room room = roomRepository.findByRoomCode(roomCode).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));
        room.update(Room.builder().endAt(LocalDateTime.now()).build());
        roomRepository.save(room);
        // redis에서 room 삭제
        roomJobSettingRedisRepository.deleteJobSetting(roomCode);
        roomEnterInfoRedisRepository.deleteCurrentSeat(roomCode);
    }

    public void updateTitle(String roomCode, String title) {
        Room room = roomRepository.findByRoomCode(roomCode).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));
        room.update(Room.builder().title(title).build());
        roomRepository.save(room);
    }

    public void updateMaxUserNum(String roomCode, List<CurrentSeatsDTO> currentSeatsDTOList) {
        int usableSeats = 0;
        for (CurrentSeatsDTO currentSeatsDTO : currentSeatsDTOList) {
            if (currentSeatsDTO.getState() == 0 || currentSeatsDTO.getState() == 1) {
                usableSeats++;
            }
        }
        Room room = roomRepository.findByRoomCode(roomCode).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));
        room.update(Room.builder().maxUserNum(usableSeats).build());
        roomRepository.save(room);


    }


    public void checkValidTitle(String title){
        // title 글자 수 제한 (1~15이하)
        if(title.length() < 1 || title.length() > 15){
            throw new TitleValidationException("방 제목은 1~15자 입니다.");
        }
    }

//    public void startGame(String roomCode) {
//        Room room = roomRepository.findByRoomCode(roomCode).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));;
//        room.update(Room.builder().gameInProgress(true).build());
//        roomRepository.save(room);
//    }

//    public void checkGameInProgress(String roomCode) {
//        Room room = roomRepository.findByRoomCode(roomCode).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));
//        if (room.isGameInProgress()) {
//            throw new GameInProgressException("게임이 진행중인 방입니다!");
//        }
//    }

//    public void checkAllBackToRoom(Room room) {
//        String roomCode = room.getRoomCode();
//        // curSeats에서 현재 유저 정보 추출
//        List<CurrentSeatsDTO> currentSeatsDTOs = roomEnterInfoRedisRepository.getUserEnterInfo(roomCode);
//        List<Long> enterUsers = currentSeatsDTOs.stream().map(CurrentSeatsDTO::getUserSeq).collect(Collectors.toList());
//        // todo : 전부 다 있는지 확인하고, 있으면 삭제 하고, gameinprogress true 처리
//        // 복귀한 유저 정보 추출
//        Set<String> backUsers = roomEnterInfoRedisRepository.getBackUsers(roomCode);
//        // curSeats 유저정보들이 복귀한 유저 정보 안에 전부 다 있는지 체크
//        Set<Long> checkBackUsers = new HashSet<>();
//        for (String user : backUsers) {
//            checkBackUsers.add(Long.parseLong(user));
//            log.info("curSeats안에 있는 유저 : " + user);
//        }
//        boolean gameInProgress = false;
//        for (Long user : enterUsers) {
//            if (!checkBackUsers.contains(user)) {
//                log.info("enterUsers안에 있지만, curSeats 안에 없는 유저 : " + user);
//                gameInProgress = true;
//                break;
//            }
//            log.info("enterUsers안과 curSeats 안에 있는 유저 : " + user);
//        }
//        room.update(Room.builder().gameInProgress(gameInProgress).build());
//        roomRepository.save(room);
//        roomEnterInfoRedisRepository.deleteBackUsers(roomCode);
    }

//    public void addBackUser(String roomCode, Long userSeq) {
//        // 방으로 복귀한 유저 저장
//        roomEnterInfoRedisRepository.addBackUsers(roomCode, userSeq);
//    }

//    public boolean isGameInProgress(String roomCode) {
//        log.info("#----------------------isGameInProgress----------------------");
//        Room room = roomRepository.findByRoomCode(roomCode).orElseThrow(() -> new RoomNotFoundException("방을 찾을 수 없습니다."));
//        if (room.isGameInProgress()) {
//            log.info("게임 진행중");
//            return true;
////            throw new GameInProgressException("현재 게임이 진행중인 방입니다!");
//        }
//        log.info("게임 진행중 아님");
//        return false;
//    }
//}


