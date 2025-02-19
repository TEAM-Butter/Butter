import axios from "axios"
import { useRef, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import styled from "@emotion/styled";
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.jpg";
import sample3 from "../../assets/sample3.jpg";
import sample4 from "../../assets/sample4.jpg";
import sample5 from "../../assets/sample5.png";
import { motion } from "framer-motion";
import findIcon from "../../assets/findIcon.png";
import { CrewSearchModal } from "../../components/common/modals/CrewSearchModal";
import { axiosInstance } from "../../apis/axiosInstance";
import { GenreToggle } from "../../components/common/toggle/toggle";

const Write = styled.div`
 font-size : 200px;
 display : flex;
 text-align: center;
 align-items: center;
 justify-content : center;
 font-weight : bold;
 gap : 30px;
 margin-left : 50px;
 margin-bottom : 60px ; 
 height: 300px;
`


// 이미지 컨테이너
const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 120px; /* 이미지가 올라갈 공간 확보 */
`;

// 이미지 스타일
interface ImgProps {
    index: number;
    size?: string;
}

const Div1 = styled.div`
 right : 70px;
 position : relative;
`

// 이미지 스타일1
const ImgStyle = styled.img<ImgProps>`
    width: ${(props) => props.size || "80px"};
    height: ${(props) => props.size || "80px"};
    border-radius: 50%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out, z-index 0.3s ease-in-out;
    position: relative;

    ${({ index }) => index === 0 && "left: 0; z-index: 1;"}
    ${({ index }) => index === 1 && "right: 40px; z-index: 2;"}
    ${({ index }) => index === 2 && "right: 80px; z-index: 3;"}

    &:hover {
        transform: translateY(-30px); /* 위로 이동 */
    }
`;

// CrewListContainer: 화면 가로 전체에 꽉 차게
const CrewListContainer = styled.div`
    display: flex;  /* 한 줄에 정렬 */
    flex-wrap: wrap; /* 화면이 좁으면 줄 바꿈 */
    padding: 0 10px; /* 양쪽 끝에서 20px만큼 떨어지게 */
    gap: 15px;  /* 박스 간 간격 */
    width: 100%;  /* 가로 너비 100% */
    justify-content: center;
`;

// CrewBox: 각 크루 박스의 크기 조정
const CrewBox = styled.div`
    color: white;
    width: 15%; /* 각 박스가 화면 가로 15%씩 차지 */
    padding: 20px 0px;
    box-sizing: border-box; /* 패딩 포함해서 크기 계산 */
    text-align: center; /* 텍스트 중앙 정렬 */
    &:hover {
        outline: 1px solid gray;  /* 마우스가 올라갔을 때 하얀 테두리 */
    }
`;

// 이미지 스타일2
const ImgStyle2 = styled.img<any>`
    width: 100%; /* 부모 div의 너비에 맞춰 이미지 크기 */
    height: 170px; /* 비율에 맞게 높이 설정 */
`;


const Box1 = styled.div`
 display : flex;
 flex-direction: column;
 align-items : flex-end;
 margin-right : 30px;
 margin-top : 50px;
 font-size : 30px;
 position: relative;
`

const P1 = styled.div`
font-weight : bold;
white-space: pre; /* 띄어쓰기를 그대로 유지 */
`

const Box2 = styled.div`
 display : flex;
 flex-direction: column;
 align-items: flex-end;
 margin: 35px 30px 10px 30px;
 gap: 10px;
 font-size : 15px;
`

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
`;


const FindBox = styled.img`
  color: white;
  border-radius: 30px;
  height: 20px;
  width: 20px;

`
// const SearchWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     position: absolute;
//     right: 0px;
//     top : 70px;
//     background-color: black;
//     height: 40px;
//   width: 130px;
//   font-size: 20px;
//   color: white;
//   z-index: 500;
//   padding-left: 13px;
//   padding-right: 13px;
//   border-radius: 30px;
//   border: 2px solid white;
// `
const SearchText = styled.div`
    
`
const FilterWrapper = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    height: 100%;
    width: 200px;
    justify-content: space-between;
    padding: 0 15px;
    border-radius: 20px;
    background-color: #040a14;
    border: 1px solid white;
`

const FlexCan = styled.div`
    display: flex;
 ;
`



function CrewListPage() {
    const [crewId, setCrewId] = useState(0)  
    const [ loading, setLoading ] = useState(true) // 로딩 표시하는 변수
    const [ error, setError] = useState(null) // 에러 상태
    const [ crewList, setCrewList] = useState([])
    const images = [sample1,sample2,sample3,sample4,sample5]
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState("")
    const navigate = useNavigate()
    const [genreToggle, setGenreToggle] = useState("All")


    const videoRef = useRef<HTMLVideoElement>(null);




    const [dummy,setdummy] = useState<string>("")
    
    useEffect (() => {
        const fetchCrewDetail = async () => {
            try {
                // ✅ 헤더 추가: Authorization (JWT 토큰 포함)
                setLoading(true);
                if (genreToggle == "All"){
                    const response = await axiosInstance.get(`/crew/list?pageSize=20&sortBy=followerCount`)
                    setCrewList(response.data);
                    console.log(response.data)
                    // const response2 = await axiosInstance.get('clip/detail/8')
                    // setdummy(response2.data.videoUrl)
                    // console.log(response2.data)
                    // const response3 = await axiosInstance.get('clip/list?pageSize=5')
                    // console.log(response3.data)
                } else if (genreToggle == "R&B"){
                    const response = await axiosInstance.get(`/crew/list?pageSize=20&sortBy=followerCount&genre=R%26B`)
                    setCrewList(response.data);
                    console.log(response.data)
                } else{
                const response = await axiosInstance.get(`/crew/list?pageSize=10&sortBy=followerCount&genre=${genreToggle}`)
                setCrewList(response.data); // 크루 리스트 정보 받아옴
                console.log(response.data)}
                console.log(genreToggle)
                
            } catch (err: any) {
                setError(err.message); //요청 놓치면 에러 메세지 띄우기
            } finally {
                setLoading(false) // 요청 끝나면 로딩끄기
            }
        }

        fetchCrewDetail();
  

    }, [genreToggle])
   

console.log(dummy, '주소')


    return (
        <div>
        <Box2>
            <FilterWrapper>
            <GenreToggle setGenreToggle={setGenreToggle} />
            <SearchWrapper
                onClick={()=>{
                    setModalType("crewSearch")
                    // setIsModalOpen(!true)
                }}>
                <div>크루 검색</div>
                <FindBox src={findIcon} alt="findIcon"></FindBox>
            </SearchWrapper>
            </FilterWrapper>
        </Box2>
        <Box1>
            <FlexCan><P1>Busking </P1> <p>Crew</p></FlexCan>
            <p>당신의 마음에 맞는 크루를 지금 바로 찾아보세요!</p>
        </Box1>
        
       <Write>
       <div>C</div>
       <ImgContainer>
       {crewList.map((a : any, i ) =>{if(i <=2 ) return(<Link to={`/crew/detail/${a.id}`}><ImgStyle src={a.imageUrl} alt="Crew Logo 1" index={i} size="230px" /></Link> )})}
        </ImgContainer>
       <Div1 > REW</Div1>
       </Write>
       <CrewListContainer>
        {crewList.map((a :any, i : number)=>{ if (3 <=i && i <=7 )return(
             
            <CrewBox key={i}>
            <Link to={`/crew/detail/${a.id}`}><div>{a.name}</div><ImgStyle2 src={a.imageUrl} alt="crewImage"></ImgStyle2></Link>
            </CrewBox>
            )})} 
        </CrewListContainer>
       { modalType === "crewSearch" && <CrewSearchModal width="600px" height="500px" setModalType={setModalType}></CrewSearchModal>}
       </div>
    )
}

export default CrewListPage