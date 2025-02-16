import * as MC from "./modalComponents/modalComponents.tsx"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer} from "react-kakao-maps-sdk";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import guitarIcon from "../../assets/guitarIcon.png";
import findIconBlack from "../../../assets/findIconBlack.png";
import locationIcon from "../../../assets/locationIcon.png";
import selectIcon from "../../../assets/selectIcon.png";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { axiosInstance } from "../../../apis/axiosInstance.ts";

interface ModalSizeProps {
width: string;
height: string;
}

interface ModalProps extends ModalSizeProps {
setModalType: React.Dispatch<React.SetStateAction<string>>;
}

// CrewSearch Styled
const SchedulePlusForm = styled.form`
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
`;

const SchedulePlusTitleInput = styled.input`
width: 100%;
height: 40px;
border-radius: 30px;
border: none;
padding: 0 15px;
`;

const Check = styled.div`
    display: flex;
`
const Hr = styled.hr`
    border: none;
  border-top: 3px solid white; /* 가로줄 스타일 */
  margin:0; /* 위아래 여백 */
`
const Hr2 = styled.hr`
    border: none;
  border-top: 3px solid white; /* 가로줄 스타일 */
  margin:0px; /* 위아래 여백 */
  
`
const ABC = styled.div`
   position: relative;
  
`
const ABCD = styled.div`
    position: absolute;
    top: 10px;
`

const FindIcon = styled.img`
    height: 25px;
    width: 25px;
`

const SearchWrapper = styled.div`
    display: flex;
    background-color: white;
    border-radius: 30px;
    align-items: center;
    padding-right: 10px;
    gap:5px;
`

const SearchResultBox = styled.div`
    background: var(--liner);
    color: black;
    display: flex;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LocationIcon = styled.img`
    height: 25px;
    width: 25px;
`
const SelectIcon = styled.img`
    height: 20px;
    width: 40px;
`
const DateSelectWrapper = styled.div`
    display: flex;
    gap : 5px;
`
const AddressText = styled.div`
  padding-right: 40px;
`
const SelectText = styled.div`
  border-radius: 30px;
  background-color: black;
  color : white;
  height: 30px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`




export const SchedulePlusModal = ({ setModalType, width, height, id }: any) => {
      const [state, setState] = useState<any>({
        center: {
          lat: 36.350701,
          lng: 127.870667,
        },
        isPanto: false,
        errMsg:null,
        isLoading: true,
        level : 7
      })
      const [map, setMap] = useState<kakao.maps.Map | null>(null);    
 const mapRef = useRef<kakao.maps.Map>(null)     
const { register, handleSubmit } = useForm();
const [selectedTime, setSelectedTime] = useState<any>(null);
const [selectedDate, setSelectedDate] = useState<any>(null);
const navigate = useNavigate(); // useNavigate 훅 추가
const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/stream/${data.roomName}`, {
    state: {
        roomName: data.roomName,
        role: "publisher",
        participantName: "dahee",
    },
    });
    setModalType("");
};

  const [marker, setMarker] = useState<kakao.maps.Marker | null>(null);
  const [address, setAddress] = useState<any>("");
  const [position, setPosition] = useState<any>([{content:address, position:0.0}]);
const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } |null>(null);
const [myAddress, setMyAddress] = useState<string>(""); // 내 위치 주소 저장
const markerRef = useRef<kakao.maps.Marker | null>(null); // ✅ 기존 마커를 저장할 ref
const [markers, setMarkers] = useState<any>([]);

 // 지도 주소를 리스트에 추가해주는 함수
 const useGeocodePositions = (positions: any) => {
  const [updatedPositions, setUpdatedPositions] = useState<any>([]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;
    if (positions.length === 0) return;

    const geocoder = new kakao.maps.services.Geocoder();

    const fetchAddresses = async () => {
      console.log("positions : ", positions)
      const results = await Promise.all(
        positions.map((pos : any) => 
          new Promise<any>((resolve) => {
            geocoder.coord2Address(pos.position.lng, pos.position.lat, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                resolve({ ...pos, address: result[0]?.address?.address_name || "알 수 없음" });
              } else {
                resolve({ ...pos, address: "주소 변환 실패" });
              }
            });
          })
        )
      );

      setUpdatedPositions(results);  // ✅ 모든 변환 완료 후 상태 업데이트
    };

    fetchAddresses();
  }, [positions]);  // ✅ positions이 변경될 때만 실행

  return updatedPositions;
};

const updatedPositions = useGeocodePositions(position)


 // 📌 현재 위치 가져오기 (Geolocation API)
 useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setMyLocation({ lat, lng });

          // 카카오 지도 초기화
          kakao.maps.load(() => {
            const container : any = document.getElementById("map");
            const options = {
              center: new kakao.maps.LatLng(lat, lng), // 현재 위치 기준으로 지도 표시
              level: 7,
            };
            const newMap = new kakao.maps.Map(container, options);
            setMap(newMap);

            // 현재 위치 마커 추가
            const myMarker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(lat, lng),
              map: newMap,
              title: "내 위치",
            });

            setMarker(myMarker);

            // 📌 현재 위치의 주소 변환
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(lng, lat, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                const roadAddress = result[0]?.road_address?.address_name || "";
                const jibunAddress = result[0]?.address?.address_name || "";
                setAddress(roadAddress || jibunAddress || "주소를 찾을 수 없음");
              }
            });
            


            // 📌 지도 클릭 이벤트 등록 (사용자가 클릭한 곳에 마커 생성)
            kakao.maps.event.addListener(newMap, "click", (mouseEvent: any) => {
              const latlng = mouseEvent.latLng; // 클릭한 위치의 위도, 경도

               // ✅ 기존 마커가 있다면 지도에서 삭제
               if (markerRef.current) {
                markerRef.current.setMap(null);
              }


              // 새 마커 생성
              const newMarker = new kakao.maps.Marker({
                position: latlng,
                map: newMap,
              });

              markerRef.current = newMarker;
              setPosition({ lat: latlng.getLat(), lng: latlng.getLng() });

              // 주소 변환
              geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  const roadAddress = result[0]?.road_address?.address_name || "";
                  const jibunAddress = result[0]?.address?.address_name || "";
                  setAddress(roadAddress || jibunAddress || "주소를 찾을 수 없습니다.");
                }
              });
            });
          });
        },
        (err) => {
          console.error("Geolocation 오류:", err.message);
        }
      );
    } else {
      console.error("Geolocation을 사용할 수 없습니다.");
    }
  }, []);


const [selectDate, setSelectDate] = useState<any>("")

  // 🔥 오늘 날짜를 YYYY-MM-DD 형식으로 가져오는 함수
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  };

  useEffect(() => {
    const todayStr = getToday(); // 🔥 오늘 날짜 가져오기
    setSelectDate(todayStr)
  }, []);



  const [searchTerm, setSearchTerm] = useState("");
  // 검색해주는 함수
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    console.log("검색어:", searchTerm);
    // 여기에 검색 로직 추가 (예: API 요청)
    const ps = new kakao.maps.services.Places()


    ps.keywordSearch(searchTerm, (data, status, _pagination) => {
      if (!map) return;
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers2 : any = []
      
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
        console.log(markers2)
        setMarkers(markers2)

        // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
         map.setBounds(bounds)
         map.setLevel(6)
      }
    })
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
   // 🔹 입력값 변경 시 상태 업데이트
   const handleTitleChange = (e : any) => setTitle(e.target.value);
   const handleContentChange = (e : any) => setContent(e.target.value);
   const [response, setResponse] = useState(null);
   const [error, setError] = useState(null);
       // 🔹 입력값을 저장할 상태 변수
  useEffect(() => {
    setPosition(markers)
  }, [markers]); 




  const SchedulePost = async() => {
    
    const selectedDate2 = format(selectedDate, "yyyy-MM-dd", { locale: ko })
    const selectedTime2 = format(selectedTime, "HH:mm:ss", { locale: ko })
    console.log(selectedDate2,selectedTime2 )
    const buskingDate = `${selectedDate2}T${selectedTime2}.908Z`;

   
  
      try {
        const payload = {
          crewId: id,
          buskingDate : buskingDate,
          title: title,
          content: content,
          place: address,
          latitude: position.lat,
          longitude: position.lng,
        };
        console.log(payload)
        const res = await axiosInstance.post("/schedule", payload);
  
        setResponse(res.data);
        alert("스케줄이 성공적으로 등록되었습니다!");
      } catch (err : any) {
        console.error("에러 발생:", err);
        setError(err.message);
        alert("스케줄 등록 중 오류가 발생했습니다.");
      }
    };


const Scroll = styled.div`
  overflow-y: auto;
`


const SelectLocation = (locate: any) => {
  if (!map) return;

  const bounds = new kakao.maps.LatLngBounds();
  const position = new kakao.maps.LatLng(locate.lat, locate.lng);
  bounds.extend(position);

  if (marker) {
    marker.setMap(null);
  }

  const newMarker = new kakao.maps.Marker({
    position: position,
    map: map,
  });

  setMarker(newMarker);

  // ✅ 마커 클릭 시 정보창 표시
  const infoWindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:5px; color:black;">선택한 위치</div>`,
  });

  kakao.maps.event.addListener(newMarker, "click", () => {
    infoWindow.open(map, newMarker);
  });

  map.setBounds(bounds);
  map.setLevel(6);

  setState((prev: any) => ({
    ...prev,
    center: {
      lat: locate.lat,
      lng: locate.lng,
    },
    isPanto: true,
  }));
};




return (
    <ABC>
        <ABCD>
    <MC.ModalOverlay />
    <MC.ModalWrapper_v3 width={width} height={height}>
        <Check>

    <MC.ModalBody_v3>
       
            <SearchWrapper>
            <SchedulePlusTitleInput
            placeholder="장소를 입력해주세요"
            {...register("roomName", { required: true })}
            value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} onKeyDown={(e) => {if (e.key === "Enter") handleSearch()}}
            >
            </SchedulePlusTitleInput>
            <FindIcon src={findIconBlack} alt="findIcon" onClick={handleSearch}></FindIcon>    
            </SearchWrapper>
            <Hr/>
            <div>장소명 {searchTerm} 검색결과</div>
            <Scroll>
              {markers.map((a :any, i:any)=>{return(<SearchResultBox>
                  <LocationIcon src={locationIcon} alt="locationIcon"></LocationIcon>
                  <AddressText>{a.content}</AddressText>
                  <SelectText onClick={()=>{setAddress(a.content); setPosition(a.position); SelectLocation(a.position)}}>select</SelectText>
              </SearchResultBox>)})}
              </Scroll>
    <DateSelectWrapper>    
        <div>
      <label>날짜 선택: </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date : any) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd" // 날짜 포맷 설정
        minDate={new Date()} // 오늘 이후의 날짜만 선택 가능
      />
      <p>선택한 날짜: {selectedDate && format(selectedDate, "yyyy-MM-dd", { locale: ko })}</p>
    </div>
    <div>
      <label>시간 선택: </label>
      <DatePicker
        selected={selectedTime}
        onChange={(date : any) => setSelectedTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30} // 30분 간격
        timeCaption="시간"
        dateFormat="HH:mm"
      />
      {selectedTime && <p>선택한 시간: {selectedTime.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</p>}
    </div>
    </DateSelectWrapper>
        </MC.ModalBody_v3>
        <div>
        <MC.ModalHeader2>
            <div>CREATE BUSKING SCHEDULE</div>
            <MC.ModalCloseBtn
                textColor="white"
                onClick={() => {
                setModalType("");
                }}
            >
                X
            </MC.ModalCloseBtn>
            </MC.ModalHeader2>
        <MC.ModalBody_v4>
        <MC.Comment_v3 type="text" placeholder="Type your schedule title." value={title} onChange={handleTitleChange}></MC.Comment_v3>
        <Hr2 />
        <MC.Comment_v4 type="text" placeholder="This is the busking content Section." value={content} onChange={handleContentChange}></MC.Comment_v4>
      

                            <MC.ModalHeader3>
                            <div> {selectDate}날짜로, {address}에서 버스킹 하시는게 맞으실까요?</div>
                            <MC.FilledBtn width="70px" height="30px" color="var(--yellow)" textColor="black" onClick={() => {SchedulePost()}}>생성</MC.FilledBtn>
                            </MC.ModalHeader3>
                            <Map // 지도를 표시할 Container
                                    center={state.center}
                                    isPanto={state.isPanto}
                                    style={{
                                    // 지도의 크기
                                    width: "400px",
                                    height: "200px",
                                    }}
                                    id="map"
                                    onCreate={setMap}
                                    level= {7} // 지도의 확대 레벨    
                                    zoomable={true}
                                    ref={mapRef}
                                >
                                    <MapMarker position={state.center}
                >
                  <div style={{ padding: "5px", color: "#000", }}>
                    {state.errMsg ? state.errMsg : "내 위치"}
                  </div>
                </MapMarker>

                                </Map>
                                
     
        </MC.ModalBody_v4>
        </div>
        </Check>
    </MC.ModalWrapper_v3>
    </ABCD>
    </ABC>
    
);
};