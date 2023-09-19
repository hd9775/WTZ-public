package com.chibbol.wtz.global.stomp.service;

import com.chibbol.wtz.global.stomp.dto.DataDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisPublisher {
    private final RedisTemplate<String, Object> stompRedisTemplate;
    private final RedisTemplate<String, Object> RedisTemplate;
    public void publish(ChannelTopic topic, DataDTO data){
        log.info("publish data : {}", data.toString());
        RedisTemplate.convertAndSend(topic.getTopic(), data);
    }
    public void stompPublish(ChannelTopic topic, Object data) {
        stompRedisTemplate.convertAndSend(topic.getTopic(), data); // 메세지를 redis topic에 발행
    }

}