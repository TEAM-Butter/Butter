import styled from "@emotion/styled";
import { useState, useRef } from "react";

const ExtraInput = styled.input``
const FileInputBtn = styled.button`
    background: transparent;
    border: none;
    border: 2px solid var(--yellow);
    width: 90px;
    height: 90px;
    border-radius: 50%;
    color: var(--yellow);
    font-size: 15px;
`

export const ExtraFileInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    // const [selectedFile, setSelectedFile] = useState(null)

    const onChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click();  // 숨겨진 파일 input 요소 클릭
        }
    };

    return (
        <>
            <ExtraInput type="file" ref={inputRef} style={{ display: "none" }}/>
            <FileInputBtn onClick={onChooseFile}>upload<br/>profile</FileInputBtn>
        </>
    )
}