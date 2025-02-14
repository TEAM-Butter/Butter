import { useState } from "react";
import * as MC from "./modalComponents/modalComponents.tsx"
import styled from "@emotion/styled"
import { EmailExistRequest, EmailSendCodeRequest, EmailVerifyCodeRequest } from "../../../apis/request/auth/authRequest";
import { EmailExistSendDto, EmailVerifyCodeRequestDto } from "../../../apis/request/auth/authDto";
import { EmailVerifyCodeResponseDto } from "../../../apis/response/auth";
import { CheckLoginIdRequestDto } from "../../../apis/request/member/memberDto";
import { CheckLoginIdRequest } from "../../../apis/request/member/memberRequest";
import { CheckLoginIdResponseDto } from "../../../apis/response/member";

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

const ForgotComment = styled.div`
  padding: 0 20px;
  font-size: 14px;
  height: 14px;
  color: var(--red);
`

interface ModalSizeProps {
  width: string;
  height: string;
}

interface ModalProps extends ModalSizeProps {
  setForgotInfo: React.Dispatch<React.SetStateAction<string>>; 
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

export const ForgotAuthModal = ({ setModalType, setForgotInfo, setType,  width, height }: ModalProps) => {
  const [email_id, setEmail_id] = useState("")
  const [code_id, setCode_id] = useState("")
  const [id_ps, setId_ps] = useState("")
  const [isIdExist, setIsIdExist] = useState(false)
  const [email_ps, setEmail_ps] = useState("")
  const [code_ps, setCode_ps] = useState("")
  const [forgotIdComment, setForgotIdComment] = useState("")
  const [forgotPsComment, setForgotPsComment] = useState("")


  const handleCheckLoginId = () => {
    const requestBody: CheckLoginIdRequestDto = { loginId: id_ps }
    setForgotPsComment("아이디를 확인 중 입니다.")
    
    CheckLoginIdRequest(requestBody).then((responseBody: CheckLoginIdResponseDto | null) => {
      if (id_ps && responseBody) {
        if( responseBody.exists ) {
          setForgotPsComment("존재하는 아이디 입니다.")
          setIsIdExist(true)
        } else {
          setForgotPsComment("존재하지 않는 아이디 입니다.")
          setIsIdExist(false)
        }
      } else {
        setForgotPsComment("존재하지 않는 아이디 입니다.")
        setIsIdExist(false)
      }
    })
  }
  
  const handleEmailSendCode = (type: string) => {
    if (type === "id") {
      setForgotIdComment("이메일을 확인 중 입니다.")
      const requestBody: EmailExistSendDto = { email: email_id, type: "FIND_ID" }
      
      EmailExistRequest(requestBody).then((responseBody) => {
        if ( email_id && responseBody) {
          EmailSendCodeRequest(requestBody).then((responseBody) => {
            console.log('responseBody:', responseBody)
            setForgotIdComment("인증코드가 발송되었습니다.")
          })
        } else {
          setForgotIdComment("존재하지 않는 이메일 입니다.")
        }
      })
      
    } else if ((type === "ps")) {
      if (isIdExist) {
        setForgotPsComment("이메일을 확인 중 입니다.")
        const requestBody: EmailExistSendDto = { email: email_ps, type: "RESET_PASSWORD" }
        
        EmailExistRequest(requestBody).then((responseBody) => {
          if (email_ps && responseBody) {
            EmailSendCodeRequest(requestBody).then((responseBody) => {
              console.log('responseBody:', responseBody)
              setForgotPsComment("인증코드가 발송되었습니다.")
            })
          } else {
            setForgotPsComment("존재하지 않는 이메일 입니다.")
          }
        })
      } else {
        setForgotPsComment("아이디를 확인 해주세요.")
      }
    }      
  }
    
    const handleEmailVerifyCode = (type: string) => {
      if (type === "id") {
        setForgotIdComment("인증코드를 확인 중 입니다.")
        const requestBody: EmailVerifyCodeRequestDto = { email: email_id, verifyCode: code_id, type: "FIND_ID" }
        
        EmailVerifyCodeRequest(requestBody).then((responseBody : EmailVerifyCodeResponseDto | null) => {
          if (responseBody) {
            setForgotInfo(responseBody.additionalInfo)
            setType("id")
            setModalType("forgotAuthInfo")
            setForgotIdComment("인증이 완료되었습니다.")
          } else {
            setForgotIdComment("인증코드가 일치하지 않습니다.")
          }
        })
      } else {
        const requestBody: EmailVerifyCodeRequestDto = { email: email_ps, verifyCode: code_ps, type: "RESET_PASSWORD" }
        setForgotPsComment("인증코드를 확인 중 입니다.")
        
        EmailVerifyCodeRequest(requestBody).then((responseBody) => {
          if (responseBody) {
            setForgotInfo(responseBody.additionalInfo)
            setType("ps")
            setModalType("forgotAuthInfo")
            setForgotPsComment("인증이 완료되었습니다.")
          } else {
            setForgotPsComment("인증코드가 일치하지 않습니다.")
          }
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
                <ForgotInput type="email" value={email_id} onChange={(e) => setEmail_id(e.target.value)} />
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
            <ForgotComment>{ forgotIdComment ? forgotIdComment : ""}</ForgotComment>
          </ForgotFormWrapper>


          {/* 비밀번호 찾기 폼 */}
          <ForgotFormWrapper>
            <MC.Comment_v2 textColor="black">비밀번호 찾기</MC.Comment_v2>
            <MC.Comment>찾고자하는 계정의 정보를 입력해주세요.</MC.Comment>
            <ForgotForm onSubmit={(e) => {
              e.preventDefault()
              handleCheckLoginId()
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
                <ForgotInput type="email" value={email_ps} onChange={(e) => setEmail_ps(e.target.value)} />
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
            <ForgotComment>{ forgotPsComment ? forgotPsComment : ""}</ForgotComment>
          </ForgotFormWrapper>
        </MC.ModalBody_v2>
      </MC.ModalWrapper_v2>
    </>
  );
};