import axios from "axios"
import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import rightRightArrow from "../../assets/rightRightArrow.png"
import rightRightArrowBlack from "../../assets/rightRightArrowBlack.png"
import editButton from "../../assets/editButton.png"
import deleteButton from "../../assets/deleteButton.png"
import styled from "@emotion/styled";


const images = [sample1,sample2,sample3,sample4,sample5]

import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.jpg";
import sample3 from "../../assets/sample3.jpg";
import sample4 from "../../assets/sample4.jpg";
import sample5 from "../../assets/sample5.png";
import { axiosInstance } from "../../apis/axiosInstance"


const ServerUrl = 'http://localhost:8080'

const PageContainer=styled.div`
  display: flex; /* Flexbox 레이아웃 */
  width: 100%;   /* 전체 너비 100% */
  padding: 20px 50px; /* 양쪽 끝에 20px의 여백 추가 */
  box-sizing: border-box; /* 패딩이 포함된 크기 계산 */
`

const LayOut1=styled.div`
  width: 40%; /* 6/10 너비 */
  padding: 20px 10px 20px 20px;
  background-color: #202020(rgb 32, 32, 32);
  box-sizing: border-box;
  display : flex;
  flex-direction: column; /* 세로로 배치 */
  
`
const LayOut2=styled.div`
  width: 60%; /* 나머지 4/10 너비 */
  padding: 20px 20px 20px 10px;
  background-color: #202020(rgb 32, 32, 32);
  box-sizing: border-box;
`

const Box1 = styled.div`
  background-color: black;
  border-radius: 0 0 10px 10px; /* 상단은 0, 하단만 둥글게 */
  height: 70px;
  color: white;
  font-size: 24px;
  border-bottom: 1px dashed var(--darkgray);
  display: flex;
  align-items: center;
  padding-left: 25px;
  gap : 10px;
`

const Box2 = styled.div`
      border-radius: 10px 10px 0 0; /* 하단은 0, 상단만 둥글게 */
  background-color: #161616;
  height: 450px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
`

const Box3 = styled.div`
    display: flex;
    align-items: center;
    background-color: var(--yellow);
    margin-top: 15px;
    color : black;
    height: 60px;
    border-radius: 30px;
    padding-left: 40px;
    justify-content: space-between;
    padding-right: 20px;
`

const Box4 = styled.div`
  background-color: black;
  border-radius: 0 0 10px 10px; /* 상단은 0, 하단만 둥글게 */
  height: 70px;
  color: white;
  font-size: 24px;
  border-bottom: 1px dashed var(--darkgray);
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap : 20px;
`

const Box5 = styled.div`
      border-radius: 10px 10px 0 0; /* 하단은 0, 상단만 둥글게 */
  background-color: black;
  height: 530px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
`

const RightRightArrow = styled.img`
    height: 35px;
`


const NoticeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
    padding-bottom: 20px;
`

const NoticeText = styled.div`
    display: flex;
    flex-direction: column;
    gap : 5px;
    padding-right: 285px;

`

const PlusBtnWrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: 200;
    gap: 10px;
`

const NoticeImage = styled.img`
    height: 40px;
    width: 40px;

`
const NoticeImage2 = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 10px;
`
const GoBackText = styled.div`
    display: flex;
    white-space: pre;
    margin-right: 10px;
    font-size: 20px;
`

const CrewPageText = styled.div`
    font-weight: 500;
`

const EditAndDelBtn = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-right: 25px;
`

const EditButton = styled.img`
    height: 25px;
    padding-left: 375px;
`

const DeleteButton = styled.img`
    height: 25px;
`

function CrewNoticePage() {

    const { id, noticeId } : any = useParams(); // crewId 파라미터 가져옴
    const [ crewDetail, setCrewDetail ] = useState<any>(null) // 크루 정보 받아오면 담을 변수
    const [ crewNoticeDetail, setCrewNoticeDetail] = useState<any>(['1th Notice','2th Notice','3th Notice', ])
    const [ loading, setLoading ] = useState(true) // 로딩 표시하는 변수
    const [error, setError] = useState(null) // 에러 상태
    const navigate = useNavigate()
    const [noticeSwitch, setNoticeSwitch ] = useState(true)
    const [noticePlusSwitch, setNoticePlusSwitch ] =useState(false)
    const [noticeEditSwitch, setNoticeEditSwitch ] = useState(false)
    const [basicNum , setBasicNum] = useState<number>(noticeId)


    const plusHandlerOn = () => {
        setNoticeSwitch(false)
        setNoticePlusSwitch(true)
        setNoticeEditSwitch(false)
    }

    const plusHandlerOff = () => {
        setNoticeSwitch(true)
        setNoticePlusSwitch(false)
    }
    
    const editHandlerOn = () => {
        setNoticeSwitch(false)
        setNoticeEditSwitch(true)
        setNoticePlusSwitch(false)
    }

    const editHandlerOff = () => {
        setNoticeSwitch(true)
        setNoticeEditSwitch(false)
    }

    useEffect (() => {
        const fetchCrewDetail = async () => {
            try {
                const noticeResponse = await axiosInstance.get(`/crew/notice/detail/${id}`) // 크루 공지사항 정보 받아옴
                setCrewNoticeDetail([noticeResponse.data]);
                console.log("noticeResponse.data : ",noticeResponse.data)
                const response = await axiosInstance.get(`/crew/detail/${id}`) // 크루 디테일 정보 받아옴
                setCrewDetail(response.data);
                console.log("response.data : ", response.data)
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
    <PageContainer>
            <LayOut1>
            <Box1>
                {crewDetail.name}
            <PlusBtnWrapper><div> Notice </div><div onClick={() => plusHandlerOn()} style={{fontSize: "30px"}}>+</div></PlusBtnWrapper>
            </Box1>
            <Box2>
            <div>{
                crewNoticeDetail.map((a:any, i:any) => {
                    return ( <NoticeWrapper> <NoticeImage src={images[i]} alt="noticeImg"></NoticeImage><NoticeText><div style={{fontSize: "20px"}}>{a.title}</div>  <div>{a.content}</div></NoticeText> <RightRightArrow onClick={() => {setBasicNum(i)}} src={rightRightArrow} alt='rightRightArrow'></RightRightArrow></NoticeWrapper> )
                })
            }
            </div>
            </Box2>
            <Box3 onClick={() => navigate(`/crew/detail/${id}`)}>
            <GoBackText><div>Back to the </div><CrewPageText>crew page</CrewPageText></GoBackText>
            {noticeSwitch && <RightRightArrow src={rightRightArrowBlack} alt="rightRightArrowBlack"></RightRightArrow>}
            </Box3>
            </LayOut1>
            <LayOut2>
            {noticeSwitch && 
                <div>
                    <Box4>
                    <div>  {crewNoticeDetail.length > 0 ? crewNoticeDetail[basicNum].title : '등록한 공지사항이 없습니다.'} </div>
                    </Box4>
                    <Box5>
                    <div> {crewNoticeDetail[basicNum].content}  </div>
                    <EditAndDelBtn>
                    <NoticeImage2 src={images[basicNum]} alt="NoticeImage"></NoticeImage2>
                        <EditButton src={editButton} alt="editButton" onClick={()=> editHandlerOn()}></EditButton>
                        <DeleteButton src={deleteButton} alt="deleteButton" onClick={()=> axios.delete(``)}></DeleteButton>
                    </EditAndDelBtn>
                    </Box5>
            </div>}

            {noticeEditSwitch && <div>
                <Box4>
                <div><input type="text" placeholder="type your notice title" /></div>
                </Box4>
                <Box5>
                <div><input type="text" placeholder="type your notice content" /></div>
                <button>이미지로드</button>   
                <div><button onClick={() => editHandlerOff()}>취소</button>
                <button onClick={() => {
                    axios.put(``)
                    .then(() => editHandlerOff())
                }}>편집 완료</button>
                </div>
                </Box5>
               
            </div>}


            {noticePlusSwitch && <div>
                <Box4>
                <div><input type="text" placeholder="type your notice title" /></div>
                </Box4>
                <Box5>
                <div><input type="text" placeholder="type your notice content" /></div>
                <button>이미지로드</button>   
                <div><button onClick={() => plusHandlerOff()}>취소</button>
                <button onClick={() => {
                    axios.post(``)
                    .then(() => plusHandlerOff())
                }}>생성</button>
                </div>
                </Box5>
               
            </div>}

            </LayOut2>
            
     
 
          
        </PageContainer>
    )
}







export default CrewNoticePage