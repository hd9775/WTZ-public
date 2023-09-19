package com.chibbol.wtz.domain.gamechat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SendMessageDTO {
    Long sender;
    String nickname;
    String message;

    @Builder
    public SendMessageDTO(Long sender, String nickname, String message){
        this.sender = sender;
        this.nickname = nickname;
        this.message = message;
    }
}
