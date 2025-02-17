import styled from "@emotion/styled";
import { motion } from "framer-motion"
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import MapImg1 from "../../assets/home/MapImg1.png"
import MapImg2 from "../../assets/home/MapImg2.png"
import MapImg3 from "../../assets/home/MapImg3.png"

const HomePageWrapper = styled(motion.div)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  width: 100%;
  height: 100%;

  @media (max-width: 920px) {
    overflow-y: auto;
    }
  `;

const Container = styled.div`
    width: 100%;
    height: 87%;
    padding: 0 35px;
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 10px;

    @media (max-width: 920px) {
    grid-template-columns: 1fr;
    }
`

const LtWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    #LgText {
        background: var(--liner);
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;

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

    #linkBtn, #linkIcon {
        padding: 15px 20px;
        font-size: 15px;
        font-weight: 300;
        background-color: rgba(255,255,255,0.2);
        border-radius: 30px;
    }
    
    #linkIcon {
        padding: 15px 16px;
        border-radius: 50%;
    }
`

const ImgBox = styled.div`
    width: 65%; 
    position: relative;
    
    #mapImg1 {
        width: 100%;
    }
    
    #mapImg2 {
        position:absolute;
        top: 20%;
        width: 80%;
        border-radius: 20px;
        left: 70%;
        
        @media (max-width: 920px) {
            width: 100%;
            left: 0;
            top: 0;
            position: relative;

        }
    }

    @media (max-width: 920px) {
        width: 100%;
    }
`

const RtWrapper = styled.div`
    display: grid;
    justify-content: center;
    gap: 0;

    div {
        width: 450px;
    }

    span {
        display:flex;
        flex-direction: row-reverse;
        padding: 10px;
        color: var(--yellow)
    }

    #mapImg3 {
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
    }
`


const Home2Page = () => {
    return (
        <HomePageWrapper
            key="home2"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5 }}
        >
            <Container>
                <LtWrapper>
                    <div id="LgText">MAP</div>
                    <div id="info1">Every moment is a chance to be the star, discover your next busking event.</div>
                    <div id="info2">
                        버스킹 일정을 한눈에 쉽게 확인하고, 원하는 날짜와 장소를 설정해 손쉽게 탐색할 수 있습니다.
                        크루가 등록한 다양한 버스킹 일정들을 지도에서 확인하며,
                        언제 어디서든 나만의 특별한 공연을 찾을 수 있습니다.
                        공연이 기다리는 그곳으로 떠나보세요!
                    </div>
                    <LinkBtnBox>
                        <div id="linkBtn">LINK TO MAP PAGE</div>
                        <div id="linkIcon">→</div>
                    </LinkBtnBox>
                    <ImgBox>
                        <img id="mapImg1" src={MapImg1} />
                        <img id="mapImg2" src={MapImg2} />
                    </ImgBox>
                </LtWrapper>
                <RtWrapper>

                    <div>
                        <span>KAKAO MAP</span>
                        <img id="mapImg3" src={MapImg3} />
                    </div>
                </RtWrapper>
            </Container>
        </HomePageWrapper>
    )
}

export default Home2Page;