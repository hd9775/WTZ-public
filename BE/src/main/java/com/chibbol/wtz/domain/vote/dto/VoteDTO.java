package com.chibbol.wtz.domain.vote.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class VoteDTO {
    private String gameCode;
    private int turn;
    private Long userSeq;
    private Long targetUserSeq;

    @Builder
    public VoteDTO(String gameCode, int turn, Long userSeq, Long targetUserSeq) {
        this.gameCode = gameCode;
        this.turn = turn;
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
