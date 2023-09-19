package com.chibbol.wtz.domain.level.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 생성
public class UserLevelDTO {

    private Long user_seq;
    private int level;
    private Long exp;
}
