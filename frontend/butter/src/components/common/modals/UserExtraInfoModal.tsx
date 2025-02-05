import { ExtraFileInput } from "../fileInput";
import { useState } from "react";
import * as MC from "./modalComponents/modalComponents"
import styled from "@emotion/styled";
import Select from "react-select";
import pet1 from "/src/assets/pets/pet1.png";
import pet2 from "/src/assets/pets/pet2.png";
import pet3 from "/src/assets/pets/pet3.png";
import pet4 from "/src/assets/pets/pet4.png";
import pet5 from "/src/assets/pets/pet5.png";
import pet6 from "/src/assets/pets/pet6.png";

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

interface ModalSizeProps {
    width: string;
    height: string;
  }

interface ModalProps extends ModalSizeProps {
setModalType: React.Dispatch<React.SetStateAction<string>>;
}

export const UserExtraInfoModal = ({
  setModalType,
  width,
  height,
}: ModalProps) => {
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (selectedOptions.length < 3 && !selectedOptions.includes(value)) {
      const NewSelectedOptions = [...selectedOptions];
      NewSelectedOptions.push(value);
      setSelectedOptions(NewSelectedOptions);
    }
  };

  return (
    <>
      <MC.ModalOverlay />
      <MC.ModalWrapper width={width} height={height}>
        <MC.ModalHeader>
          <div>TYPE YOUR EXTRA INFO</div>
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
          <MC.Comment_v2 textColor="white">
            버터에 가입하신 것을 축하합니다!
          </MC.Comment_v2>
          <MC.Comment>
            더 많은 기능을 즐기기 위해 몇 가지 정보를 추가로 입력해 주세요!
          </MC.Comment>
          <ExtraInfoForm>
            <ExtraInfoInputWrapper>
              <LtExtraWrapper>
                <div>
                  <ExtraInfoLabel>
                    <StepNumber>1</StepNumber>프로필 사진을 등록해 주세요!
                  </ExtraInfoLabel>
                  <ExtraFileInput />
                </div>
                <div>
                  <ExtraInfoLabel>
                    <StepNumber>2</StepNumber>뭐라고 불러드릴까요?
                  </ExtraInfoLabel>
                  <ExtraInfoInput placeholder="사용할 닉네임을 입력해주세요." />
                </div>
                <div>
                  <ExtraInfoLabel>
                    <StepNumber>3</StepNumber>선호하는 장르를 알려주세요!
                  </ExtraInfoLabel>
                  <SelectWrapper>
                    <Select
                      options={options}
                      styles={selectStyles}
                      isMulti
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
                  <ExtraRadioLabel>
                    <ExtraRadioInput type="radio" id="pet" name="pet" />
                    <img src={pet1} alt="petImg" width={100} />
                  </ExtraRadioLabel>
                  <ExtraRadioLabel>
                    <ExtraRadioInput type="radio" id="pet2" name="pet" />
                    <img src={pet2} alt="petImg" width={100} />
                  </ExtraRadioLabel>
                  <ExtraRadioLabel>
                    <ExtraRadioInput type="radio" id="pet3" name="pet" />
                    <img src={pet3} alt="petImg" width={100} />
                  </ExtraRadioLabel>
                  <ExtraRadioLabel>
                    <ExtraRadioInput type="radio" id="pet4" name="pet" />
                    <img src={pet4} alt="petImg" width={100} />
                  </ExtraRadioLabel>
                  <ExtraRadioLabel>
                    <ExtraRadioInput type="radio" id="pet5" name="pet" />
                    <img src={pet5} alt="petImg" width={100} />
                  </ExtraRadioLabel>
                  <ExtraRadioLabel>
                    <ExtraRadioInput type="radio" id="pet6" name="pet" />
                    <img src={pet6} alt="petImg" width={100} />
                  </ExtraRadioLabel>
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