import {
  breadDonationRequest,
  getBreadAmount,
} from "../../../apis/request/bread/breadRequest.ts";
import * as MC from "./modalComponents/modalComponents.tsx";
import styled from "@emotion/styled";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { memberDetailRequest } from "../../../apis/request/member/memberRequest.ts";
import { MemberDetailResponseDto } from "../../../apis/response/member/index.ts";
const BreadAmountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const BreadAmountInputWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;

  & > input {
    flex: 1;
  }
`;
const BreadAmountInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  background: none;
  border: none;
  border: 1px solid var(--yellow);
  border-radius: 10px;
  color: white;
  font-size: 15px;
`;

interface ModalSizeProps {
  width: string;
  height: string;
}

interface ModalProps extends ModalSizeProps {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

interface DonationModalProps extends ModalProps {
  crewId: number;
  socket: Socket;
  participant: string;
}

export const DonationModal = ({
  setModalType,
  width,
  height,
  crewId,
  socket,
  participant,
}: DonationModalProps) => {
  let breadAmount: number = 0;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    breadAmount = +value;
  };

  const [userBread, setUserBread] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBreadAmount();
      setUserBread(response.breadAmount);
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    breadDonationRequest({
      crewId: crewId,
      amount: breadAmount,
      socket,
      participant,
    });
    setModalType("");
    return false;
  };

  socket.on("donate", (content) => {
    console.log("🤣🤣🤣🤣🤣🤣", content);
  });
  useEffect(() => {
    memberDetailRequest().then(
      (responseBody: MemberDetailResponseDto | null) => {
        if (!responseBody) return;
        console.log(responseBody);
      }
    );
  }, []);

  return (
    <>
      <MC.ModalOverlay />
      <MC.ModalWrapper width={width} height={height}>
        <MC.ModalHeader>
          <div>후원하기</div>
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
          <MC.Comment>총 보유량 : {userBread} Bread</MC.Comment>
          <MC.Comment>빵을 얼마나 후원하시겠어요?</MC.Comment>
          <BreadAmountForm onSubmit={handleSubmit}>
            <BreadAmountInputWrapper>
              <BreadAmountInput
                name="breadAmount"
                placeholder="빵 수량을 입력해주세요."
                onChange={handleChange}
                required
              />
            </BreadAmountInputWrapper>
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
          </BreadAmountForm>
        </MC.ModalBody>
      </MC.ModalWrapper>
    </>
  );
};
