package com.chibbol.wtz.domain.room.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomListDTO {
    private String roomCode;
    private String title;
    private int curUserNum;
    private int maxUserNum;
    private boolean gameInProgress;
}
