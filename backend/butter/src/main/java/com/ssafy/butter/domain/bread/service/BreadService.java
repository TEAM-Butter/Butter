package com.ssafy.butter.domain.bread.service;

import com.ssafy.butter.domain.bread.dto.request.BreadDonationRequestDTO;

public interface BreadService {

    void rechargeBread(long amount);

    void donateBread(BreadDonationRequestDTO breadDonationRequestDTO);
}
