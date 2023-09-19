package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class NightResultDataDTO {
    @Getter
    @Setter
    @NoArgsConstructor
    private static class NightResult {
        private Long userSeq;
        private Long targetUserSeq;
        private Boolean result;

        @Builder
        public NightResult(Long userSeq, Long targetUserSeq, Boolean result) {
            this.userSeq = userSeq;
            this.targetUserSeq = targetUserSeq;
            this.result = result;
        }
    }

    private Long deadUserSeq;
    private Long threatUserSeq;
    private Long healUserSeq;
    private List<NightResult> ability;

    @Builder
    public NightResultDataDTO(Long deadUserSeq, Long threatUserSeq, Long healUserSeq) {
        this.deadUserSeq = deadUserSeq;
        this.threatUserSeq = threatUserSeq;
        this.healUserSeq = healUserSeq;
        this.ability = new ArrayList<>();
    }

    public void addAbility(Long userSeq, Long targetUserSeq, Boolean result) {
        for(NightResult nightResult : this.ability) {
            if(nightResult.getUserSeq().equals(userSeq)) {
                nightResult.setTargetUserSeq(targetUserSeq);
                nightResult.setResult(result);
                return;
            }
        }

        this.ability.add(NightResult.builder().userSeq(userSeq).result(result).build());
    }
}
