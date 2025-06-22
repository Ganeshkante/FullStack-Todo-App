package com.in28minutes.rest.webservices.restfulwebservices.basic;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class BasicAuthneticationSecurityCongiguration {

    @Bean
    public SecurityFilterChain filter(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(PathRequest.toH2Console()).permitAll()
                .requestMatchers("/user/**").permitAll() // ✅ allow all your todo endpoints
                .anyRequest().authenticated()
        );

        http.httpBasic(Customizer.withDefaults());

        http.sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        http.csrf(csrf -> csrf
                .ignoringRequestMatchers(PathRequest.toH2Console(), 
                                         request -> true) // disables CSRF for all
        );

        http.headers(headers -> headers
                .frameOptions().sameOrigin()
        );

        return http.build();
    }
}
