import styled from "@emotion/styled";

const FormWrapper = styled.form``

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
interface ColorProps {
    bgColor?: string;
    textColor?: string;
}

export const LoginForm = () => {
  return (
        <FormWrapper>
            <LgText textColor="black">Log into<br/>your account</LgText>
            <LoginInput placeholder="type your id."></LoginInput>
            <LoginInput placeholder="type your password."></LoginInput>
            <Modal>아이디/ 비밀번호를 잊어버리셨나요?</Modal>
            <LoginBtn bgColor="rgba(0,0,0,0.4)" type="submit">Log in</LoginBtn>
            <LoginBtn bgColor="black">Log in with <span>kakao</span></LoginBtn>
        </FormWrapper>
  )
};

export const SignupForm = () => {
    return (
          <FormWrapper>
              <LgText textColor="black">Log into<br/>your account</LgText>
              <LoginInput placeholder="type your id."></LoginInput>
              <LoginInput placeholder="type your password."></LoginInput>
              <Modal>아이디/ 비밀번호를 잊어버리셨나요?</Modal>
              <LoginBtn bgColor="rgba(0,0,0,0.4)" type="submit">Log in</LoginBtn>
              <LoginBtn bgColor="black">Log in with <span>kakao</span></LoginBtn>
          </FormWrapper>
    )
  };

