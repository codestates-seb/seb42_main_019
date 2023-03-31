package izone.izoneProject.security.config;

import izone.izoneProject.security.filter.JwtAuthenticationFilter;
import izone.izoneProject.security.filter.VerificationFilter;
import izone.izoneProject.security.handler.CustomAccessDeniedHandler;
import izone.izoneProject.security.handler.CustomAuthenticationEntryPoint;
import izone.izoneProject.security.handler.CustomAuthenticationFailureHandler;
import izone.izoneProject.security.handler.CustomAuthenticationSuccessHandler;
import izone.izoneProject.security.jwt.JwtTokenizer;
import izone.izoneProject.security.utils.CustomAuthorityUtils;
import izone.izoneProject.user.repository.UserRepository;
import izone.izoneProject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserRepository userRepository;
    private final UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors()
                .configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                .logout().logoutUrl("/logout").permitAll()
                .logoutSuccessUrl("/")
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/user").permitAll()
                        .antMatchers(HttpMethod.POST, "/user/**").authenticated()
                        .antMatchers(HttpMethod.PATCH,"/user/**").authenticated()
                        .antMatchers(HttpMethod.GET,"/user").permitAll()
                        .antMatchers(HttpMethod.GET,"/user/**").authenticated()
                        .antMatchers(HttpMethod.DELETE,"/user/**").authenticated()
                        .antMatchers(HttpMethod.POST, "/books/**").authenticated()
                        .antMatchers(HttpMethod.PATCH,"/books/**").authenticated()
                        .antMatchers(HttpMethod.GET, "/books/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/books/**").authenticated()
                        .antMatchers(HttpMethod.POST, "/message/**").authenticated()
                        .antMatchers(HttpMethod.GET,"/message/**").authenticated()
                        .antMatchers(HttpMethod.DELETE,"message/**").authenticated()
                        .anyRequest().permitAll());
        return http.build();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOriginPatterns(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET","POST","PATCH","DELETE"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
//        corsConfiguration.setExposedHeaders(Arrays.asList("*"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Authorization"));
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);

            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler(userService));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());


            VerificationFilter verificationFilter = new VerificationFilter(jwtTokenizer, authorityUtils, userRepository);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(verificationFilter, JwtAuthenticationFilter.class);

        }
    }
}
