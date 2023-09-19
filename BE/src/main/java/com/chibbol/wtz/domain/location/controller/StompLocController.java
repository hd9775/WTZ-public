package com.chibbol.wtz.domain.location.controller;

import com.chibbol.wtz.domain.location.dto.LocationDTO;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisher;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class StompLocController {
    private final RedisPublisher publisher;
    private final ChannelTopic gameTopic;

    @Operation(summary = "캐릭터 위치 이동")
    @MessageMapping("/game/{gameCode}/loc")
    public void location(@DestinationVariable String gameCode,  LocationDTO locationDTO){
        // 캐릭터 변경 된 위치 받은 그대로 모든 유저들에게 전송
        publisher.publish(gameTopic,
                DataDTO.builder()
                        .type("GAME_CHAR_LOC")
                        .code(gameCode)
                        .data(locationDTO)
                        .build());
    }
}
