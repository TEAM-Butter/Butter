import styled from "@emotion/styled";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";
import MainPageImg from "../../assets/home/MainPageImg.png"
import LpImg2 from "../../assets/home/LpImg2.png"

const HomePageWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  `;

const Container = styled.div`
  background-image: url(${MainPageImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  width: 97%;
  height: 95%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.2);
  
  display: grid;
  grid-template-rows: 3fr 1.2fr;
  `

const LogoText = styled(motion.div)`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--butter);

  span {
    font-size: 23px;
  }
  `

const Logo = styled.div`
  font-size: 110px;
  font-weight: 600;
`
const SignUpBtnBox = styled.div`
  height: 70px;
  display: flex;
  align-items: flex-end;
`

const SignUpBtn = styled.div`
  border: 1px solid var(--butter);
  padding: 8px 40px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 300;
  transition: all ease-in-out 0.1s;

  &:hover {
    backdrop-filter: blur(5px);
    margin-bottom: 2px;
    box-shadow: 0 8px 15px rgba(0,0,0,0.2), 0 5px 10px rgba(0,0,0,0.15);
  }
`

const BottomWrapper = styled.div`
  display: grid;
  position: relative;
`

const TodayInfo = styled.div`
  max-width: 400px;
  margin: 10px 0 20px 80px;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.2);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  `

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
  `;

const LpImgBox = styled.div`
  position: absolute;
  left: -150px;
  top: -100px;
  background-image: url(${LpImg2});
  background-size: cover;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  box-shadow: 5px 5px 10px rgba(0,0,0,1);
  
  animation: ${rotate} 12s linear infinite;
  `

const HomePage = () => {

  return (<>
    <HomePageWrapper>
      <Container>
        <LogoText
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <Logo>BUTTER</Logo>
          <span>당신의 버스킹은 누군가의 하루를 특별하게 만듭니다.</span>
          <span>라이브를 통해 거리의 한계를 넘어 더 많은 이들과 그 순간을 나눠보세요.</span>
          <SignUpBtnBox>
            <Link to="/auth/signup"><SignUpBtn>SIGN UP</SignUpBtn></Link>
          </SignUpBtnBox>
        </LogoText>
        <BottomWrapper>
          <LpImgBox></LpImgBox>
          <TodayInfo>
            <div></div>
          </TodayInfo>
        </BottomWrapper>
      </Container>
    </HomePageWrapper >
  </>);
};

export default HomePage;
