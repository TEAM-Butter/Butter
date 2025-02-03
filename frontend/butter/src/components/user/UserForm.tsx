import styled from "@emotion/styled";
import { useState } from "react";

const FormWrapper = styled.form``

const LgText = styled.div<ColorProps>`
    width: 100%;
    font-size: 35px;
    color: ${(props) => props.textColor};
    font-weight: 200;
`

const TextInput = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    padding: 15px 5px;
    font-size: 17px;
    font-weight: 500;
    margin-top: 10px;
`


const FormBtn = styled.button<ColorProps>`
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
interface ColorProps {
    bgColor?: string;
    textColor?: string;
}

// Login Css
const ForgetComment = styled.div`
    width: 100%;
    color: #6D6D6D;
    font-size: 14px;
    padding: 10px 0 15px 0;
`

interface ModalProps{
    setModalType: React.Dispatch<React.SetStateAction<string>>,
}

export const LoginForm = ({setModalType}: ModalProps) => {
    return (
            <FormWrapper>
                <LgText textColor="black">Log into<br/>your account</LgText>
                <TextInput placeholder="type your id." />
                <TextInput placeholder="type your password." />
                <ForgetComment className="openModalBtn" onClick={() => { setModalType("forgotAuth") }}>아이디/ 비밀번호를 잊어버리셨나요?</ForgetComment>
                <FormBtn bgColor="rgba(0,0,0,0.4)" type="submit">Log in</FormBtn>
                <FormBtn bgColor="black">Log in with <span>kakao</span></FormBtn>
            </FormWrapper>
    )
};

const RadioWrapper = styled.div`
    display: flex;
    gap: 5px;
    padding: 10px 0;`

const InputLabel = styled.label`
    color: var(--darkgray);
    display: flex;
    align-items: center;
    gap: 3px;
`
const RadioInput = styled.input`
`
const BirthInput = styled.input`
    margin-left: 5px;
`

export const SignupForm = () => {
    return (
        <FormWrapper>
            <LgText textColor="black">Sign up<br/>your account</LgText>
            <TextInput placeholder="type your id." />
            <TextInput placeholder="type your email." />
            <TextInput placeholder="type your password." />
            <RadioWrapper>
                <InputLabel>
                    <RadioInput type="radio" id="gender" name="gender" />
                    woman
                </InputLabel>
                <InputLabel>
                    <RadioInput type="radio" id="gender" name="gender" />
                    man
                </InputLabel>
            </RadioWrapper>
            <InputLabel>
                Birth Date
                <BirthInput type="date" required aria-required="true"/>
            </InputLabel>
            <FormBtn bgColor="rgba(0,0,0,0.4)" type="submit">Sign up</FormBtn>
            <FormBtn bgColor="black">Sign up with <span>kakao</span></FormBtn>
        </FormWrapper>
    )
  };

