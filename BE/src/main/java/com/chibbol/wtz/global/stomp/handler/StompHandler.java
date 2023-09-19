package com.chibbol.wtz.global.stomp.handler;

import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.global.security.service.TokenService;
import com.chibbol.wtz.global.stomp.service.StompService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final TokenService tokenService;
    private final StompService stompService;

    // websocket을 통해 들어온 요청이 처리 되기전 실행
    // 유효하지 않은 토큰이 세팅될 경우, websocket을 통해 보낸 메세지는 무시
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel messageChannel) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);
        log.info("소켓 메시지 감지");
        log.info(stompHeaderAccessor.getDestination());
        log.info(stompHeaderAccessor.getCommand().toString());

        if (StompCommand.CONNECT == stompHeaderAccessor.getCommand()) {
            log.info("CONNECT 감지");
            String sessionId = stompHeaderAccessor.getSessionId();
            String token = stompHeaderAccessor.getFirstNativeHeader("Authorization");
            User user = tokenService.getUserFromToken(token.replace("Bearer ", ""));
            stompService.connectUser(sessionId, user.getUserSeq());
            log.info("CONNECT 감지 끝");
        }

        else if (StompCommand.SUBSCRIBE == stompHeaderAccessor.getCommand()) {
            log.info("SUBSCRIBE 감지");
        }

        else if (StompCommand.UNSUBSCRIBE == stompHeaderAccessor.getCommand()) {
            log.info("UNSUBSCRIBE 감지");
        }

        else if (StompCommand.DISCONNECT == stompHeaderAccessor.getCommand()) {
            log.info("DISCONNECT 감지");
            stompService.disconnectUser(stompHeaderAccessor.getSessionId());
            log.info("DISCONNECT 감지 끝");
//            roomEnterInfoRedisService.setUserExitInfo(roomCode, user.getUserSeq());
//            List<String> tokens = stompHeaderAccessor.getNativeHeader("Authorization");
//            log.info("tokens : ", tokens);
//            String token = tokens.get(0).substring(7);
//            log.info("token : ", token);
//            tokenService.verifyToken(token);
//            User user = tokenService.getUserFromToken(token);
//            log.info("소켓 연결 끊김 감지");
//            log.info("해더 목록");
//            log.info(message.getHeaders()+" ");
//            // sessionId 추출
////            String sessionId = (String) message.getHeaders().get("simpSessionId");
//            // 세션이 있는 roomId 추출
////            String roomCode = stompRepository.enterUser(roomCode, user);
//            // 채팅방 인원수 -1
//            //
////            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("Unknown");
        }
        return message;
    }
}
