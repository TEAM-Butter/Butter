import styled from "@emotion/styled";
import { motion } from "framer-motion"
import { keyframes } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import StreamingImg from "../../assets/home/StreamingImg.jpg"
import pet1 from "/src/assets/pets/pet1.png";
import pet2 from "/src/assets/pets/pet2.png";
import pet3 from "/src/assets/pets/pet3.png";
import pet4 from "/src/assets/pets/pet4.png";
import pet5 from "/src/assets/pets/pet5.png";
import pet6 from "/src/assets/pets/pet6.png";
import { useEffect } from "react";
import { LiveListRequest } from "../../apis/request/live/liveRequest";
import { LiveListResponseDto } from "../../apis/response/live";
import { useUserStore } from "../../stores/UserStore";

const HomePageWrapper = styled(motion.div)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: var(--liner); */
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
const LtWrapper = styled.div`
    height: 50%;
    display: grid;
    padding: 0 20px;
    grid-template-rows: 1fr auto;
    #petText {
        display: flex;
        align-items: flex-end;
        padding: 15px;
    }
`

const RtWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;

`

const BgText = styled.div`
    background: var(--liner);
    display: flex;
    position: absolute;
    z-index: -5;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 300px;
    font-weight: 800;
    letter-spacing: -20px;
    
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 920px) {
        background: linear-gradient(225deg, #141425, #bee7dd);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
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
    justify-content: flex-end;
    margin-top: auto;
    margin-bottom: 20px;

    #linkBtn, #linkIcon {
        padding: 15px 20px;
        font-size: 15px;
        font-weight: 300;
        background-color: rgba(255,255,255,0.2);
        border-radius: 30px;
        transition: all ease-in-out 0.2s;
        
        &:hover{
            background-color: rgba(255,255,255,0.3);
        }
    }
    
    #linkIcon {
        padding: 15px 16px;
        border-radius: 50%;
    }

    &:hover{
        #linkBtn, #linkIcon {
            background-color: rgba(255,255,255,0.3);
        }
    }
`

const LiveWrapper = styled.div`
    background-color: rgba(255,255,255,0.2);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    height: 300px;
    margin-bottom: 50px;
`

const ImgWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    transform: scaleX(-1);
`

const Home3Page = () => {
    const navigate = useNavigate();
    const isLogin = useUserStore(state => state.isLogin)

    const handleClick = () => {
        if (isLogin) {
            navigate('/stream-list')
        } else {
            navigate('/auth/login')
        }
    }

    return (
        <HomePageWrapper>
            <Container>
                <LtWrapper>
                    <div id="petText">귀여운 아바타들과 함께 라이브를 즐겨요!</div>
                    <ImgWrapper>
                        <img id="pet1" src={pet1} alt="pet1" />
                        <img id="pet5" src={pet5} alt="pet5" />
                        <img id="pet3" src={pet3} alt="pet3" />
                    </ImgWrapper>
                </LtWrapper>
                <RtWrapper>
                    <InfoWrapper>
                        <div id="LgText">STREAMING</div>
                        <div id="info1">
                            Every moment is a chance to connect, experience live busking like never before.<br />
                            모든 순간이 연결될 기회입니다. 지금까지 경험해보지 못한 라이브 버스킹을 만나보세요.
                        </div>
                        <div id="info2">
                            크루가 버스킹 라이브를 등록하고, 시청자는 실시간으로 공연을 감상할 수 있습니다.
                            장르별 인기순으로 라이브를 정렬하여 원하는 공연을 쉽게 찾고,
                            라이브 페이지에서 나만의 아바타를 통해 더욱 생동감 있게 공연을 즐길 수 있습니다.
                            예를 들어, 시청자가 카메라에 대고 손하트를 하면 아바타도 손하트를 보내고, 따봉을 하면 아바타가 따봉을 표현합니다.
                            더욱 실감 나는 라이브 경험을 지금 만나보세요!
                        </div>
                        <LinkBtnBox onClick={handleClick}>
                            <div id="linkBtn">LINK TO STREAMING PAGE</div>
                            <div id="linkIcon">→</div>
                        </LinkBtnBox>
                    </InfoWrapper>
                    {/* <LiveWrapper>
                    </LiveWrapper> */}
                </RtWrapper>
            </Container>
            <BgText>STREAMING</BgText>
        </HomePageWrapper>
    )
}

export default Home3Page;