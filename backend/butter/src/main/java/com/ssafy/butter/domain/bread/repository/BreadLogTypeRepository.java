package com.ssafy.butter.domain.bread.repository;

import com.ssafy.butter.domain.bread.entity.BreadLogType;

import java.util.Optional;

public interface BreadLogTypeRepository {

    Optional<BreadLogType> findByName(String name);
}
