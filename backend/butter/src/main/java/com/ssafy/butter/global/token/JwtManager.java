package com.ssafy.butter.global.token;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtManager {
    private final Key signingKey;
    private final long validityInMilliseconds;
    private final long refreshTokenValidityInMilliseconds;

    public JwtManager(
            @Value("${custom.jwt.secret-key}") String secretKey,
            @Value("${custom.jwt.expire.access}") long validityInMilliseconds,
            @Value("${custom.jwt.expire.refresh}") long refreshTokenValidityInMilliseconds) {

        this.signingKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.validityInMilliseconds = validityInMilliseconds;
        this.refreshTokenValidityInMilliseconds = refreshTokenValidityInMilliseconds;
    }

    public String createAccessToken(AuthInfoDTO authInfo) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        String birthdate = authInfo.birthDate().format(DateTimeFormatter.ISO_DATE);

        return Jwts.builder()
                .claim("id", authInfo.id())
                .claim("email", authInfo.email())
                .claim("gender", authInfo.gender())
                .claim("birthdate", birthdate)
                .issuedAt(now)
                .expiration(validity)
                .signWith(signingKey)
                .compact();
    }

    public String createRefreshToken() {
        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshTokenValidityInMilliseconds);

        return Jwts.builder()
                .issuedAt(now)
                .expiration(validity)
                .signWith(signingKey)
                .compact();
    }

    public String getPayload(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public AuthInfoDTO getParsedClaims(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .verifyWith((SecretKey) signingKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            Long id = e.getClaims().get("id", Long.class);
            String email = e.getClaims().get("email", String.class);
            String gender = e.getClaims().get("gender", String.class);
            String birthdate = e.getClaims().get("birthdate", String.class);
            return new AuthInfoDTO(id, email, gender, LocalDate.parse(birthdate));
        }

        Long id = claims.get("id", Long.class);
        String email = claims.get("email", String.class);
        String gender = claims.get("name", String.class);
        String birthdate = claims.get("birthdate", String.class);
        return new AuthInfoDTO(id, email, gender, LocalDate.parse(birthdate));
    }

    public boolean isValid(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token);

            return !claimsJws.getPayload().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
