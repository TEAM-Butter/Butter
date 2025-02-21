import { useState } from "react";
import * as MC from "./modalComponents/modalComponents.tsx"
import styled from "@emotion/styled";

const ForgotInfo = styled.div`
    font-size: 20px;
    margin-bottom:10px;
`

interface ModalSizeProps {
width: string;
height: string;
}

interface ModalProps extends ModalSizeProps {
type: string;
forgotInfo: string;
setModalType: React.Dispatch<React.SetStateAction<string>>;
}


export const ForgotAuthInfoModal = ({ setModalType, width, height, type, forgotInfo }: ModalProps) => {
return (
    <>
    <MC.ModalOverlay />
    <MC.ModalWrapper width={width} height={height}>
        <MC.ModalHeader>
        <div>회원님의 계정 정보 입니다.</div>
        <MC.ModalCloseBtn
            textColor="white"
            onClick={() => {
            setModalType("");
            }}
        >
            X
        </MC.ModalCloseBtn>
        </MC.ModalHeader>
        <MC.ModalBody>
        <MC.Comment>
            { type === "id" ? 
            "회원님의 아이디 정보 입니다."
            :
            <div>임시 비밀번호가 발급 되었습니다.<br/> 회원정보 수정 페이지를 통해 비밀번호를 변경해주세요.</div>
            }
        </MC.Comment>
        <ForgotInfo>{forgotInfo}</ForgotInfo>    
        </MC.ModalBody>
    </MC.ModalWrapper>
    </>
);
};