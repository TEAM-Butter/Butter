package com.ssafy.butter.domain.member.repository.avatarType;

import com.ssafy.butter.domain.member.entity.AvatarType;
import java.util.Optional;

public interface AvatarTypeRepository {
    Optional<AvatarType> findByName(String name);
}
