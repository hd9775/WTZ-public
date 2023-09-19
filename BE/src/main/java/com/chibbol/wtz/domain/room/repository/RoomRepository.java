package com.chibbol.wtz.domain.room.repository;

import com.chibbol.wtz.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<List<Room>> findAllByEndAtIsNullOrderByStartAt();

    Optional<Room> findByRoomCode(String roomCode);

    Room findByRoomSeq(Long roomSeq);
}
