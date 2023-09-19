package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GameResultDataDTO {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class GameResult {
        private Long userSeq;
        private Long jobSeq;
        private String nickname;
        private boolean win;

        @Builder
        public GameResult(Long userSeq, Long jobSeq, String nickname, boolean win) {
            this.userSeq = userSeq;
            this.jobSeq = jobSeq;
            this.nickname = nickname;
            this.win = win;
        }
    }

    private boolean rabbitWin;
    private List<GameResult> userInfo;

    @Builder
    public GameResultDataDTO(boolean rabbitWin, List<GameResult> userInfo) {
        this.rabbitWin = rabbitWin;
        this.userInfo = userInfo;
    }
}
