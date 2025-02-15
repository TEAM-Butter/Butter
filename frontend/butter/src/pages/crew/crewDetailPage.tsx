import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./CrewCss.css";
import rightArrow from "../../assets/rightArrow.png"
import leftArrow from "../../assets/leftArrow.png"
import upArrow from "../../assets/upArrow.png"
import editButton from "../../assets/editButton.png"
import plusButton from "../../assets/plusButton.png"
import followButton from "../../assets/followButton.png"
import cancelButton from "../../assets/cancelButton.png"
import deleteIcon from "../../assets/deleteIcon.png"
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.jpg";
import sample3 from "../../assets/sample3.jpg";
import sample4 from "../../assets/sample4.jpg";
import sample5 from "../../assets/sample5.png";
import styled from "@emotion/styled";
import { axiosInstance } from "../../apis/axiosInstance"
import { SchedulePlusModal } from "../../components/common/modals/SchedulePlusModal.tsx";
import { div } from "framer-motion/client";


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
  width : 35%;
  display: flex;
  margin-right: -45px;
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
  gap: 10px;
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
    font-size: 12px;
    display: flex;
    gap : 5px;
    height: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    align-items: center;
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
padding-left: 10px;
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

const ServerUrl = 'http://localhost:8080'

function CrewDetailPage() {
    
    const navigate = useNavigate()
    const { id } = useParams(); // crewId 파라미터 가져옴
    const [ crewDetail, setCrewDetail ] = useState<any>(null) // 크루 정보 받아오면 담을 변수
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

    const [LiveOn, setLiveOn] = useState(false)
  
    useEffect (() => {
        const fetchCrewDetail = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/crew/detail/${id}`) // 크루 디테일 정보 받아옴
                setCrewDetail(response.data);
                console.log("response.data : ", response.data)
                const scheduleResponse = await axiosInstance.get(`/schedule/detail/${id}`) // 크루 스케쥴 정보 받아옴 
                setCrewScheduleDetail([scheduleResponse.data]);
                console.log("scheduleResponse.data : ", scheduleResponse.data)
                const noticeResponse = await axiosInstance.get(`/crew/notice/detail/${id}`) // 크루 공지사항 정보 받아옴
                setCrewNoticeDetail([noticeResponse.data]);
                console.log("noticeResponse.data : ", noticeResponse.data)
                
                if (crewDetail?.lives[0].endDate === null) {
                    setLiveOn(true)
                } else {
                    setLiveOn(false)
                }

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




    const CrewFollow = async () => {

        try {
            const payload = {
                crewId : id
            }
            const response = await axiosInstance.post(`crew/follow`, payload)

          alert('팔로우 성공!')
          console.log(response.data)
        }
        catch (err : any) {
            console.error("에러 발생:", err)
            setError(err.message);
            alert("스케줄 등록 중 오류가 발생했습니다.");
        }
    }


    return (
       <PageContainer >
            <LayOut1 >
            
            {crewDetailSwitch && <div className="크루 디테일 정보">   
               
                <Box1>
                    <Right>
                    <EditButton onClick={() => handleEditClick()} src={editButton} alt="editButton"></EditButton>
                    </Right>
                    <CrewNameWrapper>
                        <TextName> {crewDetail.name}</TextName>
                        <TextGenre >{crewDetail.genres.map((a : any, i: number) => {return (<CrewGenre>{a}</CrewGenre> )})}</TextGenre>
                        <TextExplain>{crewDetail.description}</TextExplain>
                    </CrewNameWrapper>
                    <Box1BottomWrapper>
                      <ImageMovingBox>
                        {crewDetail.members.map((a :any, i: any)=>{return(<CrewMemberImage src={images[i]} alt="CrewMemberImage2"></CrewMemberImage>)})}
                      </ImageMovingBox>  
                        <FollowButton src={followButton} alt="followButton" onClick={()=>{CrewFollow()}}></FollowButton>
                    </Box1BottomWrapper>
                </Box1>
                
                </div>}
                {crewEditSwitch && <CrewEditComponent1 crewDetail = {crewDetail} handleEditClick={handleEditClick}/>}
        <LayOut3>        
      
            {crewDetailSwitch &&   
                <Box2>
                    <CrewPicture src={sample3}></CrewPicture>
                    <TextFollowNum> 크루 팔로우 수 : {crewDetail.followerCnt}</TextFollowNum>
                </Box2>
            }
            {crewEditSwitch && <CrewEditComponent2 />}
           
            <Box3> <SnsText><div style={{ fontSize : "20px"}}>SNS</div><div>link</div></SnsText><UpArrowTag src={upArrow} alt="upArrow"></UpArrowTag></Box3>
            {LiveOn == true && <Box4 onClick={()=>{navigate(`/stream/live/${id}`)}}><LiveText1>Live</LiveText1><div>On</div> </Box4>}
            {LiveOn == false && <Box4 onClick={()=>{alert("라이브 중이 아닙니다.")}} style={{backgroundColor : "gray"}}><LiveText1>Live</LiveText1><div>Off</div> </Box4>} 
        </LayOut3>       
                </LayOut1>
                <LayOut2>
                <ScheduleEditComponent crewScheduleDetail={crewScheduleDetail} crewDetail={crewDetail} />
                
                <Box6><div>Notice</div><PlusBtn>+</PlusBtn></Box6>
                <Box7 id="scroll-area"> {crewDetail.notices.map((a : any, i : any)=>
                                {return(<NoticeBox key={i}>
                                            <NoticeImg src={images[i+1]}></NoticeImg>
                                                <NoticeWrapperBox> 
                                                    <NoticeTitle>{i+1}번 Notice Title</NoticeTitle>
                                                    <NoticeContent> {a.content}</NoticeContent>
                                                </NoticeWrapperBox> 
                                            <Arrow onClick={() => {navigate(`/crew/notice/detail/${id}/${i}`)}} src={rightArrow} alt="rightArrow"></Arrow>
                                        </NoticeBox>)})}
                </Box7>
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


const CancelButton = styled.img`
    height:  20px;
    margin-top: 5px;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: end;
    padding-right: 20px;
    padding-top: 15px;
    gap: 10px;
`

const CrewNameInputBox = styled.div`

`

const CrewNameInput = styled.input`
      background-color: gray;
      border: none;
  color: white;
  border-radius: 30px;
  height: 50px;
  width: 420px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 40px;
  font-weight: bold;
  margin-left: 20px;
  
`

const CrewDetailInputBox = styled.div`
    background-color: rgb(66, 66, 66);
    padding: 20px;
    margin-left: 20px;
    margin-right: 20px;
    height: 150px;
    border-radius: 20px;
`
const CrewDetailInput = styled.input`
    background-color: rgb(66, 66, 66);
    border: none;
    color: white;
    border-radius: 5px;
    height: 110px;
    width: 600px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 20px;
    padding-bottom: 60px;
`

const CrewGenreBox = styled.div`
    display: flex;
    gap : 10px;
    padding-left: 20px;
`

const CrewGenre = styled.div`
     border: 1px solid white;
     padding : 6px 8px;
     border-radius: 30px;
     font-size: 13px;
`

const Hr2 = styled.hr`
    border: none;
  border-top: 3px solid white; /* 가로줄 스타일 */
  margin: 10px 0; /* 위아래 여백 */
`


const MemberEditWrapper = styled.div`
    position: relative;
    display: flex;
    padding-left: 20px;
`

const CrewMemberPicture = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 50px;
    position: absolute;
`

const DeleteIcon = styled.img`
    height: 19px;
    width: 19px;
    border-radius: 50px;
    position: absolute;
    left: 48px;
    top: -2px;
`

const Box8= styled.div`
    display: flex;
    gap: 35px;
    padding-bottom: 20px;
`

const PlusButton = styled.img`
        width: 45px;
    height: 45px;
    border-radius: 50px;
    margin-left: 20px;
`





function CrewEditComponent1({ crewDetail, handleEditClick }: { crewDetail: any; handleEditClick: () => void }) {

    const [crewMemberPlusModalOpen, setCrewMemberPlusModalOpen] = useState(false) // 크루 멤버 추가 모달 스위치
      const [Name, setTitle] = useState("");
      const [content, setContent] = useState("");
       // 🔹 입력값 변경 시 상태 업데이트
       const handleTitleChange = (e : any) => setTitle(e.target.value);
       const handleContentChange = (e : any) => setContent(e.target.value);
    

       const [ loading, setLoading ] = useState(true) // 로딩 표시하는 변수
       const [ error, setError] = useState(null) // 에러 상태
       const {id} = useParams()
       const [file, setFile] = useState<File | null>(null);
       const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setFile(event.target.files[0]); // ✅ 파일 저장
        }
      };
      const [crewData, setCrewData] = useState({ name: "", description: "" });

       const CrewInfoEdit = async() => {
        // if (!file) {
        //     alert("파일을 선택하세요.");
        //     return;
        //   }
          const formData = new FormData();
       
          formData.append("name", Name); // ✅ 파일 추가
          formData.append("description", content); // ✅ 파일 추가
        //   formData.append("image", content); // ✅ 파일 추가
        //   formData.append("promotionUrl", address); // ✅ 파일 추가
               try {
                   setLoading(true);
                   console.log(id)
                   const response = await axiosInstance.put(`/crew/${id}`, formData, // 크루 정보 수정 요청
                   {headers: {
                         "Content-Type": "multipart/form-data",
                     }})
                   console.log("수정 성공", response.data)
                   alert("크루 정보 수정 성공!");
                    // ✅ 새로운 데이터로 상태 업데이트 → 자동으로 재렌더링됨
                    setCrewData({
                        name: Name,
                        description: content,
                    });
                    window.location.reload(); // ✅ 화면 새로고침 
               
               } catch (err: any) {
                alert("업로드 중 오류가 발생했습니다.");
               } finally {
                setLoading(false)
               }
           }
       
    
           const DeleteMember = async(memberId : any) => {
                   try {
                       setLoading(true);
                       console.log(id)
                       const response = await axiosInstance.delete(`/crew/${id}/member/${memberId}`) // 크루 정보 수정 요청
                     
                       console.log("삭제 성공", response.data)
                       alert("멤버 삭제 성공!");
                        // ✅ 새로운 데이터로 상태 업데이트 → 자동으로 재렌더링됨
                        window.location.reload(); // ✅ 화면 새로고침 
                   } catch (err: any) {
                    alert("삭제 중 오류가 발생했습니다.");
                   } finally {
                    setLoading(false)
                   }
               }



  const FlexCan = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  `

  const DeleteIcon2 = styled.img`
    height: 19px;
    width: 19px;
    border-radius: 50px;
    left: 48px;
    top: -2px;
  `

  const DeleteGenre = async (i : any) => {
    crewDetail.genres.splice(i, 1)
    const copyList = {genreNames : crewDetail.genres}
    console.log(copyList)
    try {
        console.log(copyList)
        setLoading(true)
        const res = await axiosInstance.put(`/crew/${id}/genre`, copyList)
        console.log(res.data)
        alert("장르삭제성공")
    } catch (err: any) {
        setError(err.message); //요청 놓치면 에러 메세지 띄우기
    }finally {
        setLoading(false) // 요청 끝나면 로딩끄기
    }}

    const genresList = [
        { id: 1, name: "All" },
        { id: 2, name: "Ballad" },
        { id: 3, name: "Dance" },
        { id: 4, name: "Pop" },
        { id: 5, name: "K-Pop" },
        { id: 6, name: "Acoustic" },
        { id: 7, name: "Hip-Hop" },
        { id: 8, name: "R&B" },
        { id: 9, name: "Electronic" },
        { id: 10, name: "Rock" },
        { id: 11, name: "Jazz" },
        { id: 12, name: "Indie" },
        { id: 13, name: "Trot" },
      ];

    const [selectedGenres, setSelectedGenres] = useState<any>([]); // ✅ 선택된 장르 저장
  
    const handleMultiGenreChange = async (event : any) => {
        const selectedValue = event.target.value; // ✅ 새로 선택한 값 가져오기
        const copyList = {genreNames : crewDetail.genres}
        if (copyList.genreNames.includes(selectedValue)) {
            alert("이미 포함된 장르 입니다")
            return
        }else {
            copyList.genreNames.push(selectedValue)
            setSelectedGenres(copyList)
        }
        console.log("copyList :", copyList)
        
        try  { const res = await axiosInstance.put(`/crew/${id}/genre`, copyList)
            console.log(res.data)
            alert("장르 추가 완료")
        } catch{

        }
    }
    useEffect( ()=> {

    }, [crewDetail])

    // const PlusGenre = async () => {

    //     try {
    //         const res : any = axiosInstance.put(`/crew/${id}/genre`, copyList)
    //         console.log(res.data)
    //         alert("장르추가성공")
    //     } catch (err: any) {
    //         setError(err.message); //요청 놓치면 에러 메세지 띄우기
    //     }finally {
    //         setLoading(false) // 요청 끝나면 로딩끄기
    //     }}

    
    
      


//   const PlusGenre = async () => {
//     const copyList = {genreNames : crewDetail.genres}
    
//   }

const PlusModal = styled.div`
    position: relative;
`
const FlexCan2 = styled.div`
    display: flex;
    
`
  const GenreSelectBox = styled.div`
      width: 170px;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  left: 350px;
 position: absolute;
 left: 10px;
  `

  const [GenreSelectBoxOn, setGenreSelectBoxOn] = useState(false)

    return (
    <div>
     
        <Box1>
            
            <ButtonWrapper>
                <CancelButton src={cancelButton} alt="cancelButton" onClick={handleEditClick}>
                </CancelButton>
                <EditButton src={editButton} alt="editButton" onClick={() =>{{handleEditClick(); CrewInfoEdit()}}}>
                </EditButton>
            </ButtonWrapper>
            <CrewNameInputBox>
                <CrewNameInput type="text" placeholder={crewDetail.name} value={Name} onChange={handleTitleChange}></CrewNameInput>
                <Hr2 />
                <FlexCan2>
            <CrewGenreBox >{crewDetail.genres.map((a : any, i: number) => {return (<FlexCan><CrewGenre>{a}</CrewGenre><DeleteIcon2 src={deleteIcon} alt="deleteIcon" onClick={() => DeleteGenre(i)}></DeleteIcon2></FlexCan> )})}</CrewGenreBox>
                                  
                                    <PlusButton src={plusButton} alt="plusButton" onClick={() =>{ setGenreSelectBoxOn(!GenreSelectBoxOn)}}></PlusButton>
                                    { GenreSelectBoxOn &&   <PlusModal><GenreSelectBox>
                                        <label htmlFor="multi-genre-select"></label>
                                        <select id="multi-genre-select" multiple value={selectedGenres} onChange={handleMultiGenreChange} style={{width:"150px", backgroundColor : "rgba(0, 0, 0, 0.5)", color:"white" }}>
                                        {genresList.map((genre) => (
                                            <option key={genre.id} value={genre.name}>
                                            {genre.name}
                                            </option>
                                        ))}
                                        </select>
                                        <p>선택된 장르: {selectedGenres.length > 0 ? selectedGenres.join(", ") : "없음"}</p>
                                    </GenreSelectBox></PlusModal>}
                                    
                                    </FlexCan2>
            </CrewNameInputBox>
            <CrewDetailInputBox>
            <CrewDetailInput type="text" placeholder={crewDetail.description}  value={content} onChange={handleContentChange}></CrewDetailInput>
            </CrewDetailInputBox>

            <Box8>
            {crewDetail.members.map((a : any, i : any) => {return <MemberEditWrapper>
            <CrewMemberPicture src={a.profileImage} alt="sample1"></CrewMemberPicture>
            <DeleteIcon src={deleteIcon} alt="deleteIcon" onClick={()=>DeleteMember(a.id)}></DeleteIcon>
            </MemberEditWrapper>})}
          
            <PlusButton src={plusButton} alt="plusButton" onClick={() =>setCrewMemberPlusModalOpen(true)}></PlusButton>
            </Box8>          
            
        </Box1>
        {crewMemberPlusModalOpen && (
            <CrewMemberEditModalOverlay>
                <CrewMemberEditModalContent>
                    <input type="text" placeholder="멤버 검색"/>
                    <button>검색하기</button>
                    <div><button>멤버 추가</button></div>
                    <div><button onClick={() => {setCrewMemberPlusModalOpen(false);}}>닫기</button></div>
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

const Box10 = styled.div`
    
`


const SchedulPlusWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    right: 0px;
    top : 70px;
    background-color: black;
    height: 40px;
  width: 130px;
  font-size: 20px;
  color: white;
  z-index: 500;
  padding-left: 13px;
  padding-right: 13px;
  border-radius: 30px;
  border: 2px solid white;
`

function ScheduleEditComponent({crewScheduleDetail,crewDetail}:any) {
    const [isSchedulePlusModalOpen, setisSchedulePlusModalOpen] = useState(false) // 스케쥴 추가 스위치
    const [isScheduleDetailModalOpen, setisScheduleDetailModalOpen] = useState(false) // 스케쥴 디테일 스위치
    const [isScheduleEditModalOpen, setisScheduleEditModalOpen] = useState(false) // 스케쥴 디테일 스위치
    const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<any>(null); // 선택된 스케줄 인덱스
    const [modalType, setModalType] = useState("")
    const { id} = useParams()


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
            <div onClick={()=>{
                setModalType("SchedulePlus");
             }}>
               +
            </div>
            </ScheduleText>
            <Hr />
        </div>
        <Box10>
        <ScheduleList id="scroll-area"> 
            {
            crewDetail.schedules.map((a:any, i:any) => {
                return ( <ScheduleWrapper key={i} > <ScheduleImg src={images[i+1]} alt="ScheduleImg"></ScheduleImg> <ScheduleTitle><ScheduleTitleComponent1>{i+1}번 스케쥴 Title Section</ScheduleTitleComponent1><div>{a.content}</div></ScheduleTitle><LeftArrowTag onClick={()=> {setisScheduleDetailModalOpen(true); setSelectedScheduleIndex(i+1)}} src={leftArrow} alt="leftArrow"></LeftArrowTag></ScheduleWrapper>)
            })
            }
        </ScheduleList>
        </Box10>
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
                        <div> 크루 이름 {crewDetail.name} | 크루 정보 <button onClick={() => { setisScheduleDetailModalOpen(false) }}>닫기</button></div>
                        <div> 스케쥴 제목 : {crewScheduleDetail[selectedScheduleIndex-1].title}</div>
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
              
                { modalType === "SchedulePlus" && <SchedulePlusModal width="600px" height="500px" setModalType={setModalType} id={id}></SchedulePlusModal>}
       </Box5>



    )}


export default CrewDetailPage