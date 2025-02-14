// useSocketConnections.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// 아바타용 Socket.io 훅
export const useAvatarSocket = (url: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(url, {
        transports: ["websocket"],
        reconnection: true,
      });

      socketRef.current.on("connect", () => {
        console.log("Avatar socket connected");
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [url]);

  return socketRef.current;
};

// 채팅용 STOMP 훅
export const useChatSocket = (
  streamId: string,
  participantName: string,
  role: string
) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const client = new Client({
      webSocketFactory: () => new SockJS(`${protocol}://localhost:8080/ws`),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("Chat socket connected");
      // 구독 로직은 여기서 처리
    };

    clientRef.current = client;
    client.activate();

    return () => {
      if (client.connected) {
        client.deactivate();
      }
      clientRef.current = null;
    };
  }, [streamId, participantName, role]);

  return clientRef.current;
};
