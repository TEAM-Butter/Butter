package com.ssafy.butter.domain.crew.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.butter.domain.common.TimestampedEntity;
import com.ssafy.butter.domain.crew.dto.request.NoticeSaveRequestDTO;
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
import lombok.*;

@Entity
@Table(name = "crew_notice")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends TimestampedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_notice_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    @NotNull
    @JsonIgnore
    private Crew crew;

    @Column(length = 50)
    @NotNull
    private String title;

    @Column(length = 200)
    @NotNull
    private String content;

    @Column(length = 2048)
    private String imageUrl;

    @Builder
    public Notice(Crew crew, String title, String content, String imageUrl) {
        this.crew = crew;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
    }

    public void update(NoticeSaveRequestDTO noticeSaveRequestDTO, String imageUrl) {
        this.title = noticeSaveRequestDTO.title();
        this.content = noticeSaveRequestDTO.content();
        this.imageUrl = imageUrl;
    }
}
