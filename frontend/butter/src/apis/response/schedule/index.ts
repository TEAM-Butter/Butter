interface ScheduleResponseDto {
  id: number;
  title: string;
  content: string;
  place: string;
  buskingDate: string;
  latitude: number;
  longitude: number;
  createDate: string;
  updateDate: string;
  crew: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    promotionUrl: string;
  };
  live: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
  };
  isLiked: boolean;
}

export type {
  ScheduleResponseDto,
}
