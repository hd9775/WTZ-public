package com.chibbol.wtz.global.timer.service;

import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class StompTimerService {
    private final RedisPublisher publisher;
    private final ChannelTopic gameTopic;

    public void sendToClient(String type, String gameCode, Object data){
        publisher.publish(gameTopic,
                DataDTO.builder()
                        .type(type)
                        .code(gameCode)
                        .data(data)
                        .build());
        log.info("sendToClient : " + type + " " + gameCode + " " + data);
    }
}
