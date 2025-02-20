interface LiveEvent {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
  }
  
  interface Schedule {
    id: number;
    title: string;
    content: string;
    place: string;
    buskingDate: string;
    latitude: number;
    longitude: number;
    createDate: string;
    updateDate: string;
    live: LiveEvent;
  }
  
  interface Crew {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    promotionUrl: string;
  }
  
  interface LiveListResponseDto {
    id: number;
    crew: Crew;
    title: string;
    viewerCount: number;
    startDate: string;
    endDate: string;
    schedule: Schedule;
  }

  export type {
    LiveListResponseDto,
  }