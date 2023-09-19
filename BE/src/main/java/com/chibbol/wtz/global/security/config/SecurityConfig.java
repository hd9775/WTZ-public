package com.chibbol.wtz.global.security.config;

import com.chibbol.wtz.global.security.filter.JwtAuthFilter;
import com.chibbol.wtz.global.security.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity  // 필터를 스프링 필터 체인에 등록
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final TokenService tokenService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // jwt 로그인
        http.cors().and()
                .csrf().disable()
                .httpBasic().disable()
                .formLogin().disable()
                .authorizeHttpRequests()
                .antMatchers("/favicon.ico").permitAll()
                .antMatchers("/api/v1/users/login", "/api/v1/users/join", "/api/v1/users/email",
                        "/api/v1/users/reset-password").permitAll()
                .antMatchers("/api/v1/users/refresh-token").permitAll()
                .antMatchers("/api/v1/users/email/confirm").permitAll()

                // 테스트용

                // 테스트용
                .antMatchers("/api/v1/vote/*").permitAll()
                .antMatchers("/api/v1/timers/*").permitAll()
                .antMatchers("/api/v1/test/**").permitAll()
                .antMatchers("/api/v1/rooms/**").permitAll()
                .antMatchers("/api/v1/stomp/**").permitAll() // 주석처리 -> security 적용
                .antMatchers("/stomp").permitAll()
                .antMatchers("/api/v1/sessions").permitAll()
                .antMatchers("/api/v1/sessions/**").permitAll()

                // 테스트용

                .antMatchers("/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**", "/actuator/**").permitAll() // Swagger 접속 주소를 허용
                .antMatchers("/api/v1/**").hasAnyRole("USER", "ADMIN")
                .antMatchers("/room/create", "/room/list").permitAll()
                // websocket
                .antMatchers("/stomp/**").permitAll()

                .anyRequest().permitAll()
                .and()
                .addFilterBefore(new JwtAuthFilter(tokenService), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .logout().disable();
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*"); // 모든 요청을 허용
        configuration.addAllowedMethod("*"); // 모든 메소드를 허용
        configuration.addAllowedHeader("*"); // 모든 헤더를 허용
        configuration.setAllowCredentials(true); // 쿠키 인증 허용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}