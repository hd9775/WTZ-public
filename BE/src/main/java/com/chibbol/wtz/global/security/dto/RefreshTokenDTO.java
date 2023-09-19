package com.chibbol.wtz.global.security.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class RefreshTokenDTO {
    private Long userSeq;
    private String refreshToken;

    @Builder
    public RefreshTokenDTO(Long userSeq, String refreshToken) {
        this.userSeq = userSeq;
        this.refreshToken = refreshToken;
    }
}
