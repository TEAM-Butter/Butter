package com.ssafy.butter.domain.bread.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadDonationRequestDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadSettlementRequestDTO;
import com.ssafy.butter.domain.bread.dto.response.BreadAmountResponseDTO;

public interface BreadService {

    void rechargeBread(AuthInfoDTO authInfoDTO, int amount);

    void donateBread(AuthInfoDTO authInfoDTO, BreadDonationRequestDTO breadDonationRequestDTO);

    void settleBread(AuthInfoDTO authInfoDTO, BreadSettlementRequestDTO breadSettlementRequestDTO);

    BreadAmountResponseDTO getBreadAmount(AuthInfoDTO authInfoDTO);
}
