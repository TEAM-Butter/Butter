import styled from "@emotion/styled";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

// ChatRoomPageWrapper는 전체 페이지의 컨테이너 역할을 합니다.
const ChatRoomPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; /* 화면 전체 높이 사용 */
`;

// 채팅 영역
const ChatArea = styled.div`
  flex-grow: 1; /* 화면에서 남는 공간을 모두 차지 */
  padding: 16px;
  overflow-y: auto;
  background-color: #4d4d4d; /* 카카오톡처럼 밝은 배경색 */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

// 채팅 메시지
const Message = styled.div<{ isMine: boolean }>`
  background-color: ${(props) =>
    props.isMine
      ? "#f6d048"
      : "#717171"}; /* 내가 보낸 메시지와 다른 사용자의 메시지 색 */
  color: ${(props) => (props.isMine ? "white" : "black")};
  border-radius: 20px;
  max-width: 70%;
  padding: 8px 15px;
  margin-bottom: 10px;
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  word-break: break-word;
`;

// 채팅 메시지
const EnterMessage = styled.div`
  background-color: rgba(222, 218, 218, 0.9);
  color: black;
  border-radius: 20px;
  max-width: 80%;
  padding: 8px 20px;
  align-self: center;
  margin-bottom: 10px;
  word-break: break-word;
`;
const LiveChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-left: 18px;
  background-color: #717171;
`;
const LiveChatTitle = styled.div`
  color: #ddd;
`;
const LiveChatCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: #f6d048;
`;
// 메시지 입력 필드
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #717171;
`;
const InputField = styled.input`
  flex-grow: 1;
  margin: 5px;
  border: none;
  background-color: #717171;
  color: #ccd;
  margin-right: 10px;
  font-size: 16px;

  /* Placeholder 스타일 */
  ::placeholder {
    color: #ccd;
  }

  /* input에 아래쪽 경계선 추가 */
  border-bottom: 1px solid #ccd;
  /* focus 시 placeholder 텍스트 없애기 */
  :focus::placeholder {
    color: transparent; /* 포커스 상태에서 placeholder 텍스트를 보이지 않게 함 */
  }
  /* focus 시 기본 outline 제거 */
  :focus {
    outline: none;
  }
`;

interface IMessage {
  message: string;
  roomId: string;
  sender: string;
  type: "ENTER" | "TALK";
}

interface ITextMessage {
  textMessage: string;
}

function StreamChat() {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { streamId } = useParams();

  // const { state } = useLocation();
  const state = {
    name: {
      username: "DaHee",
    },
  };

  const roomId = streamId as string;
  const { register, handleSubmit, reset } = useForm();

  console.log("State", state);
  useEffect(() => {
    // STOMP 클라이언트 생성

    // a.subscribe(); // 구독 ? -> 메세지 받을래요.
    // a.publish(); // 발행 -> 메세지 보낼래요.

    // a.activate();

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        login: state.name.username,
        passcode: state.name.username,
      },
      onConnect: () => {
        console.log("SUCCESS!");
        // 1. 구독
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("Received message:", receivedMessage);

          console.log("message", message);
          setMessages((prev) => [...prev, receivedMessage]);
          // TODO 받은 메세지 state로 해야함.
        });

        const enterMessage: IMessage = {
          roomId: roomId as string,
          message: `${state.name.username}님이 입장했습니다`,
          sender: state.name.username,
          type: "ENTER",
        };

        // 2. 입장 메시지 보내기
        client.publish({
          destination: `/app/room/${roomId}`,
          body: JSON.stringify(enterMessage),
        });

        // 3. stompClient 상태 변경
        setStompClient(client);
      },
      debug: function (str) {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.activate();

    //useEffect가 unmount될 떄 실행됨 : clear함수
    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, []);

  const sendMessage = (message: string | null) => {
    if (!stompClient) return;

    const chatMessage = {
      roomId: roomId,
      message: message,
      sender: state.name.username, // 실제 사용자 정보로 대체
      type: "TALK",
    };

    // 전송
    stompClient.publish({
      destination: `/app/room/${roomId}`,
      body: JSON.stringify(chatMessage),
    });

    // if (textMessage.current) textMessage.current.value = "";
  };
  const onSubmit = (data: ITextMessage) => {
    if (data.textMessage && data.textMessage.trim() !== "") {
      sendMessage(data.textMessage);
      reset();
    }
  };
  return (
    <ChatRoomPageWrapper>
      <LiveChatHeader>
        <LiveChatTitle>Live Chat</LiveChatTitle>
        <LiveChatCircle />
      </LiveChatHeader>
      {/* 채팅 영역 */}
      <ChatArea>
        {/* 예시 메시지 */}
        {messages.map(({ message, sender, type }, idx) => {
          if (type === "ENTER") {
            return <EnterMessage>{message}</EnterMessage>;
          }

          return state.name.username === sender ? (
            <Message isMine={true} key={idx}>
              {message}
            </Message>
          ) : (
            <Message isMine={false} key={idx}>
              {message}
            </Message>
          );
        })}

        {/* <Message isMine={true}>안녕하세요!</Message> */}
      </ChatArea>

      {/* 입력 필드 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputField
            placeholder="type your comment..."
            {...register("textMessage")}
          />
          {/* <SendButton type="submit">➤</SendButton> */}
        </InputContainer>
      </form>
    </ChatRoomPageWrapper>
  );
}

export default StreamChat;
