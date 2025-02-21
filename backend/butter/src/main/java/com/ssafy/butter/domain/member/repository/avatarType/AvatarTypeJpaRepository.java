package com.ssafy.butter.domain.member.repository.avatarType;

import com.ssafy.butter.domain.member.entity.AvatarType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarTypeJpaRepository extends JpaRepository<AvatarType, Long> {
    Optional<AvatarType> findByName(String name);
}
