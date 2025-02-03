import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import styled from "styled-components"
import rightArrow from "../../assets/rightArrow.png"
import leftArrow from "../../assets/leftArrow.png"
import editButton from "../../assets/editButton.png"
import followButton from "../../assets/followButton.png"
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.jpg";
import sample3 from "../../assets/sample3.jpg";
import sample4 from "../../assets/sample4.jpg";
import sample5 from "../../assets/sample5.png";


let PageContainer=styled.div`
  display: flex; /* Flexbox 레이아웃 */
  width: 100%;   /* 전체 너비 100% */
  padding: 20px 50px; /* 양쪽 끝에 20px의 여백 추가 */
  box-sizing: border-box; /* 패딩이 포함된 크기 계산 */
 
`


let LayOut1=styled.div`
  width: 55%; /* 6/10 너비 */
  padding: 20px;
  background-color: #202020(rgb 32, 32, 32);
  box-sizing: border-box;
  display : flex;
  flex-direction: column; /* 세로로 배치 */
  
`
let LayOut2=styled.div`
  width: 45%; /* 나머지 4/10 너비 */
  padding: 20px;
  background-color: #202020(rgb 32, 32, 32);
  box-sizing: border-box;
`
let LayOut3=styled.div`
  display: flex;
  padding: 5px;

  box-sizing: border-box;
 
`

let Box1=styled.div`
  background-color: gray;
  width : 100%;
  box-sizing: border-box;
  height: 500px;
  border-radius: 20px;
  margin-bottom: 50px;
`

let Box2=styled.div`
  background-color: #239152;
  border-radius: 20px;
  height: 150px;
  width: 150px;
  margin-right: 200px;
`
let Box3=styled.div`
  background-color: rgb(22, 22, 22);
  border-radius: 20px;
  height: 150px;
  width : 150px;
  margin-right: 50px;
`
let Box4=styled.button`
  background-color: rgb(234, 36, 35);
  border-radius: 20px;
  height: 150px;
`

let Box5=styled.div`
  background-color: #fffde4;
  color : black;
  border-radius: 20px;
  height: 380px;
  margin-bottom: 40px;

`

let Box6=styled.div`
  background-color: black;
  border-radius: 0 0 20px 20px; /* 상단은 0, 하단만 둥글게 */
  height: 80px;
  margin-bottom: 5px;
  color: white;
  font-size: 30px;
  padding-top: 5%;
  padding-left: 5%;
`
let Box7=styled.div`
  border-radius: 20px 20px 0 0; /* 하단은 0, 상단만 둥글게 */
  background-color: #161616;
  height: 200px;
  color: white;
  text-align: start;
  padding-top: 7%;
`

let Arrow = styled.img`
    height: 35px;
`

let EditButton = styled.img`
    height:  20px;
    
`

let Right = styled.div`
    text-align: end;
    padding-right: 3%;
    padding-top: 2%;
`
let TextName = styled.div`
    font-size: 60px;
    font-weight: 500;
    padding-left: 5%;
`
let TextGenre = styled.div`
    font-size: 15px;
    padding-left: 8%;
    white-space: pre;
`
let TextExplain = styled.div`
    font-size: 17px;
    padding-left: 8%;
    padding-top: 2%
`

let CrewMemberImage = styled.img`
    height: 40px;
    margin-left: 10px;
`
let ImageMovingBox = styled.div`
margin-top: 30%;
margin-left : 3%;

`

let FollowButton = styled.img`
    height: 30px;
    margin-left: 65%;
    margin-top: 3%;

`
let CrewPicture = styled.img`
    height: 150px;
    width: 150px;
`

let TextFollowNum = styled.div`
    position: absolute;
    top: 91.5%;
    left: 5%;
`

let ServerUrl = 'http://i12e204.p.ssafy.io:8081'

function CrewDetailPage() {
    
    let navigate = useNavigate()
    let { id } = useParams(); // crewId 파라미터 가져옴
    let [ crewDetail, setCrewDetail ] = useState(null) // 크루 정보 받아오면 담을 변수
    let [ loading, setLoading ] = useState(true) // 로딩 표시하는 변수
    let [error, setError] = useState(null) // 에러 상태
    let [ crewScheduleDetail, setCrewScheduleDetail] = useState(['1번','2번','3번'])
    let [ crewNoticeDetail, setCrewNoticeDetail] = useState(['1번 공지사항','2번 공지사항','3번 공지사항', ])
 
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
                    <TextName>Crew Name {id} {crewDetail}</TextName>
                    <TextGenre> 크루 장르1     크루 장르2     크루 장르3 </TextGenre>
                    <TextExplain>이 크루는 이 세상 최고의 크루이며,,,{crewDetail}</TextExplain>
                      <ImageMovingBox>
                        <CrewMemberImage src={rightArrow} alt="CrewMemberImage1"></CrewMemberImage>
                        <CrewMemberImage src={leftArrow} alt="CrewMemberImage2"></CrewMemberImage>
                        <CrewMemberImage src={rightArrow} alt="CrewMemberImage1"></CrewMemberImage>
                        <CrewMemberImage src={leftArrow} alt="CrewMemberImage2"></CrewMemberImage>
                        <FollowButton src={followButton} alt="followButton"></FollowButton>
                      </ImageMovingBox>  
                </Box1>
                </div>}
        <LayOut3>        
            {crewDetailSwitch && <div className="크루 디테일 정보">  
                <Box2>
                    <CrewPicture src={sample3}></CrewPicture>
                    <TextFollowNum> 크루 팔로우 수 :</TextFollowNum>
                </Box2>
          
            </div>}
          
            {crewEditSwitch && <CrewEditComponent crewDetail = {crewDetail} handleEditClick={handleEditClick}/>}
                <Box3> SNS {crewDetail}</Box3>
                <Box4 onClick={()=>{navigate(`/stream/live/${id}`)}}>Live 시청하기</Box4>
        </LayOut3>       
                </LayOut1>
                <LayOut2>
                <ScheduleEditComponent crewScheduleDetail={crewScheduleDetail} crewDetail={crewDetail} />
                
                <Box6>Notice</Box6>
                <Box7> {crewNoticeDetail.map((a, i)=>{return(<div key={i}>{i+1}번 공지사항 - 내용 : {a} <Arrow onClick={() => {navigate(`/crew/notice/detail/${id}/${i}`)}} src={rightArrow} alt="rightArrow"></Arrow></div>)})}</Box7>
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



function CrewEditComponent({ crewDetail, handleEditClick }: { crewDetail: any; handleEditClick: () => void }) {

    const [crewMemberPlusModalOpen, setCrewMemberPlusModalOpen] = useState(false) // 크루 멤버 추가 모달 스위치

    return (
    <div>
      
        <div>
            <button onClick={handleEditClick}>취소</button>
            <button onClick={handleEditClick}>수정확정</button>
                  
            <div>크루 정보 : {crewDetail}</div>
            <div>크루 설명 : {crewDetail}</div>
            <div>크루 멤버1 사진 : {crewDetail} <button>멤버삭제</button></div>
            <div>크루 멤버2 사진 : {crewDetail} <button>멤버삭제</button></div>
            <div>크루 멤버3 사진 : {crewDetail} <button>멤버삭제</button></div>
            <div>크루 멤버4 사진 : {crewDetail} <button>멤버삭제</button></div>
          
            
            <button onClick={() =>setCrewMemberPlusModalOpen(true)}>멤버추가</button>
        </div>
        <div>
            <div>크루 사진 : {crewDetail}</div>
            <div> 크루 팔로우 수 : {crewDetail}</div>
            <button>이미지로드</button>
        </div>
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

let ScheduleText = styled.div`
    display: flex;
    white-space: pre; /* 띄어쓰기를 그대로 유지 */
    padding-top: 5%;
    padding-left: 5%;
    font-size: 23px;
    
`

let BuskingText = styled.p`
    font-weight: 550;
    
`

let Hr = styled.hr`
    border: none;
  border-top: 3px solid black; /* 가로줄 스타일 */
  margin: 10px 0; /* 위아래 여백 */
`

let LeftArrowTag= styled.img`
    height: 35px;
`

let ScheduleList = styled.div`
    display: grid;
    padding-left: 5%;
    padding-top: 5%;
    gap: 50px;
`




function ScheduleEditComponent({crewScheduleDetail,crewDetail}:any) {
    const [isSchedulePlusModalOpen, setisSchedulePlusModalOpen] = useState(false) // 스케쥴 추가 스위치
    const [isScheduleDetailModalOpen, setisScheduleDetailModalOpen] = useState(false) // 스케쥴 디테일 스위치
    const [isScheduleEditModalOpen, setisScheduleEditModalOpen] = useState(false) // 스케쥴 디테일 스위치
    let [selectedScheduleIndex, setSelectedScheduleIndex] = useState<any>(null); // 선택된 스케줄 인덱스

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
            <BuskingText >Busking </BuskingText> <p>Schedule</p>
            <p onClick={openModal}>+</p>
            
            </ScheduleText>
            <Hr />
        </div>
        <ScheduleList> 
            {
            crewScheduleDetail.map((a:any, i:any) => {
                return ( <div key={i}> {i+1}번 스케쥴: {a} <LeftArrowTag onClick={()=> {setisScheduleDetailModalOpen(true); setSelectedScheduleIndex(i+1)}} src={leftArrow} alt="leftArrow"></LeftArrowTag></div>)
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