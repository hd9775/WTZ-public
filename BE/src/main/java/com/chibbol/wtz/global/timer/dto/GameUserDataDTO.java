package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class GameUserDataDTO {
    private Long userSeq;
    private Long jobSeq;
    private String nickname;
    private Map<String, byte[]> equippedItems;
    private Map<String, byte[]> equippedItemsGif;

    @Builder
    public GameUserDataDTO(Long userSeq, Long jobSeq, String nickname) {
        this.userSeq = userSeq;
        this.jobSeq = jobSeq;
        this.nickname = nickname;
        this.equippedItems = new HashMap<>();
        this.equippedItemsGif = new HashMap<>();

        equippedItems.put("face", "".getBytes());
        equippedItems.put("cap", "".getBytes());
        equippedItems.put("clothing", "".getBytes());
        equippedItemsGif.put("face", "".getBytes());
        equippedItemsGif.put("cap", "".getBytes());
        equippedItemsGif.put("clothing", "".getBytes());
    }

    @Override
    public String toString() {
        return "GameUserDataDTO{" +
                "userSeq=" + userSeq +
                ", jobSeq=" + jobSeq +
                ", nickname='" + nickname +
                "', equippedItems=<<equippedItems>>" +
                "', equippedItemsGif=<<equippedItemsGif>>" +
                '}';
    }
}
