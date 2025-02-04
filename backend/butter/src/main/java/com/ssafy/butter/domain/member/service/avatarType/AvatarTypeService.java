package com.ssafy.butter.domain.member.service.avatarType;

import com.ssafy.butter.domain.member.entity.AvatarType;
import java.util.Optional;

public interface AvatarTypeService {
    Optional<AvatarType> findByName(String name);
}
