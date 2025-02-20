import axios from "axios"
import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import rightRightArrow from "../../assets/rightRightArrow.png"
import rightRightArrowBlack from "../../assets/rightRightArrowBlack.png"
import editButton from "../../assets/editButton.png"
import deleteButton from "../../assets/deleteButton.png"
import styled from "@emotion/styled";
import { format } from "date-fns";

const images = [sample1, sample2, sample3, sample4, sample5]

import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.jpg";
import sample3 from "../../assets/sample3.jpg";
import sample4 from "../../assets/sample4.jpg";
import sample5 from "../../assets/sample5.png";
import { axiosInstance } from "../../apis/axiosInstance"
import { useCrewStore } from "../../stores/UserStore"


const ServerUrl = 'http://localhost:8080'

const PageContainer = styled.div`
  display: flex; /* Flexbox 레이아웃 */
  width: 100%;   /* 전체 너비 100% */
  padding: 20px 50px; /* 양쪽 끝에 20px의 여백 추가 */
  box-sizing: border-box; /* 패딩이 포함된 크기 계산 */
`

const LayOut1 = styled.div`
  width: 40%; /* 6/10 너비 */
  padding: 20px 10px 20px 20px;
  background-color: #202020(rgb 32, 32, 32);
  box-sizing: border-box;
  display : flex;
  flex-direction: column; /* 세로로 배치 */
  
`
const LayOut2 = styled.div`
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
 
`

const DeleteButton = styled.img`
    height: 25px;
    padding-left: 375px;
`

const TitleBox = styled.div`
    background-color: gray;
    width: 98%;
    height: 50px;

    input::placeholder {
        color: white;
    }
`

const ContentBox = styled.div`
    background-color: gray;
    width: 98%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    input::placeholder {
        color: white;
    }
`

const ImageBox = styled.div`
    display: flex;
    gap : 10px;
    align-items: center;
`

const DeleteText = styled.div`
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 80px;
    border-radius: 30px;
    margin-left: 340px;
`

const PostText = styled.div`
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 80px;
    border-radius: 30px;
`

const FlexCan = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding-right: 20px;
    
`





function CrewNoticePage() {

    const { id, noticeId }: any = useParams(); // crewId 파라미터 가져옴
    const [crewDetail, setCrewDetail] = useState<any>(null) // 크루 정보 받아오면 담을 변수
    const [crewNoticeDetail, setCrewNoticeDetail] = useState<any>(['1th Notice', '2th Notice', '3th Notice',])
    const [loading, setLoading] = useState(true) // 로딩 표시하는 변수
    const [error, setError] = useState(null) // 에러 상태
    const navigate = useNavigate()
    const [noticeSwitch, setNoticeSwitch] = useState(true)
    const [noticePlusSwitch, setNoticePlusSwitch] = useState(false)
    const [noticeEditSwitch, setNoticeEditSwitch] = useState(false)
    const [basicNum, setBasicNum] = useState<number>(noticeId)


    
    const [canSee, setCanSee] = useState(false)
    const userCrewId = useCrewStore((state)=> state.id)
    console.log(id)
    console.log(userCrewId)

    useEffect(()=>{
        if ( Number(userCrewId) === Number(id)){
            setCanSee(true)
           
        }
    },[])
    console.log(canSee)

    const [image, setImage] = useState<any>(null); // 선택한 파일 저장
    const [preview, setPreview] = useState<string | null>(null); // 미리보기 이미지

    // 파일 선택 시 실행되는 함수
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file); // 선택한 파일 저장
            setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
        }
    }
    const [Name, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleTitleChange = (e: any) => setTitle(e.target.value);
    const handleContentChange = (e: any) => setContent(e.target.value);



    const [Name2, setTitle2] = useState("");
    const [content2, setContent2] = useState("");
    const handleTitleChange2 = (e: any) => setTitle2(e.target.value);
    const handleContentChange2 = (e: any) => setContent2(e.target.value);


    const NoticePost = async () => {
        // if (!file) {
        //     alert("파일을 선택하세요.");
        //     return;
        //   }
        const formData = new FormData();
        formData.append("crewId", id)
        formData.append("title", Name2); // ✅ 파일 추가
        formData.append("content", content2); // ✅ 파일 추가
        if (image) {
            formData.append("image", image)
        } // ✅ 파일 추가
        try {


            const response = await axiosInstance.post(`/crew/notice`, formData, // 크루 정보 수정 요청
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            console.log("생성 성공", response.data)
            alert("크루 공지사항 생성 성공!");
            // ✅ 새로운 데이터로 상태 업데이트 → 자동으로 재렌더링됨
            window.location.reload(); // ✅ 화면 새로고침 

        } catch (err: any) {
            alert("업로드 중 오류가 발생했습니다.");
        } finally {
            setLoading(false)
        }
    }



    const NoticeEdit = async () => {
        // if (!file) {
        //     alert("파일을 선택하세요.");
        //     return;
        //   }
        const formData = new FormData();
        formData.append("crewId", id)
        formData.append("title", Name); // ✅ 파일 추가
        formData.append("content", content); // ✅ 파일 추가
        if (image) {
            formData.append("image", image)
        } // ✅ 파일 추가
        try {


            const response = await axiosInstance.put(`/crew/notice/${selectedNotice}`, formData, // 크루 정보 수정 요청
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            console.log("수정 성공", response.data)
            alert("크루 공지사항 수정 성공!");
            // ✅ 새로운 데이터로 상태 업데이트 → 자동으로 재렌더링됨
            window.location.reload(); // ✅ 화면 새로고침 

        } catch (err: any) {
            alert("업로드 중 오류가 발생했습니다.");
        } finally {
            setLoading(false)
        }
    }





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
    const [selectedNotice, setSelectedNotice] = useState(1)

    useEffect(() => {
        const fetchCrewDetail = async () => {
            try {
                const response = await axiosInstance.get(`/crew/detail/${id}`) // 크루 디테일 정보 받아옴
      
                setCrewDetail(response.data);
                console.log("response.data : ", response.data)
                if (response.data.notices.length > 0) { setSelectedNotice(response.data.notices[basicNum].id) }
           
            } catch (err: any) {
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
            <PlusBtnWrapper><div style={{color:"white"}}> Notice</div>
             {canSee &&<div onClick={() => plusHandlerOn()} style={{fontSize: "30px"}}>+</div>}
             </PlusBtnWrapper>
            </Box1>
            <Box2>
            <div >{
                crewDetail.notices.map((a:any, i:any) => {
                    return ( <NoticeWrapper> <NoticeImage src={a?.imageUrl} alt="noticeImg"></NoticeImage><NoticeText><div style={{fontSize: "20px"}}>{a.title}</div>  <div>{a.content}</div></NoticeText> <RightRightArrow onClick={() => {{setBasicNum(i); setSelectedNotice(crewDetail.notices[i].id)}}} src={rightRightArrow} alt='rightRightArrow'></RightRightArrow></NoticeWrapper> )
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
                            <div>  {crewDetail.notices.length > 0 ? crewDetail.notices[basicNum].title : '등록한 공지사항이 없습니다.'} </div>
                        </Box4>
                        <Box5>
                            <div> {crewDetail.notices.length > 0 ? crewDetail.notices[basicNum].content : ""}  </div>
                            <EditAndDelBtn>
                                <NoticeImage2 src={crewDetail.notices[basicNum]?.imageUrl} alt="NoticeImage"></NoticeImage2>
                               {canSee && <DeleteButton src={deleteButton} alt="deleteButton" onClick={() => { axiosInstance.delete(`crew/notice/${selectedNotice}`); alert("삭제성공!"); window.location.reload(); }}></DeleteButton>}
                               {canSee && <EditButton src={editButton} alt="editButton" onClick={() => editHandlerOn()}></EditButton>}
                            </EditAndDelBtn>
                        </Box5>
                    </div>}

                {noticeEditSwitch && <div>
                    <Box4>
                        <div>Edit Notice</div>
                    </Box4>
                    <Box5>
                    <div> {crewDetail.notices.length  > 0 ? crewDetail.notices[basicNum].content : ""}  </div>
                    <EditAndDelBtn>
                    <NoticeImage2 src={crewDetail.notices[basicNum].imageUrl} alt="NoticeImage"></NoticeImage2>
                        <DeleteButton src={deleteButton} alt="deleteButton" onClick={()=> {axiosInstance.delete(`crew/notice/${selectedNotice}`); alert("삭제성공!");  window.location.reload(); }}></DeleteButton>
                      <EditButton src={editButton} alt="editButton" onClick={()=> editHandlerOn()}></EditButton>
                    </EditAndDelBtn>
                    </Box5>

                </div>}


                {noticePlusSwitch && <div>
                    <Box4>
                        <div>Create Notice</div>
                    </Box4>
                    <Box5>
                        <TitleBox><input type="text" placeholder="type your notice title" value={Name2} onChange={handleTitleChange2} style={{ backgroundColor: "gray", height: "50px", width: "100%", color: "white", fontSize: "20px" }} /></TitleBox>
                        <ContentBox><input id="ContentBox" type="text" placeholder="type your notice content" value={content2} onChange={handleContentChange2} style={{ backgroundColor: "gray", height: "400px", width: "100%", color: "white", fontSize: "15px" }} />
                        </ContentBox>
                        <FlexCan>   <ImageBox><input type="file" accept="image/*" onChange={handleImageChange} />
                            <div onClick={() => { { setPreview(null); setImage(null) } }}>x</div>
                        </ImageBox>
                            {/* {preview && <img src={preview} alt="Preview" width="200" />} */}

                            <DeleteText onClick={() => { plusHandlerOff(); setPreview(null); setImage(null) }}>취소</DeleteText>
                            <PostText onClick={() => {
                                NoticePost()
                                    .then(() => editHandlerOff())
                            }}>생성</PostText>
                        </FlexCan>
                    </Box5>
                </div>}

            </LayOut2>




        </PageContainer>
    )
}







export default CrewNoticePage