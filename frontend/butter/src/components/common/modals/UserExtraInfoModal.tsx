import { ExtraFileInput } from "../input/FileInput";
import { useState } from "react";
import * as MC from "./modalComponents/modalComponents.tsx"
import styled from "@emotion/styled";
import Select from "react-select";
import pet1 from "/src/assets/pets/pet1.png";
import pet2 from "/src/assets/pets/pet2.png";
import pet3 from "/src/assets/pets/pet3.png";
import pet4 from "/src/assets/pets/pet4.png";
import pet5 from "/src/assets/pets/pet5.png";
import pet6 from "/src/assets/pets/pet6.png";
import { useUserStore } from "../../../stores/UserStore";
import { CheckNicknameRequest, MemberExtraInfoRequest } from "../../../apis/request/member/memberRequest";
import { CheckNicknameResponseDto, MemberExtraInfoResponseDto } from "../../../apis/response/member";
import { motion } from "framer-motion";

const ExtraInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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
`;

const ExtraInfoLabel = styled.label`
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const ExtraInfoInput = styled.input`
  width: 90%;
  padding: 10px 15px;
  background: none;
  border: none;
  border: 1px solid var(--yellow);
  border-radius: 10px;
  color: white;
  font-size: 15px;
`;
const ExtraInfoInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
const LtExtraWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const RtExtraWrapper = styled.div``;

const SelectWrapper = styled.div`
  width: 90%;
`;
const ExtraRadioInput = styled.input``;
const ExtraRadioLabel = styled.label`
  display: flex;
`;
const ExtraRadioWrapper = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const EFWrapper = styled.div`
  width: 90%;
`

const NicknameInputWrapper = styled.div`
  display: flex;
  width: 90%;
  gap: 10px;

  & > input {
    flex: 1;
  }

  #checkNicknameBtn {
    width: 80px;
    background-color: var(--yellow);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
  }
`

const NicknameComment = styled(motion.div)`
  margin: 5px 0 0 5px;
  color: #a8a8a8;
  font-size: 15px;
`

interface ModalSizeProps {
  width: string;
  height: string;
}

interface ModalProps extends ModalSizeProps {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

interface FormDataState {
  nickname: string;
  profileImage: File | null; // ✅ 파일 업로드를 위해 File | null 타입 사용
  avatarType: string;
  genres: string[];
}


//회원가입 추가정보 기입 모달 창
export const UserExtraInfoModal = ({
  setModalType,
  width,
  height,
}: ModalProps) => {

  const [formData, setFormData] = useState<FormDataState>({
    nickname: "",
    profileImage: null, // ✅ 초기값을 null로 설정
    avatarType: "",
    genres: [],
  });

  const options = [
    { value: "Ballad", label: "Ballad" },
    { value: "Dance", label: "Dance" },
    { value: "Pop", label: "Pop" },
    { value: "K-Pop", label: "K-Pop" },
    { value: "Acoustic", label: "Acoustic" },
    { value: "Hip-Hop", label: "Hip-Hop" },
    { value: "R&B", label: "R&B" },
    { value: "Electronic", label: "Electronic" },
    { value: "Rock", label: "Rock" },
    { value: "Jazz", label: "Jazz" },
    { value: "Indie", label: "Indie" },
    { value: "Trot", label: "Trot" },
  ];


  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "black",
      border: "1px solid var(--yellow)",
      borderRadius: "10px",
      width: "100%",
      padding: "5px",
      color: "black",
    }),
    menu: (styles: any) => ({ ...styles, backgroundColor: "black" }),
    multiValue: (styles: any) => ({
      ...styles,
      backgroundImage: "var(--liner)",
      borderRadius: "20px",
      padding: "3px 5px",
      marginRight: "5px",
    }),
  };

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [nicknameComment, setNicknameComment] = useState("");
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  const [checkSensor, setCheckSensor] = useState(false);
  
  const handleExtraInfo = () => {
    setModalType("");
    useUserStore.setState({ isExtraInfoRegistered: true });


    const formDataToSend = new FormData();
    formDataToSend.append("nickname", formData.nickname);
    formDataToSend.append("avatarType", formData.avatarType);
    formData.genres.forEach((genre) => formDataToSend.append("genres", genre));

    if (formData.profileImage instanceof File) {
      formDataToSend.append("profileImage", formData.profileImage);
    }
    // API 호출 부분에서 formData를 사용\
    MemberExtraInfoRequest(formDataToSend).then((responseBody: MemberExtraInfoResponseDto | null) => {
      console.log("Response:", responseBody);
      useUserStore.setState({ nickname: responseBody?.nickname })
      useUserStore.setState({ profileImage: responseBody?.profileImage })
      useUserStore.setState({ avatarType: responseBody?.avatarType })
      useUserStore.setState({ genres: responseBody?.genres })
    });
    console.log("Final Data:", formData);
  }

  const handleCheckNickname = () => {
    if(formData.nickname === ""){
      setCheckSensor(!checkSensor)
      setNicknameComment("사용 불가능한 닉네임 입니다.")
      return;
    }

    CheckNicknameRequest({nickname: formData.nickname}).then((responseBody: CheckNicknameResponseDto | null) => {
      if(responseBody?.exists) {
        setCheckSensor(!checkSensor)
        setNicknameComment("이미 존재하는 닉네임 입니다.")
      } else {
        setCheckSensor(!checkSensor)
        setNicknameComment("사용 가능한 닉네임 입니다.")
        setIsCheckedNickname(true)
      }
    })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(isCheckedNickname) {
      handleExtraInfo();
    } else {
      setCheckSensor(!checkSensor)
      setNicknameComment("닉네임을 확인해 주세요!")
    }
  };
  return (
    <>
      <MC.ModalOverlay />
      <MC.ModalWrapper width={width} height={height} >
        <MC.ModalHeader>
          <div>TYPE YOUR EXTRA INFO</div>
        </MC.ModalHeader>
        <MC.ModalBody>
          <MC.Comment_v2 textColor="white">
            버터에 가입하신 것을 축하합니다!
          </MC.Comment_v2>
          <MC.Comment>
            더 많은 기능을 즐기기 위해 몇 가지 정보를 추가로 입력해 주세요!
          </MC.Comment>
          <ExtraInfoForm onSubmit={handleSubmit}>
            <ExtraInfoInputWrapper>
              <LtExtraWrapper>
                <div>
                  <ExtraInfoLabel>
                    <StepNumber>1</StepNumber>프로필 사진을 등록해 주세요!
                  </ExtraInfoLabel>
                  <EFWrapper><ExtraFileInput setFile={(image) => setFormData((prev) => ({ ...prev, profileImage: image }))} /></EFWrapper>
                </div>
                <div>
                  <ExtraInfoLabel>
                    <StepNumber>2</StepNumber>뭐라고 불러드릴까요?
                  </ExtraInfoLabel>
                  <NicknameInputWrapper>
                    <ExtraInfoInput
                      name="nickname"
                      placeholder="사용할 닉네임을 입력해주세요."
                      value={formData.nickname}
                      onChange={handleChange}
                      required
                    />
                    <div id="checkNicknameBtn" onClick={() => {handleCheckNickname();}}>확인</div>
                  </NicknameInputWrapper>
                  <NicknameComment 
                    key={checkSensor ? "true" : "false"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    {nicknameComment}
                  </NicknameComment>
                </div>
                <div>
                  <ExtraInfoLabel>
                    <StepNumber>3</StepNumber>선호하는 장르를 알려주세요!
                  </ExtraInfoLabel>
                  <SelectWrapper>
                    <Select
                      options={options}
                      styles={selectStyles}
                      value={options.filter(option => selectedOptions.includes(option.value))}
                      onChange={(selectedOptions) => {
                        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                        if (values.length <= 3) {
                          setSelectedOptions(values);
                          setFormData((prev) => ({ ...prev, genres: values }));
                        }
                      }}
                      isMulti
                      required
                    ></Select>
                  </SelectWrapper>
                </div>
              </LtExtraWrapper>
              <RtExtraWrapper>
                <ExtraInfoLabel>
                  <StepNumber>4</StepNumber>라이브에 사용할 캐릭터를 선택해
                  주세요!
                </ExtraInfoLabel>
                <ExtraRadioWrapper>
                  {[pet1, pet2, pet3, pet4, pet5, pet6].map((pet, index) => (
                    <ExtraRadioLabel key={index}>
                      <ExtraRadioInput
                        type="radio"
                        name="avatarType"
                        value={`AVATAR${index + 1}`}
                        checked={formData.avatarType === `AVATAR${index + 1}`}
                        onChange={handleChange}
                        required
                      />
                      <img src={pet} alt="petImg" width={100} />
                    </ExtraRadioLabel>
                  ))}
                </ExtraRadioWrapper>
              </RtExtraWrapper>
            </ExtraInfoInputWrapper>
            <MC.LtBtnWrapper>
              <MC.FilledBtn
                textColor="black"
                type="submit"
                width="90px"
                height="35px"
                color="var(--yellow)"
              >
                SUBMIT
              </MC.FilledBtn>
            </MC.LtBtnWrapper>
          </ExtraInfoForm>
        </MC.ModalBody>
      </MC.ModalWrapper>
    </>
  );
};




//마이페이지 추가정보 기입 모달 창
export const UserExtraInfoModal_v2 = ({
  setModalType,
  width,
  height,
}: ModalProps) => {

  const [formData, setFormData] = useState<FormDataState>({
    nickname: "",
    profileImage: null, // ✅ 초기값을 null로 설정
    avatarType: "",
    genres: [],
  });

  const options = [
    { value: "Ballad", label: "Ballad" },
    { value: "Dance", label: "Dance" },
    { value: "Pop", label: "Pop" },
    { value: "K-Pop", label: "K-Pop" },
    { value: "Acoustic", label: "Acoustic" },
    { value: "Hip-Hop", label: "Hip-Hop" },
    { value: "R&B", label: "R&B" },
    { value: "Electronic", label: "Electronic" },
    { value: "Rock", label: "Rock" },
    { value: "Jazz", label: "Jazz" },
    { value: "Indie", label: "Indie" },
    { value: "Trot", label: "Trot" },
  ];


  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "black",
      border: "1px solid var(--yellow)",
      borderRadius: "10px",
      width: "100%",
      padding: "5px",
      color: "black",
    }),
    menu: (styles: any) => ({ ...styles, backgroundColor: "black" }),
    multiValue: (styles: any) => ({
      ...styles,
      backgroundImage: "var(--liner)",
      borderRadius: "20px",
      padding: "3px 5px",
      marginRight: "5px",
    }),
  };

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [nicknameComment, setNicknameComment] = useState("");
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  const [checkSensor, setCheckSensor] = useState(false);
  
  const handleExtraInfo = () => {
    setModalType("");
    useUserStore.setState({ isExtraInfoRegistered: true });


    const formDataToSend = new FormData();
    formDataToSend.append("nickname", formData.nickname);
    formDataToSend.append("avatarType", formData.avatarType);
    formData.genres.forEach((genre) => formDataToSend.append("genres", genre));

    if (formData.profileImage instanceof File) {
      formDataToSend.append("profileImage", formData.profileImage);
    }
    // API 호출 부분에서 formData를 사용\
    MemberExtraInfoRequest(formDataToSend).then((responseBody: MemberExtraInfoResponseDto | null) => {
      console.log("Response:", responseBody);
      useUserStore.setState({ nickname: responseBody?.nickname })
      useUserStore.setState({ profileImage: responseBody?.profileImage })
      useUserStore.setState({ avatarType: responseBody?.avatarType })
      useUserStore.setState({ genres: responseBody?.genres })
    });
    console.log("Final Data:", formData);
  }

  const handleCheckNickname = () => {
    if(formData.nickname === ""){
      setCheckSensor(!checkSensor)
      setNicknameComment("사용 불가능한 닉네임 입니다.")
      return;
    }

    CheckNicknameRequest({nickname: formData.nickname}).then((responseBody: CheckNicknameResponseDto | null) => {
      if(responseBody?.exists) {
        setCheckSensor(!checkSensor)
        setNicknameComment("이미 존재하는 닉네임 입니다.")
      } else {
        setCheckSensor(!checkSensor)
        setNicknameComment("사용 가능한 닉네임 입니다.")
        setIsCheckedNickname(true)
      }
    })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(isCheckedNickname) {
      handleExtraInfo();
    } else {
      setCheckSensor(!checkSensor)
      setNicknameComment("닉네임을 확인해 주세요!")
    }
  };
  return (
    <>
      <MC.ModalOverlay />
      <MC.ModalWrapper width={width} height={height} >
        <MC.ModalHeader>
          <div>유저 추가 정보 변경하기</div>
          <MC.ModalCloseBtn
            textColor="white"
            onClick={() => {
              setModalType("");
            }}>
            X
          </MC.ModalCloseBtn>
        </MC.ModalHeader>
        <MC.ModalBody>
          <MC.Comment>
            더 많은 기능을 즐기기 위해 몇 가지 정보를 추가로 입력해 주세요!
          </MC.Comment>
          <ExtraInfoForm onSubmit={handleSubmit}>
            <ExtraInfoInputWrapper>
              <LtExtraWrapper>
                <div>
                  <ExtraInfoLabel>
                    <StepNumber>1</StepNumber>프로필 사진을 등록해 주세요!
                  </ExtraInfoLabel>
                  <EFWrapper><ExtraFileInput setFile={(image) => setFormData((prev) => ({ ...prev, profileImage: image }))} /></EFWrapper>
                </div>
                <div>
                  <ExtraInfoLabel>
                    <StepNumber>2</StepNumber>뭐라고 불러드릴까요?
                  </ExtraInfoLabel>
                  <NicknameInputWrapper>
                    <ExtraInfoInput
                      name="nickname"
                      placeholder="사용할 닉네임을 입력해주세요."
                      value={formData.nickname}
                      onChange={handleChange}
                      required
                    />
                    <div id="checkNicknameBtn" onClick={() => {handleCheckNickname();}}>
                      확인
                    </div>
                    </NicknameInputWrapper>
                    <NicknameComment 
                      key={checkSensor ? "true" : "false"}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.3 }}>
                      {nicknameComment}
                    </NicknameComment>
                </div>
                <div>
                  <ExtraInfoLabel>
                    <StepNumber>3</StepNumber>선호하는 장르를 알려주세요!
                  </ExtraInfoLabel>
                  <SelectWrapper>
                    <Select
                      options={options}
                      styles={selectStyles}
                      value={options.filter(option => selectedOptions.includes(option.value))}
                      onChange={(selectedOptions) => {
                        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                        if (values.length <= 3) {
                          setSelectedOptions(values);
                          setFormData((prev) => ({ ...prev, genres: values }));
                        }
                      }}
                      isMulti
                      required
                    ></Select>
                  </SelectWrapper>
                </div>
              </LtExtraWrapper>
              <RtExtraWrapper>
                <ExtraInfoLabel>
                  <StepNumber>4</StepNumber>라이브에 사용할 캐릭터를 선택해
                  주세요!
                </ExtraInfoLabel>
                <ExtraRadioWrapper>
                  {[pet1, pet2, pet3, pet4, pet5, pet6].map((pet, index) => (
                    <ExtraRadioLabel key={index}>
                      <ExtraRadioInput
                        type="radio"
                        name="avatarType"
                        value={`AVATAR${index + 1}`}
                        checked={formData.avatarType === `AVATAR${index + 1}`}
                        onChange={handleChange}
                        required
                      />
                      <img src={pet} alt="petImg" width={100} />
                    </ExtraRadioLabel>
                  ))}
                </ExtraRadioWrapper>
              </RtExtraWrapper>
            </ExtraInfoInputWrapper>
            <MC.LtBtnWrapper>
              <MC.FilledBtn
                textColor="black"
                type="submit"
                width="90px"
                height="35px"
                color="var(--yellow)"
              >
                SUBMIT
              </MC.FilledBtn>
            </MC.LtBtnWrapper>
          </ExtraInfoForm>
        </MC.ModalBody>
      </MC.ModalWrapper>
    </>
  );
};