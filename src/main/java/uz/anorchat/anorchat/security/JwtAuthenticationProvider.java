package uz.anorchat.anorchat.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.service.UserService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthenticationProvider {
    @Value("${jwt.secret}")
    private String key;
    @Autowired
    private UserService userService;

    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expireDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);  // 3 days
        String userId = String.valueOf(user.getId());
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId);
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userService.loadUserById(getUserIdFromJwt(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    private Long getUserIdFromJwt(String jwt) {
        final Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(jwt).getBody();
        return Long.parseLong((String) claims.get("id"));
    }


}
