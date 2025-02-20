import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import FullCalendar from '@fullcalendar/react'
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from 'react';
import { axiosInstance } from '../../apis/axiosInstance';
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import notFollowedIcon from "../../assets/notFollowedIcon.png"
import followedIcon from "../../assets/followedIcon.png"
import "./MapCss2.css";


const Container = styled.div`
  /* position: relative; */
  height: 88%;
  display:flex;
  flex-direction: column;
  margin: 40px;
`

const Header = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 20px;
  
  #pageInfo {
      padding-top: 10px;
    }
    `;


const Text = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  font-size: 60px;
`

const BodyWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  gap: 50px;
`

const CalenderBox = styled.div`
  width: 40%;
  height: 100%;
  min-width: 550px;
  border-radius: 30px;
  padding: 20px;
  border: 2px solid white;
`

const DateTextBox = styled.p`
  padding-top: 5px;
`

const ModalCollumBox = styled.div`
    display: flex;
    flex-direction: column;
   
`
// 스타일드 컴포넌트 정의
const ScheduleDetailModalOverlay = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ScheduleDetailModalContent = styled.div`
    background: black;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    width: 450px;
    text-align: center;
    border-bottom: 1px dashed white;
`;

const ScheduleTitleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    #modalTitle {
      font-size: 20px;
    }

`
const GenreFlexBox = styled.div`
    display: flex;
    align-items: center;
    gap : 5px;
    padding-left: 50px;
`
const GenreBox = styled.div`
    border: 0.5px solid white;
    border-radius: 30px;
    font-size: 10px;
    font-weight: 200;
    padding: 5px;
    
    
`

const ScheduleDetailModalContent2 = styled.div`
    background: black;
    color: white;
    padding: 20px;
    border-radius: 10px;
    width: 450px;
    background-color:rgba(0, 0, 0, 0.8);
    height: 370px;

`;
const TextBox = styled.div`
    display: flex;
    flex-direction: column;
`

const TitleText = styled.div`
    font-size: 25px;
    padding-bottom: 10px;
 
`
const ContentText = styled.div`
    padding-bottom: 50px;
`

const FlexCan = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`
const DateText = styled.div`
    
`

const RadiusBox = styled.div`
    background-color: black;
    border-radius: 30px;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
`

const FollowedIcon = styled.img`
    height: 25px;
    width: 25px;

`
const NotFollowedIcon = styled.img`
    height: 25px;
    width: 25px;
`

const ButtonWrapper2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap : 5px;
`
const DeleteBox = styled.div`
    border: 1px solid white;
    padding: 5px;
    width: 50px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

`
const EditBox = styled.div`
       border: 1px solid white;
    padding: 5px;
    width: 50px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const PageTitleBox = styled.div`
  font-size: 100px;
  font-weight: 500;
`

const RtSide = styled.div`
  display: flex;
  flex-direction: column;
`

const SelectedDate = styled.div`
  font-size: 30px;
  font-weight: 200;
  padding: 15px 30px;
  width: 450px;
  background-color: black;
  border-radius: 30px;
  margin-bottom: 15px;
`

const MyCalendarPage = () => {



  const [selectedDate, setSelectedDate] = useState<any>(null);
  const calendarRef = useRef<FullCalendar | null>(null); // 🔥 useRef 타입 명시


  const handleDateSelect = (selectInfo: any) => {
    const selectedDate = selectInfo.startStr; // 선택한 날짜
    console.log("🗓 선택한 날짜:", selectedDate);
    setSelectedDate(selectedDate);
  }


  // 🔥 오늘 날짜를 YYYY-MM-DD 형식으로 가져오는 함수
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  };


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

  const [likedSchedule, setLikedSchedule] = useState<any>([])



  // 📌 FullCalendar 이벤트 변환 함수
  const transformEvents = (likedSchedule: any[]) => {
    return likedSchedule.map((event) => {
      const [year, month, day, hour, minute, second] = event.buskingDate;
      return {
        id: event.id.toString(),
        title: event.title,
        start: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`, // ✅ YYYY-MM-DD 형식 변환
        description: event.content,
        location: event.place,
        lat: event.latitude,
        lng: event.longitude
      };
    });
  };

  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    const fetchCrewDetail = async () => {
      try {

        const response = await axiosInstance.get(`schedule/like`) // 크루 디테일 정보 받아옴
        setLikedSchedule(response.data)
        console.log("response.data : ", response.data)
        const formattedEvents = transformEvents(response.data)
        console.log("음?", formattedEvents)
        setEvents(formattedEvents)

      } catch (err: any) {
        console.error("일정 데이터 로딩 실패", err)
      } finally {

      }
    }


    fetchCrewDetail();

  }, [])


  const [dayScheduleOPen, setdayScheduleOPen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // ✅ 선택된 이벤트 정보 저장
  const [bookmarked, setBookmarked] = useState(true);
  const [haveBookMarked, setHaveBookMarked] = useState(false)
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const mapRef = useRef<kakao.maps.Map>(null)


  const BookmarkPlus = async (scheduleId: number) => {
    try {

      const payload = { scheduleId: scheduleId }
      const res = await axiosInstance.post(`schedule/like`, payload)
      console.log(res.data)
      alert('북마크 성공!')
      setBookmarked(!bookmarked)
      console.log(bookmarked)
      setHaveBookMarked(!haveBookMarked)
    }
    catch {

    }
  }



  const BookmarkMinus = async (scheduleId: any) => {
    try {

      console.log(scheduleId)
      const res = await axiosInstance.delete(`schedule/like/${scheduleId}`)
      console.log(res.data)
      alert('북마크 취소 성공!')
      setBookmarked(!bookmarked)
      console.log(bookmarked)
      setHaveBookMarked(!haveBookMarked)
    } catch {

    }
  }


  const daySchedule = (info: any) => {
    console.log(info.event, "durl")
    setSelectedEvent(info.event); // ✅ 선택한 이벤트 저장
    setdayScheduleOPen(true)
  }


  console.log(selectedEvent, "이게 젤 중요")




  useEffect(() => {
    const FetchLikeList = async () => {
      try {
        const res = await axiosInstance.get('schedule/like')
        console.log(res.data, '새로운 좋아요리스트')
        setLikedSchedule(res.data)

      } catch {
        console.log("못받음")
      }

    }
    FetchLikeList()
    console.log("실행됨")
    for (let i = 0; i < likedSchedule.length; i++) {

      if (likedSchedule[i].id == selectedEvent.id) {
        setHaveBookMarked(true)
        return
      } else {
        setHaveBookMarked(false)
      }
    }
  }, [dayScheduleOPen])





  return (
    <Container>
      <Header>
        <Text>
          MY CALENDAR
        </Text>
        <div id="pageInfo">북마크한 버스킹 일정들을 한눈에 확인해보세요!</div>
      </Header>
      <BodyWrapper>
      <CalenderBox>
        <FullCalendar
          height={"100%"}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          select={handleDateSelect}
          events={events}
          eventClick={daySchedule}
          selectAllow={(selectInfo: any) => {
            return selectInfo.end - selectInfo.start === 86400000; // 하루(밀리초 단위)만 허용
          }}
          dateClick={(info) => { setSelectedDate(info.dateStr); }} // ✅ 날짜 클릭 시 업데이트
        />
        </CalenderBox>

        <RtSide>
        
        {dayScheduleOPen &&
        <>
          {/* 선택한 날짜를 화면에 표시 */}
          {selectedDate && <SelectedDate>{selectedEvent.start.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",})}</SelectedDate>}
          {/* 스케쥴 상세 정보 모달 */}

          <ModalCollumBox>
            <ScheduleDetailModalOverlay>
              <ScheduleDetailModalContent>
                <ScheduleTitleBox><div id="modalTitle">{selectedEvent.title}</div>  <div onClick={() => { setdayScheduleOPen(false) }}>X</div> </ScheduleTitleBox>

              </ScheduleDetailModalContent>
              <ScheduleDetailModalContent2>
                <TextBox>
                  <TitleText> {selectedEvent.title}</TitleText>
                  <ContentText> {selectedEvent.extendedProps.description}</ContentText>
                </TextBox>
                <FlexCan>
                  <DateText>{selectedEvent.start.toISOString().split("T")[0]}시 일자로, {selectedEvent.extendedProps.location}에서 버스킹합니다! </DateText>

                  <RadiusBox>
                    {haveBookMarked && <FollowedIcon src={followedIcon} alt="followedIcon" onClick={() => { BookmarkMinus(selectedEvent.id) }}></FollowedIcon>}
                    {!haveBookMarked && <NotFollowedIcon src={notFollowedIcon} alt="notFollowedIcon" onClick={() => { BookmarkPlus(selectedEvent.id) }}></NotFollowedIcon>}
                  </RadiusBox>
                </FlexCan>
                <Map // 지도를 표시할 Container
                  center={{ lat: selectedEvent.extendedProps.lat, lng: selectedEvent.extendedProps.lng }}
                  style={{
                    // 지도의 크기
                    width: "400px",
                    height: "180px",
                  }}
                  id="map"
                  onCreate={setMap}
                  level={7} // 지도의 확대 레벨    
                  zoomable={true}
                  ref={mapRef}
                >
                  <MapMarker position={{ lat: selectedEvent.extendedProps.lat, lng: selectedEvent.extendedProps.lng }}>
                  </MapMarker>
                </Map>
              </ScheduleDetailModalContent2>
            </ScheduleDetailModalOverlay>
          </ModalCollumBox>
        </>
        }
      </RtSide>
      </BodyWrapper>
    </Container>
  );
};

export default MyCalendarPage;