package com.ssafy.butter.domain.member.repository.avatarType;

import com.ssafy.butter.domain.member.entity.AvatarType;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AvatarTypeRepositoryImpl implements AvatarTypeRepository{

    private final AvatarTypeJpaRepository avatarTypeJpaRepository;

    @Override
    public Optional<AvatarType> findByName(String name) {
        return avatarTypeJpaRepository.findByName(name);
    }
}
