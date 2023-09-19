package com.chibbol.wtz.domain.user.entity;


//import com.chibbol.wtz.domain.BaseTimeEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "User")
@Table(name = "User")
@Getter
@NoArgsConstructor
@DynamicInsert
public class User {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    private String refreshToken;

    @Column
    @ColumnDefault("false")
    private Boolean isDeleted;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updateAt;


    @Builder
    public User(String email, String password, String nickname, Role role, Boolean isDeleted, String refreshToken) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
        this.isDeleted = isDeleted;
        this.refreshToken = refreshToken;
        this.createdAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }

    public User update(User user) {
        if (user.email != null)
            this.email = user.email;
        if (user.nickname != null)
            this.nickname = user.nickname;
        if (user.password != null)
            this.password = user.password;
        if (user.isDeleted != null)
            this.isDeleted = user.isDeleted;
        if(user.role != null)
            this.role = user.role;
        if (user.refreshToken != null)
            this.refreshToken = user.refreshToken;
        this.updateAt = LocalDateTime.now();
        return this;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @Override
    public String toString() {
        return "User{" +
                "userSeq=" + userSeq +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nickname='" + nickname + '\'' +
                ", role=" + role +
                ", refreshToken='" + refreshToken + '\'' +
                ", isDeleted=" + isDeleted +
                ", createdAt=" + createdAt +
                ", updateAt=" + updateAt +
                '}';
    }
}
