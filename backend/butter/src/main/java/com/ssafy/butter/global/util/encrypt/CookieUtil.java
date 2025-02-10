package com.ssafy.butter.global.util.encrypt;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtil {
    public static void addCookie(HttpServletResponse response, String name, String value, long maxAge, boolean httpOnly) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setMaxAge((int) maxAge);
        cookie.setHttpOnly(httpOnly);	// HTTPOnly 설정
        response.addCookie(cookie);
    }
}
