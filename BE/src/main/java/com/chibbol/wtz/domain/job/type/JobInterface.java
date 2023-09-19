package com.chibbol.wtz.domain.job.type;

import java.util.Map;

public interface JobInterface extends Comparable<JobInterface> {
    // 능력 우선 순위를 위한 가중치 값(낮을 수록 우선순위가 높음)
    int weight = 0;
    Long userSeq = 0L;
    Map<String, Long> useAbility(Map<String, Long> turnResult);

    long getUserSeq();

    default int getWeight() {
        return weight;
    }

}
