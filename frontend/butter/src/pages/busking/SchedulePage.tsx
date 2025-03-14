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
import downArrow from "../../assets/downArrow.png";
import zoomoutIcon from "../../assets/zoomOutIcon.png";
import guitarIcon from "../../assets/guitarIcon.png";
import { useEffect, useRef, useState } from "react";
import useKakaoLoader from "../crew/samplePage";
import { div, image } from "framer-motion/client";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { axiosInstance } from "../../apis/axiosInstance";
import axios, { Axios } from "axios";
import notFollowedIcon from "../../assets/notFollowedIcon.png"
import followedIcon from "../../assets/followedIcon.png"

const images = [sample1,sample2,sample3,sample4,sample5]

const BookMarkIcon = styled.img`
  height: 20px;
  width: 20px;
`

const PageContainer=styled.div`
display: grid; 
grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
grid-template-rows: 1fr;
width: 100%;   
height: 100%;
box-sizing: border-box; 
align-content: center;
padding: 30px 40px;
gap: 40px;

@media (max-width: 900px) {
}

`

const LayOut1 = styled.div`
  height: 100%;
  `

const LayOut2 = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    /* padding-top: 40px; */
`

const MapBox = styled.div`
  width: 100%;
  height: 100%;
`

const Box1 = styled.div`
  /* padding-top: 40px; */
  display: flex;
  position: relative;
  height: 100%;
`

const Header = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 20px;
  justify-content: flex-end;
  
  #pageInfo {
    padding-top: 10px;
  }
  `;


const Text = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  font-size: 60px;
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
  display: flex;
  flex: 1;
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
  position: relative;

`
const Box4 = styled.div`
  background: var(--liner);
  flex:1;
  /* width: 100%; */
  color: black;
  border-radius: 5px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
`

const CalenderBox = styled.div`
  z-index: 999;
  background-color: var(--bgColor);
  border-radius: 10px;
  padding: 20px;
  top: 60px;
  right: 20px;
  width: 440px;
  position: absolute;
  border: 1px solid white;
`

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  white-space: pre;
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
const MarginBox= styled.div`
  margin-left: 10px;
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
const HeightModify = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
  flex: 1;
  height: 50px;
  /* width: 420px; */
  padding-left: 20px;
  padding-right: 20px;
  font-size: 15px;
  border-width: 0;
`


const DateTextBox = styled.p`
  padding-top: 5px;
`

const DateTextBox2 = styled.p`
  z-index: 999;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: black;
  background: var(--liner);
  border-radius: 30px;
  height: 30px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
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
  const calendarRef = useRef<FullCalendar | null>(null); // 🔥 useRef 타입 명시
  const [selectedDate, setSelectedDate] = useState<any>(null);

  // 🔥 오늘 날짜를 YYYY-MM-DD 형식으로 가져오는 함수
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  };

  const [bookmarked, setBookmarked] = useState(true);
  const [haveBookMarked, setHaveBookMarked] = useState(false)



  const checkLikedSchedule = async (scheduleId : any) => {
    try {
      const res = await axiosInstance.get('schedule/like')
      console.log(res.data, "필요한 데이터"
   
      )
      // scheduleId가 존재하는지 확인
      const isBookmarked = res.data.some((a: any) => a.id === scheduleId);

      setHaveBookMarked(isBookmarked);
        
    } catch(err){
      console.log(err,"에러",)
    }
  }



  const BookmarkPlus = async (scheduleId : number) => {
    try {
    
        const payload = { scheduleId : scheduleId }
        const res = await axiosInstance.post(`schedule/like`, payload)
        console.log(res.data)
        alert('북마크 성공!')
        setBookmarked(!bookmarked)
        console.log(bookmarked)
        setHaveBookMarked(true)
     
    }
     catch {

    }
}



const BookmarkMinus = async (scheduleId : any) => {
    try {
        console.log(scheduleId)
        const res = await axiosInstance.delete(`schedule/like/${scheduleId}`)
        console.log(res.data)
        alert('북마크 취소 성공!')
        setBookmarked(!bookmarked)
        console.log(bookmarked)
        setHaveBookMarked(false)
     
        
    }
     catch {

    }
}

  // 날짜 선택하는 함수
  const handleDateSelect = (selectInfo: any) => {
    const selectedDate = selectInfo.startStr; // 선택한 날짜
    console.log("🗓 선택한 날짜:", selectedDate);
    
    setSelectedDate(selectedDate);

    // ✅ 백엔드 API 요청
  //   fetch(`${ServerUrl}/api/v1/schedule`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ selectedDate }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("🎸 버스킹 일정:", data);
  //     })
  //     .catch((error) => console.error("🚨 오류 발생:", error));
   };


  //  // 검색해주는 함수
  // const handleSearch = async () => {
  //   if (!searchTerm.trim()) return;
  //   console.log("검색어:", searchTerm);
  //   // 여기에 검색 로직 추가 (예: API 요청)
  //   const ps = new kakao.maps.services.Places()


  //   ps.keywordSearch(searchTerm, (data, status, _pagination) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       const bounds = new kakao.maps.LatLngBounds()
  //       let markers2 = []
      
  //       for (var i = 0; i < data.length; i++) {
  //         // @ts-ignore
  //         markers2.push({
  //           position: {
  //             lat: parseFloat(data[i].y),
  //             lng: parseFloat(data[i].x),
  //           },
  //           content: data[i].place_name,
  //         })
  //         // @ts-ignore
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
  //       }
      
  //       setMarkers(markers2)
      
  //       // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //       // map.setBounds(bounds)
  //     }
  //   })
  // };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    console.log("검색어:", searchTerm);
  
    try {
      // ✅ 백엔드 API 호출
      const response = await axiosInstance.get(`/schedule?keyword=${searchTerm}&&date=${selectedDate}`);
      console.log(searchTerm, selectedDate)
      if (Array.isArray(response.data)) {
        // ✅ 검색 결과를 마커 데이터로 변환
        console.log(response.data)
        const markers2 = response.data.map((place: any) => ({
          position: {
            lat: parseFloat(place.latitude), // ✅ 백엔드에서 `latitude` 제공
            lng: parseFloat(place.longitude), // ✅ 백엔드에서 `longitude` 제공
          },
          content: place.place, // ✅ 백엔드에서 `name` 또는 `place_name` 제공 // 여기서 받아오고 싶은 정보 추가하면 됨.
          description : place.content,
          crewImage : place.crew.imageUrl,
          crewName : place.crew.name,
          isLiked : place.isLiked,
          title : place.title,
          scheduleId : place.id,
        }));
  
        setMarkers(markers2);
  
        console.log("🚀 검색 결과:", markers2);
      } else {
        console.error("⚠️ API 응답이 배열이 아닙니다:", response.data);
        setMarkers([]);
      }
    } catch (error) {
      console.error("❌ 백엔드 검색 요청 실패:", error);
      setMarkers([]);
    }
  };




  //목록 선택하면 확대해서 보여주게하는 함수
  const handleResultClick = (pos: any) => {
    setInfo(pos); // ✅ 선택된 위치 정보 저장
    setIsOpenSmall(true); // ✅ 정보창 열기
    setmyLocationOpen(false);
    checkLikedSchedule(pos.scheduleId)
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



  // 지도 레벨 조정하는 함수
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



  // //맨처음 랜더링 될때 전국맛집 검색하기
  // useEffect(() => {
  
  //   // 분리 주석
  //   if (!map) return
  //   const ps = new kakao.maps.services.Places()

  //   ps.keywordSearch("전국 맛집", (data, status, _pagination) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       const bounds = new kakao.maps.LatLngBounds()
  //       let markers2 = []

  //       for (var i = 0; i < data.length; i++) {
  //         // @ts-ignore
  //         markers2.push({
  //           position: {
  //             lat: parseFloat(data[i].y),
  //             lng: parseFloat(data[i].x),
  //           },
  //           content: data[i].place_name,
  //         })
  //         // @ts-ignore
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
  //       }
      
  //       setMarkers(markers2)

  //       // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //       // map.setBounds(bounds)
  //     }
  //   })
    

  // }, [map])


    interface Position {
    position: {
      lat: number;
      lng: number;
    };
    content: string;
    address?: string; // 추가: 변환된 주소
  }

  
  // 지도 주소를 리스트에 추가해주는 함수
  const useGeocodePositions = (positions: Position[]) => {
    const [updatedPositions, setUpdatedPositions] = useState<Position[]>([]);
  
    useEffect(() => {
      if (!window.kakao || !window.kakao.maps) return;
      if (positions.length === 0)
         setUpdatedPositions([])
      else{
      const geocoder = new kakao.maps.services.Geocoder();
  
      const fetchAddresses = async () => {
        const results = await Promise.all(
          positions.map((pos) => 
            new Promise<Position>((resolve) => {
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
        console.log("updatedPosition", results)
      };
  
      fetchAddresses();}
    }, [positions]);  // ✅ positions이 변경될 때만 실행
  
    return updatedPositions;
  };
  
const updatedPositions = useGeocodePositions(positions2)

  // ✅ markers가 변경될 때 로그 출력
useEffect(() => {
  console.log("✅ markers 상태 업데이트됨:", markers);
  setPositions(markers)

}, [markers]);

  // positions2가 변경될 때 로그 출력
useEffect(() => {
  console.log("✅ positions2 상태 업데이트됨:", positions2);

}, [positions2]);


 // state가 변경될 때 로그 출력
useEffect(() => {
  console.log("✅ state 상태 업데이트됨:", state);

}, [state]);

 // state.center가 변경될 때 로그 출력
useEffect(() => {
  console.log("✅내 위치 업데이트 됨", state);

}, [state.center]);

 // state가 변경될 때 로그 출력
 useEffect(() => {
  console.log("✅ updatedpositions 상태 업데이트됨:", updatedPositions);

}, [updatedPositions]);



// 오늘 날짜 가져와서 선택 날짜를 오늘 날짜로 바꿔놓는 함수
useEffect(() => {
  const todayStr = getToday(); // 🔥 오늘 날짜 가져오기
  setSelectedDate(todayStr); // ✅ 초기값을 오늘 날짜로 설정
  
  if (calendarRef.current) {
    const calendarApi = calendarRef.current.getApi();
    const today = new Date();
    calendarApi.select({
      start: todayStr,
      end: todayStr,
      allDay: true,
    });

  }
}, []);


  // 현 위치 찾아주는 함수
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
            console.log("나또한 실행됨")
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


//   const [changeProcess, setChangeProcess] = useState<any>([]);
//   const divideSchedule = function (date: string, daySchedule: any) {
//      // ✅ date 값을 연도, 월, 일로 분해
//     const [year, month, day] = date.split("-").map(Number); // "2025-02-05" → [2025, 2, 5]

//     daySchedule.forEach((a: any) => {
//         // ✅ buskingDate에서 연도, 월, 일 추출
//         const [bYear, bMonth, bDay] = a.buskingDate;

//         // ✅ 연도, 월, 일이 동일한 경우만 추가
//         if (bYear === year && bMonth === month && bDay === day) {
//             setChangeProcess(daySchedule);
//             console.log("changeProgress : ", changeProcess)
//         }
//     });
//     // ✅ 상태 업데이트
//     setChangeProcess([...changeProcess]);
//     setPositions(changeProcess)
// };







  const [ loading, setLoading ] = useState(true) // 로딩 표시하는 변수
  const [error, setError] = useState(null) // 에러 상태
  const [daySchedule, setDaySchedule ] = useState<any>([])

  //오늘 날짜 가져와서 스케쥴 받아오는 함수
 
    const todayStr= getToday();// 🔥 오늘 날짜 가져오기
    const fecthDaySchedule = async () => {
      try {
          setLoading(true) 
          const response = await axiosInstance.get(`/schedule?pageSize=60&date=${todayStr}`)
          
          const schedules = response.data; // ✅ 데이터를 변수에 저장
          setDaySchedule(schedules); // ✅ 상태 업데이트

          console.log("daySchedule : ", schedules)

          const bounds = new kakao.maps.LatLngBounds();
          let markers3 = schedules.map((schedule: any) => ({
            position: {
              lat: parseFloat(schedule.latitude),
              lng: parseFloat(schedule.longitude),
            },
            content: schedule.place,
            description : schedule.content,
            crewImage : schedule.crew.imageUrl,
            crewName : schedule.crew.name,
            isLiked : schedule.isLiked,
            title : schedule.title,
            scheduleId : schedule.id,
          }));
    
          markers3.forEach((marker:any) => {
            bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng));
          });

          setMarkers(markers3); // ✅ markers3를 한 번에 업데이트

          
        }catch (err: any) {
            setError(err.message);
        } finally {
          setLoading(false)
        }
        }

 // state.center가 변경될 때 로그 출력
 useEffect(() => {
  fecthDaySchedule()

}, []);

  // const registerSchedule = function (date : string, daySchedule : any ) {
  //   const [changeProcess, setChangeProcss] = useState([{position : {lan: "", lng: ""}, content : "", place:"", title:"", buskingDate : [], crew : {}}])
  //   daySchedule.map((a : any, i : number)=> {changeProcess.push({position :{lan : a.latitude, lng: a.longitude}, content : a.content, place: a.place, title: a.title, buskingDate : a.buskingDate, crew : a.crew }) })

  // }
  
  const ChooseDay = async (selectedDate: any) => {
    try {
      const response = await axiosInstance.get(`/schedule?pageSize=60&date=${selectedDate}`);
      
      const schedules = response.data; // ✅ 데이터를 변수에 저장
      setDaySchedule(schedules); // ✅ 상태 업데이트
  
      console.log("daySchedule : ", schedules);
  
      const bounds = new kakao.maps.LatLngBounds();
      let markers3 = schedules.map((schedule: any) => ({
        position: {
          lat: parseFloat(schedule.latitude),
          lng: parseFloat(schedule.longitude),
          
        },
        content: schedule.place,
        description : schedule.content,
        crewImage : schedule.crew.imageUrl,
        crewName : schedule.crew.name,
        isLiked : schedule.isLiked,
        title : schedule.title,
        scheduleId : schedule.id,
      }));
  
      markers3.forEach((marker:any) => {
        bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng));
      });
  
      setMarkers(markers3); // ✅ markers3를 한 번에 업데이트
    } catch (err: any) {
      setError(err.message);
    }
  };





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
        <MapBox>
        <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
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
                    <div className="ellipsis" style={{color : "white"}}>
                    <strong>{myAddress}</strong>
                    </div>
                    <div className="jibun ellipsis">
                      
                    </div>
                    <div>
                    
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
                    setHaveBookMarked(false)
                    checkLikedSchedule(pos.scheduleId)
                  
              }
          }}// ✅ 마커 클릭 시 선택된 정보 저장
        />
        {isOpenSmall && info && info.position.lat === pos.position.lat && info.position.lng === pos.position.lng && (
            <CustomOverlayMap position={pos.position}>
            <div className="wrap" style={{zIndex : "9999"}}>
              <div className="info">
                <div className="title" style={{color: "white"}}>
                  {pos.title}
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
                    <div className="ellipsis" style={{color : "white"}}>
                    {pos.crewName}
                    </div>
                    <div className="jibun ellipsis">
                    {pos.description}
                    </div>
                    <div style={{color: "white"}}>
                    {pos.address}
                        
                    
                    </div>
                    {haveBookMarked && <BookMarkIcon src={followedIcon} alt="followedIcon" onClick={()=>{ BookmarkMinus(pos.scheduleId)}}></BookMarkIcon>}
                    {!haveBookMarked && <BookMarkIcon src={notFollowedIcon} alt="notFollowedIcon" onClick={()=>{BookmarkPlus(pos.scheduleId)}}></BookMarkIcon>}
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

      


      <DateTextBox2>날짜 : {selectedDate}</DateTextBox2>
      </Map>
      </MapBox>
    </Box1>
   
    </LayOut1>
    <LayOut2>
    <Header>
        <Text>
          Map
        </Text>
        <div id="pageInfo">버스킹 일정들을 지도에서 확인하고 북마크 해보세요!</div>
      </Header>
      <SearchWrapper>
        <Box2>
          <InputBox type="text" placeholder="버스킹 장소를 검색해 보세요!" value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} onKeyDown={(e) => {
        if (e.key === "Enter") handleSearch();
      }}  // 입력값 업데이트
          /> 
          <FindIcon src={findIcon} alt="findIcon" onClick={handleSearch}></FindIcon>
        </Box2>
        <Box3>
          <CalenderIcon src={calenderIcon} alt="calenderIcon" onClick={()=>{calenderHandler()}}></CalenderIcon>
          
          {calenderOpen && <CalenderBox> <FullCalendar
                height={"350px"}
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                selectable= {true}
                select={handleDateSelect}
                selectAllow={(selectInfo : any) => {
                  return selectInfo.end - selectInfo.start === 86400000; // 하루(밀리초 단위)만 허용
                }}
                dateClick={(info) => {setSelectedDate(info.dateStr); ChooseDay(selectedDate);} } // ✅ 날짜 클릭 시 업데이트
              />
                {/* 선택한 날짜를 화면에 표시 */}
                {selectedDate && <DateTextBox>선택한 날짜: {selectedDate}</DateTextBox>}
              </CalenderBox>}
            
        </Box3>
      </SearchWrapper>
      <Box4>
        <MarginBox>
        <TextBox1><DateBox>{selectedDate} </DateBox> <div>날짜로, </div></TextBox1>
        <TextBox2><div>현재</div> <LocationBox> {searchTerm} </LocationBox> <div>근처에</div>  <CountBox >{positions2.length}개</CountBox> <div>의 버스킹 일정이 있어요!</div></TextBox2>
        </MarginBox>
        <hr style={{border : "1px solid black", marginBottom: "0px"}}/>
       <HeightModify id="scroll-area3">
      
          {updatedPositions.length >0 ? updatedPositions.map((pos :any, i : any)=> {return(
        <ScheduleBox>
          <ScheduleInnerBox key={i} 
          style={{
            padding: "8px 10px",
            borderBottom: "1px solid #000000",
            cursor: "pointer",
          }}
          onClick={() => {handleResultClick(pos); myLocationLevel("upgrade")} } // ✅ 클릭 시 해당 위치로 이동 & 마커 클릭 효과
          >
            <ScheduleImage src={pos.crewImage} alt="scheduleImages"></ScheduleImage>
              <ScheduleInnerBox2>
                  <ScheduleGenre>{pos.crewName}</ScheduleGenre>
                <ScheduleContent>{pos.description}</ScheduleContent>
                <GenreBox>
                <ScheduleTitle>{pos.content}에서 만나요!</ScheduleTitle>
                
                </GenreBox>
              </ScheduleInnerBox2>
                <OpenDetailBtn src={leftArrow} alt="leftArrow"></OpenDetailBtn>
          </ScheduleInnerBox>
        </ScheduleBox>
        
       )}) :  (
        <p style={{ textAlign: "center", padding: "10px" }}>검색 결과가 없습니다.</p>
      )}
        
        </HeightModify>
      </Box4>
    </LayOut2>
  </PageContainer>
  );
};

export default SchedulePage;
