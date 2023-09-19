package com.chibbol.wtz.domain.job.dto;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserJobListDTO {
    private String gameCode;
    private Long userSeq;
    private boolean isAlive;

    public UserJobListDTO toUserJobListDTO(RoomUserJob roomUserJob) {
        this.gameCode = roomUserJob.getGameCode();
        this.userSeq = roomUserJob.getUserSeq();
        this.isAlive = roomUserJob.isAlive();

        return this;
    }
}
