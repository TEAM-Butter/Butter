import axios from "axios"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import "./CrewCss.css";
import rightArrow from "../../assets/rightArrow.png"
import rightRightArrow from "../../assets/rightRightArrow.png"
import leftArrow from "../../assets/leftArrow.png"
import upArrow from "../../assets/upArrow.png"
import editButton from "../../assets/editButton.png"
import plusButton from "../../assets/plusButton.png"
import notFollowedIcon from "../../assets/notFollowedIcon.png"
import followedIcon from "../../assets/followedIcon.png"
import cancelButton from "../../assets/cancelButton.png"
import deleteIcon from "../../assets/deleteIcon.png"
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.jpg";
import sample3 from "../../assets/sample3.jpg";
import sample4 from "../../assets/sample4.jpg";
import sample5 from "../../assets/sample5.png";
import sample6 from "../../assets/sample5.png";
import sample7 from "../../assets/sample5.png";
import sample8 from "../../assets/sample5.png";
import sample9 from "../../assets/sample5.png";
import sample10 from "../../assets/sample5.png";
import styled from "@emotion/styled";
import { axiosInstance } from "../../apis/axiosInstance"
import { SchedulePlusModal } from "../../components/common/modals/SchedulePlusModal.tsx";
import { ScheduleEditModal } from "../../components/common/modals/ScheduleEditModal.tsx";
import { div } from "framer-motion/client";
import { StreamingModal } from "../../components/common/modals/StreamingModal.tsx";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer} from "react-kakao-maps-sdk";
import { StatementSync } from "node:sqlite";
import { Bookmark, MyLocation } from "@mui/icons-material";
import { useCrewStore } from "../../stores/UserStore.ts";

const images = [sample1,sample2,sample3,sample4,sample5,sample6,sample5,sample5,sample5,sample5]


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

const Box1Wrapper = styled.div`
    position: relative;
`

const Box1Friend = styled.img`
  background-color: gray;
  width : 100%;
  box-sizing: border-box;
  height: 400px;
  border-radius: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  filter: brightness(40%);
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
  align-items: end;
  padding-right: 20px;
`

const Box5=styled.div`
  background: var(--liner);
  color : black;
  border-radius: 20px;
  height: 328px;
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
  justify-content: space-between;
  padding-right: 15px;
  align-items: center;
  padding-left: 20px;
  gap : 12px;
`
const Box7=styled.div`
  border-radius: 10px 10px 0 0; /* 하단은 0, 상단만 둥글게 */
  background-color: #161616;
  height: 200px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 20px;
  gap: 10px;
`

const Arrow = styled.img`
    height: 35px;
`

const EditButton = styled.img`
    height:  20px;
    right: 20px;
    top: 10px;
    position: absolute;
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

    position: absolute;
    bottom: 40px;
    left: 10px;
`


const FollowButton = styled.div`
      height: 40px;
      bottom: 50px;
      right: 20px;
    width: 90px;
    background-color: #a3a3a3;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
`

const UnFollowButton = styled.div`
    height: 40px;
    bottom: 50px;
    right: 20px;
    width: 90px;
    background-color: #a3a3a3;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
`


const CrewPicture = styled.img`
    height: 180px;
    width: 180px;
    border-radius: 20px;
    filter: brightness(40%);
    
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
    top: 25px;
    left: -10px;
    position: absolute;
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

const MoveToNoticePage = styled.img`
    height: 30px;
    width: 30px;
`

const TextFollowNum2 = styled.div`
    top: 10px;
    left: 80px;
    position: absolute;
    background-color: black;
    height: 40px;
    width: 90px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const EditVideoBox = styled.div`
    color: white;
    background-color: #a3a3a3;
    height: 40px;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 30px;
    bottom: 50px;
    right: 120px;
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
    const [isFollowed, setIsFollowed] = useState(false)
    const [scheduleLikeList, setScheduleLikeList] = useState([])
    const [canSee, setCanSee] = useState(false)
    const userCrewId = useCrewStore((state)=> state.id)
    console.log(id)
    console.log(userCrewId)

    useEffect(()=>{
        if ( Number(userCrewId) === Number(id)){
            setCanSee(true)
           
        }
    },[canSee])
    console.log(canSee)

    
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
                if (crewDetail?.lives[0]?.endDate === null) {
                    setLiveOn(true)
                } else {
                    setLiveOn(false)
                }

                if (response.data.isFollowed == true) {
                    setIsFollowed(false) }
                   else {
                    setIsFollowed(true)
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
          setIsFollowed(!isFollowed)
        }
        catch (err : any) {
            console.error("에러 발생:", err)
            setError(err.message);
            alert("스케줄 등록 중 오류가 발생했습니다.");
        }
    }


    
    const CrewUnFollow = async () => {

        try {

            const response = await axiosInstance.delete(`crew/${id}/follow`)

          alert('언팔로우 성공!')
          console.log(response.data)
          setIsFollowed(!isFollowed)
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
                <Box1Wrapper>
                    <Box1Friend src={crewDetail.imageUrl} alt="crewImage"></Box1Friend>
  
                    <Right>
                     {canSee &&<EditButton onClick={() => handleEditClick()} src={editButton} alt="editButton"></EditButton>}
                    </Right>
                    <CrewNameWrapper>
                        <TextName> {crewDetail.name}</TextName>
                        <TextGenre >{crewDetail.genres.map((a : any, i: number) => {return (<CrewGenre>{a}</CrewGenre> )})}</TextGenre>
                        <TextExplain>{crewDetail.description}</TextExplain>
                    </CrewNameWrapper>
                    <Box1BottomWrapper>
                      <ImageMovingBox>
                        {crewDetail.members.map((a :any, i: any)=>{return(<CrewMemberImage src={a.profileImage} alt="CrewMemberImage2"></CrewMemberImage>)})}
                      </ImageMovingBox>  
                    </Box1BottomWrapper>
                        {canSee && <Link to={`/crew/video-edit/${id}`}><EditVideoBox>Edit Video</EditVideoBox></Link>}
                        {isFollowed && <FollowButton  onClick={()=>{CrewFollow()}}>follow</FollowButton>}
                        {!isFollowed && <UnFollowButton onClick={()=>{CrewUnFollow()}}>unfollow</UnFollowButton>}
            
                </Box1Wrapper>
                </div>}
                {crewEditSwitch && <CrewEditComponent1 crewDetail = {crewDetail} handleEditClick={handleEditClick}/>}
        <LayOut3>        
      
            {crewDetailSwitch &&   
                <Link to={`/crew/highlight/${id}`}>
                <Box2>
                    <CrewPicture src={crewDetail.imageUrl}></CrewPicture>
                    <TextFollowNum2> Highlight</TextFollowNum2>
                    <TextFollowNum> 크루 팔로워 수 : {crewDetail.followerCount}</TextFollowNum>
                </Box2>
                </Link>
            }
            {crewEditSwitch && <CrewEditComponent2 />}
           
            <Box3><Link to={crewDetail.promotionUrl}><SnsText><div style={{ fontSize : "20px"}}>SNS</div><div>link</div></SnsText><UpArrowTag src={upArrow} alt="upArrow"></UpArrowTag></Link> </Box3>
            {LiveOn == true && <Box4 onClick={()=>{navigate(`/stream/live/${id}`)}}><LiveText1>Live</LiveText1><div>On</div> </Box4>}
            {LiveOn == false && <Box4 onClick={()=>{alert("라이브 중이 아닙니다.")}} style={{backgroundColor : "gray"}}><LiveText1>Live</LiveText1><div>Off</div> </Box4>} 
        </LayOut3>       
                </LayOut1>
                <LayOut2>
                <ScheduleEditComponent crewScheduleDetail={crewScheduleDetail} crewDetail={crewDetail}/>
                
                <Box6><div>Notice</div><MoveToNoticePage src={rightRightArrow} alt="rightRightArrow" onClick={()=>{navigate(`/crew/notice/detail/${id}/${0}`)}}></MoveToNoticePage></Box6>
                <Box7 ><div id="scroll-area2"> {crewDetail.notices.map((a : any, i : any)=>
                                {return(<NoticeBox  key={i}>
                                            <NoticeImg src={a.imageUrl}></NoticeImg>
                                                <NoticeWrapperBox> 
                                                    <NoticeTitle>{a.title}</NoticeTitle>
                                                    <NoticeContent> {a.content}</NoticeContent>
                                                </NoticeWrapperBox> 
                                            <Arrow onClick={() => {navigate(`/crew/notice/detail/${id}/${i}`)}} src={rightArrow} alt="rightArrow"></Arrow>
                                        </NoticeBox>)})}</div>
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
    
    display: flex;
    justify-content: center;
    align-items: center;
 
`;

const CrewMemberEditModalContent = styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    height: 300px;
    text-align: center;
`;


const CancelButton = styled.img`
    height:  20px;
    top: 10px;
    right : 90px;
    position: absolute;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: end;
    right: 20px;
    top: 20px;
`

const CrewNameInputBox = styled.div`
 position: absolute;
 top: 50px;
 width: 100%;
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
  top:20px ;
`

const CrewDetailInputBox = styled.div`
    background-color: rgb(66, 66, 66);
    padding: 20px;
    margin-left: 20px;
    margin-right: 20px;
    height: 150px;
    border-radius: 20px;
    position: absolute;
    top: 170px;
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
    position: absolute;
    bottom: 20px;
`

const PlusButton = styled.img`
        width: 45px;
    height: 45px;
    border-radius: 50px;
    margin-left: 20px;
`


const ImageBox = styled.div`
    display: flex;
    gap : 10px;
    align-items: center;
`


function CrewEditComponent1({ crewDetail, handleEditClick }: { crewDetail: any; handleEditClick: () => void }) {

    const [crewMemberPlusModalOpen, setCrewMemberPlusModalOpen] = useState(false) // 크루 멤버 추가 모달 스위치
      const [Name, setTitle] = useState("");
      const [content, setContent] = useState("");
      const [crewImage, setcrewImage] = useState(null)
       // 🔹 입력값 변경 시 상태 업데이트
       const handleTitleChange = (e : any) => setTitle(e.target.value);
       const handleContentChange = (e : any) => setContent(e.target.value);



       const [ loading, setLoading ] = useState(true) // 로딩 표시하는 변수
       const [ error, setError] = useState(null) // 에러 상태
       const {id} = useParams()
       const [file, setFile] = useState<any>(null);
       const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setFile(event.target.files[0]); // ✅ 파일 저장
        }
      };
      const [crewData, setCrewData] = useState<any>({ name: crewDetail.name, description: crewDetail.Description });

       const CrewInfoEdit = async() => {
        // if (!file) {
        //     alert("파일을 선택하세요.");
        //     return;
        //   }
          const formData = new FormData();
          if (Name== "") {formData.append("name", crewDetail.name)}

          else {formData.append("name", Name);} // ✅ 파일 추가
          
        if (content== "") {formData.append("description", crewDetail.description)}

            else {formData.append("description", content);} // ✅ 파일 추가

        if (file != null) {
            formData.append("image", file)
            console.log("실행확인")
        }
               try {
                    console.log(formData,"dd")
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
                console.log(err)
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

    
    
      


//   const PlusGenre = async () => {
//     const copyList = {genreNames : crewDetail.genres}
    
//   }

const PlusModal = styled.div`
    position: relative;
    z-index: 9999;

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
  const [searchMember, setsearchMember] = useState("")
  const [GenreSelectBoxOn, setGenreSelectBoxOn] = useState(false)
  const [memberResult, setMemberResult] = useState<any>([])

  const handleSearch = async () => {
    if (!searchMember.trim()) return;
    console.log("검색어:", searchMember);
  
    try {
      // ✅ 백엔드 API 호출
      const response = await axiosInstance.get(`/members?keyword=${searchMember}&&page=0&&size=10`);
      console.log(response.data)
      setMemberResult(response.data)
      } 
     catch (error) {
      console.error("❌ 백엔드 검색 요청 실패:", error);
  
    }
  };


const SearchBox = styled.div`
    display: flex;
   background-color: gray;
    border-radius: 5px;
    justify-content: center;
    gap: 5px;
    align-items: center;
`


const PlusMember = async (memId : any) => {

    try {
        console.log(id, memId)
        const payload = {crewId : id, memberId: memId}
        const res = await axiosInstance.post(`crew/member`, payload)

        console.log(res)
        alert("멤버 추가성공~")

    } catch (error : any) {
     console.error("❌ 멤버 추가 실패:", error);
     if (error.response) {
        console.error("🚨 서버 응답 오류:", error.response.data);
        alert(`멤버 추가 실패: ${error.response.data.message || "서버 오류 발생"}`);
      } else if (error.request) {
        console.error("🚨 요청을 보냈지만 응답 없음:", error.request);
        alert("서버가 응답하지 않습니다. 네트워크 상태를 확인하세요.");
      } else {
        console.error("🚨 요청 설정 오류:", error.message);
        alert("요청 중 오류 발생: " + error.message);
      }
    
   }
 };




    return (
    <div>
     
        <Box1Wrapper>
        <Box1Friend src={crewDetail.imageUrl} alt="crewImage"></Box1Friend>
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
            <ImageBox><input type="file" accept="image/*" onChange={handleFileChange} />
                            <div onClick={() => { { setPreview(null); setImage(null) } }}>x</div>
                        </ImageBox>
            </Box8>          
            
        </Box1Wrapper>
        {crewMemberPlusModalOpen && (
            <CrewMemberEditModalOverlay>
                <CrewMemberEditModalContent>
                    <input type="text" placeholder="멤버 검색" value={searchMember} onChange={(e)=>{setsearchMember(e.target.value)}} onKeyDown={(e) => {
        if (e.key === "Enter") handleSearch();
      }}  />
                    <button onClick={handleSearch}>검색하기</button>
                    {memberResult.content && memberResult.content.map((a : any,i:any)=> <SearchBox><div style={{color:"black"}}>{a.nickname}</div><button onClick={()=>{PlusMember(a.id)}}>멤버 추가</button></SearchBox> )}
                
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
    flex-direction: column;
`;

const ScheduleDetailModalContent = styled.div`
    background: black;
    color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;

    text-align: center;
    border-bottom: 1px dashed white;
`;

const ScheduleDetailModalContent2 = styled.div`
    background: black;
    color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    background-color:rgba(0, 0, 0, 0.8);
    height: 400px;

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

const ScheduleTitleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

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
const ModalCollumBox = styled.div`
    display: flex;
    flex-direction: column;
`
const FlexCan = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`


const TextBox = styled.div`
    display: flex;
    flex-direction: column;
`

const TitleText =styled.div`
    font-size: 25px;
    padding-bottom: 10px;
`
const ContentText = styled.div`
    padding-bottom: 50px;
`
const DateText = styled.div`
    
`
const FollowedIcon = styled.img`
    height: 25px;
    width: 25px;

`
const NotFollowedIcon = styled.img`
    height: 25px;
    width: 25px;
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

function ScheduleEditComponent({crewScheduleDetail,crewDetail}:any) {
    const [isSchedulePlusModalOpen, setisSchedulePlusModalOpen] = useState(false) // 스케쥴 추가 스위치
    const [isScheduleDetailModalOpen, setisScheduleDetailModalOpen] = useState(false) // 스케쥴 디테일 스위치
    const [isScheduleEditModalOpen, setisScheduleEditModalOpen] = useState(false) // 스케쥴 디테일 스위치
    const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<any>(1); // 선택된 스케줄 인덱스
    const [modalType, setModalType] = useState("")
    const { id} = useParams()
    const [map, setMap] = useState<kakao.maps.Map | null>(null);    
    const mapRef = useRef<kakao.maps.Map>(null)     
    const [bookmarked, setBookmarked] = useState(true);
    
    const [haveBookMarked, setHaveBookMarked] = useState(false)
    const [scheduleLikeList, setScheduleLikeList] = useState<any>([])

    const Check = async () => {
        try {
            const res = await axiosInstance.get('schedule/like')
            console.log(res.data, '새로운 좋아요리스트')
            setScheduleLikeList(res.data)
        } catch {

        }
    }

    const [canSee, setCanSee] = useState(false)
    const userCrewId = useCrewStore((state)=> state.id)
    console.log(id)
    console.log(userCrewId)

    useEffect(()=>{
        if ( Number(userCrewId) === Number(id)){
            setCanSee(true)
           
        }
    },[canSee])
    console.log(canSee)

    useEffect(()=> {
        const FetchLikeList = async () => {
            try {
                const res = await axiosInstance.get('schedule/like')
                console.log(res.data, '새로운 좋아요리스트')
                setScheduleLikeList(res.data)
              
            } catch {
                console.log("못받음")
            }
           
        }
        FetchLikeList()
        console.log("실행됨")
       
        for (let i = 0 ; i < scheduleLikeList.length; i++) {
            
            if(scheduleLikeList[i].id == crewDetail.schedules[selectedScheduleIndex-1].id ) {
                setHaveBookMarked(true)
                return
            } else {
                setHaveBookMarked(false)
            }
        }
    }, [isScheduleDetailModalOpen])

   
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
        } catch {

        }
    }

    const DeleteSchedule = async (scheduleId : any) => {
        try {
            const res = await axiosInstance.delete(`schedule/${scheduleId}`)
            alert("일정 삭제 성공!")
            window.location.reload(); // ✅ 화면 새로고침 
            
        } catch {

        }
    }
    

    useEffect(() => {
    console.log("북마크 상태 변경됨, 모달 리렌더링!");
    }, [bookmarked]); // ✅ bookmarked 상태가 변경될 때 실행됨

    const openModal = () => {
        setisSchedulePlusModalOpen(true)
    }

    const closeModal = () => {
        setisSchedulePlusModalOpen(false)
    }

    const [haveSchedule,sethaveSchedule] = useState(true) 

    return (
       <Box5>
        <div>
            <ScheduleText>
            <BuskingText >Busking </BuskingText> <p>Schedule </p>
            {canSee && <div onClick={()=>{
                setModalType("SchedulePlus");
             }}>
               +
            </div>}
            </ScheduleText>
            <Hr />
        </div>
        <Box10>
        <ScheduleList id="scroll-area"> 
            {
            crewDetail.schedules.map((a:any, i:any) => {
                return ( <ScheduleWrapper key={i} > <ScheduleImg src={crewDetail.imageUrl} alt="ScheduleImg"></ScheduleImg> <ScheduleTitle><ScheduleTitleComponent1>{a.title}</ScheduleTitleComponent1><div>{a.content}</div></ScheduleTitle><LeftArrowTag onClick={()=> {setisScheduleDetailModalOpen(true); setSelectedScheduleIndex(i+1);}} src={leftArrow} alt="leftArrow"></LeftArrowTag></ScheduleWrapper>)
            })
            }
        </ScheduleList>
        </Box10>
                   {/* 스케쥴 상세 정보 모달 */}
                   {isScheduleDetailModalOpen &&
            <ModalCollumBox>
                <ScheduleDetailModalOverlay>
                    <ScheduleDetailModalContent>
                        <ScheduleTitleBox><div style={{fontSize : "30px"}}>{crewDetail.name}</div> <GenreFlexBox>{crewDetail.genres.map((a:any,i:any)=>{return (<GenreBox>{a}</GenreBox>)})}</GenreFlexBox>   <div onClick={() => { setisScheduleDetailModalOpen(false) }}>X</div> </ScheduleTitleBox>
                      
                                
                    </ScheduleDetailModalContent>
                    <ScheduleDetailModalContent2>
                        <TextBox>
                        <TitleText> {crewDetail.schedules[selectedScheduleIndex-1].title}</TitleText>
                        <ContentText> {crewDetail.schedules[selectedScheduleIndex-1].content}</ContentText>
                        </TextBox>
                        <FlexCan>
                        <DateText>{crewDetail.schedules[selectedScheduleIndex-1].buskingDate[0]}년 {crewDetail.schedules[selectedScheduleIndex-1].buskingDate[1]}월 {crewDetail.schedules[selectedScheduleIndex-1].buskingDate[2]}일 {crewDetail.schedules[selectedScheduleIndex-1].buskingDate[3]}시 일자로, {crewDetail.schedules[selectedScheduleIndex-1].place}에서 버스킹합니다! </DateText>
                        
                        <RadiusBox>
                        {haveBookMarked  ? (<FollowedIcon src={followedIcon} alt="followedIcon" onClick={()=>{BookmarkMinus(crewDetail.schedules[selectedScheduleIndex-1].id)}}></FollowedIcon>) :
                        (<NotFollowedIcon src={notFollowedIcon} alt="notFollowedIcon" onClick={()=>{BookmarkPlus(crewDetail.schedules[selectedScheduleIndex-1].id)}}></NotFollowedIcon>)}
                        </RadiusBox>
                        </FlexCan>
                       <Map // 지도를 표시할 Container
                            center={{lat : crewDetail.schedules[selectedScheduleIndex-1].latitude, lng: crewDetail.schedules[selectedScheduleIndex-1].longitude}}
                            style={{
                            // 지도의 크기
                            width: "360px",
                            height: "200px",
                            }}
                            id="map"
                            onCreate={setMap}
                            level= {7} // 지도의 확대 레벨    
                            zoomable={true}
                            ref={mapRef}
                        >
                        <MapMarker position={{lat : crewDetail.schedules[selectedScheduleIndex-1].latitude, lng: crewDetail.schedules[selectedScheduleIndex-1].longitude}}>
                         </MapMarker>
                       </Map>
                        <ButtonWrapper2>
                        <DeleteBox onClick={()=>{DeleteSchedule(crewDetail.schedules[selectedScheduleIndex-1].id)}}>삭제</DeleteBox>
                        <EditBox onClick={()=> {setisScheduleDetailModalOpen(false); setModalType("ScheduleEdit"); }}>수정</EditBox>
                        </ButtonWrapper2>
                    </ScheduleDetailModalContent2>
                </ScheduleDetailModalOverlay>
            </ModalCollumBox>
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
                { modalType === "ScheduleEdit" && <ScheduleEditModal width="600px" height="500px" setModalType={setModalType} id={id} scheduleId ={crewDetail.schedules[selectedScheduleIndex-1].id}></ScheduleEditModal>}
       </Box5>



    )}


export default CrewDetailPage