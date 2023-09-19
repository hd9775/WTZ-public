package com.chibbol.wtz.domain.vote.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class VoteResultDTO {
    private Long userSeq;
    private int cnt;

    @Builder
    public VoteResultDTO(Long userSeq, int cnt) {
        this.userSeq = userSeq;
        this.cnt = cnt;
    }

    public void addCnt() {
        this.cnt++;
    }
}
