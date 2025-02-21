import styled from "@emotion/styled";
import { motion } from "framer-motion"
import { keyframes } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import StreamingImg from "../../assets/home/StreamingImg.jpg"
import band1 from "../../assets/home/band1.jpg"
import band2 from "../../assets/home/band2.jpg"
import band3 from "../../assets/home/band3.jpg"
import band4 from "../../assets/home/band4.jpg"
import { useUserStore } from "../../stores/UserStore";

const HomePageWrapper = styled(motion.div)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--liner);
  color: var(--bgColor);

  @media (max-width: 920px) {
    overflow-y: auto;
    }
  `;

const Container = styled.div`
    width: 100%;
    height: 87%;
    padding: 0 35px;
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 20px;
    padding-bottom: 20px;

    @media (max-width: 920px) {
    grid-template-columns: 1fr;
    }
`

const RtWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;

    `

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    #LgText {
        color: var(--bgColor);
        font-weight: 500;
        font-size: 80px;
    }
    
    #info1 {
        font-size: 20px;
        margin-bottom: 20px;
    }
    
    #info2 {
        font-size: 20px;
        letter-spacing: 2px;
        line-height: 1.1;
    }
`

const LinkBtnBox = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    
    #linkBtn, #linkIcon {
        padding: 15px 20px;
        font-size: 15px;
        font-weight: 300;
        background-color: rgba(0,0,0,0.2);
        border-radius: 30px;
        transition: all ease-in-out 0.2s;
    }
    
    #linkIcon {
        padding: 15px 16px;
        border-radius: 50%;
    }

    &:hover{
        #linkBtn, #linkIcon {
            background-color: rgba(0,0,0,0.1);
        }
    }
`

const LtWrapper = styled.div`
    display: flex;
    padding: 0 20px;
    gap: 5px;
    height: 100%;
`
const CrewImg = styled.div`
    flex: 1;
    transition: all ease-in-out 0.3s;
    object-fit: cover;

    &:hover {
        flex: 2;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const Home4Page = () => {
    const navigate = useNavigate();
    const isLogin = useUserStore(state => state.isLogin)

    const handleClick = () => {
        if (isLogin) {
            navigate('/crew/list')
        } else {
            navigate('/auth/login')
        }
    }

    return (
        <HomePageWrapper>
            <Container>
                <RtWrapper>
                    <InfoWrapper>
                        <div id="LgText">CREW</div>
                        <div id="info1">
                            Find artists who touch your soul and follow the crews that inspire you.<br />
                            마음을 울리는 아티스트를 만나고, 영감을 주는 크루를 팔로우하세요.
                        </div>
                        <div id="info2">
                            노래, 춤, 그리고 다양한 버스킹 퍼포먼스를 선보이는 아티스트들을 한곳에서 만나보세요.
                            크루의 상세 페이지에서는 버스킹 일정, 공지사항, 소개, 그리고 하이라이트 영상을 확인할 수 있습니다.
                            마음에 드는 크루를 팔로우하면, 새로운 버스킹 일정이 등록되거나 라이브가 시작될 때 가장 먼저 소식을 받아볼 수 있습니다.
                            지금, 나만의 특별한 크루를 찾아보세요!
                        </div>
                        <LinkBtnBox onClick={handleClick}>
                            <div id="linkBtn">LINK TO STREAMING PAGE</div>
                            <div id="linkIcon">→</div>
                        </LinkBtnBox>
                    </InfoWrapper>
                </RtWrapper>
                <LtWrapper>
                    <CrewImg><img src={band2} /></CrewImg>
                    <CrewImg><img src={band1} /></CrewImg>
                    <CrewImg><img src={band3} /></CrewImg>
                    <CrewImg><img src={band4} /></CrewImg>
                </LtWrapper>
            </Container>
        </HomePageWrapper>
    )
}

export default Home4Page;