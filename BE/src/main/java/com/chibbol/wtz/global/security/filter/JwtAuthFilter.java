package com.chibbol.wtz.global.security.filter;

import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.global.security.service.TokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info(request.getRemoteAddr() + "\t" + request.getRequestURI());

        String token = extractTokenFromRequest(request);
        if (isPermitAllRequest(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 접근권한(로그인)이 필요한 요청이면
        if (StringUtils.hasText(token)) {
            // 토큰이 있는 경우
            if (tokenService.verifyToken(token)) { // 권한 확인
                User user = tokenService.getUserFromToken(token); // 토큰에서 유저정보 가져오기
                Authentication authentication = getAuthentication(user); // 인증 정보와 권한 가져오기
                SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContextHolder : spring security 인메모리 세션저장소
                log.info("====================");
                log.info("AUTHENTICATION SUCCESS");
                log.info("EMAIL : " + ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail());
                log.info("ROLE : " + SecurityContextHolder.getContext().getAuthentication().getAuthorities());
                log.info("====================");
                filterChain.doFilter(request, response);
                return;
            } else { // 만료 시간이 지났으면
                log.info("====================");
                log.info("ACCESSTOKEN EXPIRED");
                log.info("====================");

                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token Has Expired");   // 401
                return;
            }
        }
        log.info("====================");
        log.info("ACCESSTOKEN NOT EXIST");
        log.info("====================");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token Not Exist");
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private Authentication getAuthentication(User user) {
        return new UsernamePasswordAuthenticationToken(user, null, Collections.singleton(new SimpleGrantedAuthority(user.getRole().name())));
    }

    private boolean isPermitAllRequest(HttpServletRequest request) {
        List<RequestMatcher> matchers = new ArrayList<>();

        // HttpSecurity 클래스에서 permitAll()로 허용한 URL 패턴 가져오기
        matchers.add(new AntPathRequestMatcher("/favicon.ico"));
        matchers.add(new AntPathRequestMatcher("/api/v1/users/login"));
        matchers.add(new AntPathRequestMatcher("/api/v1/users/join"));
        matchers.add(new AntPathRequestMatcher("/api/v1/users/email"));
        matchers.add(new AntPathRequestMatcher("/api/v1/users/reset-password"));
        matchers.add(new AntPathRequestMatcher("/api/v1/users/email/confirm"));
        matchers.add(new AntPathRequestMatcher("/api/v1/users/refresh-token"));
        matchers.add(new AntPathRequestMatcher("/chat-test")); // websocket url
        matchers.add(new AntPathRequestMatcher("/stomp"));
        matchers.add(new AntPathRequestMatcher("/api/v1/stomp/**")); // 주석 처리 -> jwt 적용
//        matchers.add(new AntPathRequestMatcher("/rooms/**"));
        matchers.add(new AntPathRequestMatcher("/"));

        // 테스트용
        matchers.add(new AntPathRequestMatcher("/api/v1/job/*"));
        matchers.add(new AntPathRequestMatcher("/api/v1/job/result/*/*"));
        matchers.add(new AntPathRequestMatcher("/api/v1/job/randomJob/*"));
        matchers.add(new AntPathRequestMatcher("/api/v1/job/excludeJobSeq/*/*"));
        matchers.add(new AntPathRequestMatcher("/api/v1/vote/*"));
        matchers.add(new AntPathRequestMatcher("/api/v1/room/*"));
        matchers.add(new AntPathRequestMatcher("/api/v1/timers/*"));
        matchers.add(new AntPathRequestMatcher("/api/v1/test/**"));
        // 테스트용

        matchers.add(new AntPathRequestMatcher("/v3/api-docs/**"));
        matchers.add(new AntPathRequestMatcher("/swagger-ui.html"));
        matchers.add(new AntPathRequestMatcher("/swagger-ui/**"));

        matchers.add(new AntPathRequestMatcher("/actuator/**"));
        matchers.add(new AntPathRequestMatcher("/stomp/**"));

        matchers.add(new AntPathRequestMatcher("/api/v1/sessions/**"));
        matchers.add(new AntPathRequestMatcher("/api/v1/sessions"));

        // 요청 URL이 permitAll()로 허용한 URL 패턴에 해당하는지 확인
        for (RequestMatcher matcher : matchers) {
            if (matcher.matches(request)) {
                return true;
            }
        }
        return false;
    }
}