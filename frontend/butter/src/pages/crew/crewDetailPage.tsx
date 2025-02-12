import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import rightArrow from "../../assets/rightArrow.png"
import leftArrow from "../../assets/leftArrow.png"
import upArrow from "../../assets/upArrow.png"
import editButton from "../../assets/editButton.png"
import followButton from "../../assets/followButton.png"
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.jpg";
import sample3 from "../../assets/sample3.jpg";
import sample4 from "../../assets/sample4.jpg";
import sample5 from "../../assets/sample5.png";
import styled from "@emotion/styled";


const images = [sample1,sample2,sample3,sample4,sample5]


const PageContainer=styled.div`
  display: flex; /* Flexbox 레이아웃 */
  width: 100%;   /* 전체 너비 100% */
  padding: 20px 50px; /* 양쪽 끝에 20px의 여백 추가 */
  box-sizing: border-box; /* 패딩이 포함된 크기 계산 */
`


const LayOut1=styled.div`
  width: 50%; /* 6/10 너비 */
  padding: 20px;
  background-color: #202020(rgb 32, 32, 32);
  box-sizing: border-box;
  display : flex;
  flex-direction: column; /* 세로로 배치 */
  
`
const LayOut2=styled.div`
  width: 50%; /* 나머지 4/10 너비 */
  padding: 20px;
  background-color: #202020(rgb 32, 32, 32);
  box-sizing: border-box;
`
const LayOut3=styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
`

const Box1=styled.div`
  background-color: gray;
  width : 100%;
  box-sizing: border-box;
  height: 400px;
  border-radius: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`

const Box2=styled.div`
  border-radius: 20px;
  height: 140px;
  width: 140px;
  display: flex;
  position: relative;
`
const Box3=styled.div`
  background-color: rgb(22, 22, 22);
  border-radius: 20px;
  height: 180px;
  width : 45%;
  display: flex;
  padding-left: 20px;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  padding-top : 10px;
  padding-left: 20px;
  padding-bottom: 110px;
  padding-right: 20px;
  margin-left: 90px;
`

const Box4=styled.button`
  background-color: rgb(234, 36, 35);
  border-radius: 20px;
  height: 180px;
  width: 20%;
  color: white;
  display: flex;
  padding-top: 20px;
  padding-left: 20px;
  flex-direction: column;
  
`

const Box5=styled.div`
  background: var(--liner);
  color : black;
  border-radius: 20px;
  height: 300px;
  margin-bottom: 25px;

`

const Box6=styled.div`
  background-color: black;
  border-radius: 0 0 10px 10px; /* 상단은 0, 하단만 둥글게 */
  height: 50px;
  color: white;
  font-size: 20px;
  border-bottom: 1px dashed var(--darkgray);
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap : 12px;
`
const Box7=styled.div`
  border-radius: 10px 10px 0 0; /* 하단은 0, 상단만 둥글게 */
  background-color: #161616;
  height: 220px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
`

const Arrow = styled.img`
    height: 35px;
`

const EditButton = styled.img`
    height:  20px;
    margin-top: 5px;
`

const Right = styled.div`
    text-align: end;
    padding-right: 3%;
    padding-top: 2%;
`
const TextName = styled.div`
    font-size: 60px;
    font-weight: 500;

    margin-bottom: 10px;
`
const TextGenre = styled.div`
    font-size: 15px;
    
    white-space: pre;
`
const TextExplain = styled.div`
    font-size: 17px;

    padding-top: 2%;
`

const CrewMemberImage = styled.img`
    border-radius: 50%;
    height: 45px;
    width: 45px;
    margin-left: 10px;
`


const ImageMovingBox = styled.div`
padding-right : 10px;
display: flex;
gap: 10px;
`

const Box1BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    padding-bottom: 15px;
    padding-left: 10px;
`


const FollowButton = styled.img`
    height: 35px;
    margin-top: 10px;
    margin-right: 5px;
`
const CrewPicture = styled.img`
    height: 180px;
    width: 180px;
    border-radius: 20px;
`

const PlusBtn = styled.div`

`
const TextFollowNum = styled.div`
 width: 150px;
 position: absolute;
 top: 160px;
 left: 13px;
`

const NoticeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
    
`
const NoticeWrapperBox = styled.div`
    flex-direction: column;
    width: 75%;
`


const CrewNameWrapper = styled.div`
    padding-bottom: 180px;
    padding-left: 40px;
`

const NoticeTitle = styled.div`

`

const NoticeContent = styled.div`

`
const NoticeImg = styled.img`
    height: 50px;
    width: 60px;
`

const LiveText1 = styled.div`
    font-weight: bold;
`
const UpArrowTag = styled.img`
    height: 30px;
`

const SnsText = styled.div`
    display: flex;
    flex-direction: column;
`

const ServerUrl = 'http://i12e204.p.ssafy.io:8081'

function CrewDetailPage() {
    
    const navigate = useNavigate()
    const { id } = useParams(); // crewId 파라미터 가져옴
    const [ crewDetail, setCrewDetail ] = useState(null) // 크루 정보 받아오면 담을 변수
    const [ loading, setLoading ] = useState(true) // 로딩 표시하는 변수
    const [error, setError] = useState(null) // 에러 상태
    const [ crewScheduleDetail, setCrewScheduleDetail] = useState(['1번','2번','3번'])
    const [ crewNoticeDetail, setCrewNoticeDetail] = useState(['1번 공지사항','2번 공지사항','3번 공지사항', ])
 
    const [crewEditSwitch , setCrewEditSwitch] =  useState(false)
    const [crewDetailSwitch, setcrewDetailSwitch] = useState(true)

    const handleEditClick = () => {                        //수정하기 버튼 누르면 컴포넌트 바뀜
        setCrewEditSwitch(!crewEditSwitch);  
        setcrewDetailSwitch(!crewDetailSwitch);  
    };


    useEffect (() => {
        const fetchCrewDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${ServerUrl}/api/v1/crew/detail/${id}`) // 크루 디테일 정보 받아옴
                setCrewDetail(response.data);
                const scheduleResponse = await axios.get(`${ServerUrl}/api/v1/schedule/detail/${id}`) // 크루 스케쥴 정보 받아옴 
                setCrewScheduleDetail(scheduleResponse.data);
                const noticeResponse = await axios.get(`${ServerUrl}/api/v1/crew/notice/detail/${id}`) // 크루 공지사항 정보 받아옴
                setCrewNoticeDetail(noticeResponse.data);
                
            } catch (err:any) {
                setError(err.message); //요청 놓치면 에러 메세지 띄우기
            } finally {
                setLoading(false) // 요청 끝나면 로딩끄기
            }
        }

        if (id) {
            fetchCrewDetail();
        }
    }, [id])
    
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
       <PageContainer >
            <LayOut1 >
            
            {crewDetailSwitch && <div className="크루 디테일 정보">   
               
                <Box1>
                    <Right>
                    <EditButton onClick={() => handleEditClick()} src={editButton} alt="editButton"></EditButton>
                    </Right>
                    <CrewNameWrapper>
                        <TextName>Crew Name {id} {crewDetail}</TextName>
                        <TextGenre>크루 장르1     크루 장르2     크루 장르3 </TextGenre>
                        <TextExplain>이 크루는 이 세상 최고의 크루이며,,,{crewDetail}</TextExplain>
                    </CrewNameWrapper>
                    <Box1BottomWrapper>
                      <ImageMovingBox>
                        {images.map((a, i)=>{return(<CrewMemberImage src={a} alt="CrewMemberImage2"></CrewMemberImage>)})}
                      </ImageMovingBox>  
                        <FollowButton src={followButton} alt="followButton"></FollowButton>
                    </Box1BottomWrapper>
                </Box1>
                
                </div>}
                {crewEditSwitch && <CrewEditComponent1 crewDetail = {crewDetail} handleEditClick={handleEditClick}/>}
        <LayOut3>        
      
            {crewDetailSwitch &&   
                <Box2>
                    <CrewPicture src={sample3}></CrewPicture>
                    <TextFollowNum> 크루 팔로우 수 :</TextFollowNum>
                </Box2>
            }
            {crewEditSwitch && <CrewEditComponent2 />}
           
            <Box3> <SnsText><div style={{ fontSize : "20px"}}>SNS</div><div>link</div></SnsText> {crewDetail} <UpArrowTag src={upArrow} alt="upArrow"></UpArrowTag></Box3>
            <Box4 onClick={()=>{navigate(`/stream/live/${id}`)}}><LiveText1>Live</LiveText1><div>On</div> </Box4>
        </LayOut3>       
                </LayOut1>
                <LayOut2>
                <ScheduleEditComponent crewScheduleDetail={crewScheduleDetail} crewDetail={crewDetail} />
                
                <Box6><div>Notice</div><PlusBtn>+</PlusBtn></Box6>
                <Box7> {crewNoticeDetail.map((a, i)=>{return(<NoticeBox key={i}><NoticeImg src={images[i+1]}></NoticeImg><NoticeWrapperBox> <NoticeTitle>{i+1}번 Notice Title</NoticeTitle><NoticeContent> 내용{a}</NoticeContent></NoticeWrapperBox> <Arrow onClick={() => {navigate(`/crew/notice/detail/${id}/${i}`)}} src={rightArrow} alt="rightArrow"></Arrow></NoticeBox>)})}</Box7>
                </LayOut2>

         
       </PageContainer >
    )
}






// 스타일드 컴포넌트 정의
const CrewMemberEditModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CrewMemberEditModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
`;



function CrewEditComponent1({ crewDetail, handleEditClick }: { crewDetail: any; handleEditClick: () => void }) {

    const [crewMemberPlusModalOpen, setCrewMemberPlusModalOpen] = useState(false) // 크루 멤버 추가 모달 스위치

    return (
    <div>
     
        <Box1>
            <button onClick={handleEditClick}>취소</button>
            <button onClick={handleEditClick}>수정확정</button>
                  
            <div>크루 정보 : {crewDetail}</div>
            <div>크루 설명 : {crewDetail}</div>
            <div>크루 멤버1 사진 : {crewDetail} <button>멤버삭제</button></div>
            <div>크루 멤버2 사진 : {crewDetail} <button>멤버삭제</button></div>
            <div>크루 멤버3 사진 : {crewDetail} <button>멤버삭제</button></div>
            <div>크루 멤버4 사진 : {crewDetail} <button>멤버삭제</button></div>
          
            
            <button onClick={() =>setCrewMemberPlusModalOpen(true)}>멤버추가</button>
        </Box1>
        {crewMemberPlusModalOpen && (
            <CrewMemberEditModalOverlay>
                <CrewMemberEditModalContent>
                    <input type="text" placeholder="멤버 검색"/>
                    <button>검색하기</button>
                    <div><button>멤버 추가</button></div>
                    <div><button onClick={() => setCrewMemberPlusModalOpen(false)}>닫기</button></div>
                </CrewMemberEditModalContent>
            </CrewMemberEditModalOverlay>
         )}
    </div>
    
    )
}

function CrewEditComponent2() {

    const [crewMemberPlusModalOpen, setCrewMemberPlusModalOpen] = useState(false) // 크루 멤버 추가 모달 스위치

    return (
   
        <Box2>
            <CrewPicture src={sample3}></CrewPicture>
            <TextFollowNum> 크루 팔로우 수 :</TextFollowNum>
           </Box2>
           
    )
}




// 스타일드 컴포넌트 정의
const SchedulePlusModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SchedulePlusModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
`;


// 스타일드 컴포넌트 정의
const ScheduleDetailModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ScheduleDetailModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
`;

const ScheduleText = styled.div`
    display: flex;
    white-space: pre; /* 띄어쓰기를 그대로 유지 */
    align-items: center;
    padding-top: 25px;
    padding-left: 25px;
    padding-bottom: 10px;
    font-size: 23px;
    
`

const BuskingText = styled.p`
    font-weight: 550;
`

const Hr = styled.hr`
    border: none;
  border-top: 3px solid black; /* 가로줄 스타일 */
  margin: 10px 0; /* 위아래 여백 */
`

const LeftArrowTag= styled.img`
    height: 35px;
`

const ScheduleList = styled.div`
    display: grid;
    padding-left: 20px;
    padding-top: 10px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const ScheduleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
`

const ScheduleTitle = styled.div`
    flex-direction : column;
    width: 80%;
    color: rgb(74, 81, 73);
`

const ScheduleTitleComponent1 = styled.div`
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 10px;
`

const ScheduleImg = styled.img`
    height: 50px;
    width: 50px;
`

function ScheduleEditComponent({crewScheduleDetail,crewDetail}:any) {
    const [isSchedulePlusModalOpen, setisSchedulePlusModalOpen] = useState(false) // 스케쥴 추가 스위치
    const [isScheduleDetailModalOpen, setisScheduleDetailModalOpen] = useState(false) // 스케쥴 디테일 스위치
    const [isScheduleEditModalOpen, setisScheduleEditModalOpen] = useState(false) // 스케쥴 디테일 스위치
    const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<any>(null); // 선택된 스케줄 인덱스
    



    const openModal = () => {
        setisSchedulePlusModalOpen(true)
    }

    const closeModal = () => {
        setisSchedulePlusModalOpen(false)
    }

    return (
       <Box5>
        <div>
            <ScheduleText>
            <BuskingText >Busking </BuskingText> <p>Schedule </p>
            <p onClick={openModal}>+</p>
            
            </ScheduleText>
            <Hr />
        </div>
        <ScheduleList> 
            {
            crewScheduleDetail.map((a:any, i:any) => {
                return ( <ScheduleWrapper key={i}> <ScheduleImg src={images[i+1]} alt="ScheduleImg"></ScheduleImg> <ScheduleTitle><ScheduleTitleComponent1>{i+1}번 스케쥴 Title Section</ScheduleTitleComponent1><div>schedule detail content{a}</div></ScheduleTitle><LeftArrowTag onClick={()=> {setisScheduleDetailModalOpen(true); setSelectedScheduleIndex(i+1)}} src={leftArrow} alt="leftArrow"></LeftArrowTag></ScheduleWrapper>)
            })
            }
        </ScheduleList>
               {/* 스케쥴 추가 모달 */}
               {isSchedulePlusModalOpen && (
                <SchedulePlusModalOverlay>
                    <SchedulePlusModalContent>
                        <div><button onClick={() => setisSchedulePlusModalOpen(false)}>닫기</button></div>
                        <input type="text" placeholder="장소 검색" />
                        <div>장소 검색 결과</div>
                        <input type="text" placeholder="Type your schedule title" />
                        <input type="text" placeholder="This is the busking content section" />
                        <div>날짜 선택 콤보 상자</div>
                        <div>시간대 선택 콤보 상자</div>
                        <div>지도</div>
                        <button>생성</button>
                    </SchedulePlusModalContent>
                </SchedulePlusModalOverlay>
                )}


                   {/* 스케쥴 상세 정보 모달 */}
                   {isScheduleDetailModalOpen && 
                <ScheduleDetailModalOverlay>
                    <ScheduleDetailModalContent>
                        <div> 크루 이름 {crewDetail} | 크루 정보 <button onClick={() => { setisScheduleDetailModalOpen(false) }}>닫기</button></div>
                        <div> 스케쥴 제목 : {crewScheduleDetail[selectedScheduleIndex-1]}</div>
                        <button>북마크 버튼</button><button>삭제</button><button onClick={()=> {setisScheduleEditModalOpen(true); setisScheduleDetailModalOpen(false)}}>수정</button>
                        
                    </ScheduleDetailModalContent>
                </ScheduleDetailModalOverlay>
                }

                {/* 스케쥴 수정 모달 */}
               {isScheduleEditModalOpen && (
                <SchedulePlusModalOverlay>
                    <SchedulePlusModalContent>
                        <div><button onClick={() => setisScheduleEditModalOpen(false)}>닫기</button></div>
                        <input type="text" placeholder="장소 검색" />
                        <div>장소 검색 결과</div>
                        <input type="text" placeholder="Type your schedule title" />
                        <input type="text" placeholder="This is the busking content section" />
                        <div>날짜 선택 콤보 상자</div>
                        <div>시간대 선택 콤보 상자</div>
                        <div>지도</div>
                        <button>수정</button>
                    </SchedulePlusModalContent>
                </SchedulePlusModalOverlay>
                )}


       </Box5>
    )}


export default CrewDetailPage