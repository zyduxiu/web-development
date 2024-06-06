//package com.spacestore.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig {
////    @Bean
////    public BCryptPasswordEncoder passwordEncoder(){
////        return new BCryptPasswordEncoder();
////    }
//
//    @Bean
//    public CorsFilter corsFilter() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.addAllowedOrigin("http://localhost:3000");
//        config.addAllowedHeader("*");
//        config.addAllowedMethod("*");
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//
//        return new CorsFilter(source);
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(auth ->{
//         //           auth.requestMatchers("/login").permitAll();
//                    auth.anyRequest().authenticated();
//                })
//                .formLogin(config ->
//                                config.loginPage("/login")
//                                        .loginProcessingUrl("/process-login")
//                                        .defaultSuccessUrl("/home",true)
//                )
//                .csrf(csrf -> csrf.disable())
//        ;
//
//        return http.build();
//    }
//
//
//}
