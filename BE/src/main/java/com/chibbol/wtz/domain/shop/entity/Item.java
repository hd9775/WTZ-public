package com.chibbol.wtz.domain.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long itemSeq;

    @Column
    private int price;

    @Column
    private String image;

    @Column
    private String gif;

    @Column
    private String type;

    @Builder
    public Item(int price, String image) {
        this.price = price;
        this.image = image;
    }

    public void update(int price, String image) {
        this.price = price;
        this.image = image;
    }
}
