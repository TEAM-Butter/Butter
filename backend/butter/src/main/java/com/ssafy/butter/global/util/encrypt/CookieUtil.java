package com.ssafy.butter.global.util.encrypt;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;

public class CookieUtil {
    public static void addCookie(HttpServletResponse response, String name, String value, long maxAge, boolean httpOnly) {
        ResponseCookie cookie = ResponseCookie.from(name, value)
                .path("/")
                .sameSite("Strict")
                .secure(false)
                .httpOnly(httpOnly)
                .maxAge(maxAge)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }
}
