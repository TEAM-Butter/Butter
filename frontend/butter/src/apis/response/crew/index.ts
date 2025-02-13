interface LiveDto {
    id: number;
    title: string;
    startDate: string; // ISO 날짜 문자열 (예: "2025-02-12T06:15:02.994Z")
    endDate: string;
  }

interface ScheduleDto {
    id: number;
    title: string;
    content: string;
    place: string;
    buskingDate: string; // ISO 날짜 문자열
    latitude: number;
    longitude: number;
    live: LiveDto;
  }
  
interface NoticeDto {
    createDate: string;
    updateDate: string;
    id: number;
    title: string;
    content: string;
    imageUrl: string;
  }
  
interface CrewRegisterResponseDto {
    id: number;
    schedules: ScheduleDto[];
    notices: NoticeDto[];
    lives: LiveDto[];
    genres: string[];
    name: string;
    description: string;
    imageUrl: string;
    promotionUrl: string;
    createDate: string;
    followerCnt: number;
  }
  

  export type {
    CrewRegisterResponseDto,
  }