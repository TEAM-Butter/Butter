import { useState } from "react";
import * as MC from "./modalComponents/modalComponents"
import styled from "@emotion/styled"
import { EmailExistRequest, EmailSendCodeRequest, EmailVerifyCodeRequest } from "../../../apis/request/auth/authRequest";
import { EmailExistSendDto, EmailVerifyCodeRequestDto } from "../../../apis/request/auth/authDto";

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
  const [email_id, setEmail_id] = useState("")
  const [code_id, setCode_id] = useState("")
  const [id_ps, setId_ps] = useState("")
  const [isIdExist, setIsIdExist] = useState(false)
  const [email_ps, setEmail_ps] = useState("")
  const [code_ps, setCode_ps] = useState("")


  const handleEmailSendCode = (type: string) => {
    if (type === "id") {
      const requestBody: EmailExistSendDto = { email: email_id, type: "SIGNUP" }

      // EmailExistRequest(requestBody).then((responseBody) => {
      //   console.log('responseBody', responseBody)
      // })

      EmailSendCodeRequest(requestBody).then((responseBody) => {
        console.log('responseBody:', responseBody)
      })
    } else {
      if (isIdExist) {
        const requestBody: EmailExistSendDto = { email: email_ps, type: "SIGNUP" }

        // EmailExistRequest(requestBody).then((responseBody) => {
        //   console.log('responseBody', responseBody)
        // })

        EmailSendCodeRequest(requestBody).then((responseBody) => {
          console.log('responseBody:', responseBody)
        })
      }
    }

  }

  const handleEmailVerifyCode = (type: string) => {
    if (type === "id") {
      const requestBody: EmailVerifyCodeRequestDto = { email: email_id, verifyCode: code_id, type: "SIGNUP" }
      EmailVerifyCodeRequest(requestBody).then((responseBody) => {
        console.log('responseBody:', responseBody)
      })
    } else {
      const requestBody: EmailVerifyCodeRequestDto = { email: email_ps, verifyCode: code_ps, type: "SIGNUP" }
      EmailVerifyCodeRequest(requestBody).then((responseBody) => {
        console.log('responseBody:', responseBody)
      })
    }
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
            <ForgotForm onSubmit={(e) => {
              e.preventDefault()
              handleEmailSendCode("id")
            }}>
              <ForgotInputWrapper>
                <ForgotLabel>이메일</ForgotLabel>
                <ForgotInput value={email_id} onChange={(e) => setEmail_id(e.target.value)} />
                <MC.FilledBtn
                  textColor="white"
                  width="140px"
                  height="100%"
                  color="black"
                >
                  인증번호 발송
                </MC.FilledBtn>
              </ForgotInputWrapper>
            </ForgotForm>
            <ForgotForm onSubmit={(e) => {
              e.preventDefault()
              handleEmailVerifyCode("id")
            }}>
              <ForgotInputWrapper>
                <ForgotLabel>인증번호</ForgotLabel>
                <ForgotInput value={code_id} onChange={(e) => setCode_id(e.target.value)} />
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
            <ForgotForm onSubmit={(e) => {
              e.preventDefault()
            }}>
              <ForgotInputWrapper>
                <ForgotLabel>아이디</ForgotLabel>
                <ForgotInput value={id_ps} onChange={(e) => setId_ps(e.target.value)} />
                <MC.FilledBtn
                  textColor="white"
                  width="140px"
                  height="100%"
                  color="black"
                >
                  확인
                </MC.FilledBtn>
              </ForgotInputWrapper>
            </ForgotForm>
            <ForgotForm onSubmit={(e) => {
              e.preventDefault()
              handleEmailSendCode("ps")
            }}>
              <ForgotInputWrapper>
                <ForgotLabel>이메일</ForgotLabel>
                <ForgotInput value={email_ps} onChange={(e) => setEmail_ps(e.target.value)} />
                <MC.FilledBtn
                  textColor="white"
                  width="140px"
                  height="100%"
                  color="black"
                >
                  인증번호 발송
                </MC.FilledBtn>
              </ForgotInputWrapper>
            </ForgotForm>
            <ForgotForm onSubmit={(e) => {
              e.preventDefault()
              handleEmailVerifyCode("ps")
            }}>
              <ForgotInputWrapper>
                <ForgotLabel>인증번호</ForgotLabel>
                <ForgotInput value={code_ps} onChange={(e) => setCode_ps(e.target.value)} />
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