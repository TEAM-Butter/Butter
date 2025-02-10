import * as MC from "./modalComponents/modalComponents"
import styled from "@emotion/styled";

interface ModalSizeProps {
width: string;
height: string;
}

interface ModalProps extends ModalSizeProps {
setModalType: React.Dispatch<React.SetStateAction<string>>;
}


export const ForgotAuthInfoModal = ({ setModalType, width, height }: ModalProps) => {
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
        <MC.Comment>스트리밍 제목을 설정하고, 라이브를 시작해보세요!</MC.Comment>
        </MC.ModalBody>
    </MC.ModalWrapper>
    </>
);
};