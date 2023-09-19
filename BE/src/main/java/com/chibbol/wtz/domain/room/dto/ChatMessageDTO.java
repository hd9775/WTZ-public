package com.chibbol.wtz.domain.room.dto;

import lombok.*;

@ToString
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {
    private Long senderSeq;
    private String nickname;
    private String message;
}
