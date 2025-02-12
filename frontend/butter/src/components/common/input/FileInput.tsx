import styled from "@emotion/styled";
import { useState, useRef } from "react";

const InputWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    gap: 10px;
`
const InputTag = styled.input``
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
interface FileProps {
    setFile: (file: File) => void; // 프로필 이미지만 변경하는 함수
}


export const ExtraFileInput = ({ setFile }: FileProps) => {
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
            setFile(file)
        }
    }
    
    return (
        <InputWrapper>
            <InputTag type="file" id="img" name="img" ref={inputRef} accept=".png, .jpeg, .jpg" onChange={handleOnChange} style={{ display: "none" }} />
            <FileInputBtn onClick={onChooseFile}>Upload</FileInputBtn>

            {selectedFile && <SelectedFile>{selectedFile?.name}</SelectedFile>}
        </InputWrapper>
    )
}

const CRFileInputBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dotted white;
    width: 80px;
    height: 40px;
    border-radius: 30px;
    color: white;
    font-size: 15px;
    `

const CRSelectedFile = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: var(--gray-bright);    
    flex: 1;
    border: 1px solid white;
    border-radius: 30px;
    height: 40px;
    `

interface CRFileProps {
    setFile: (file: File | null, fileType: "img" | "video") => void;
    fileType: "img" | "video";
}

export const CrewRegisterFileInput = ({ setFile, fileType }: CRFileProps) => {
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
            setFile(file, fileType)
        }
    }

    return (
        <InputWrapper>
            { fileType === "img" ? 
            <InputTag type="file" id="img" name="img" ref={inputRef} accept=".png, .jpeg, .jpg" onChange={handleOnChange} style={{ display: "none" }} />
            :
            <InputTag type="file" id="video" name="video" ref={inputRef} accept="video/*" onChange={handleOnChange} style={{ display: "none" }} />
            }
            <CRFileInputBtn onClick={onChooseFile}>Upload</CRFileInputBtn>

            {selectedFile && <CRSelectedFile>{selectedFile?.name}</CRSelectedFile>}
        </InputWrapper>
    )
}