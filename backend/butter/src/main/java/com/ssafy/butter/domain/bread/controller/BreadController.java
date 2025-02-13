package com.ssafy.butter.domain.bread.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.butter.domain.bread.dto.request.BreadDonationRequestDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadRechargeRequestDTO;
import com.ssafy.butter.domain.bread.dto.response.PaymentVerificationResponseDTO;
import com.ssafy.butter.domain.bread.service.BreadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/bread")
@Slf4j
public class BreadController {
     
    @Value("${iamport.api.key}")
    private String IMP_KEY;

    @Value("${iamport.api.secret}")
    private String IMP_SECRET;

    private final BreadService breadService;

    // 결제 검증 API
    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody BreadRechargeRequestDTO breadRechargeRequest) {
        try {
            // 아임포트 액세스 토큰 발급
            String accessToken = getAccessToken();
            // 결제 정보 조회
            String paymentResponse = getPaymentInfo(breadRechargeRequest.impUid(), accessToken);

            log.info(paymentResponse);
            // 결제 상태가 'paid'인 경우
            if ("paid".equals(paymentResponse)) {
                return ResponseEntity.ok().body(new PaymentVerificationResponseDTO(true, "결제 검증 완료"));
            } else {
                return ResponseEntity.ok().body(new PaymentVerificationResponseDTO(false, "결제 실패 또는 미결제 상태"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new PaymentVerificationResponseDTO(false, "서버 오류 발생"));
        }
    }

    // 액세스 토큰 발급
    private String getAccessToken() {
        String tokenUrl = "https://api.iamport.kr/users/getToken";
        RestTemplate restTemplate = new RestTemplate();

        String body = "{\"imp_key\": \"" + IMP_KEY + "\", \"imp_secret\": \"" + IMP_SECRET + "\"}";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, entity, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode responseJson = objectMapper.readTree(response.getBody());
            return responseJson.path("response").path("status").asText();
        } catch (HttpClientErrorException | JsonProcessingException e) {
            throw new RuntimeException("액세스 토큰 발급 실패: " + e.getMessage());
        }
    }

    // 결제 정보 조회
    private String getPaymentInfo(String impUid, String accessToken) {
        String paymentUrl = "https://api.iamport.kr/payments/" + impUid;
        RestTemplate restTemplate = new RestTemplate();

        log.info("accessToken : "+accessToken);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(paymentUrl, HttpMethod.GET, entity, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode responseJson = objectMapper.readTree(response.getBody());
            log.info("responseJson : "+responseJson);

            if (response.getStatusCode() == HttpStatus.OK) {
                return responseJson.path("response").path("access_token").asText();
            } else {
                throw new RuntimeException("결제 정보 조회 실패: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("API 요청 오류: " + e.getMessage(), e);
        }
    }

    @PostMapping("/donate")
    public ResponseEntity<Void> donateBread(@RequestBody BreadDonationRequestDTO breadDonationRequestDTO) {
        breadService.donateBread(breadDonationRequestDTO);
        return ResponseEntity.noContent().build();
    }
}
