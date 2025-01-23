package com.ssafy.butter.domain.common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class TimestampedEntity {

    @CreatedDate
    @Column(updatable = false)
    @NotNull
    private LocalDateTime createDate;

    @LastModifiedDate
    @NotNull
    private LocalDateTime updateDate;
}
