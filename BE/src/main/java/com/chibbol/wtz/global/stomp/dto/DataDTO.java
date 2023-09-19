package com.chibbol.wtz.global.stomp.dto;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class DataDTO {
    private String type;
    private String code;
    private Object data;

    @Builder
    public DataDTO(String type, String code, Object data){
        this.type = type;
        this.code = code;
        this.data = data;
    }

}
