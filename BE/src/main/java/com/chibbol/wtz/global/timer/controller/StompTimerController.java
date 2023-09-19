package com.chibbol.wtz.global.timer.controller;

import com.chibbol.wtz.global.timer.dto.TimerDecreaseDTO;
import com.chibbol.wtz.global.timer.dto.UserSeqDTO;
import com.chibbol.wtz.global.timer.service.TimerService;
import com.chibbol.wtz.global.timer.service.StompTimerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompTimerController {
    private final TimerService newTimerService;
    private final StompTimerService stompTimerService;

    // 투표 결과 알리기
    @Operation(summary = "타이머 종료 알림")
    @MessageMapping("/game/{gameCode}/timer")
    public void timer(@DestinationVariable String gameCode, UserSeqDTO userSeqDTO) {
        newTimerService.timerEndUser(gameCode, userSeqDTO.getUserSeq());
    }

    @Operation(summary = "타이머 시간 감소")
    @MessageMapping("/game/{gameCode}/timer/decrease")
    public void timerDecrease(@DestinationVariable String gameCode, TimerDecreaseDTO timerDecreaseDTO) {
        newTimerService.timerDecreaseUser(gameCode, timerDecreaseDTO);
    }
}
