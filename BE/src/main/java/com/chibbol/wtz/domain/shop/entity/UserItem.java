package com.chibbol.wtz.domain.shop.entity;

import com.chibbol.wtz.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userItemSeq;

    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne
    @JoinColumn(name = "item_seq")
    private Item item;

    @Column
    @ColumnDefault("false")
    private boolean equipped;

    @Column
    private LocalDateTime buyAt;

    @Builder
    public UserItem(User user, Item item) {
        this.user = user;
        this.item = item;
        this.buyAt = LocalDateTime.now();
    }

    public UserItem equip() {
        this.equipped = true;
        return this;
    }

    public UserItem unequip() {
        this.equipped = false;
        return this;
    }
}
