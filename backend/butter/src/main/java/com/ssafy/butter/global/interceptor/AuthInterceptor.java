package com.ssafy.butter.global.interceptor;

import com.ssafy.butter.global.token.JwtExtractor;
import com.ssafy.butter.global.token.JwtManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtManager jwtTokenManager;
    private final JwtExtractor jwtTokenExtractor;

    /**
     * 컨트롤러 도달 전에 JWT를 검증하고, 유효하지 않으면 401 ERROR를 반환한다
     * @param request
     * @param response
     * @param handler
     * @return
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws IOException {

        Enumeration<String> headers = request.getHeaders(HttpHeaders.AUTHORIZATION);
        String token = jwtTokenExtractor.extract(headers);

        if (jwtTokenManager.isValid(token)) {
            return true;
        }

        log.info("ERR : 인가되지 않은 요청 " + request.getRequestURI());
        response.sendError(HttpStatus.UNAUTHORIZED.value(), "Unauthorized");
        return false;
    }

}
