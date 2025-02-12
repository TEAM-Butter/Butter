import styled from "@emotion/styled";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

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
  scroll-behavior: smooth;
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

const SenderName = styled.div`
  font-size: 12px;
  color: #ccc;
  margin-bottom: 4px;
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

// interface IMessage {
//   message: string;
//   roomId: string;
//   sender: string;
//   type: "ENTER" | "TALK";
// }

// interface ITextMessage {
//   textMessage: string;
// }

type ChatMessage = {
  type: "CHAT" | "JOIN" | "LEAVE" | "SYSTEM" | "STREAM_ENDED";
  content: string;
  sender: string;
  streamId: string;
  role: "USER" | "HOST";
};

interface FormInputs {
  textMessage: string;
}

interface StreamChatProps {
  participantName: string;
  roomRole: string;
  streamId: string;
}

function StreamChat({ participantName, roomRole, streamId }: StreamChatProps) {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [role, setRole] = useState<"USER" | "HOST">(
    roomRole === "publisher" ? "HOST" : "USER"
  );
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // // const { state } = useLocation();
  // const state = {
  //   name: {
  //     username: "DaHee",
  //   },
  // };

  const { register, handleSubmit, reset } = useForm<FormInputs>();
  useEffect(() => {
    // STOMP 클라이언트 생성

    // a.subscribe(); // 구독 ? -> 메세지 받을래요.
    // a.publish(); // 발행 -> 메세지 보낼래요.
    const token =
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImdlbmRlciI6Ik1BTEUiLCJiaXJ0aGRhdGUiOiIxOTkwLTAxLTAxIiwiaWF0IjoxNzM5Mzc2ODE5LCJleHAiOjE3MzkzODA0MTl9.SqRnuAxlxHm7mCbXeSYJT8zo7TfJSjwjGsNnq66C56hSAczp9V2FDma4F1uQrBrXq-Jidl0iC44B0t5JWhSiWw";
    // a.activate();

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      // STOMP CONNECT 시 JWT 토큰을 헤더에 포함합니다.
      connectHeaders: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    client.onConnect = () => {
      console.log("SUCCESS!");
      // 1. 구독
      client.subscribe(`/topic/stream/${streamId}`, (message: IMessage) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("Received message:", receivedMessage);
        console.log("message", message);
        setMessages((prev) => [...prev, receivedMessage]);
      });

      const enterMessage: ChatMessage = {
        streamId: streamId,
        content: `${participantName}님이 입장했습니다`,
        sender: participantName,
        type: "JOIN",
        role,
      };

      // 2. 입장 메시지 보내기
      client.publish({
        destination: `/app/chat.sendMessage/${streamId}`,
        body: JSON.stringify(enterMessage),
      });

      // 3. stompClient 상태 변경
      setStompClient(client);
    };
    client.activate();
    //useEffect가 unmount될 떄 실행됨 : clear함수
    return () => {
      if (client.connected) {
        const exitMessage: ChatMessage = {
          streamId: streamId,
          content: `${participantName}님이 퇴장했습니다`,
          sender: participantName,
          type: "LEAVE",
          role,
        };

        client.publish({
          destination: `/app/chat.sendMessage/${streamId}`,
          body: JSON.stringify(exitMessage),
        });

        client.deactivate();
      }
    };
  }, [participantName, streamId, role]);

  const sendMessage = (message: string) => {
    if (!stompClient || !message.trim()) {
      console.error("STOMP client not connected or empty message");
      return;
    }

    try {
      const chatMessage: ChatMessage = {
        streamId,
        content: message,
        sender: participantName,
        type: "CHAT",
        role,
      };

      stompClient.publish({
        destination: `/app/chat.sendMessage/${streamId}`,
        body: JSON.stringify(chatMessage),
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const onSubmit = (data: FormInputs) => {
    if (data.textMessage?.trim()) {
      sendMessage(data.textMessage);
      reset();
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <ChatRoomPageWrapper>
      <LiveChatHeader>
        <LiveChatTitle>Live Chat</LiveChatTitle>
        <LiveChatCircle />
      </LiveChatHeader>

      <ChatArea ref={chatAreaRef}>
        {/* {messages.map(({ content, sender, type }, idx) => {
          if (type === "JOIN") {
            return <EnterMessage>{content}</EnterMessage>;
          }

          return participantName === sender ? (
            <Message isMine={true} key={idx}>
              {content}
            </Message>
          ) : (
            <Message isMine={false} key={idx}>
              {content}
            </Message>
          );
        })} */}
        {messages.map((message, idx) => {
          const { content, sender, type } = message;

          switch (type) {
            case "JOIN":
            case "LEAVE":
              return <EnterMessage key={idx}>{content}</EnterMessage>;

            case "CHAT":
            default:
              return (
                <Message key={idx} isMine={participantName === sender}>
                  <SenderName>{sender}</SenderName>
                  {content}
                </Message>
              );
          }
        })}
      </ChatArea>

      {/* 입력 필드 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputField
            placeholder="Type your comment..."
            {...register("textMessage", { required: true, maxLength: 200 })}
          />
          {/* <SendButton type="submit">➤</SendButton> */}
        </InputContainer>
      </form>
    </ChatRoomPageWrapper>
  );
}

export default StreamChat;
