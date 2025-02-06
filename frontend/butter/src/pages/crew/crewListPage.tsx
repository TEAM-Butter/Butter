import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import styled from "@emotion/styled";
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.jpg";
import sample3 from "../../assets/sample3.jpg";
import sample4 from "../../assets/sample4.jpg";
import sample5 from "../../assets/sample5.png";


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
        transform: translateY(-20px); /* 위로 이동 */
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
 justify-content : right;
 margin-right : 30px;
 margin-top : 50px;
 font-size : 30px;
`

const P1 = styled.div`
font-weight : bold;
white-space: pre; /* 띄어쓰기를 그대로 유지 */
`

const Box2 = styled.div`
 display : flex;
 justify-content : right;
 margin-right : 30px;
 margin-top : 10px;
 margin-bottom : 50px;
 font-size : 15px;
`

const ServerUrl = 'http://i12e204.p.ssafy.io:8081'


function CrewListPage() {
    const [crewId, setCrewId] = useState(0)  
    const [ loading, setLoading ] = useState(true) // 로딩 표시하는 변수
    const [ error, setError] = useState(null) // 에러 상태
    const [ crewList, setCrewList] = useState(['1번크루','2번크루','3번크루','4번크루','5번크루'])
    const images = [sample1,sample2,sample3,sample4,sample5]
    
    // useEffect (() => {
    //     const fetchCrewDetail = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get(`${ServerUrl}/api/v1/crew/list`) // 크루 리스트 정보 받아옴
    //             setCrewList(response.data);
    //         } catch (err:any) {
    //             setError(err.message); //요청 놓치면 에러 메세지 띄우기
    //         } finally {
    //             setLoading(false) // 요청 끝나면 로딩끄기
    //         }
    //     }

    //     if (crewId) {
    //         fetchCrewDetail();
    //     }
    // }, [crewId])
    
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    return (
        <div>
        <Box1>
            <P1>Busking </P1> <p>Crew</p>
        </Box1>
        <Box2>
        <p>당신의 마음에 맞는 크루를 지금 바로 찾아보세요!</p>
        </Box2>
       <Write>
       <div>C</div>
       <ImgContainer>
        <ImgStyle src={sample4} alt="Crew Logo 1" index={0} size="230px" />
        <ImgStyle src={sample2} alt="Crew Logo 2" index={1} size="230px" />
        <ImgStyle src={sample3} alt="Crew Logo 3" index={2} size="230px" />
        </ImgContainer>
       <Div1 > REW</Div1>
       </Write>
       <CrewListContainer>
        {crewList.map((a, i)=>{return( 
            <CrewBox key={i}>
            <Link to={`/crew/detail/${i+1}`}><div>{a}</div><ImgStyle2 src={images[i]} alt="crewImage"></ImgStyle2></Link>
            </CrewBox>
            )})} 
        </CrewListContainer>
       
       </div>
    )
}

export default CrewListPage