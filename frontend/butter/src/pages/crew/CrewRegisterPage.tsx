import styled from "@emotion/styled";
import { CrewRegisterFileInput } from "../../components/common/input/FileInput";
import { useState } from "react";
import MainPageImg from "../../assets/home/MainPageImg.png"
import { CrewRegisterRequest } from "../../apis/request/crew/crewRequest";
import { CrewRegisterResponseDto } from "../../apis/response/crew";
import { div } from "framer-motion/client";


const CRPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${MainPageImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    padding: 20px;
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
    padding: 20px 10px;
    filter: brightness(1.1);
    border-radius: 30px;
    overflow: auto;
    backdrop-filter: blur(10px);
    width: 900px;
    display: grid;
    grid-template-rows: 55px auto;
`

const CRHeader = styled.header`
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 45px;
    font-weight: 300;
`

const CRBody = styled.div`
`

const CRComment = styled.div`
    color: var(--gray-bright);
    padding: 10px 20px;
    margin-bottom: 20px;
    `

const CRComment_v2 = styled.div`
    padding: 10px 20px;
    font-size: 20px;    
`

const CRForm = styled.form`
    padding: 15px 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 920px) {
    grid-template-columns: 1fr;
    }
`

const CRRtWrapper = styled.div`
    display: grid;
    gap: 10px;
    `
const CRLtWrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 10px;
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
        background-color: rgba(0,0,0,0.2);
        border-radius: 50%;
        color: var(--gray-bright);
        font-weight: 500;
}
`

const CRInput= styled.input`
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 30px;
    background-color: rgba(0,0,0,0.3);
    padding: 0 15px;
    font-size: 20px;
    color: var(--gray-bright);

    &:focus {
    background-color: rgba(0, 0, 0, 0.3);
  }

`

const CRBtnWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
`

const CRBtn = styled.button`
    border: none;
    color: var(--gray-bright);
    background-color: rgba(0,0,0,0.3);
    font-weight: 300;
    padding: 13px 20px;
    border-radius: 30px; 
    transition: all ease-in-out 0.2s;

    &:hover {
        background-color: rgba(0,0,0,0.4);
    }
`

interface FormDataState {
    name: string;
    description: string;
    image: File | null; // ✅ 파일 업로드를 위해 File | null 타입 사용
    promotionUrl: string;
    portfolioVideo: File | null; // ✅ 파일 업로드를 위해 File | null 타입 사용
  }

const CrewRegisterPage = () => {
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [formData, setFormData] = useState<FormDataState>({
        name: "",
        description: "",
        image: null,
        promotionUrl: "",
        portfolioVideo: null,
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const setFile = (file : File | null, fileType: "img" | "video") => {
        if (fileType === "img"){
            setFormData((prev) => ({ ...prev, image: file }))
        } else {
            setFormData((prev) => ({ ...prev, portfolioVideo: file }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("promotionUrl", formData.promotionUrl);

        if (formData.image instanceof File) {
            formDataToSend.append("image", formData.image);
        } else {
            console.error("Invalid profile image");
            return;
        }

        if (formData.portfolioVideo instanceof File) {
            formDataToSend.append("portfolioVideo", formData.portfolioVideo);
        } else {
            console.error("Invalid portfolioVideo");
            return;
        }
        
        setIsSubmit(true)
        CrewRegisterRequest(formDataToSend).then((responseBody: CrewRegisterResponseDto | null) => {
            console.log("CrewRegister Response:", responseBody);
        })
        console.log("Final Data:", formData);
    }

    
    return (
       <CRPageWrapper>
        <CRContainer>
            <CRHeader>REGISTER CREW</CRHeader>
            { isSubmit ? 
                <CRComment_v2>크루 등록이 정상적으로 요청되었습니다.</CRComment_v2>
            :
            <CRBody>
                <CRComment>크루가 되어 많은 관객과 함께 버스킹을 시작해보세요!</CRComment>            
                <CRForm onSubmit={handleSubmit}>
                <CRRtWrapper>
                    <CRInputWrapper>
                        <CRLabel><span>1</span>크루의 사진을 등록해 주세요 !</CRLabel>
                        <CrewRegisterFileInput fileType="img" setFile={setFile} />
                    </CRInputWrapper>
                    <CRInputWrapper>
                        <CRLabel><span>2</span>크루의 이름을 입력해 주세요 !</CRLabel>
                        <CRInput name="name" value={formData.name} onChange={handleChange} type="text" required></CRInput>
                    </CRInputWrapper>
                    <CRInputWrapper>
                        <CRLabel><span>3</span>크루를 소개할 문구를 작성해 주세요 !</CRLabel>
                        <CRInput name="description" value={formData.description} onChange={handleChange} type="text" required></CRInput>
                    </CRInputWrapper>
                </CRRtWrapper>
                <CRLtWrapper>
                    <CRInputWrapper>
                        <CRLabel><span>4</span>크루를 홍보할 SNS 주소를 입력해 주세요 !</CRLabel>
                        <CRInput name="promotionUrl" value={formData.promotionUrl} onChange={handleChange} type="text"></CRInput>
                    </CRInputWrapper>
                    <CRInputWrapper>
                        <CRLabel><span>5</span>크루의 포트폴리오를 업로드 하세요!</CRLabel>
                        <CrewRegisterFileInput fileType="video" setFile={setFile} />
                    </CRInputWrapper>
                    <CRBtnWrapper>
                        <CRBtn type="submit" >SUBMIT</CRBtn>
                    </CRBtnWrapper>
                </CRLtWrapper>
                </CRForm>
            </CRBody>
            }
        </CRContainer>
       </CRPageWrapper>
    )
}

export default CrewRegisterPage

