package com.ssafy.butter.domain.crew.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Crew {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String description;
    private String imageUrl;
    private String promotionUrl;
    @NotNull
    private String portfolioVideoUrl;
    @NotNull
    private int donationAmount;
}
