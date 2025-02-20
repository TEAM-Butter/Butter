import styled from "@emotion/styled";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getAccessToken } from "../../../apis/auth";
import { useUserStore } from "../../../stores/UserStore";

// ChatRoomPageWrapper는 전체 페이지의 컨테이너 역할을 합니다.
const ChatRoomPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%; /* 화면 전체 높이 사용 */
`;

// 채팅 영역
const ChatArea = styled.div`
  flex-grow: 1; /* 화면에서 남는 공간을 모두 차지 */
  padding: 16px;
  overflow-y: scroll;
  background-color: #4d4d4d; /* 카카오톡처럼 밝은 배경색 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 120px); /* 채팅 입력창과 헤더를 제외한 높이 설정 */
  max-height: calc(100vh - 120px); /* 최대 높이 설정 */
  scroll-behavior: smooth;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #4d4d4d;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// 채팅 메시지
const Message = styled.div<{ isMine: boolean }>`
  display: flex;
  gap: 10px;
  background-color: ${(props) =>
    props.isMine
      ? "#f6d048"
      : "#717171"}; /* 내가 보낸 메시지와 다른 사용자의 메시지 색 */
  color: ${(props) => (props.isMine ? "white" : "black")};
  border-radius: 20px;
  max-width: 70%;
  padding: 6px 12px;
  margin-bottom: 10px;
  align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
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
const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const SenderName = styled.div`
  font-size: 12px;
  color: #fffffff0;
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
  color: #ffffff;
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
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const role: "USER" | "HOST" = roomRole === "crew" ? "HOST" : "USER";
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset } = useForm<FormInputs>();

  //맨 아래에 있는 지 확인
  const isScrollAtBottom = () => {
    if (!chatAreaRef.current) return true;
    const { scrollHeight, scrollTop, clientHeight } = chatAreaRef.current;
    return Math.abs(scrollHeight - scrollTop - clientHeight) < 50;
  };

  const handleScroll = () => {
    if (!chatAreaRef.current) return;
    setIsUserScrolling(!isScrollAtBottom());
  };

  // 메시지를 받았을 때 스크롤 처리
  useEffect(() => {
    if (chatAreaRef.current && (!isUserScrolling || isScrollAtBottom())) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // 채팅 영역에 스크롤 이벤트 리스너 추가
  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (chatArea) {
      chatArea.addEventListener("scroll", handleScroll);
      return () => chatArea.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const token = `Bearer ${getAccessToken()}`;
    console.log("채팅방 입장 전!!!");
    const client = new Client({
      webSocketFactory: () => {
        return new SockJS(`${import.meta.env.VITE_SPRING_BOOT_SERVER}/ws`);
      },
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

      // 3. stompClient 상태 변경
      setStompClient(client);
    };
    client.activate();
    //useEffect가 unmount될 떄 실행됨 : clear함수
    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, [participantName, streamId]);

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
      setIsUserScrolling(false);
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
        {messages.map((message, idx) => {
          const { content, sender, type } = message;

          if (type === "CHAT") {
            return (
              <Message key={idx} isMine={participantName === sender}>
                <MsgContainer>
                  {participantName !== sender && (
                    <SenderName>{sender}</SenderName>
                  )}
                  {content}
                </MsgContainer>
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
