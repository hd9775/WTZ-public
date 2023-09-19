package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class TimerDTO {
    String type;
    int time;

    @Builder
    public TimerDTO(String type, int time) {
        this.type = type;
        this.time = time;
    }
}

