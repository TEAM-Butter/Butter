import { div } from "framer-motion/client";
import { Map } from "react-kakao-maps-sdk"


function SamplePage() {
    return(
        <div>
        <div>Test 페이지입니다.</div>
        <Map // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "350px",
        }}
        level={3} // 지도의 확대 레벨
      />
      </div>
    )
}



export default SamplePage
