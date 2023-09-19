package com.chibbol.wtz.domain.vote.controller;

import com.chibbol.wtz.domain.job.dto.TargetUserDTO;
import com.chibbol.wtz.domain.vote.dto.VoteDTO;
import com.chibbol.wtz.domain.vote.service.VoteService;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisher;
import com.chibbol.wtz.global.timer.service.TimerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompVoteController {

    private final VoteService voteService;
    private final TimerService newTimerService;
    private final RedisPublisher publisher;
    private final ChannelTopic gameTopic;

    // /pub/{roomSeq}/vote --> 각 roomSeq에서 turn마다 투표 정보 받아서 표수 카운트해서 저장, client에 투표 정보 전달
    @Operation(summary = "투표")
    @MessageMapping("/game/{gameCode}/vote")
    public void vote(@DestinationVariable String gameCode, TargetUserDTO targetUserDTO){
        log.info("====================================");
        log.info("VOTE");
        log.info("GAME_CODE: " + gameCode);
        log.info("DTO: " + targetUserDTO.toString());
        log.info("====================================");
        // 투표 정보 저장
        VoteDTO voteData = VoteDTO.builder()
                .gameCode(gameCode)
                .userSeq(targetUserDTO.getUserSeq())
                .targetUserSeq(targetUserDTO.getTargetUserSeq())
                .turn(newTimerService.getTimerInfo(gameCode).getTurn())
                .build();

        voteService.vote(voteData);

        // 투표 현황 리스트로 만들어서 전달
//        stompService.addTopic(gameCode);
        publisher.publish(gameTopic,
                DataDTO.builder()
                        .type("GAME_VOTE")
                        .code(gameCode)
                        .data(voteService.getRealTimeVoteResultWithJob(gameCode, newTimerService.getTimerInfo(gameCode).getTurn()))
                        .build());
    }


}
