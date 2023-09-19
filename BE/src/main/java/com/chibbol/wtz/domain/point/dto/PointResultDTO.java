package com.chibbol.wtz.domain.point.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointResultDTO {
    private Long userSeq;
    private int currentPoint;
    private int pointValue;
}
