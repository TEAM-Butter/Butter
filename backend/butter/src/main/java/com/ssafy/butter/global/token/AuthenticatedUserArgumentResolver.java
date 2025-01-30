package com.ssafy.butter.global.token;

import com.ssafy.butter.auth.dto.response.NaverUserDetailsResponseDTO.NaverUserDetailsDTO;
import com.ssafy.butter.auth.service.NaverOAuthLoginService;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
@RequiredArgsConstructor
public class AuthenticatedUserArgumentResolver implements HandlerMethodArgumentResolver {
    private final NaverOAuthLoginService naverOAuthLoginService;
    private final JwtManager jwtManager;
    private final JwtExtractor jwtExtractor;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(CurrentUser.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String token = webRequest.getHeader("Authorization");
        if (token == null) {
            throw new NoSuchElementException();
        }

        String extractedToken = jwtExtractor.extract(token);

        if(extractedToken.contains(".")){
            return jwtManager.getParsedClaims(extractedToken);
        } else {
            return naverOAuthLoginService.getUserDetails(extractedToken);
        }
    }
}
