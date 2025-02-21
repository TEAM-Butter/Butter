interface CrewRegisterRequestDto {
    name: string;
    description: string;
    image: File | null;
    promotionUrl: string;
    portfolioVideo: File | null;
}

export type {
    CrewRegisterRequestDto
}