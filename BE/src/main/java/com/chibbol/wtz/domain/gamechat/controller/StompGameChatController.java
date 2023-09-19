package com.chibbol.wtz.domain.gamechat.controller;

import com.chibbol.wtz.domain.gamechat.dto.MessageDTO;
import com.chibbol.wtz.domain.gamechat.dto.SendMessageDTO;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisher;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class StompGameChatController {

    private final RedisPublisher publisher;
    private final UserRepository userRepository;
    private final ChannelTopic gameTopic;

    // gameCode Long으로 받는 거 수정해야 됨
    @Operation(summary = "전체 채팅")
    @MessageMapping("/game/{gameCode}/chat/all")
    public void chatAll(@DestinationVariable String gameCode, MessageDTO messageDTO){
        log.info(messageDTO.getSender()+"");

        SendMessageDTO message = SendMessageDTO.builder()
                .sender(messageDTO.getSender())
                .nickname(userRepository.findNicknameByUserSeq(messageDTO.getSender()))
                .message(messageDTO.getMessage()).build();

        publisher.publish(gameTopic,
                DataDTO.builder()
                        .type("CHAT_ALL")
                        .code(gameCode)
                        .data(message)
                        .build());
    }

    @Operation(summary = "자라 채팅")
    @MessageMapping("/game/{gameCode}/chat/zara")
    public void chatZara(@DestinationVariable String gameCode, MessageDTO messageDTO){
        SendMessageDTO message = SendMessageDTO.builder()
                .sender(messageDTO.getSender())
                .nickname(userRepository.findNicknameByUserSeq(messageDTO.getSender()))
                .message(messageDTO.getMessage()).build();

        publisher.publish(gameTopic,
                DataDTO.builder()
                        .type("CHAT_ZARA")
                        .code(gameCode)
                        .data(message)
                        .build());
    }


    @Operation(summary = "유령 채팅")
    @MessageMapping("/game/{gameCode}/chat/ghost")
    public void chatGhost(@DestinationVariable String gameCode, MessageDTO messageDTO){
        SendMessageDTO message = SendMessageDTO.builder()
                .sender(messageDTO.getSender())
                .nickname(userRepository.findNicknameByUserSeq(messageDTO.getSender()))
                .message(messageDTO.getMessage()).build();

        publisher.publish(gameTopic,
                DataDTO.builder()
                        .type("CHAT_GHOST")
                        .code(gameCode)
                        .data(message)
                        .build());
    }
}
