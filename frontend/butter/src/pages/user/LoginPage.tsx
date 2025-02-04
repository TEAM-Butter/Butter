import styled from "@emotion/styled";
import { LoginForm } from "../../components/user/AuthForm";
import { Link } from "react-router-dom";
import { ForgotAuthModal } from "../../components/common/modals/modal";
import { useState } from "react";

const LoginPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: grid; /* 부모에 grid 적용 */
  grid-template-columns: 1fr 2.5fr; /* 좌우 동일 비율 */
`;

const LtContainer = styled.div`
    display: grid;
    gap: 15px;
`
const RtContainer = styled.div``
const LoginFormWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 40px;
    min-width: 400px;
    /* height: 500px; */
    border-radius: 30px;
    background: var(--liner);
`

const LgText = styled.div<ColorProps>`
    width: 100%;
    font-size: 35px;
    color: ${(props) => props.textColor};
    font-weight: 200;
`

const LoginInput = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    padding: 15px 5px;
    font-size: 17px;
    font-weight: 500;
    margin-top: 10px;
`

const Modal = styled.div`
    width: 100%;
    color: #6D6D6D;
    font-size: 14px;
    padding: 10px 0 15px 0;
`

const LoginBtn = styled.button<ColorProps>`
    border: none;
    background-color: ${(props) => props.bgColor};
    width: 100%;
    height: 50px;
    border-radius: 30px;
    font-size: 18px;
    color: white;
    margin-top: 12px;

    span {
        color: var(--yellow);
    }
`

const SignupLink = styled.div`
    min-width: 370px;
    min-height: 150px;
    background-color: black;
    border-radius: 30px;
    padding: 20px 40px;

    span {
        display: block;
        font-weight: 100;
        margin-top: 5px;
    }
`

interface ColorProps {
    bgColor?: string;
    textColor?: string;
}

const LoginPage = () => {
  return <LoginPageWrapper>
    <LtContainer>
        <LoginFormWrapper>
            <LgText textColor="black">Log into<br/>your account</LgText>
            <LoginInput placeholder="type your id."></LoginInput>
            <LoginInput placeholder="type your password."></LoginInput>
            <Modal>아이디/ 비밀번호를 잊어버리셨나요?</Modal>
            <LoginBtn bgColor="rgba(0,0,0,0.4)">Log in</LoginBtn>
            <LoginBtn bgColor="black">Log in with <span>kakao</span></LoginBtn>
        </LoginFormWrapper>
        <SignupLink><LgText>Sign up</LgText><span>create your account</span></SignupLink>
    </LtContainer>
    <RtContainer></RtContainer>
  </LoginPageWrapper>;
};

export default LoginPage;
