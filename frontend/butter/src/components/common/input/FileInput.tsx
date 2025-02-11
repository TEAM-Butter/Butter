import styled from "@emotion/styled";
import { useState, useRef } from "react";

const ExtraInputWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
`
const ExtraInput = styled.input``
const FileInputBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dotted var(--yellow);
    width: 100px;
    height: 50px;
    border-radius: 10px;
    color: var(--yellow);
    font-size: 15px;
    `

const SelectedFile = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: var(--darkgray);    
    flex: 1;
    border: 1px solid var(--yellow);
    border-radius: 10px;
    height: 50px;
`
interface ModalProps {
    setProfileImage: (image: File) => void; // 프로필 이미지만 변경하는 함수
}

export const ExtraFileInput = ({ setProfileImage }: ModalProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const onChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click();  // 숨겨진 파일 input 요소 클릭
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            setSelectedFile(file)
            setProfileImage(file)
        }
    }

    return (
        <ExtraInputWrapper>
            <ExtraInput type="file" id="img" name="img" ref={inputRef} accept=".png, .jpeg, .jpg" onChange={handleOnChange} style={{ display: "none" }} />
            <FileInputBtn onClick={onChooseFile}>Upload</FileInputBtn>

            {selectedFile && <SelectedFile>{selectedFile?.name}</SelectedFile>}
        </ExtraInputWrapper>
    )
}