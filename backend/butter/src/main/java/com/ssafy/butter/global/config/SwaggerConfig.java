package com.ssafy.butter.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("Butter API 명세서")
                .description("<h3>Butter API Reference for Developers</h3>")
                .version("v1");
        String securitySchemeName = "bearerAuth";
        return new OpenAPI().components(
                new Components().addSecuritySchemes(
                        securitySchemeName,
                        new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .security(List.of(new SecurityRequirement().addList(securitySchemeName)))
                .info(info);
    }
}
