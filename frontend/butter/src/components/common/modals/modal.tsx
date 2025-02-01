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
    height: ${(props) => props.height};
    position: fixed; 
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%); 
    z-index: 1000; 
    color: white;
    /* border: 1px solid gray; */
    `
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
const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 17px;
    background-color: rgba(0, 0, 0, 0.8); 
    border-radius: 10px 10px 0 0;
    width: 100%;
    `
const Comment = styled.div`
    font-weight: 200;
    margin-bottom: 15px;
`

const ModalCloseBtn = styled.button`
    background: none;
    color: white;
    border: none;
    font-size: 18px;
`
const LtBtnWrapper = styled.div`
    width: 100%;
    display:flex;
    flex-direction: row-reverse;
`
const BorderBtn = styled.button<Borderops>`
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

interface Borderops {
    width: string,
    height: string,
    color: string,
}

interface ModalSizeProps {
    width: string,
    height: string,
}

interface ModalProps extends ModalSizeProps {
    setToggleModal: React.Dispatch<React.SetStateAction<boolean>>,
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

export const StreamingModal = ({setToggleModal, width, height}: ModalProps) => {
    return(
        <>
            <ModalOverlay />
            <ModalWrapper width={width} height={height} >
                <ModalHeader><div>SET STREAMING LIVE</div><ModalCloseBtn onClick={()=> {setToggleModal(false)}}>X</ModalCloseBtn></ModalHeader>
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

