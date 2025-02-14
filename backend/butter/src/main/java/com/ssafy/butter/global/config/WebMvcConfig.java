package com.ssafy.butter.global.config;


import com.ssafy.butter.global.interceptor.AuthInterceptor;
import com.ssafy.butter.global.token.AuthenticatedUserArgumentResolver;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;
    private final AuthenticatedUserArgumentResolver argumentResolver;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5080", "http://localhost:5081","http://localhost:5173","https://192-168-30-199.openvidu-local.dev:5443", "https://i12e204.p.ssafy.io", "http://i12e204.p.ssafy.io")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/error")
                .excludePathPatterns("/v1/auth/**")
                .excludePathPatterns("/v1/auth/login/**")
                .excludePathPatterns("/v1/members/signup")
                .excludePathPatterns("/v1/members/check-loginId")
                .excludePathPatterns("/v1/email/**")
                .excludePathPatterns("https://openapi.naver.com/v1/nid/me")
                .excludePathPatterns("/swagger-ui/**", "/v3/api-docs/**");
        //TODO : 테스트할 때 엔드포인트 확인하기
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(argumentResolver);
    }
}
