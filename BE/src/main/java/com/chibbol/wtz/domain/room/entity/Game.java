package com.chibbol.wtz.domain.room.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameSeq;

    @Column
    private String gameCode;

    @JoinColumn(nullable = false, name = "room_seq")
    @ManyToOne
    private Room room;

    @Column
    private LocalDateTime startAt;

    @Column
    private LocalDateTime endAt;

    @Builder
    public Game(String gameCode, Room room) {
        this.gameCode = gameCode;
        this.room = room;
        startAt = LocalDateTime.now();
    }

    public Game endGame() {
        endAt = LocalDateTime.now();
        return this;
    }
}
