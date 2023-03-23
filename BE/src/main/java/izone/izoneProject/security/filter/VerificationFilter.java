package izone.izoneProject.security.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import izone.izoneProject.exception.ExceptionCode;
import izone.izoneProject.security.jwt.JwtTokenizer;
import izone.izoneProject.security.utils.CustomAuthorityUtils;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
public class VerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException{
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        String authorization = request.getHeader("Authorization");

        return authorization == null|| !authorization.startsWith("Bearer");
    }

    private Map<String , Object> verifyJws(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer","");
        String base64EncodedKey  = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String , Object> claims = jwtTokenizer.getClaims(jws, base64EncodedKey).getBody();

        return claims;
    }
    private void verifyRefreshJws(HttpServletRequest request, HttpServletResponse response) {
        String refreshJws = request.getHeader("Refresh");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()); // (3-2)

        try {
            Jws<Claims> claims = jwtTokenizer.getClaims(refreshJws, base64EncodedSecretKey);// refresh 토큰 검증
            //리프레시 토큰 유효 -> 액세스 토큰 재발급.
            String email = claims.getBody().getSubject();
            Optional<User> optionalUser = userRepository.findByEmail(email);
            User user = optionalUser.orElseThrow(()->new RuntimeException("user not found"));

            String accessToken = jwtTokenizer.delegateAccessToken(user);   // (4-2)
            String refreshToken = jwtTokenizer.delegateRefreshToken(user);
            response.setHeader("Authorization", "Bearer " + accessToken);  // (4-4)
            response.setHeader("Refresh", refreshToken);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
    }

    private void setAuthenticationToContext(Map<String , Object> claims){
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

    }

}
