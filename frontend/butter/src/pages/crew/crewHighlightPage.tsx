import styled from "@emotion/styled";
import { axiosInstance } from "../../apis/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCrewStore } from "../../stores/UserStore";
import { div } from "framer-motion/client";
import previousIcon from "../../assets/previousIcon.png"
import nextIcon from "../../assets/nextIcon.png"

function CrewHighlightPage() {




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


        const [liveList, setLiveList] = useState<any>([])


        const [currentIndex, setCurrentIndex] = useState(0);

        const nextVideo = () => {
        if (currentIndex < liveList.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        };

        const prevVideo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
        };

      useEffect (() => {
            const fetchCrewDetail = async () => {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`/crew/detail/${id}`) // 크루 디테일 정보 받아옴
                    setCrewDetail(response.data);
                    console.log("response.data : ", response.data)
                    const response2 = await axiosInstance.get(`/clip/list`, {
                              params: {
                                clipId: id,
                                pageSize: 10,
                                liveId: null,
                              },})
                    console.log(response2.data, "클립 리스트")
                    response2.data.map((a : any, i:any)=>{if(a.crew.id== id){liveList.push(a)}})
                    console.log(liveList)
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



    const PageContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `

    const TitleBox = styled.div`
        padding-top: 70px;
        font-size: 70px;
        font-weight: 550;
    `

    const TitleBox2 = styled.div`
        margin-top: 10px;
        font-size: 20px;
    `
    const VideoBox = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 70px;
        gap: 20px;
    `
    const PreviousIcon = styled.img`
     height: 50px ;
     width: 50px;

    `
    const NextIcon = styled.img`
        height: 50px ;
        width: 50px;

    `
       
    const Circle = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70px;
        width: 70px;
        background-color: rgba(208, 208, 208, 0.4);
        border-radius: 50px;
    `



    return (
        <PageContainer>
        <TitleBox>{crewDetail.name}'s HIGHLIGHT CLIP</TitleBox>
        { liveList[currentIndex] ?
            <>
            <TitleBox2>{liveList[currentIndex].crew.description}</TitleBox2>
            <VideoBox>
                <Circle>
                    <PreviousIcon src={previousIcon} alt="previousIcon" onClick={prevVideo} >
                    </PreviousIcon>
                </Circle>

                    <video width="600" controls>
                    <source src={liveList[currentIndex].videoUrl} type="video/mp4" />
                    </video>
                <Circle>
                    <NextIcon src={nextIcon} alt="nextIcon" onClick={nextVideo}>
                    </NextIcon>
                </Circle>
            </VideoBox>
            </>
            :
            <TitleBox2>등록된 하이라이트가 없습니다.</TitleBox2>
            }
        </PageContainer>
    )
}


export default CrewHighlightPage