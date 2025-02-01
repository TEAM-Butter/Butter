package com.ssafy.butter.global.config;


import com.ssafy.butter.global.interceptor.AuthInterceptor;
import com.ssafy.butter.global.token.AuthenticatedUserArgumentResolver;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;
    private final AuthenticatedUserArgumentResolver argumentResolver;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/error")
                .excludePathPatterns("/api/v1/auth/login/**")
                .excludePathPatterns("/api/v1/member/signup")
                .excludePathPatterns("/api/v1/email/**")
                .excludePathPatterns("https://openapi.naver.com/v1/nid/me");
        //TODO : 테스트할 때 엔드포인트 확인하기
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(argumentResolver);
    }
}
