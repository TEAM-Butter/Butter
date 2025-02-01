import styled from "@emotion/styled";
import { SignupForm } from "../../components/user/UserForm";
import { Link } from "react-router-dom";

const SignupPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: grid; /* 부모에 grid 적용 */
  grid-template-columns: 1fr 2.5fr; /* 좌우 동일 비율 */
  `;

const LtContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr auto; /* 좌우 동일 비율 */
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
    border-radius: 30px;
    background: var(--liner);
`

const SignupLink = styled.div`
    min-width: 370px;
    min-height: 100px;
    background-color: black;
    border-radius: 30px;
    padding: 20px 40px;

    div {
        width: 100%;
        font-size: 35px;
        font-weight: 200;
    }

    span {
        display: block;
        font-weight: 100;
        margin-top: 5px;
    }
`

const SignupPage = () => {
  return <SignupPageWrapper>
    <LtContainer>
        <LoginFormWrapper>
            <SignupForm />
        </LoginFormWrapper>
        <Link to="/auth/login">
            <SignupLink>
                <div>Log in</div>
                <span>if you already have account?</span>
            </SignupLink>
        </Link>
    </LtContainer>
    <RtContainer></RtContainer>
  </SignupPageWrapper>;
};

export default SignupPage;
