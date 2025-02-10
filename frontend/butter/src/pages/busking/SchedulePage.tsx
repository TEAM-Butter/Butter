import styled from "@emotion/styled";
import "./MapCss.css";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer} from "react-kakao-maps-sdk";
import calenderIcon from "../../assets/calenderIcon.png";
import findIcon from "../../assets/findIcon.png";
import leftArrow from "../../assets/leftArrow.png";
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.jpg";
import sample3 from "../../assets/sample3.jpg";
import sample4 from "../../assets/sample4.jpg";
import sample5 from "../../assets/sample5.png";
import myLocationIcon from "../../assets/myLocationIcon.png";
import zoomIcon from "../../assets/zoomIcon.png";
import zoomoutIcon from "../../assets/zoomoutIcon.png";
import guitarIcon from "../../assets/guitarIcon.png";
import { useEffect, useRef, useState } from "react";
import useKakaoLoader from "../crew/samplePage";
import { div, image } from "framer-motion/client";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!



const images = [sample1,sample2,sample3,sample4,sample5]



const PageContainer=styled.div`
display: flex; /* Flexbox 레이아웃 */
width: 100%;   /* 전체 너비 100% */
padding: 20px 210px; /* 양쪽 끝에 20px의 여백 추가 */
box-sizing: border-box; /* 패딩이 포함된 크기 계산 */
gap: 40px;

`

const LayOut1 = styled.div`

`

const LayOut2 = styled.div`

    display: flex;
    flex-direction: column;
    padding-top: 40px;
`

const Box1 = styled.div`
  padding-top: 40px;
  display: flex;
  position: relative;
`

const MyLocationBtn = styled.img`
  height: 25px;
  width: 25px;
  z-index: 977;
  border-radius: 50px;
 margin-bottom: -2px;
`
const GrayBox = styled.div`
  position: absolute;
  z-index: 966;
  padding: 10px;
  border-radius: 50px;
  background-color: white;
  right: 12px;
  top: 50px;
`
const Box2 = styled.div`
  background-color: black;
  border-radius: 30px;
  height: 50px;
  width: 420px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap : 15px;
  padding-right: 20px;

`
const Box3 = styled.div`
  background-color: black;
  border-radius: 50px;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

`
const Box4 = styled.div`
  background: var(--liner);
  max-height: 510px;
  overflow-y: auto;  /* ✅ 내용이 넘칠 경우 스크롤 */
  width: 490px;
  color: black;
  border-radius: 5px;
  padding-top: 20px;
  padding-left: 20px;

`
const SearchWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 20px; 
`

const FindIcon = styled.img`
  height: 20px;
`

const CalenderIcon = styled.img`
  height: 20px;
`
const TextBox1 = styled.div`
  display: flex;
  white-space: pre;
  padding-bottom: 3px;
`
const TextBox2 = styled.div`
  display: flex;
`
const DateBox = styled.div`
  font-weight: bold;
`
const LocationBox = styled.div`
  font-weight: bold;
`

const CountBox = styled.div`
  font-weight: bold;
`

const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`

const ScheduleInnerBox = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding-right: 20px;
 padding-bottom: 12px;
`

const ScheduleInnerBox2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`

const ScheduleImage = styled.img`
  height: 50px;
  width: 50px;
`
const ScheduleTitle = styled.div`
  
`
const ScheduleContent = styled.div`
 
`

const GenreBox = styled.div`
 display: flex;
`

const ScheduleGenre = styled.div`
  
`
const OpenDetailBtn = styled.img`
  height: 40px;
  width: 40px;
`
const ZoomBox = styled.div`
  position: absolute;
  z-index: 966;
  padding: 10px;
  border-radius: 50px;
  background-color: white;
  right: 12px;
  top: 100px;
`



const ZoomBtn = styled.img`
    height: 25px;
  width: 25px;
  z-index: 977;
  border-radius: 50px;
  margin-bottom: -3px;
`

const ZoomBox2 = styled.div`
  position: absolute;
  z-index: 966;
  padding: 10px;
  border-radius: 50px;
  background-color: white;
  right: 12px;
  top: 150px;
`
const ZoomOutBox = styled.img`
      height: 25px;
  width: 25px;
  z-index: 977;
  border-radius: 50px;
  margin-bottom: -3px;
`

const InputBox = styled.input`
  background-color: black;
  color: white;
  border-radius: 30px;
  height: 50px;
  width: 420px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 15px;
`







function SchedulePage() {
  useKakaoLoader()
  const mapRef = useRef<kakao.maps.Map>(null)
  const defaultLevel = 13
  const [level, setLevel] = useState(defaultLevel)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSmall, setIsOpenSmall] = useState(false)
  const [info, setInfo] = useState<any>()
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [positions2, setPositions] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } |null>(null);
const [myAddress, setMyAddress] = useState<string>(""); // 내 위치 주소 저장





  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    console.log("검색어:", searchTerm);
    // 여기에 검색 로직 추가 (예: API 요청)
    const ps = new kakao.maps.services.Places()


    ps.keywordSearch(searchTerm, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers2 = []
      
        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers2.push({
            position: {
              lat: parseFloat(data[i].y),
              lng: parseFloat(data[i].x),
            },
            content: data[i].place_name,
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
      
        setMarkers(markers2)
      
        // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds)
      }
    })
  };

    
  const handleResultClick = (pos: any) => {
    setInfo(pos); // ✅ 선택된 위치 정보 저장
    setIsOpenSmall(true); // ✅ 정보창 열기
    setState((prev) => ({
      ...prev,
      center: {
        lat: pos.position.lat,
        lng: pos.position.lng,
      },
      isPanto: true, // ✅ 부드럽게 이동
      level: 7, // ✅ 확대해서 보여주기
    }));
  };




  const myLocationLevel = (type: "increase" | "decrease" | "upgrade" | "search") => {
    const map = mapRef.current
    if (!map) return

    if (type === "increase") {
      map.setLevel(map.getLevel() + 1)
      setLevel(map.getLevel())
    } else if (type === "decrease") {
      map.setLevel(map.getLevel() - 1)
      setLevel(map.getLevel())
    } else {
      type === "upgrade"
      map.setLevel(5)
      setLevel(map.getLevel())
    }
  }


  const markerPosition = {
    lat: 36.350701,
    lng: 127.870667,
  }

  interface StateType {
    center: {
      lat: number;
      lng: number;
    };
    errMsg: string | null;
    isLoading: boolean;
    isPanto: boolean;
    level : number;
  }


  const [state, setState] = useState<StateType>({
    center: {
      lat: 36.350701,
      lng: 127.870667,
    },
    isPanto: false,
    errMsg:null,
    isLoading: true,
    level : 13
  })

  const [myLocationOpen, setmyLocationOpen] = useState(false)
  
  const [calenderOpen, setCalenderOpen] = useState(false) 

  const calenderHandler = function() {
    setCalenderOpen(!calenderOpen)
  }





  useEffect(() => {
    // 분리 주석
    if (!map) return
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch("전국 맛집", (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers2 = []
      
        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers2.push({
            position: {
              lat: parseFloat(data[i].y),
              lng: parseFloat(data[i].x),
            },
            content: data[i].place_name,
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
      
        setMarkers(markers2)
      
        // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds)
      }
    })
    

  }, [map])


          interface Position {
          position: {
            lat: number;
            lng: number;
          };
          content: string;
          address?: string; // 추가: 변환된 주소
        }

        const useGeocodePositions = (positions: Position[]) => {
          const [updatedPositions, setUpdatedPositions] = useState<Position[]>([]);

          useEffect(() => {
            if (!window.kakao || !window.kakao.maps) return;

            const geocoder = new kakao.maps.services.Geocoder();
            let tempPositions: Position[] = [];

            positions.forEach((pos, index) => {
              geocoder.coord2Address(pos.position.lng, pos.position.lat, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  const address = result[0]?.address?.address_name || "알 수 없음";
                  tempPositions.push({ ...pos, address });

                  // 모든 위치의 주소 변환이 완료되면 상태 업데이트
                  if (tempPositions.length === positions.length) {
                    setUpdatedPositions(tempPositions);
                  }
                }
              });
            });
          }, [positions]);

          return updatedPositions;
        };

const updatedPositions = useGeocodePositions(positions2);



  // ✅ markers가 변경될 때 로그 출력
useEffect(() => {
  console.log("✅ markers 상태 업데이트됨:", markers);
  setPositions(markers)

}, [markers]);

useEffect(() => {
  console.log("✅ positions2 상태 업데이트됨:", positions2);

}, [positions2]);

useEffect(() => {
  console.log("✅ state 상태 업데이트됨:", state);

}, [state]);

useEffect(() => {
  console.log("✅내 위치 업데이트 됨", state);

}, [state.center]);


  const FindMyLocation = function() {
    if (navigator.geolocation) {
 
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMyLocation({ lat, lng });
          // 📌 좌표 → 주소 변환 (Reverse Geocoding)
        const geocoder = new kakao.maps.services.Geocoder();
        const coord = new kakao.maps.LatLng(lat, lng);
        
        geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0]?.address?.address_name || "주소 정보를 찾을 수 없음";
            setMyAddress(address);
          }
        });
      },
        
        
        (err) => {
          setState((prev)  => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }




  return (
    
    <PageContainer>
      <LayOut1>
        <Box1>
        <GrayBox onClick={() => {
          FindMyLocation();
          setmyLocationOpen(true);
          setState((prev) => ({
            ...prev,
            center: state.center,
            isPanto: true,
            errMsg: "",
            isLoading: false,
            level: 6
          }));
        }}>
        <MyLocationBtn src={myLocationIcon} alt="myLocationIcon"></MyLocationBtn>
        </GrayBox>
        <ZoomBox
        onClick={() => {
          myLocationLevel("decrease")
        }}
        >
          <ZoomBtn src={zoomIcon} alt="zoomIcon"></ZoomBtn>
        </ZoomBox>
        <ZoomBox2
          onClick={() => {
            myLocationLevel("increase")
          }}
        >
          <ZoomOutBox src={zoomoutIcon} alt="zoomoutIcon"></ZoomOutBox>
        </ZoomBox2>
      <>
      
        <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
          // 지도의 크기
          width: "550px",
          height: "580px",
        }}
        id="map"
        onCreate={setMap}
        level= {state.level} // 지도의 확대 레벨    
        zoomable={true}
        ref={mapRef}
    >

  

    {myLocationOpen && !state.isLoading && (
            <>
                <MapMarker position={state.center}
                >
                  <div style={{ padding: "5px", color: "#000", }}>
                    {state.errMsg ? state.errMsg : "내 위치"}
                  </div>
                </MapMarker>
                <CustomOverlayMap position={state.center}>

                <div className="wrap">
              <div className="info">
                <div className="title">
                  내 위치
                  <div
                    className="close"
                    onClick={() => setmyLocationOpen(false)}
                    title="닫기"
                  ></div>
                </div>
                <div className="body">
                  <div className="img">
                    <img
                      src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                      width="73"
                      height="70"
                      alt="카카오 스페이스닷원"
                    />
                  </div>
                  <div className="desc">
                    <div className="ellipsis" style={{color : "black"}}>
                    <strong>{myAddress}</strong>
                    </div>
                    <div className="jibun ellipsis">
                      (우) 63309 (지번) 영평동 2181
                    </div>
                    <div>
                      <a
                        href="https://www.kakaocorp.com/main"
                        target="_blank"
                        className="link"
                        rel="noreferrer"
                      >
                        홈페이지
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            ;
                </CustomOverlayMap>
            </>
          )} 


    <MarkerClusterer averageCenter={true} minLevel={8}>
      {updatedPositions.map((pos: any, i: any) => (
        <>
        <MapMarker 
          key={`${pos.position.lat}-${pos.position.lng}`}
          position={{
            lat: pos.position.lat,
            lng: pos.position.lng,
          }}
          image={{
            src : guitarIcon, // 마커이미지의 주소입니다
            size: {
              width: 25,
              height: 25,
            }, // 마커이미지의 크기입니다
          }}
          onClick={() => {
            setInfo(pos);
            const map = mapRef.current;
            if (map && map.getLevel() >= 8){
              const level = map.getLevel() - 3;
              map.setLevel(level, { anchor: new kakao.maps.LatLng(pos.position.lat, pos.position.lng) });
              }
              
              else { setIsOpenSmall(true)

              }
          }}// ✅ 마커 클릭 시 선택된 정보 저장
        />
        {isOpenSmall && info && info.position.lat === pos.position.lat && info.position.lng === pos.position.lng && (
            <CustomOverlayMap position={pos.position}>
            <div className="wrap">
              <div className="info">
                <div className="title">
                  {pos.content}
                  <div
                    className="close"
                    onClick={() => setIsOpenSmall(false)}
                    title="닫기"
                  ></div>
                </div>
                <div className="body">
                  <div className="img">
                    <img
                      src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                      width="73"
                      height="70"
                      alt="카카오 스페이스닷원"
                    />
                  </div>
                  <div className="desc">
                    <div className="ellipsis" style={{color : "black"}}>
                    <strong>위치:</strong> {pos.address}
                    </div>
                    <div className="jibun ellipsis">
                      (우) 63309 (지번) 영평동 2181
                    </div>
                    <div>
                      <a
                        href="https://www.kakaocorp.com/main"
                        target="_blank"
                        className="link"
                        rel="noreferrer"
                      >
                        홈페이지
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            ;
          </CustomOverlayMap>
          )}
        </>

      ))}

      
    </MarkerClusterer>

      



    </Map>
    </>
    </Box1>
   
    </LayOut1>
    <LayOut2>
      <SearchWrapper>
        <Box2>
          <InputBox type="text" placeholder="버스킹 일정이 궁금한 장소를 입력해보세요!" value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} onKeyDown={(e) => {
        if (e.key === "Enter") handleSearch();
      }}  // 입력값 업데이트
          /> 
          <FindIcon src={findIcon} alt="findIcon" onClick={handleSearch}></FindIcon>
        </Box2>
        <Box3>
          <CalenderIcon src={calenderIcon} alt="calenderIcon" onClick={()=>{calenderHandler()}}></CalenderIcon>
       
        </Box3>
      </SearchWrapper>
      <Box4>
        <TextBox1><DateBox>25년 02월 06일 </DateBox> <div>날짜로, </div></TextBox1>
        <TextBox2><div>현재</div> <LocationBox>녹산 전기</LocationBox> <div>근처에</div>  <CountBox >{positions2.length}개</CountBox> <div>의 버스킹 일정이 있어요!</div></TextBox2>
       
          { updatedPositions.map((pos :any, i : any)=> {return(
        <ScheduleBox>
          <ScheduleInnerBox key={i} 
          style={{
            padding: "8px 10px",
            borderBottom: "1px solid #eee",
            cursor: "pointer",
          }}
          onClick={() => {handleResultClick(pos); myLocationLevel("upgrade")} } // ✅ 클릭 시 해당 위치로 이동 & 마커 클릭 효과
          >
            <ScheduleImage src={images[i]} alt="scheduleImages"></ScheduleImage>
              <ScheduleInnerBox2>
                <ScheduleTitle>{pos.content}</ScheduleTitle>
                <ScheduleContent>{pos.address || "위치 불러오는 중..."}</ScheduleContent>
                <GenreBox>
                  <ScheduleGenre>장르1</ScheduleGenre>
                  <ScheduleGenre>장르1</ScheduleGenre>
                  <ScheduleGenre>장르1</ScheduleGenre>
                </GenreBox>
              </ScheduleInnerBox2>
                <OpenDetailBtn src={leftArrow} alt="leftArrow"></OpenDetailBtn>
          </ScheduleInnerBox>
        </ScheduleBox>
          )})}
        

      </Box4>
    </LayOut2>
  </PageContainer>
  );
};

export default SchedulePage;
