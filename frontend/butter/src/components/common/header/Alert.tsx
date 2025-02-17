import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from 'react';
import { useUserStore } from "../../../stores/UserStore";
import { EventSourcePolyfill } from "event-source-polyfill";

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
    const token = "your-access-token"; // 인증 토큰
  
    useEffect(() => {
      eventSource.current = new EventSourcePolyfill(`${import.meta.env.VITE_SPRING_BOOT_SERVER}/notify/subscribe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      eventSource.current.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);
      };
  
      eventSource.current.onerror = () => {
        console.error("SSE 연결 오류");
        eventSource.current?.close();
      };
  
      return () => {
        eventSource.current?.close();
      };
    }, []);

    return (
        <AlertWrapper
            animate={{ right: isToggle ? "3px" : "-300px" }}
            transition={{ type: "spring", stiffness: 50 }}
        >
            <p>알림</p>
        </AlertWrapper>
    );
};
