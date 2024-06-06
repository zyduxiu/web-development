package com.spacestore.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static javax.crypto.Cipher.SECRET_KEY;

@Component
public class Jwtutil {
    private static final byte[] secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded();
    private static final long EXPIRATION_TIME = 600; // 1分钟

    public String generateToken(String subject, String roles) {
        // 获取当前时间并添加过期时间
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expiration = new Date(nowMillis + (EXPIRATION_TIME * 1000)); // 将秒转换为毫秒

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles); // 添加用户角色

        return Jwts.builder()
                .setSubject(subject)
                .setClaims(claims) // 设置Claims
                .setExpiration(expiration) // 设置过期时间
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public static Claims parseToken(String token) {
        try {
            byte[] keyBytes = Decoders.BASE64.decode(token);
            byte[] claimsBytes = Decoders.BASE64.decode(token.split("\\.")[1]);
            return Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(keyBytes))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SignatureException e) {
            // 签名验证失败
            return null;
        }
    }

    public boolean isTokenExpired(String token) {
        final Claims claims = parseToken(token);
        return claims.getExpiration().before(new Date());
    }
}
