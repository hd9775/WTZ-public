package com.chibbol.wtz.global.security.service;

import com.chibbol.wtz.domain.user.entity.Role;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.exception.UserNotFoundException;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.global.security.dto.AccessTokenDTO;
import com.chibbol.wtz.global.security.dto.Token;
import com.chibbol.wtz.global.security.dto.Token;
import com.chibbol.wtz.global.security.exception.InvalidTokenException;
import com.chibbol.wtz.global.security.exception.RefreshTokenNotExistException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService {

    private static final String SECRET_KEY = "secret-key";
    private static final long ACCESS_TOKEN_VALIDITY_SECONDS = 60 * 60; // 1시간
    private static final long REFRESH_TOKEN_VALIDITY_SECONDS = 7 * 24 * 60 * 60; // 7일
    private final UserRepository userRepository;

    public Token generateToken(String email, Role role) {
        // Access Token 생성
        String accessToken = Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY_SECONDS * 1000))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALIDITY_SECONDS * 1000))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

        return new Token(accessToken, refreshToken);
    }

    public boolean verifyToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            // 토큰 만료시간 확인
            Date expiration = claims.getExpiration();
            return !expiration.before(new Date()); // 만료 시간이 지났으면(true) -> false 반환
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public User getUserFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        String email = claims.getSubject();
        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public boolean verifyRefreshTokenOwner(String token, User user) {
        return user.getRefreshToken().equals(token);
    }

    public void saveRefreshToken(String email, String refreshToken) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        user.updateRefreshToken(refreshToken);
        userRepository.save(user);
    }

    public void deleteRefreshToken(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        user.updateRefreshToken(null);
        userRepository.save(user);
    }

    public AccessTokenDTO generateAccessTokenByRefreshToken(String refreshToken) {
        // refreshToken null 확인
        if(refreshToken == null) {
            throw new RefreshTokenNotExistException("Refresh Token이 존재하지 않습니다.");
        }
        
        // refreshToken 만료시간 확인
        if(!verifyToken(refreshToken)) { // refreshToken 유효성 확인 (만료시간, 서명)
            throw new InvalidTokenException("Refresh Token이 유효하지 않습니다.");
        }

        // refreshToken user 정보 가져오기
        User user = getUserFromToken(refreshToken);

        // refreshToken user 정보와 일치하는지 확인
        if(!verifyRefreshTokenOwner(refreshToken, user)) {
            throw new InvalidTokenException("Refresh Token이 유효하지 않습니다.");
        }

        String accessToken = generateToken(user.getEmail(), user.getRole()).getAccessToken();

        log.info("====================");
        log.info("GENERATE NEW ACCESSTOKEN BY REFRESHTOKEN");
        log.info("EMAIL : " + user.getEmail());
        log.info("====================");

        return AccessTokenDTO.builder().accessToken(accessToken).userSeq(user.getUserSeq()).nickname(user.getNickname()).build();
    }
}
