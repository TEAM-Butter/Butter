import * as MC from "./modalComponents/modalComponents.tsx"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Select from "react-select";
import { axiosInstance } from "../../../apis/axiosInstance.ts";
import { useEffect } from "react";

interface ModalSizeProps {
width: string;
height: string;
}

interface ModalProps extends ModalSizeProps {
setModalType: React.Dispatch<React.SetStateAction<string>>;
}

// Streaming Styled
const StreamingForm = styled.form`
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
`;

const StreamingTitleInput = styled.input`
width: 100%;
height: 40px;
border-radius: 30px;
border: none;
padding: 0 15px;
`;

const SelectWrapper = styled.div`
  width: 90%;
`;

export const StreamingModal = ({ setModalType, width, height }: ModalProps) => {
const { register, handleSubmit } = useForm();
const navigate = useNavigate(); // useNavigate 훅 추가
const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/stream/${data.roomName}`, {
    state: {
        roomName: data.roomName,
        role: "publisher",
        participantName: "dahee",
    },
    });
    setModalType("");
};
useEffect(() => {
    
});
return (
    <>
    <MC.ModalOverlay />
    <MC.ModalWrapper width={width} height={height}>
        <MC.ModalHeader>
        <div>SET STREAMING LIVE</div>
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
        <MC.Comment>스트리밍 제목을 설정하고, 라이브를 시작해보세요!</MC.Comment>
        <StreamingForm onSubmit={handleSubmit(onSubmit)}>
            <StreamingTitleInput
            placeholder="스트리밍 제목을 입력해주세요."
            {...register("roomName", { required: true })}
            ></StreamingTitleInput>
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
            <MC.LtBtnWrapper>
            <MC.BorderBtn
                type="submit"
                width="90px"
                height="35px"
                color="var(--red)"
            >
                LIVE ON
            </MC.BorderBtn>
            </MC.LtBtnWrapper>
        </StreamingForm>
        </MC.ModalBody>
    </MC.ModalWrapper>
    </>
);
};