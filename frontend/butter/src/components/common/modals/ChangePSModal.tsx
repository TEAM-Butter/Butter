import { useState } from "react";
import * as MC from "./modalComponents/modalComponents"
import styled from "@emotion/styled";
import { PasswordUpdateRequest } from "../../../apis/request/member/memberRequest";

interface ModalSizeProps {
    width: string;
    height: string;
}

interface ModalProps extends ModalSizeProps {
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}

// ChangePS Styled
const ChangePSForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    gap: 20px;
    width: 100%;

    #errorInfo {
        color: var(--yellow);
    }
`;

const ChangePSLabel = styled.label`
`

const ChangePSInput = styled.input`
    margin-top: 10px;
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    padding: 0 15px;
`;

const SuccessInfo = styled.div`
    color: var(--yellow);
`

interface ModeProps {
    setMode: React.Dispatch<React.SetStateAction<string>>;
}

const ChangePSInfoMode = () => {
    return (
        <SuccessInfo>비밀번호가 성공적으로 변경되었습니다 !</SuccessInfo>
    )
}

const ChangePSFormMode = ({ setMode }: ModeProps) => {
    const [currentPs, setCurrentPs] = useState("")
    const [changePs, setChangePs] = useState("")
    const [checkChangePs, setCheckChangePs] = useState("")
    const [changePsComment, setChangePsComment] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setChangePsComment("비밀번호를 확인 중 입니다.")
        if (changePs === checkChangePs) {
            PasswordUpdateRequest({ currentPassword: currentPs, newPassword: changePs })
                .then((res) => {
                    console.log("PasswordUpdate: ", res)
                    setMode("info")
                })
        } else {
            setChangePsComment("비밀번호가 일치하지 않습니다.")
        }
    }

    return (
        <ChangePSForm onSubmit={handleSubmit} >
            <div>
                <ChangePSLabel >현재 비밀번호</ChangePSLabel>
                <ChangePSInput required type="password" value={currentPs} onChange={(e) => { setCurrentPs(e.target.value) }} placeholder="현재 비밀번호를 입력해 주세요."></ChangePSInput>
            </div>
            <div>
                <ChangePSLabel>새로운 비밀번호</ChangePSLabel>
                <ChangePSInput required type="password" value={changePs} onChange={(e) => { setChangePs(e.target.value) }} placeholder="영문자/숫자/특수문자 혼용 8자 이상"></ChangePSInput>
            </div>
            <div>
                <ChangePSLabel>비밀번호 확인</ChangePSLabel>
                <ChangePSInput required type="password" value={checkChangePs} onChange={(e) => { setCheckChangePs(e.target.value) }} placeholder="영문자/숫자/특수문자 혼용 8자 이상"></ChangePSInput>
            </div>
            <div id="errorInfo">{changePsComment}</div>
            <MC.LtBtnWrapper>
                <MC.FilledBtn
                    type="submit"
                    width="110px"
                    height="35px"
                    color="var(--yellow)"
                    textColor="black"
                >
                    비밀번호 변경
                </MC.FilledBtn>
            </MC.LtBtnWrapper>
        </ChangePSForm>
    )
}

export const ChangePSModal = ({ setModalType, width, height }: ModalProps) => {
    const [mode, setMode] = useState("form");
    let modeContent = null;

    if (mode === "form") {
        modeContent = <ChangePSFormMode setMode={setMode} />
    } else if (mode === "info") {
        modeContent = <ChangePSInfoMode />
    }

    return (
        <>
            <MC.ModalOverlay />
            <MC.ModalWrapper width={width} height={height}>
                <MC.ModalHeader>
                    <div>비밀번호 변경</div>
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
                    {modeContent}
                </MC.ModalBody>
            </MC.ModalWrapper>
        </>
    );
};