package com.ssafy.butter.domain.crew.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "crew_notice")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_notice_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    @NotNull
    private Crew crew;

    @Column(length = 50)
    @NotNull
    private String title;

    @Column(length = 200)
    @NotNull
    private String content;

    @Column(length = 2048)
    private String imageUrl;

    @NotNull
    private LocalDateTime createDate; //TODO : 시간 베이스 엔티티 생성

    private LocalDateTime updateDate;

    @Builder
    public Notice(Crew crew, String title, String content, String imageUrl, LocalDateTime createDate,
                  LocalDateTime updateDate) {
        this.crew = crew;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }
}
