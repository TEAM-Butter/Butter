package com.ssafy.butter.domain.bread.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadDonationRequestDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadRechargeRequestDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadSettlementRequestDTO;
import com.ssafy.butter.domain.bread.entity.BreadLog;
import com.ssafy.butter.domain.bread.entity.BreadLogType;
import com.ssafy.butter.domain.bread.repository.BreadLogRepository;
import com.ssafy.butter.domain.bread.repository.BreadLogTypeRepository;
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

    private final BreadLogRepository breadLogRepository;
    private final BreadLogTypeRepository breadLogTypeRepository;

    @Override
    public void rechargeBread(AuthInfoDTO authInfoDTO, int amount) {
        log.info("recharge bread: {}", amount);
        Member member = memberService.findById(authInfoDTO.id());
        if (member.getBreadAmount() == null) {
            member.updateBreadAmount(0);
        }
        BreadLog breadLog = BreadLog.builder()
                .member(member)
                .breadLogType(breadLogTypeRepository.findByName("Recharge").orElseThrow())
                .build();
        breadLogRepository.save(breadLog);
        member.updateBreadAmount(member.getBreadAmount().getAmount() + amount);
    }

    @Override
    public void donateBread(AuthInfoDTO authInfoDTO, BreadDonationRequestDTO breadDonationRequestDTO) {
        Member member = memberService.findById(authInfoDTO.id());
        if (member.getBreadAmount().getAmount() < breadDonationRequestDTO.amount()) {
            throw new IllegalArgumentException("Member does not have enough bread amount");
        }
        Crew crew = crewService.findById(breadDonationRequestDTO.crewId());
        BreadLog breadLog = BreadLog.builder()
                .member(member)
                .crew(crew)
                // TODO 리펙토링...?
                .breadLogType(breadLogTypeRepository.findByName("Donate").orElseThrow())
                .build();
        breadLogRepository.save(breadLog);
        member.updateBreadAmount(member.getBreadAmount().getAmount() - breadDonationRequestDTO.amount());
        crew.updateDonationAmount(crew.getDonationAmount() + breadDonationRequestDTO.amount());
    }

    @Override
    public void settleBread(AuthInfoDTO authInfoDTO, BreadSettlementRequestDTO breadSettlementRequestDTO) {

    }
}
