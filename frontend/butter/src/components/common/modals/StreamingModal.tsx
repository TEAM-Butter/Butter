import * as MC from "./modalComponents/modalComponents.tsx"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Select from "react-select";
import { useEffect, useState } from "react";
import { myCrewScheduleRequest } from "../../../apis/request/schedule/scheduleRequest.ts";

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
  width: 100%;
`;


export const StreamingModal = ({ setModalType, width, height }: ModalProps) => {
const [ options, setOptions ] = useState<{ value: string; label: string }[]>();
useEffect(() => {
    const fetchData = async () => {
        const response = (await myCrewScheduleRequest())?.map(myCrewScheduleResponseDto => {
            return { value: myCrewScheduleResponseDto.id.toString(), label: myCrewScheduleResponseDto.title };
        });
        setOptions(response);
    };
    fetchData();
}, []);
const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
const { register, handleSubmit } = useForm();
const navigate = useNavigate(); // useNavigate 훅 추가
const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/stream/${data.roomName}`, {
    state: {
        roomName: data.roomName,
        role: "publisher",
        participantName: "dahee",
        scheduleId: selectedOptions[0],
    },
    });
    setModalType("");
};
const selectStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "black",
    border: "1px solid white",
    borderRadius: "30px",
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
                    placeholder="버스킹 일정을 선택해 주세요."
                    options={options}
                    styles={selectStyles}
                    value={options ? options.filter(option => selectedOptions.includes(option.value)) : null}
                    onChange={(selectedOptions) => {
                        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                        if (values.length <= 1) {
                            setSelectedOptions(values);
                        }
                    }}
                    isMulti
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