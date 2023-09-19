package com.chibbol.wtz.domain.user.controller;

import com.chibbol.wtz.domain.room.exception.UserAlreadyLoginException;
import com.chibbol.wtz.domain.user.entity.Role;
import com.chibbol.wtz.global.stomp.service.StompService;
import com.chibbol.wtz.domain.user.dto.*;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.service.UserService;
import com.chibbol.wtz.global.email.service.EmailService;
import com.chibbol.wtz.global.security.dto.AccessTokenDTO;
import com.chibbol.wtz.global.security.dto.Token;
import com.chibbol.wtz.global.security.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;


@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final TokenService tokenService;
    private final UserService userService;
    private final EmailService emailService;
    private final StompService stompService;
    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "이메일 중복 확인, 인증번호 전송")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용 가능"),
            @ApiResponse(responseCode = "409", description = "중복된 이메일"),
            @ApiResponse(responseCode = "422", description = "이메일 형식 오류"),
            @ApiResponse(responseCode = "429", description = "재전송 대기 시간"),
            @ApiResponse(responseCode = "502", description = "이메일 전송 실패")
    })
    @PostMapping("/email/confirm")
    public ResponseEntity<Void> email(@RequestBody EmailDTO emailDto) {
        userService.checkEmailDuplicate(emailDto.getEmail());
        emailService.sendEmailCode(emailDto.getEmail(), "register");
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "회원가입")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "이메일 인증번호 불일치"),
            @ApiResponse(responseCode = "409", description = "중복된 이메일"),
            @ApiResponse(responseCode = "422", description = "이메일, 비밀번호, 닉네임 중 형식 오류")
    })
    @PostMapping("/join")
    public ResponseEntity<Void> join(@RequestBody UserCreateDTO userCreateDto) {
        emailService.checkEmailVerificationCode(userCreateDto.getEmail(), userCreateDto.getEmailVerificationCode());
        userService.join(userCreateDto, passwordEncoder);
        emailService.removeEmailVerificationCode(userCreateDto.getEmail());

        log.info("====================");
        log.info("REGISTER SUCCESS");
        log.info("EMAIL : " + userCreateDto.getEmail());
        log.info("====================");

        return ResponseEntity.created(null).build();
    }

    @Operation(summary = "로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "422", description = "이메일, 비밀번호 중 형식 오류"),
            @ApiResponse(responseCode = "503", description = "서버 점검중")
    })
    @PostMapping("/login")
    public ResponseEntity<AccessTokenDTO> login(@RequestBody LoginDTO loginDto, HttpServletResponse response) {
        User user = userService.login(loginDto, passwordEncoder);

        if (stompService.checkForDuplicateUser(user.getUserSeq())) {
            log.info("이미 로그인 중");
            throw new UserAlreadyLoginException("이미 로그인 중입니다!");
        }

        Token token = tokenService.generateToken(user.getEmail(), user.getRole());
        // RefreshToken 저장
        tokenService.saveRefreshToken(user.getEmail(), token.getRefreshToken());

        // Cookie에 RefreshToken 저장
        Cookie cookie = new Cookie("refreshToken", token.getRefreshToken());

        // optional properties
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setDomain("i9d206.p.ssafy.io");
        cookie.setPath("/");

        // add cookie to response
        response.addCookie(cookie);

        log.info("====================");
        log.info("LOGIN SUCCESS");
        log.info("EMAIL : " + loginDto.getEmail());
        log.info("====================");

        return ResponseEntity.ok(AccessTokenDTO.builder().userSeq(user.getUserSeq()).nickname(user.getNickname()).accessToken(token.getAccessToken()).build());
    }

    @Operation(summary = "로그아웃")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        User user = userService.logout();

        // Cookie RefreshToken 삭제
        Cookie cookie = new Cookie("refreshToken", null);

        // optional properties
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setDomain("i9d206.p.ssafy.io");
        cookie.setPath("/");

        // add cookie to response
        response.addCookie(cookie);

        log.info("====================");
        log.info("LOGOUT SUCCESS");
        log.info("EMAIL : " + user.getEmail());
        log.info("====================");

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "비밀번호 초기화 이메일 인증")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 전송 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "429", description = "재전송 대기 시간"),
            @ApiResponse(responseCode = "502", description = "이메일 전송 실패")
    })
    @PostMapping("/email")
    public ResponseEntity<String> sendEmailCode(@RequestBody EmailDTO emailDto) {
        userService.checkEmailExist(emailDto.getEmail());
        emailService.sendEmailCode(emailDto.getEmail(), "passwordChange");
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "비밀번호 초기화")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "비밀번호 초기화 성공"),
            @ApiResponse(responseCode = "400", description = "이메일 인증번호 불일치"),
            @ApiResponse(responseCode = "422", description = "이메일, 비밀번호 중 형식 오류"),
    })
    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody PasswordResetDTO passwordResetDto) {
        emailService.checkEmailVerificationCode(passwordResetDto.getEmail(), passwordResetDto.getEmailVerificationCode());
        userService.resetPassword(passwordResetDto, passwordEncoder);
        emailService.removeEmailVerificationCode(passwordResetDto.getEmail());

        log.info("====================");
        log.info("RESET PASSWORD");
        log.info("EMAIL : " + passwordResetDto.getEmail());
        log.info("====================");

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "비밀번호 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "비밀번호 변경 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "422", description = "비밀번호 형식 오류")
    })
    @PatchMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordDTO changePasswordDto) {
        userService.changePassword(changePasswordDto.getPassword(), changePasswordDto.getNewPassword(), userService.getLoginUser(), passwordEncoder);

        log.info("====================");
        log.info("CHANGE PASSWORD");
        log.info("EMAIL : " + userService.getLoginUser().getEmail());
        log.info("====================");

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "닉네임 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "닉네임 변경 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "422", description = "닉네임 형식 오류")
    })
    @PatchMapping("/change-nickname")
    public ResponseEntity<Void> changeNickname(@RequestBody ChangeNicknameDTO changeNicknameDto) {
        userService.changeNickname(changeNicknameDto.getNickname(), userService.getLoginUser());

        log.info("====================");
        log.info("CHANGE NICKNAME");
        log.info("EMAIL : " + userService.getLoginUser().getEmail());
        log.info("====================");

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "회원탈퇴")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원탈퇴 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @DeleteMapping("/")
    public ResponseEntity<Void> deleteUser(@RequestBody String password) {
        User user = userService.getLoginUser();
        userService.deleteUser(password, user, passwordEncoder);

        log.info("====================");
        log.info("DELETE USER");
        log.info("EMAIL : " + user.getEmail());
        log.info("====================");

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "내 정보 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "내 정보 조회 성공"),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @GetMapping("/me")
    public UserDTO getMyUser() {
        User user = userService.getLoginUser();
        log.info("====================");
        log.info("USER INFO");
        log.info("EMAIL : " + user.getEmail());
        log.info("====================");
        return userService.getMyUser();
    }

    @Operation(summary = "토큰 재발급")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "토큰 재발급 성공"),
            @ApiResponse(responseCode = "401", description = "Refresh Token Not Exist"),
            @ApiResponse(responseCode = "401", description = "Invalid Token"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @PostMapping("/refresh-token")
    public ResponseEntity<AccessTokenDTO> refreshToken(@CookieValue("refreshToken") String refreshToken) {
        AccessTokenDTO accessTokenDTO = tokenService.generateAccessTokenByRefreshToken(refreshToken);

        if(accessTokenDTO != null) {
            return ResponseEntity.ok(accessTokenDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
