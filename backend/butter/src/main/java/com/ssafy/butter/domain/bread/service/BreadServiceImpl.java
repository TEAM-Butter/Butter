package com.ssafy.butter.domain.bread.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadDonationRequestDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadRechargeRequestDTO;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class BreadServiceImpl implements BreadService {

    private final MemberService memberService;
    private final CrewService crewService;

    @Override
    public void rechargeBread(AuthInfoDTO authInfoDTO, int amount) {
        log.info("recharge bread: {}", amount);
        Member member = memberService.findById(authInfoDTO.id());
        if (member.getBreadAmount() == null) {
            member.updateBreadAmount(0);
        }
        member.updateBreadAmount(member.getBreadAmount().getAmount() + amount);
    }

    @Override
    public void donateBread(AuthInfoDTO authInfoDTO, BreadDonationRequestDTO breadDonationRequestDTO) {
        Member member = memberService.findById(authInfoDTO.id());
        if (member.getBreadAmount().getAmount() < breadDonationRequestDTO.amount()) {
            throw new IllegalArgumentException("Member does not have enough bread amount");
        }
        Crew crew = crewService.findById(breadDonationRequestDTO.crewId());

        member.updateBreadAmount(member.getBreadAmount().getAmount() - breadDonationRequestDTO.amount());
        crew.updateDonationAmount(crew.getDonationAmount() + breadDonationRequestDTO.amount());
    }
}
