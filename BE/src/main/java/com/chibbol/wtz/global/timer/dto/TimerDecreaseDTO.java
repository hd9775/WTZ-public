package com.chibbol.wtz.global.timer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TimerDecreaseDTO {
    private Long userSeq;
    private int decreaseTime;
}
