import styled from "@emotion/styled";
import React, { useState } from "react";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 999; 
    `
const ModalWrapper = styled.div<ModalSizeProps>`
    display: grid;
    grid-template-rows: 60px 1fr;
    width: ${(props) => props.width};
    /* height: ${(props) => props.height}; */
    position: fixed; 
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%); 
    z-index: 1000; 
    color: white;
    /* border: 1px solid gray; */
    `

const ModalWrapper_v2 = styled(ModalWrapper)`
    border-radius: 20px; 
    overflow: hidden;
    color: var(--darkgray);
    `

// Modal type 1 (검은 테마의 모달 디자인)
const ModalHeader = styled.div`
    display: flex;
    width: 100%;
    background-color:black;
    align-items: center;
    padding: 0 12px;
    font-size: 20px;
    font-weight: 200;
    border-bottom: 1px dashed gray;
    justify-content: space-between;
    border-radius: 0 0 10px 10px;
    `

const ModalHeader_v2 = styled(ModalHeader)`
    background-color:white;
    border-radius: 0px; 
    font-size: 17px;
    `

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 17px;
    background-color: rgba(0, 0, 0, 0.8); 
    border-radius: 10px 10px 0 0;
    width: 100%;
    `

const ModalBody_v2 = styled(ModalBody)`
    border-radius: 0px; 
    background-color:white;
    justify-content: center;
    gap: 20px;
    `

const Comment = styled.div`
    font-weight: 200;
    margin-bottom: 15px;
`
const Comment_v2 = styled(Comment) <ColorProps>`
    color: ${(props) => props.textColor};
    margin-bottom: 5px;
`

const ModalCloseBtn = styled.button<ColorProps>`
    background: none;
    color: ${(props) => props.textColor};
    border: none;
    font-size: 18px;
`

// 버튼 좌측으로 이동할 수 있게 끔 flex 설정 styled
const LtBtnWrapper = styled.div`
    width: 100%;
    display:flex;
    flex-direction: row-reverse;
`

const BorderBtn = styled.button<BorderProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: none;
    border: 1px solid ${(props) => props.color};
    border-radius: 30px;
    background-color: transparent;
    font-weight: 500;
    color: ${(props) => props.color};
    transition: all ease-in-out 0.3s;
    
    &:hover {
        background-color: ${(props) => props.color};
        color: black;
    }
    `

const FilledBtn = styled(BorderBtn) <ColorProps>`
    background-color: ${(props) => props.color};
    color: ${(props) => props.textColor};
    
    &:hover {
        background-color: transparent;
        color: ${(props) => props.color};
    }  
`

interface BorderProps {
    width: string,
    height: string,
    color: string,
}

interface ModalSizeProps {
    width: string,
    height: string,
}

interface ModalProps extends ModalSizeProps {
    setModalType: React.Dispatch<React.SetStateAction<string>>,
}

interface ColorProps {
    textColor: string,
}

// Streaming Styled
const StreamingForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const StreamingTitleInput = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 30px;
    border: none;
    padding: 0 15px; 
`

export const StreamingModal = ({ setModalType, width, height }: ModalProps) => {
    return (
        <>
            <ModalOverlay />
            <ModalWrapper width={width} height={height}>
                <ModalHeader><div>SET STREAMING LIVE</div><ModalCloseBtn textColor="white" onClick={() => { setModalType("") }}>X</ModalCloseBtn></ModalHeader>
                <ModalBody>
                    <Comment>스트리밍 제목을 설정하고, 라이브를 시작해보세요!</Comment>
                    <StreamingForm>
                        <StreamingTitleInput placeholder="스트리밍 제목을 입력해주세요."></StreamingTitleInput>
                        <LtBtnWrapper><BorderBtn type="submit" width="90px" height="35px" color="var(--red)">LIVE ON</BorderBtn></LtBtnWrapper>
                    </StreamingForm>
                </ModalBody>
            </ModalWrapper>
        </>
    )
}

// Forgot styled
const ForgotFormWrapper = styled.div`
    
`
const ForgotForm = styled.form`
    
`
const ForgotLabel = styled.label`
    width:70px;
`
const ForgotInput = styled.input`
    flex: 1;
    height: 100%;
    border: none;
    border: 1px solid #6d6d6d;
    border-radius: 5px;
`

const ForgotInputWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 25px;
    gap: 15px;
    padding: 0 20px;
    margin-bottom: 10px;
`

export const ForgotAuthModal = ({ setModalType, width, height }: ModalProps) => {
    return (
        <>
            <ModalOverlay />
            <ModalWrapper_v2 width={width} height={height} >
                <ModalHeader_v2><div>아이디/ 비밀번호 찾기</div><ModalCloseBtn onClick={() => { setModalType("") }} textColor="black">X</ModalCloseBtn></ModalHeader_v2>
                <ModalBody_v2>
                    {/* 아이디 찾기 폼 */}
                    <ForgotFormWrapper>
                        <Comment_v2 textColor="black">아이디 찾기</Comment_v2>
                        <Comment>찾고자하는 계정의 정보를 입력해주세요.</Comment>
                        <ForgotForm>
                            <ForgotInputWrapper>
                                <ForgotLabel>이메일</ForgotLabel>
                                <ForgotInput />
                                <FilledBtn textColor="white" width="140px" height="100%" color="black">인증번호 발송</FilledBtn>
                            </ForgotInputWrapper>
                            <ForgotInputWrapper>
                                <ForgotLabel>인증번호</ForgotLabel>
                                <ForgotInput />
                                <FilledBtn textColor="white" width="140px" height="100%" color="black">인증번호 확인</FilledBtn>
                            </ForgotInputWrapper>
                        </ForgotForm>
                    </ForgotFormWrapper>
                    {/* 비밀번호 찾기 폼 */}
                    <ForgotFormWrapper>
                        <Comment_v2 textColor="black">비밀번호 찾기</Comment_v2>
                        <Comment>찾고자하는 계정의 정보를 입력해주세요.</Comment>
                        <ForgotForm>
                            <ForgotInputWrapper>
                                <ForgotLabel>아이디</ForgotLabel>
                                <ForgotInput />
                                <FilledBtn textColor="white" width="140px" height="100%" color="black">확인</FilledBtn>
                            </ForgotInputWrapper>
                            <ForgotInputWrapper>
                                <ForgotLabel>이메일</ForgotLabel>
                                <ForgotInput />
                                <FilledBtn textColor="white" width="140px" height="100%" color="black">인증번호 발송</FilledBtn>
                            </ForgotInputWrapper>
                            <ForgotInputWrapper>
                                <ForgotLabel>인증번호</ForgotLabel>
                                <ForgotInput />
                                <FilledBtn textColor="white" width="140px" height="100%" color="black">인증번호 확인</FilledBtn>
                            </ForgotInputWrapper>
                        </ForgotForm>
                    </ForgotFormWrapper>
                </ModalBody_v2>
            </ModalWrapper_v2>
        </>
    )
}

import { ExtraFileInput } from "../fileInput";
import Select from "react-select";
import pet1 from "/src/assets/pet1.png";

const ExtraInfoForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const StepNumber = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    background-color: var(--yellow);
    border-radius: 50%;
    color: black;
    font-size: 15px;
    font-weight: 600;
`

const ExtraInfoLabel = styled.label`
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
`

const ExtraInfoInput = styled.input`
    width: 90%;
    padding: 10px 15px;
    background: none;
    border: none;
    border: 1px solid var(--yellow);
    border-radius: 10px;
    color: white;
    font-size: 15px;
`
const ExtraInfoInputWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`
const LtExtraWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const RtExtraWrapper = styled.div``

const SelectWrapper = styled.div`
    width: 90%;
`
const ExtraRadioInput = styled.input``
const ExtraRadioLabel = styled.label`
    display: flex;
`
const ExtraRadioWrapper = styled.div`
    display: grid;
    margin-top: 20px;
    grid-template-columns: repeat(2, 1fr);
`

type Option = {
    value: string;
    label: string;
}

export const UserExtraInfoModal = ({ setModalType, width, height }: ModalProps) => {
    const options = [
        { value: 'Ballad', label: 'Ballad' },
        { value: 'Dance', label: 'Dance' },
        { value: 'Pop', label: 'Pop' },
        { value: 'K-Pop', label: 'K-Pop' },
        { value: 'Acoustic', label: 'Acoustic' },
        { value: 'Hip-Hop', label: 'Hip-Hop' },
        { value: 'R&B', label: 'R&B' },
        { value: 'Electronic', label: 'Electronic' },
        { value: 'Rock', label: 'Rock' },
        { value: 'Jazz', label: 'Jazz' },
        { value: 'Indie', label: 'Indie' },
        { value: 'Trot', label: 'Trot' },
    ]
    const selectStyles = {
        control: (styles: any) => ({ ...styles, backgroundColor: "black", border: "1px solid var(--yellow)", borderRadius: "10px", width: "100%", padding: "5px", color: "black" }),
        menu: (styles: any) => ({ ...styles, backgroundColor: "black", }),
        multiValue: (styles: any) => ({ ...styles, backgroundImage: "var(--liner)", borderRadius: "20px", padding: "3px 5px", marginRight: "5px" })
    }

    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (selectedOptions.length < 3 && !selectedOptions.includes(value)) {
            const NewSelectedOptions = [...selectedOptions]
            NewSelectedOptions.push(value)
            setSelectedOptions(NewSelectedOptions);
        }
    };
    return (
        <>
            <ModalOverlay />
            <ModalWrapper width={width} height={height}>
                <ModalHeader><div>TYPE YOUR EXTRA INFO</div><ModalCloseBtn textColor="white" onClick={() => { setModalType("") }}>X</ModalCloseBtn></ModalHeader>
                <ModalBody>
                    <Comment_v2 textColor="white">버터에 가입하신 것을 축하합니다!</Comment_v2>
                    <Comment>더 많은 기능을 즐기기 위해 몇 가지 정보를 추가로 입력해 주세요!</Comment>
                    <ExtraInfoForm>
                        <ExtraInfoInputWrapper>
                            <LtExtraWrapper>
                                <div>
                                    <ExtraInfoLabel><StepNumber>1</StepNumber>프로필 사진을 등록해 주세요!</ExtraInfoLabel>
                                    <ExtraFileInput />
                                </div>
                                <div>
                                    <ExtraInfoLabel><StepNumber>2</StepNumber>뭐라고 불러드릴까요?</ExtraInfoLabel>
                                    <ExtraInfoInput placeholder="사용할 닉네임을 입력해주세요." />
                                </div>
                                <div>
                                    <ExtraInfoLabel><StepNumber>3</StepNumber>선호하는 장르를 알려주세요!</ExtraInfoLabel>
                                    <SelectWrapper><Select options={options} styles={selectStyles} isMulti></Select></SelectWrapper>
                                </div>
                            </LtExtraWrapper>
                            <RtExtraWrapper>
                                <ExtraInfoLabel><StepNumber>4</StepNumber>라이브에 사용할 캐릭터를 선택해 주세요!</ExtraInfoLabel>
                                <ExtraRadioWrapper>
                                    <ExtraRadioLabel><ExtraRadioInput type="radio" id="pet" name="pet" /><img src={pet1} alt="petImg" width={100} /></ExtraRadioLabel>
                                    <ExtraRadioLabel><ExtraRadioInput type="radio" id="pet2" name="pet" /><img src={pet1} alt="petImg" width={100} /></ExtraRadioLabel>
                                    <ExtraRadioLabel><ExtraRadioInput type="radio" id="pet3" name="pet" /><img src={pet1} alt="petImg" width={100} /></ExtraRadioLabel>
                                    <ExtraRadioLabel><ExtraRadioInput type="radio" id="pet4" name="pet" /><img src={pet1} alt="petImg" width={100} /></ExtraRadioLabel>
                                    <ExtraRadioLabel><ExtraRadioInput type="radio" id="pet5" name="pet" /><img src={pet1} alt="petImg" width={100} /></ExtraRadioLabel>
                                    <ExtraRadioLabel><ExtraRadioInput type="radio" id="pet6" name="pet" /><img src={pet1} alt="petImg" width={100} /></ExtraRadioLabel>
                                </ExtraRadioWrapper>
                            </RtExtraWrapper>
                        </ExtraInfoInputWrapper>
                        <LtBtnWrapper><FilledBtn textColor="black" type="submit" width="90px" height="35px" color="var(--yellow)">SUBMIT</FilledBtn></LtBtnWrapper>
                    </ExtraInfoForm>
                </ModalBody>
            </ModalWrapper>
        </>
    )
}