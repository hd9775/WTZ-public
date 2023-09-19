package com.chibbol.wtz.global.email.message;

import org.springframework.context.annotation.Configuration;

@Configuration
public class EmailMessage {
    public String registerEmailMessage(String code) {
        String info = "";
        info += "<div style='margin:100px;'>";
        info += "<h1> 안녕하세요</h1>";
        info += "<h1> who's the Zara 입니다</h1>";
        info += "<br>";
        info += "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        info += "<br>";
        info += "<p>즐거운 게임되세요. 감사합니다!<p>";
        info += "<br>";
        info += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        info += "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        info += "<div style='font-size:130%'>";
        info += "CODE : <strong>";
        info += code + "</strong><div><br/> "; // 메일에 인증번호 넣기
        info += "</div>";

        return info;
    }

    public String passwordChangeEmailMessage(String code) {
        String info = "";
        info += "<div style='margin:100px;'>";
        info += "<h1> 안녕하세요</h1>";
        info += "<h1> who's the Zara 입니다</h1>";
        info += "<br>";
        info += "<p>아래 코드를 비밀번호 찾기로 돌아가 입력해주세요<p>";
        info += "<br>";
        info += "<p>즐거운 게임되세요. 감사합니다!<p>";
        info += "<br>";
        info += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        info += "<h3 style='color:blue;'>비밀번호 초기화 인증 코드입니다.</h3>";
        info += "<div style='font-size:130%'>";
        info += "CODE : <strong>";
        info += code + "</strong><div><br/> "; // 메일에 인증번호 넣기
        info += "</div>";

        return info;
    }
}
