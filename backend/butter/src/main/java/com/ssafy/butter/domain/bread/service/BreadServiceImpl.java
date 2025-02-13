package com.ssafy.butter.domain.bread.service;

import com.ssafy.butter.domain.bread.dto.request.BreadDonationRequestDTO;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class BreadServiceImpl implements BreadService {

    private final MemberService memberService;
    private final CrewService crewService;

    @Override
    public void rechargeBread(long amount) {

    }

    @Override
    public void donateBread(BreadDonationRequestDTO breadDonationRequestDTO) {
        Member member = memberService.findById(breadDonationRequestDTO.memberId());
        if (member.getBreadAmount().getAmount() < breadDonationRequestDTO.amount()) {
            throw new IllegalArgumentException("Not enough bread");
        }
        Crew crew = crewService.findById(breadDonationRequestDTO.crewId());

        member.updateBreadAmount(member.getBreadAmount().getAmount() - breadDonationRequestDTO.amount());
        crew.updateDonationAmount(crew.getDonationAmount() + breadDonationRequestDTO.amount());
    }
}
