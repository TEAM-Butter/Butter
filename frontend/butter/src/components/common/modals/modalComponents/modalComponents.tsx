import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
export const ModalWrapper = styled.div<ModalSizeProps>`
  display: grid;
  grid-template-rows: 60px 1fr;
  width: ${(props) => props.width};
  /* height: ${(props) => props.height}; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  color: white;
  /* border: 1px solid gray; */
`;

export const ModalWrapper_v2 = styled(ModalWrapper)`
  border-radius: 20px;
  overflow: hidden;
  color: var(--darkgray);
`;

export const ModalWrapper_v3 = styled(ModalWrapper)`
  transform: translate(-70%, -400%);
`;

// Modal type 1 (검은 테마의 모달 디자인)
export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: black;
  align-items: center;
  padding: 0 12px;
  font-size: 20px;
  font-weight: 200;
  border-bottom: 1px dashed gray;
  justify-content: space-between;
  border-radius: 0 0 10px 10px;
`;

export const ModalHeader2 = styled.div`
  display: flex;
  width: 100%;
  background-color: black;
  align-items: center;
  padding: 0 12px;
  font-size: 20px;
  font-weight: 200;
  border-bottom: 1px dashed gray;
  justify-content: space-between;
  border-radius: 0 0 10px 10px;
  height: 40px;
`;

export const ModalHeader3 = styled.div`
  display: flex;
  width: 100%;
  background-color: black;
  align-items: flex-end;
  font-size: 18px;
  font-weight: 200;
  justify-content: space-between;
  border-radius: 10px;
  padding: 15px;
`;




export const ModalHeader_v2 = styled(ModalHeader)`
  background-color: white;
  border-radius: 0px;
  font-size: 17px;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 17px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px 10px 0 0;
  width: 100%;
`;

export const ModalBody_v2 = styled(ModalBody)`
  border-radius: 0px;
  background-color: white;
  justify-content: center;
  gap: 20px;
`;

export const ModalBody_v3 = styled(ModalBody)`
  height: 500px;
  width: 400px;
  display: flex;
  justify-content: start;
`;

export const ModalBody_v4 = styled(ModalBody)`
  height: 460px;
  width: 450px;
  justify-content: space-between;
`;

export const Comment = styled.div`
  font-weight: 200;
  margin-bottom: 15px;
`;
export const Comment_v2 = styled(Comment)<ColorProps>`
  color: ${(props) => props.textColor};
  margin-bottom: 5px;
`;

export const Comment_v3 = styled.input`
  background-color: rgba(0, 0, 0, 0.8);
  margin-bottom: 0px;
  height: 40px;
  font-size: 20px;
  color:white;
  border: none;
  `;

export const Comment_v4 = styled.input`
  background-color: rgba(0, 0, 0, 0.8);
  height: 80px;
  color: white;
  font-size: 18px;
  border: none;
`;

export const Comment_v5 = styled.input`

  margin-bottom: 5px;
`;
export const ModalCloseBtn = styled.button<ColorProps>`
  background: none;
  color: ${(props) => props.textColor};
  border: none;
  font-size: 18px;
`;

export const LtBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

export const BorderBtn = styled.button<BorderProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  border: 1px solid ${(props) => props.color};
  border-radius: 30px;
  background-color: transparent;
  font-weight: 500;
  color: ${(props) => props.color};
  transition: all ease-in-out 0.3s;

  &:hover {
    background-color: ${(props) => props.color};
    color: black;
  }
`;

export const FilledBtn = styled(BorderBtn)<ColorProps>`
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};

  &:hover {
    background-color: transparent;
    color: ${(props) => props.color};
  }
`;




interface BorderProps {
  width: string;
  height: string;
  color: string;
}

interface ModalSizeProps {
  width: string;
  height: string;
}

interface ColorProps {
  textColor: string;
}
