package com.chibbol.wtz.domain.level.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LevelResultDTO {
    private Long userSeq;
    private int level;
    private Long maxExp;
    private Long currentExp;
    private Long expValue;
    private boolean levelUp;
}
