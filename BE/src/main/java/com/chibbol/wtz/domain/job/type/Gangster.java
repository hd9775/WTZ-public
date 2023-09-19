package com.chibbol.wtz.domain.job.type;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Gangster implements JobInterface{

    private int weight = 5;
    private long userSeq;
    private long targetUserSeq;
    @Override
    public Map<String, Long> useAbility(Map<String, Long> turnResult) {
        turnResult.put("Gangster", targetUserSeq);
        return null;
    }

    @Override
    public int compareTo(JobInterface o) {
        return Integer.compare(this.weight, o.weight);
    }

    @Builder
    public Gangster(long userSeq, long targetUserSeq) {
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
