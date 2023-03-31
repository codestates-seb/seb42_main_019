package izone.izoneProject.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final UserService userService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("Authenticated successfully!");

        System.out.println("name : " + authentication.getName());
        User verifyUser = userService.verifyEmail(authentication.getName());

        response.resetBuffer();
        response.setStatus(HttpStatus.OK.value());
        response.setContentType("text/html; charset=UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        response.setCharacterEncoding("UTF-8");

        String str = new String(verifyUser.getName().getBytes("UTF-8"), "ISO-8859-1");

        response.getOutputStream().print(new ObjectMapper().writeValueAsString(
                List.of("userId: " + verifyUser.getUserId(), "email: " + verifyUser.getEmail(), "name: " + str)));
        response.flushBuffer();
    }
}
