package com.project.stockmaster.security;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/auth/register").permitAll()
                        .requestMatchers("/api/auth/send-otp").permitAll()
                        .requestMatchers("/api/auth/reset-password").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/products/**").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("MANAGER")

                        .requestMatchers(HttpMethod.GET, "/api/products/**")
                        .hasAnyRole("MANAGER", "USER")
                        .requestMatchers(HttpMethod.POST, "/api/warehouses/**").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/api/warehouses/**").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.DELETE, "/api/warehouses/**").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.GET, "/api/warehouses/**").hasAnyRole("MANAGER", "USER")
                        .requestMatchers(HttpMethod.POST, "/api/receipts/**").hasAnyRole("MANAGER","STAFF")
                        .requestMatchers(HttpMethod.GET, "/api/receipts/**").hasAnyRole("MANAGER","STAFF")
                        .requestMatchers("/api/delivery/**").hasAnyRole("MANAGER", "STAFF")


                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
