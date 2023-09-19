package com.chibbol.wtz.domain.level.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class UserLevelDataDTO {

    int level;
    Long exp;
    Long maxExp;
}
