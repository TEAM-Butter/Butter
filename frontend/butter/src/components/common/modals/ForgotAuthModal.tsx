import * as MC from "./modalComponents/modalComponents"
import styled from "@emotion/styled"
import { useState } from "react";
import { EmailExistRequestDto } from "../../../apis/request/auth/authDto";
import { emailExistRequest } from "../../../apis/request/auth/authRequest";
import { EmailExistResponseDto } from "../../../apis/response/auth";

const ForgotFormWrapper = styled.div``;
const ForgotForm = styled.form``;
const ForgotLabel = styled.label`
  width: 70px;
`;
const ForgotInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  border: 1px solid #6d6d6d;
  border-radius: 5px;
`;

const ForgotInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  gap: 15px;
  padding: 0 20px;
  margin-bottom: 10px;
`;

interface ModalSizeProps {
  width: string;
  height: string;
}

interface ModalProps extends ModalSizeProps {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

export const ForgotAuthModal = ({ setModalType, width, height }: ModalProps) => {
  const [forgetIdEmail, setForgetIdEmail] = useState<string>('')
  const [forgetIdCode, setForgetIdCode] = useState<string>('')
  const [isExistEmail, setisExistEmail] = useState(false)

  const handleFICodeSend = () => {
    const requestBody: EmailExistRequestDto = { email: forgetIdEmail, type: "SIGNUP" }
    emailExistRequest(requestBody).then((responseBody: EmailExistResponseDto | null) => {
      console.log(responseBody)
    })
  }

  return (
    <>
      <MC.ModalOverlay />
      <MC.ModalWrapper_v2 width={width} height={height}>
        <MC.ModalHeader_v2>
          <div>아이디/ 비밀번호 찾기</div>
          <MC.ModalCloseBtn
            onClick={() => {
              setModalType("");
            }}
            textColor="black"
          >
            X
          </MC.ModalCloseBtn>
        </MC.ModalHeader_v2>
        <MC.ModalBody_v2>
          {/* 아이디 찾기 폼 */}
          <ForgotFormWrapper>
            <MC.Comment_v2 textColor="black">아이디 찾기</MC.Comment_v2>
            <MC.Comment>찾고자하는 계정의 정보를 입력해주세요.</MC.Comment>
            <ForgotForm>
              <ForgotInputWrapper>
                <ForgotLabel>이메일</ForgotLabel>
                <ForgotInput type="email" value={forgetIdEmail} onChange={(e) => { setForgetIdEmail(e.target.value) }} />
                <MC.FilledBtn
                  textColor="white"
                  width="140px"
                  height="100%"
                  color="black"
                  onClick={(e) => {
                    e.preventDefault()
                    handleFICodeSend()
                  }}
                >
                  인증번호 발송
                </MC.FilledBtn>
              </ForgotInputWrapper>
            </ForgotForm>
            <ForgotForm>
              <ForgotInputWrapper>
                <ForgotLabel>인증번호</ForgotLabel>
                <ForgotInput />
                <MC.FilledBtn
                  textColor="white"
                  width="140px"
                  height="100%"
                  color="black"
                >
                  인증번호 확인
                </MC.FilledBtn>
              </ForgotInputWrapper>
            </ForgotForm>
          </ForgotFormWrapper>

          {/* 비밀번호 찾기 폼 */}
          <ForgotFormWrapper>
            <MC.Comment_v2 textColor="black">비밀번호 찾기</MC.Comment_v2>
            <MC.Comment>찾고자하는 계정의 정보를 입력해주세요.</MC.Comment>
            <ForgotForm>
              <ForgotInputWrapper>
                <ForgotLabel>아이디</ForgotLabel>
                <ForgotInput />
                <MC.FilledBtn
                  textColor="white"
                  width="140px"
                  height="100%"
                  color="black"
                >
                  확인
                </MC.FilledBtn>
              </ForgotInputWrapper>
              <ForgotInputWrapper>
                <ForgotLabel>이메일</ForgotLabel>
                <ForgotInput />
                <MC.FilledBtn
                  textColor="white"
                  width="140px"
                  height="100%"
                  color="black"
                >
                  인증번호 발송
                </MC.FilledBtn>
              </ForgotInputWrapper>
              <ForgotInputWrapper>
                <ForgotLabel>인증번호</ForgotLabel>
                <ForgotInput />
                <MC.FilledBtn
                  textColor="white"
                  width="140px"
                  height="100%"
                  color="black"
                >
                  인증번호 확인
                </MC.FilledBtn>
              </ForgotInputWrapper>
            </ForgotForm>
          </ForgotFormWrapper>
        </MC.ModalBody_v2>
      </MC.ModalWrapper_v2>
    </>
  );
};