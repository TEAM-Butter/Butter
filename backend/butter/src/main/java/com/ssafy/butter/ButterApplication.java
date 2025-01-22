package com.ssafy.butter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ButterApplication {

    public static void main(String[] args) {
        SpringApplication.run(ButterApplication.class, args);
    }

}
