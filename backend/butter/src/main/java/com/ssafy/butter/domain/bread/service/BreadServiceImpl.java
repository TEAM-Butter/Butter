package com.ssafy.butter.domain.bread.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadDonationRequestDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadRechargeRequestDTO;
import com.ssafy.butter.domain.bread.dto.request.BreadSettlementRequestDTO;
import com.ssafy.butter.domain.bread.dto.response.BreadAmountResponseDTO;
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

import java.time.LocalDateTime;

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
                .amount(amount)
                .createDate(LocalDateTime.now())
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
                .breadLogType(breadLogTypeRepository.findByName("Donate").orElseThrow())
                .amount(breadDonationRequestDTO.amount())
                .createDate(LocalDateTime.now())
                .build();
        breadLogRepository.save(breadLog);
        member.updateBreadAmount(member.getBreadAmount().getAmount() - breadDonationRequestDTO.amount());
        crew.updateDonationAmount(crew.getDonationAmount() + breadDonationRequestDTO.amount());
        crewService.save(crew);
    }

    @Override
    public void settleBread(AuthInfoDTO authInfoDTO, BreadSettlementRequestDTO breadSettlementRequestDTO) {
        Member member = memberService.findById(authInfoDTO.id());
        Crew crew = crewService.findById(breadSettlementRequestDTO.crewId());
        crewService.validateCrewAdmin(crew, member);
        BreadLog breadLog = BreadLog.builder()
                .crew(crew)
                .member(member)
                .breadLogType(breadLogTypeRepository.findByName("Settle").orElseThrow())
                .amount(breadSettlementRequestDTO.amount())
                .createDate(LocalDateTime.now())
                .build();
        breadLogRepository.save(breadLog);
    }

    @Override
    public BreadAmountResponseDTO getBreadAmount(AuthInfoDTO authInfoDTO) {
        return new BreadAmountResponseDTO(memberService.findById(authInfoDTO.id()).getBreadAmount().getAmount());
    }
}
