import * as MC from "./modalComponents/modalComponents"
import styled from "@emotion/styled";

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

export const ChangePSModal = ({ setModalType, width, height }: ModalProps) => {
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
                    <ChangePSForm >
                        <div>
                            <ChangePSLabel>현재 비밀번호</ChangePSLabel>
                            <ChangePSInput placeholder="현재 비밀번호를 입력해 주세요."></ChangePSInput>
                        </div>
                        <div>
                            <ChangePSLabel>새로운 비밀번호</ChangePSLabel>
                            <ChangePSInput placeholder="영문자/숫자/특수문자 혼용 8자 이상"></ChangePSInput>
                        </div>
                        <div>
                            <ChangePSLabel>비밀번호 확인</ChangePSLabel>
                            <ChangePSInput placeholder="영문자/숫자/특수문자 혼용 8자 이상"></ChangePSInput>
                        </div>
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
                </MC.ModalBody>
            </MC.ModalWrapper>
        </>
    );
};