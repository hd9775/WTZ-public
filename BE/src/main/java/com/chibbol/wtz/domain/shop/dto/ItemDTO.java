package com.chibbol.wtz.domain.shop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Base64;

@Getter
@Setter
@NoArgsConstructor
public class ItemDTO implements Serializable {
    private Long itemSeq;
    private int price;
    private String image;
    private boolean isSold;

    @Builder
    public ItemDTO(Long itemSeq, int price, byte[] image, boolean isSold) {
        this.itemSeq = itemSeq;
        this.price = price;
        this.image = Base64.getEncoder().encodeToString(image);
        this.isSold = isSold;
    }

    public String toString() {
        return "ItemDTO{" +
                "itemSeq=" + itemSeq +
                ", price=" + price +
                ", isSold=" + isSold +
                '}';
    }
}
