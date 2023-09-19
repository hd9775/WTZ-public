package com.chibbol.wtz.global.security.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class AccessTokenDTO {
    private Long userSeq;
    private String nickname;
    private String accessToken;

    @Builder
    public AccessTokenDTO(Long userSeq, String nickname, String accessToken) {
        this.userSeq = userSeq;
        this.nickname = nickname;
        this.accessToken = accessToken;
    }
}
