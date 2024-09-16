//package com.flightsearch.jwt.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import com.flightsearch.jwt.security.JwtAuthenticationFilter;
//import com.flightsearch.service.MyUserDetailService;
//import org.springframework.web.cors.CorsConfigurationSource;
//
//@Configuration
//public class SecurityConfig {
//	
//	@Autowired
//	private JwtAuthenticationFilter filter;
//	@Autowired
//	MyUserDetailService userDetailService;
//	@Autowired
//	PasswordEncoder passwordEncoder;
//	@Autowired
//	CorsConfigurationSource corsConfigurationSource;
//
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		// configuration
//		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource))
//				.authorizeHttpRequests(auth -> auth.requestMatchers("/home/**").authenticated()
//						.requestMatchers("/api/admin/**").hasAnyAuthority("ADMIN")
//						.requestMatchers("/auth/**").permitAll()
//						.requestMatchers("/api/user/**").permitAll()
//						.anyRequest().authenticated())
//				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
//		return http.build();
//	}
//
//	@Bean
//	public DaoAuthenticationProvider doDaoAuthenticationProvider() {
//		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//		daoAuthenticationProvider.setUserDetailsService(userDetailService);
//		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
//		return daoAuthenticationProvider;
//	}
//}



package com.flightsearch.jwt.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.flightsearch.jwt.security.JwtAuthenticationFilter;
import com.flightsearch.service.MyUserDetailService;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter filter;
    @Autowired
    MyUserDetailService userDetailService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/flight/getAll", "/api/flight/search", 
                                  "/api/airport/getAll", 
                                  "/api/city/getAll", 
                                  "/api/aircraft/getAll",
                                  "/api/airline/getAll")
                .hasAnyAuthority("ADMIN","USER")
                .requestMatchers("/api/admin/**")
                .hasAnyAuthority("ADMIN")
                .requestMatchers("/auth/**")
                .permitAll()
                .anyRequest()
                .authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        return daoAuthenticationProvider;
    }
}
