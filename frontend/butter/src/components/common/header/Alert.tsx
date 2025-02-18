import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from 'react';
import { useUserStore } from "../../../stores/UserStore";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getAccessToken } from "../../../apis/auth";

const AlertWrapper = styled(motion.div)`
    position: fixed;
    top: 55px;
    margin-top: 3px;
    right: -300px; /* 처음엔 화면 밖 */
    width: 250px;
    height: 450px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 100;
`;

interface AlertProps {
    isToggle: boolean;
}

export const Alert = ({ isToggle }: AlertProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const eventSource = useRef<null | EventSource>(null);
  const token = getAccessToken(); // 인증 토큰
  const isLogin = useUserStore(state => state.isLogin)
  // const isSubscribed: boolean = sessionStorage.getItem('isSubscribed') === "true";
  
    useEffect(() => {
        if(!isLogin) {
          setMessages([]);
          return
        };

        if (eventSource.current) {
          eventSource.current.close(); // 기존 연결 닫기
        }

        eventSource.current = new EventSourcePolyfill(`${import.meta.env.VITE_SPRING_BOOT_SERVER}/v1/notify/subscribe`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        
        eventSource.current.onopen = () => {
          console.log("✅ SSE 연결 성공");
          sessionStorage.setItem('isSubscribed', "true");
        }

        eventSource.current.addEventListener("sse", (event) => {
          console.log("🎯 'sse' 이벤트 수신:", event.data);
          setMessages((prev) => [...prev, event.data]);
        });

        eventSource.current.onerror = () => {
          console.error("SSE 연결 오류");
          eventSource.current?.close();
        };

        return () => {
        if (!isLogin) {
          // sessionStorage.setItem('isSubscribed', "false")
          eventSource.current?.close();
          setMessages([]); 
        }
      };
    }, [isLogin]);

    return (
        <AlertWrapper
            animate={{ right: isToggle ? "3px" : "-300px" }}
            transition={{ type: "spring", stiffness: 50 }}
        >
            <p>알림</p>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </AlertWrapper>
    );
};
