package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.dto.CreateRoomDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.service.RoomEnterInfoRedisService;
import com.chibbol.wtz.domain.room.service.RoomService;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rooms")
@Log4j2
public class RoomController {
    private final RoomService roomService;
    private final UserService userService;
    private final RoomEnterInfoRedisService roomEnterInfoRedisService;

    @Operation(summary = "[방 개설]")
    @PostMapping()
    public ResponseEntity<String> createRoom(@RequestBody CreateRoomDTO createRoomDTO){
        log.info("# 채팅방 개설 : " + createRoomDTO.getTitle());

        roomService.checkValidTitle(createRoomDTO.getTitle()); // title 유효성 검사
        Room room = roomService.createChatRoomDTO(createRoomDTO);

        return ResponseEntity.ok(room.getRoomCode());
    }

    @Operation(summary = "[방 목록 조회]")
    @GetMapping()
    public ResponseEntity<?> getAllRooms(){
        log.info("# 방 리스트");
        return ResponseEntity.ok(roomService.findAllRooms());
    }

    @Operation(summary = "[방 입장 가능]")
    @GetMapping(value = "/{roomCode}")
    public ResponseEntity<Room> getRoom(@PathVariable(value = "roomCode") String roomCode){
        log.info("# 방 입장, roomCode : " + roomCode);
        log.info("11111111");
        roomService.validateRoom(roomCode);
        log.info("22222222");
//        if (roomService.isGameInProgress(roomCode)) {
//            return ResponseEntity.status(403).build();
//        }
        log.info("33333333");
        if (roomEnterInfoRedisService.getUsingSeats(roomCode) >= roomEnterInfoRedisService.getMaxUserNum(roomCode)) {
            return ResponseEntity.status(403).build();
        }
        log.info("44444444");
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "[방 삭제]")
    @DeleteMapping(value = "/{roomCode}")
    public ResponseEntity<?> deleteRoom(@PathVariable(value = "roomCode") String roomCode) {
        log.info("# 방 삭제, roomCode : " + roomCode);

        User user = userService.getLoginUser();
        User owner = roomService.findRoomByCode(roomCode).getOwner();

        // 방장이 맞으면
        if (user.getUserSeq() == owner.getUserSeq()) {
            roomService.deleteRoom(roomCode);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(402).build();
    }
}
