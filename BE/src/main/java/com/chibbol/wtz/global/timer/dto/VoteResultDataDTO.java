package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VoteResultDataDTO {
    private Long userSeq;
    private Long politicianSeq;

    @Builder
    public VoteResultDataDTO(Long userSeq, Long politicianSeq) {
        this.userSeq = userSeq;
        this.politicianSeq = politicianSeq;
    }
}
