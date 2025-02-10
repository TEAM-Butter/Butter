import styled from "@emotion/styled";
import { LoginForm } from "../../components/user/AuthForm";
import { Link } from "react-router-dom";
import { ForgotAuthModal } from "../../components/common/modals/ForgotAuthModal";
import { useState } from "react";
import { ForgotAuthInfoModal } from "../../components/common/modals/ForgotAuthInfoModal";

const LoginPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
`;

const LtContainer = styled.div`
  grid-template-rows: 1fr auto;
  display: grid;
  gap: 15px;
`;
const RtContainer = styled.div``;

const LoginFormWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 50px 40px;
  min-width: 400px;
  border-radius: 30px;
  background: var(--liner);
`;

const SignupLink = styled.div`
  min-width: 370px;
  min-height: 130px;
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
`;

const LoginPage = () => {
  const [modalType, setModalType] = useState<string>("forgotAuthInfo");
  return (
    <>
      <LoginPageWrapper>
        <LtContainer>
          <LoginFormWrapper>
            <LoginForm setModalType={setModalType} />
          </LoginFormWrapper>
          <Link to="/auth/signup">
            <SignupLink>
              <div>Sign up</div>
              <span>create your account</span>
            </SignupLink>
          </Link>
        </LtContainer>
        <RtContainer></RtContainer>
      </LoginPageWrapper>
      {modalType === "forgotAuth" && (
        <ForgotAuthModal
          width="600px"
          height="300px"
          setModalType={setModalType}
        ></ForgotAuthModal>
      )}
      {modalType === "forgotAuthInfo" && (
        <ForgotAuthInfoModal
          width="500px"
          height="300px"
          setModalType={setModalType}
          >
          
        </ForgotAuthInfoModal>
      )}
    </>
  );
};

export default LoginPage;
