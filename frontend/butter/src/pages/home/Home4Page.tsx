import styled from "@emotion/styled";
import { motion } from "framer-motion"
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import StreamingImg from "../../assets/home/StreamingImg.jpg"
import band1 from "../../assets/home/band1.jpg"
import band2 from "../../assets/home/band2.jpg"
import band3 from "../../assets/home/band3.jpg"
import band4 from "../../assets/home/band4.jpg"

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
        margin-bottom: 40px;
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
        background-color: rgba(107, 102, 102, 0.1);
        border-radius: 30px;
    }
    
    #linkIcon {
        padding: 15px 16px;
        border-radius: 50%;
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
    return (
        <HomePageWrapper>
            <Container>
                <RtWrapper>
                    <InfoWrapper>
                        <div id="LgText">CREW</div>
                        <div id="info1">Every moment is a chance to be the star, discover your next busking event.</div>
                        <div id="info2">
                            버스킹 일정을 한눈에 쉽게 확인하고, 원하는 날짜와 장소를 설정해 손쉽게 탐색할 수 있습니다.
                            크루가 등록한 다양한 버스킹 일정들을 지도에서 확인하며,
                            언제 어디서든 나만의 특별한 공연을 찾을 수 있습니다.
                            공연이 기다리는 그곳으로 떠나보세요!
                        </div>
                        <LinkBtnBox>
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