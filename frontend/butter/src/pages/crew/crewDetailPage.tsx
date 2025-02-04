import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import styled from "@emotion/styled"



let PageContainer=styled.div`
  display: flex; /* Flexbox 레이아웃 */
  width: 100%;   /* 전체 너비 100% */
  padding: 30px 50px; /* 양쪽 끝에 20px의 여백 추가 */
  box-sizing: border-box; /* 패딩이 포함된 크기 계산 */
`


let LayOut1=styled.div`
  width: 60%; /* 6/10 너비 */
  padding: 20px;
  background-color: lightblue;
  box-sizing: border-box;
  display : flex;
  flex-direction: column; /* 세로로 배치 */
`
let LayOut2=styled.div`
  width: 40%; /* 나머지 4/10 너비 */
  padding: 20px;
  background-color: lightcoral;
  box-sizing: border-box;
`

let Box1=styled.div`
  background-color: gray;
  width : 100%;
  box-sizing: border-box;
  
`

let Box2=styled.div`
  background-color: blue;
  
`
let Box3=styled.div`
  background-color: red;
`
let Box4=styled.button`
  background-color: green;
`

let Box5=styled.div`
  background-color: orange;
`

let Box6=styled.div`
  background-color: purple;
`
let Box7=styled.div`
  background-color: skyblue;
`


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
                // const response = await axios.get(`/api/v1/crew/detail/${id}`) // 크루 디테일 정보 받아옴
                // setCrewDetail(response.data);
                // const scheduleResponse = await axios.get(`/api/v1/schedule/detail/${id}`) // 크루 스케쥴 정보 받아옴 
                // setCrewScheduleDetail(scheduleResponse.data);
                // const noticeResponse = await axios.get(`/api/v1/crew/notice/detail/${id}`) // 크루 공지사항 정보 받아옴
                // setCrewNoticeDetail(noticeResponse.data);
                
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
            <LayOut1>
            
            {crewDetailSwitch && <div className="크루 디테일 정보">   
               
                <Box1>
                    <button onClick={() => handleEditClick()}>크루정보 수정</button> 
                    <div>{id}번 크루 이름 : {crewDetail}</div>
                    <div> 크루 장르 </div>
                    <div>크루 설명 : {crewDetail}</div>
                    <div>크루 멤버1 사진 : {crewDetail}</div>
                    <div>크루 멤버2 사진 : {crewDetail}</div>
                    <button>팔로우 하기</button>
                </Box1>
             
                <Box2>
                    <div>크루 사진 : {crewDetail}</div>
                    <div> 크루 팔로우 수 : {crewDetail}</div>
                </Box2>
          
                
            </div>}
          
            {crewEditSwitch && <CrewEditComponent crewDetail = {crewDetail} handleEditClick={handleEditClick}/>}
                <Box3> 홍보 url : {crewDetail}</Box3>
                <Box4 onClick={()=>{navigate(`/stream/live/${id}`)}}>Live 시청하기</Box4>
               
                </LayOut1>
                <LayOut2>
                <ScheduleEditComponent crewScheduleDetail={crewScheduleDetail} crewDetail={crewDetail} />
                
                <Box6>공지사항 목록</Box6>
                <Box7> {crewNoticeDetail.map((a, i)=>{return(<div key={i}>{i+1}번 공지사항 - 내용 : {a} <button onClick={() => {navigate(`/crew/notice/detail/${id}/${i}`)}}>공지사항 자세히보기</button></div>)})}</Box7>
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
            스케쥴 수정 컴포넌트
            <button onClick={openModal}>스케쥴 추가</button>
        </div>
        <div> 
            {
            crewScheduleDetail.map((a:any, i:any) => {
                return ( <div key={i}> {i+1}번 스케쥴: {a} <button onClick={()=> {setisScheduleDetailModalOpen(true); setSelectedScheduleIndex(i+1)}}>{i+1}번 스케쥴 자세히보기</button></div>)
            })
            }
        </div>
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