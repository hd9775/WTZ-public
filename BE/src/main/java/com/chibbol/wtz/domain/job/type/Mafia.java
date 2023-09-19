package com.chibbol.wtz.domain.job.type;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Map;

@Slf4j
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mafia implements JobInterface {

    private int weight = 1;
    private long userSeq;
    private long targetUserSeq;
    private long useTime;
    @Override
    public Map<String, Long> useAbility(Map<String, Long> turnResult) {
        // 이전에 마피아가 능력 사용 했으면
        if(turnResult.containsKey("mafia_use")) {
            // 이전 마피아 선택보다 현재 마피아 선택이 늦었을때
            if(turnResult.get("mafia_use") < useTime) {
                turnResult.put("kill", targetUserSeq);
                turnResult.put("mafia_use", useTime);
            }
        } else {
            turnResult.put("kill", targetUserSeq);
            turnResult.put("mafia_use", useTime);
        }
        return null;
    }

    @Override
    public int compareTo(JobInterface o) {
        return Integer.compare(this.weight, o.weight);
    }

    @Builder
    public Mafia(long userSeq, long targetUserSeq, LocalDateTime useTime) {
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
        this.useTime = useTime.toInstant(ZoneOffset.UTC).toEpochMilli();
    }
}
