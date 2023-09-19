package com.chibbol.wtz.domain.room.dto;

import com.chibbol.wtz.domain.shop.dto.EquippedItemsDTO;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CurrentSeatsDTO implements Comparable<CurrentSeatsDTO> {
    private int roomSeq;
    private int order;
    private long userSeq;
    private String nickname;
    private int state;
    private boolean ready;
    private EquippedItemsDTO equippedItems;

    @Builder
    public CurrentSeatsDTO (int roomSeq, int order, long userSeq, String nickname, int state, EquippedItemsDTO equippedItemsDTO) {
        this.roomSeq = roomSeq;
        this.order = order;
        this.userSeq = userSeq;
        this.nickname = nickname;
        this.state = state;
        this.ready = false;
        this.equippedItems = new EquippedItemsDTO();
    }

    @Override
    public int compareTo(CurrentSeatsDTO o) {
        return Integer.compare(this.order, o.order);
    }

    public CurrentSeatsDTO update(CurrentSeatsDTO currentSeatsDTO) {
            this.roomSeq = currentSeatsDTO.roomSeq;
            this.order = currentSeatsDTO.order;
            this.userSeq = currentSeatsDTO.userSeq;
            this.nickname = currentSeatsDTO.nickname;
            this.state = currentSeatsDTO.state;
            this.ready = currentSeatsDTO.ready;

        return this;
    }

    @Override
    public String toString() {
        return "CurrentSeatsDTO{" +
                "roomSeq=" + roomSeq +
                ", order=" + order +
                ", userSeq=" + userSeq +
                ", nickname='" + nickname +
                ", state=" + state +
                '}';
    }
}
