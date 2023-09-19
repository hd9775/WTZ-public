package com.chibbol.wtz.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailDTO {
    private String email;

    @Override
    public String toString() {
        return "EmailDto{" +
                "email='" + email + '\'' +
                '}';
    }
}
