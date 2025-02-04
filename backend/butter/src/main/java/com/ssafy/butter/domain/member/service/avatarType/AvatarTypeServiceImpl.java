package com.ssafy.butter.domain.member.service.avatarType;

import com.ssafy.butter.domain.member.entity.AvatarType;
import com.ssafy.butter.domain.member.repository.avatarType.AvatarTypeRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AvatarTypeServiceImpl implements AvatarTypeService{
    private final AvatarTypeRepository avatarTypeRepository;

    @Override
    public Optional<AvatarType> findByName(String name) {
        return avatarTypeRepository.findByName(name);
    }
}
