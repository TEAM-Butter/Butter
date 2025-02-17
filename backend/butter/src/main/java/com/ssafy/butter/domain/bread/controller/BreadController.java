package com.ssafy.butter.domain.bread.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadDonationRequestDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadRechargeRequestDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadSettlementRequestDTO;
import com.ssafy.butter.domain.bread.dto.response.PaymentVerificationResponseDTO;
import com.ssafy.butter.domain.bread.service.BreadService;
import com.ssafy.butter.global.token.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Bread API", description = "빵 관련 API")
public class BreadController {
     
    @Value("${iamport.api.key}")
    private String IMP_KEY;

    @Value("${iamport.api.secret}")
    private String IMP_SECRET;

    private final ObjectMapper objectMapper;

    private final BreadService breadService;

    @Operation(summary = "결제 검증", description = "결제 요청을 검증합니다.<br>" +
            "성공 시 요청한 만큼 사용자 계정에 빵이 추가됩니다. " +
            "실패 시 추가되지 않습니다.")
    @PostMapping("/verify-payment") 
    public ResponseEntity<PaymentVerificationResponseDTO> verifyPayment(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO authInfoDTO,
            @RequestBody BreadRechargeRequestDTO breadRechargeRequestDTO) {
        JsonNode responseJson = getPaymentInfo(breadRechargeRequestDTO.impUid(), getAccessToken());
        if (!"paid".equals(responseJson.get("response").get("status").asText())) {
            return ResponseEntity.ok().body(new PaymentVerificationResponseDTO(false, "결제 실패 또는 미결제 상태"));
        }
        breadService.rechargeBread(authInfoDTO, responseJson.get("response").get("amount").asInt());
        return ResponseEntity.ok().body(new PaymentVerificationResponseDTO(true, "결제 검증 완료"));
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
            JsonNode responseJson = objectMapper.readTree(response.getBody());
            return responseJson.path("response").path("access_token").asText();
        } catch (HttpClientErrorException | JsonProcessingException e) {
            throw new RuntimeException("액세스 토큰 발급 실패: " + e.getMessage());
        }
    }

    // 결제 정보 조회
    private JsonNode getPaymentInfo(String impUid, String accessToken) {
        String paymentUrl = "https://api.iamport.kr/payments/" + impUid;
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(paymentUrl, HttpMethod.GET, entity, String.class);
            JsonNode responseJson = objectMapper.readTree(response.getBody());
            if (response.getStatusCode() == HttpStatus.OK) {
                return responseJson;
            } else {
                throw new RuntimeException("결제 정보 조회 실패: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("API 요청 오류: " + e.getMessage(), e);
        }
    }

    @Operation(summary = "빵 후원", description = "빵을 후원합니다.")
    @PostMapping("/donate")
    public ResponseEntity<Void> donateBread(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO authInfoDTO,
            @RequestBody BreadDonationRequestDTO breadDonationRequestDTO) {
        breadService.donateBread(authInfoDTO, breadDonationRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "빵 정산", description = "빵을 정산합니다.")
    @PostMapping("/settle")
    public ResponseEntity<Void> settleBread(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO authInfoDTO,
            @RequestBody BreadSettlementRequestDTO breadSettlementRequestDTO) {
        breadService.settleBread(authInfoDTO, breadSettlementRequestDTO);
        return ResponseEntity.noContent().build();
    }
}
