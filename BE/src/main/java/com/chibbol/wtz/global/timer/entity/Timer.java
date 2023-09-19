package com.chibbol.wtz.global.timer.entity;

import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Timer {
    private int remainingTime;
    private int turn;
    private String timerType;
    private LocalDateTime startAt;
    private Set<Long> timerEndUserSeqs;
    private Set<Long> timerDecreaseUserSeqs;

    @Builder
    public Timer(int remainingTime, int turn, String timerType, LocalDateTime startAt) {
        this.remainingTime = remainingTime;
        this.turn = turn;
        this.timerType = timerType;
        this.startAt = startAt;
        this.timerEndUserSeqs = new HashSet<>();
        this.timerDecreaseUserSeqs = new HashSet<>();
    }

    public Timer update(Timer timer) {
        if(timer.remainingTime != 0)
            this.remainingTime = timer.remainingTime;
        if(timer.turn != 0)
            this.turn = timer.turn;
        if(timer.timerType != null)
            this.timerType = timer.timerType;
        if(timer.startAt != null)
            this.startAt = timer.startAt;
        this.timerEndUserSeqs = new HashSet<>();
        this.timerDecreaseUserSeqs = new HashSet<>();
        return this;
    }
}
