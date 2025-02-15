import styled from "@emotion/styled";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import { useState } from "react";
const VideoClipPageWrapper = styled.div`
  position: relative; // 추가
  display: flex;
  flex-direction: column; // 수정
  max-width: 2000px;
  margin: auto;
  padding-top: 15px; // 하나로 통일
  height: 100vh; // 90vh에서 수정
  width: 100%; // 90vw에서 수정
  overflow: hidden; // 추가
`;

const T1 = styled.div`
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 20px;
`;

interface Video {
  id: string;
  url: string;
  title: string;
}

const VideoClipPage = () => {
  const [slides, setslides] = useState<number[]>([1, 2, 3, 4, 5]);
  return (
    <>
      <T1>Video Clip</T1>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel]}
        className="mySwiper"
        style={{ height: "500px", backgroundColor: "beige", color: "black" }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default VideoClipPage;
