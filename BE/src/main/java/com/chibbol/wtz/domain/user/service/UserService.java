package com.chibbol.wtz.domain.user.service;

import com.chibbol.wtz.domain.user.dto.LoginDTO;
import com.chibbol.wtz.domain.user.dto.PasswordResetDTO;
import com.chibbol.wtz.domain.user.dto.UserCreateDTO;
import com.chibbol.wtz.domain.user.dto.UserDTO;
import com.chibbol.wtz.domain.user.entity.Role;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.exception.*;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public User login(LoginDTO loginDto, PasswordEncoder passwordEncoder) {
        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new InvalidPasswordException("비밀번호가 일치하지 않습니다.");
        }
        return user;
    }

    @Transactional
    public User logout() {
        User user = getLoginUser();
        if(SecurityContextHolder.getContext().getAuthentication() == null) {
            throw new LoginUserNotFoundException("로그인된 사용자가 없습니다.");
        }
        SecurityContextHolder.clearContext();
        user.updateRefreshToken(null);
        userRepository.save(user);

        return user;
    }

    @Transactional
    public void join(UserCreateDTO userCreateDto, PasswordEncoder passwordEncoder) {
        checkEmailFormat(userCreateDto.getEmail());
        checkEmailDuplicate(userCreateDto.getEmail());
        checkPasswordFormat(userCreateDto.getPassword());
        checkNickNameFormat(userCreateDto.getNickname());

        userRepository.save(User.builder()
                .email(userCreateDto.getEmail())
                .password(passwordEncoder.encode(userCreateDto.getPassword()))
                .nickname(userCreateDto.getNickname())
                .role(Role.ROLE_USER)
                .build());
    }

    @Transactional
    public void resetPassword(PasswordResetDTO passwordResetDto, PasswordEncoder passwordEncoder) {
        checkEmailFormat(passwordResetDto.getEmail());
        checkPasswordFormat(passwordResetDto.getPassword());

        User user = userRepository.findByEmail(passwordResetDto.getEmail()).orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        userRepository.save(user.update(User.builder().password(passwordEncoder.encode(passwordResetDto.getPassword())).build()));
    }

    @Transactional
    public void changePassword(String password, String newPassword, User user, PasswordEncoder passwordEncoder) {
        userRepository.findById(user.getUserSeq()).orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidPasswordException("비밀번호가 일치하지 않습니다.");
        }

        checkPasswordFormat(newPassword);

        userRepository.save(user.update(user.builder().password(passwordEncoder.encode(newPassword)).build()));
    }

    @Transactional
    public void changeNickname(String nickname, User user) {
        userRepository.findById(user.getUserSeq()).orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        checkNickNameFormat(nickname);

        userRepository.save(user.update(user.builder().nickname(nickname).build()));
    }

    @Transactional
    public void deleteUser(String password, User user, PasswordEncoder passwordEncoder) {
        userRepository.findById(user.getUserSeq()).orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidPasswordException("비밀번호가 일치하지 않습니다.");
        }

        userRepository.save(user.update(User.builder().isDeleted(true).email("").password("").nickname("탈퇴한 유저").build()));
    }

    @Transactional(readOnly = true)
    public void checkEmailDuplicate(String email) {
        checkEmailFormat(email);

        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null) {
            throw new DuplicateEmailException("중복된 이메일입니다.");
        }
    }

    @Transactional(readOnly = true)
    public void checkEmailExist(String email) {
        checkEmailFormat(email);
        userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public UserDTO toUserDto(User user) {
        return new UserDTO(
                user.getUserSeq(),
                user.getEmail(),
                user.getNickname()
        );
    }

    public void checkEmailFormat(String email) {
        // 이메일 형식에 대한 정규식 패턴
        String emailPattern = "\\S+@\\S+\\.\\S+";
        if(!email.matches(emailPattern)) {
            throw new TextFormatException("이메일 형식이 올바르지 않습니다.");
        }
    }

    public void checkNickNameFormat(String nickname) {
        String nicknamePattern = "^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$";

        if(!nickname.matches(nicknamePattern)) {
            throw new TextFormatException("닉네임 형식이 올바르지 않습니다.");
        }

        if (nickname == null || nickname.length() < 1 || nickname.length() > 10) {
            throw new TextFormatException("닉네임 형식이 올바르지 않습니다.");
        }
    }

    public void checkPasswordFormat(String password) {
        // 영어와 숫자를 포함하고 6자리 이상인지 확인하는 정규식 패턴
        String passwordPattern = "^(?=.*[a-zA-Z])(?=.*\\d).{6,}$";

        if(!password.matches(passwordPattern)) {
            throw new TextFormatException("비밀번호 형식이 올바르지 않습니다.");
        }
    }

    public User getLoginUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public UserDTO getMyUser() {
        if (getLoginUser() == null) {
            throw new LoginUserNotFoundException("로그인된 사용자가 없습니다.");
        }
        return toUserDto(getLoginUser());
    }

    public User findByUserSeq(Long userSeq) {
        return userRepository.findByUserSeq(userSeq);
    }

    public String findNicknameByUserSeq(Long userSeq) {
        return userRepository.findNicknameByUserSeq(userSeq);
    }
}
