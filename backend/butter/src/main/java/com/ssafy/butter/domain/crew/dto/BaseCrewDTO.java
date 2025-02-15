package com.ssafy.butter.domain.crew.dto;

import com.ssafy.butter.domain.crew.entity.Crew;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class BaseCrewDTO {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String promotionUrl;
    private LocalDateTime createDate;
    private Integer followerCnt;

    public BaseCrewDTO(Crew crew) {
        this.id = crew.getId();
        this.name = crew.getName();
        this.description = crew.getDescription();
        this.imageUrl = crew.getImageUrl();
        this.promotionUrl = crew.getPromotionUrl();
        this.createDate = crew.getCreateDate();
        this.followerCnt = crew.getFollows().size();
    }
}
