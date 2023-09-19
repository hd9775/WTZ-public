package com.chibbol.wtz.domain.point.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserPointValue {
    private int lastPoint;
    private int currentPoint;

    @Builder
    public UserPointValue(int lastPoint, int currentPoint) {
        this.lastPoint = lastPoint;
        this.currentPoint = currentPoint;
    }
}
