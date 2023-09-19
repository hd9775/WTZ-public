package com.chibbol.wtz.domain.job.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class ResultDTO {
    private String roomId;
    private boolean result;

    @Builder
    public ResultDTO(String roomId, boolean result) {
        this.roomId = roomId;
        this.result = result;
    }
}
