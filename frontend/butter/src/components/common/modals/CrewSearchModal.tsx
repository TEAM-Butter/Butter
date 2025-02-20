import * as MC from "./modalComponents/modalComponents.tsx"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import findIconBlack from "../../../assets/findIconBlack.png" 
import { useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance.ts";
interface ModalSizeProps {
width: string;
height: string;
}

interface ModalProps extends ModalSizeProps {
setModalType: React.Dispatch<React.SetStateAction<string>>;
}

// CrewSearch Styled
const CrewSearchForm = styled.form`
display: flex;
background-color: white;
border-radius: 30px;
align-items: center;
padding-right: 10px;
gap: 10px;
width: 100%;
`;

const CrewSearchTitleInput = styled.input`
width: 100%;
height: 40px;
border-radius: 30px;
border: none;
padding: 0 15px;
`;

const FindIconBlack = styled.img`
    height: 25px;
    width: 25px;
`
const ModalBody_v5 = styled.div`
  margin-top: -25px;
  padding: 17px;
  border-radius: 10px;
  background-color: rgba(82, 57, 57, 0.8);
  width: 100%;
 
`
const FlexCan = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 8px;
    border-bottom: 1px solid white;
`


export const CrewSearchModal = ({ setModalType, width, height }: ModalProps) => {

const navigate = useNavigate(); // useNavigate 훅 추가
const [searchTerm, setSearchTerm] = useState("")
const [searchResult, setSearchResult] = useState([])
const handleSearch = async () => {
    try{
        const res = await axiosInstance.get(`/crew/list?pageSize=100&sortBy=followerCount&keyword=${searchTerm}`)

        console.log(res.data)
        setSearchResult(res.data)

    } catch{

    }
}
return (
    <>
    <MC.ModalOverlay />
    <MC.ModalWrapper width={width} height={height}>
        <MC.ModalHeader>
        <div>CrewSearch Modal</div>
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
        <MC.Comment>원하시는 크루의 이름을 검색하고, 크루 디테일 페이지에 접속하세요!</MC.Comment>
      
            <CrewSearchTitleInput
            placeholder="크루 이름을 입력해주세요."
            value={searchTerm}
            onChange={(e)=>{setSearchTerm(e.target.value)}} onKeyDown={(e) => {
                handleSearch();}}
            >
            </CrewSearchTitleInput>
            <FindIconBlack src={findIconBlack} alt="findIconBlack"></FindIconBlack>
        <ModalBody_v5>
          {searchResult && searchResult.slice(0,10).map((a : any, i : any )=>{return(<FlexCan> <div>{a.name}</div> <div onClick={()=>{navigate(`/crew/detail/${a.id}`)}}>상세페이지 보기</div></FlexCan>)})}
        </ModalBody_v5>
        </MC.ModalBody>
    </MC.ModalWrapper>
    </>
);
};