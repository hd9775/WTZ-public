package com.chibbol.wtz.domain.user.dto;

import com.chibbol.wtz.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserUpdateDTO {
    private long id;
    private String nickname;

    public User toEntity() {
        return User.builder()
                .nickname(nickname)
                .build();
    }
}
