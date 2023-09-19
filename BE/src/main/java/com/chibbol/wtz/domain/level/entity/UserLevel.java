package com.chibbol.wtz.domain.level.entity;

import com.chibbol.wtz.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor // 기본 생성자 자동 추가
public class UserLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long levelSeq;

    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false, unique = true)
    private User user;

    @Column
    @ColumnDefault("1")
    private int level;

    @Column
    @ColumnDefault("0")
    private Long exp;

    @Builder
    public UserLevel(User user, int level, Long exp){
        this.user = user;
        this.level = level;
        this.exp = exp;
    }

    public UserLevel update(UserLevel userLevel) {
        if(userLevel.getLevel() != 0){
            this.level = userLevel.getLevel();
        }
        if(userLevel.getExp() != 0){
            this.exp = userLevel.getExp();
        }
        return this;
    }
}
