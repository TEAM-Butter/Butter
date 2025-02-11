import styled from "@emotion/styled";
import { ExtraFileInput } from "../../components/common/input/FileInput";
import { useState } from "react";
import MainPageImg from "../../assets/home/MainPageImg.png"


const CRPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${MainPageImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &::before {
        content: ""; /* 가상 요소를 생성하기 위한 필수 속성 */
        position: absolute; /* 부모 요소 안에서 절대 위치 지정 */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
    }
`

const CRContainer = styled.div`
    filter: brightness(1.1);
    border-radius: 30px;
    overflow: hidden;
    backdrop-filter: blur(10px);
    width: 600px;
    display: grid;
    grid-template-rows: 55px auto;
`

const CRHeader = styled.header`
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 30px;
    font-weight: 300;
`

const CRBody = styled.div`
`

const CRComment = styled.div`
    color: var(--gray-bright);
    padding: 10px 20px;
`

const CRForm = styled.form`
    padding: 15px 30px;
    display: grid;
    gap: 15px;
`

const CRInputWrapper= styled.div`
    display: grid;
    gap: 10px;
`

const CRLabel= styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;

    span {
        font-size: 18px;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: black;
        border-radius: 50%;
        color: white;
        font-weight: 500;
}
`

const CRInput= styled.input`
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 30px;
    padding: 0 15px;
    font-size: 20px;

`

interface FormDataState {
    nickname: string;
    profileImage: File | null; // ✅ 파일 업로드를 위해 File | null 타입 사용
    avatarType: string;
    genres: string[];
  }

const CrewRegisterPage = () => {
    const [formData, setFormData] = useState<FormDataState>({
        nickname: "",
        profileImage: null, // ✅ 초기값을 null로 설정
        avatarType: "",
        genres: [],
      });

    const setProfileImage = (image : File | null) => {
        setFormData((prev) => ({ ...prev, profileImage: image }))
    }

    return (
       <CRPageWrapper>
        <CRContainer>
            <CRHeader>REGISTER CREW</CRHeader>
            <CRBody>
                <CRComment>크루가 되어 많은 관객과 함께 버스킹을 시작해보세요!</CRComment>            
                <CRForm>
                    <CRInputWrapper>
                        <CRLabel><span>1</span>크루의 사진을 등록해 주세요 !</CRLabel>
                        <ExtraFileInput setProfileImage={setProfileImage} />
                    </CRInputWrapper>
                    <CRInputWrapper>
                        <CRLabel><span>2</span>크루의 이름을 입력해 주세요 !</CRLabel>
                        <CRInput></CRInput>
                    </CRInputWrapper>
                    <CRInputWrapper>
                        <CRLabel><span>3</span>크루를 소개할 문구를 작성해 주세요 !</CRLabel>
                        <CRInput></CRInput>
                    </CRInputWrapper>
                    <CRInputWrapper>
                        <CRLabel><span>4</span>크루를 홍보할 수 있는 SNS 주소를 입력해 주세요 !</CRLabel>
                        <CRInput></CRInput>
                    </CRInputWrapper>
                    <CRInputWrapper>
                        <CRLabel><span>5</span>크루의 포트폴리오를 업로드 하세요!</CRLabel>
                        vidio
                    </CRInputWrapper>
                </CRForm>
            </CRBody>
        </CRContainer>
       </CRPageWrapper>
    )
}

export default CrewRegisterPage

