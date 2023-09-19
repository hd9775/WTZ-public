package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BlackOutDataDTO {
    private Long userSeq;
    private int startSecond;

    @Builder
    public BlackOutDataDTO(Long userSeq, int startSecond) {
        this.userSeq = userSeq;
        this.startSecond = startSecond;
    }
}
