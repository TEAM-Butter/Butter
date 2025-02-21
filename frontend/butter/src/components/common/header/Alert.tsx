import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useUserStore } from "../../../stores/UserStore";
import { getAccessToken } from "../../../apis/auth";

// Alert 전체 컨테이너 스타일
const AlertWrapper = styled(motion.div)`
  position: fixed;
  top: 55px;
  right: -300px; /* 기본적으로 화면 밖에 위치 */
  width: 300px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 100;
  overflow-y: auto;
`;

// 알림이 없을 때 표시할 빈 메시지 스타일
const EmptyMessage = styled.div`
  color: #999;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
`;

// 각 알림 항목 컨테이너 (플렉스 레이아웃)
const NotificationItem = styled.div<{ read: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #ececec;
  cursor: pointer;
  background-color: ${({ read }) => (read ? "#f9f9f9" : "white")};
  position: relative;
  &:hover {
    background-color: #f1f1f1;
  }
`;

// 상단 영역: 프로필 이미지와 메시지 (가로 배치)
// 오른쪽에 패딩을 주어 X 버튼과 겹치지 않도록 함
const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
`;

// 프로필 이미지 (원형)
const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

// 프로필 이미지가 없을 경우 표시할 placeholder (원형)
const ProfilePlaceholder = styled.div<{ bgColor: string }>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
`;

// 알림 텍스트 스타일
const NotificationText = styled.div`
  font-size: 14px;
  color: #333;
  flex: 1;
`;

// 삭제 버튼 스타일 (오른쪽 상단에 위치)
const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
`;

// 생성 시각을 표시할 타임스탬프 스타일
const TimeStamp = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

// 문자열을 받아 pastel한 HSL 색상 문자열을 생성하는 헬퍼 함수 (일관된 색상)
function stringToHslColor(str: string, s: number = 70, l: number = 80): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// 알림 생성 시각을 기반으로 경과 시간을 포맷하는 함수
function formatTimeAgo(timestamp: number | string | null | undefined): string {
  const ts =
    typeof timestamp === "number"
      ? timestamp
      : parseInt(timestamp as string, 10) || 0;
  if (!ts) return "방금";
  const now = Date.now();
  const diff = now - ts;
  if (isNaN(diff) || diff < 0) return "방금";
  
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  
  if (diff < minute) {
    return "방금";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes}분 전`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diff / day);
    return `${days}일 전`;
  }
}

// 서버에서 전달받을 알림 데이터의 타입 (NotificationDTO와 유사)
interface NotificationData {
  crewImageUrl: string;
  crewName: string;
  content: string;
  receiver: number;
  url: string;
  notificationType: string;
}

// 프론트엔드에서 관리할 알림 타입 (추가로 읽음 여부, emitterId, 생성 시각(createdAt) 추가)
interface Notification extends NotificationData {
  emitterId: string; // 서버가 보낸 이벤트의 ID (userId_timestamp 형식)
  read: boolean;
  createdAt: number;
  readAt?: number;
}

interface AlertProps {
  isToggle: boolean;
}

interface CustomMessageDto extends MessageEvent{
  id?: string,
}

export const Alert = ({ isToggle }: AlertProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const eventSource = useRef<EventSource | null>(null);
  const token = getAccessToken();
  const isLogin = useUserStore((state) => state.isLogin);
  
  // TTL: 3일 (밀리초 단위)
  const TTL = 3 * 24 * 60 * 60 * 1000;

  // SSE 연결 및 알림 수신
  useEffect(() => {
    if (!isLogin) {
      setNotifications([]);
      eventSource.current?.close();
      return;
    }
    if (eventSource.current) {
      eventSource.current.close();
    }
    const storedLastEventId = localStorage.getItem("lastEventId") || "";
    eventSource.current = new EventSourcePolyfill(
      `${import.meta.env.VITE_SPRING_BOOT_SERVER}/v1/notify/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Last-Event-ID": storedLastEventId,
        },
        withCredentials: true,
      }
    );
    eventSource.current.onopen = () => {
      console.log("✅ SSE 연결 성공");
    };
    eventSource.current.addEventListener("sse", (event: CustomMessageDto) => {
      console.log("🎯 'sse' 이벤트 수신:", event.data);
      let data: NotificationData;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        data = {
          crewImageUrl: "",
          crewName: "",
          content: event.data,
          receiver: 0,
          url: "",
          notificationType: "",
        };
      }
      // "실시간 알림 이벤트 스트림 생성됨." 메시지는 추가하지 않음.
      if (data.content.startsWith("실시간 알림 이벤트 스트림 생성됨")) {
        return;
      }
      // 서버가 전송한 이벤트의 ID (emitterId로 사용)
      const newEmitterId = event.lastEventId || event.id || "";
      if (newEmitterId) {
        localStorage.setItem("lastEventId", newEmitterId);
      }
      setNotifications((prev) => {
        // 중복 체크 (동일 emitterId가 있으면 추가하지 않음)
        if (prev.some((n) => n.emitterId === newEmitterId)) {
          return prev;
        }
        return [
          ...prev,
          {
            ...data,
            emitterId: newEmitterId,
            read: false,
            createdAt: Date.now(),
          },
        ];
      });
    });
    eventSource.current.onerror = () => {
      console.error("SSE 연결 오류");
      eventSource.current?.close();
    };
    return () => {
      eventSource.current?.close();
    };
  }, [isLogin, token]);

  // 컴포넌트 마운트 시 localStorage에서 알림 불러오기 (TTL 적용)
  useEffect(() => {
    const storedNotifsStr = localStorage.getItem("clientNotifications");
    if (storedNotifsStr) {
      try {
        const storedNotifs: Notification[] = JSON.parse(storedNotifsStr);
        const filteredNotifs = storedNotifs.filter((notif) => {
          if (!notif.read) return true;
          if (notif.readAt && Date.now() - notif.readAt < TTL) return true;
          return false;
        });
        setNotifications(filteredNotifs);
      } catch (err) {
        console.error("알림 재활용 에러", err);
      }
    }
  }, [TTL]);

  // notifications state 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("clientNotifications", JSON.stringify(notifications));
  }, [notifications]);

  // 주기적으로 읽은 알림 중 TTL 지난 것들을 삭제 (1분마다 체크)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNotifications((prev) =>
        prev.filter(
          (notif) =>
            !notif.read || (notif.readAt && Date.now() - notif.readAt < TTL)
        )
      );
    }, 60000);
    return () => clearInterval(intervalId);
  }, [TTL]);

  // 알림 클릭 시 읽음 처리 및 URL 이동
  const handleNotificationClick = (emitterId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.emitterId === emitterId
          ? { ...notif, read: true, readAt: Date.now() }
          : notif
      )
    );
    const clicked = notifications.find((notif) => notif.emitterId === emitterId);
    if (clicked && clicked.url) {
      window.location.href = clicked.url;
    }
  };

  // 알림 삭제 (해당 emitterId의 알림만 삭제)
  const handleNotificationDelete = (emitterId: string) => {
    setNotifications((prev) =>
      prev.filter((notif) => notif.emitterId !== emitterId)
    );
  };

  // NotificationType alias에 따라 메시지 포맷 지정
  const formatNotificationMessage = (notif: Notification) => {
    const { crewName, notificationType } = notif;
    switch (notificationType) {
      case "CREW_NOTICE":
        return `${crewName} 크루의 새로운 공지가 등록 되었어요!`;
      case "CREW_SCHEDULE":
        return `${crewName} 크루의 새로운 버스킹 일정이 등록 되었어요!`;
      case "LIVE_START":
        return `${crewName} 크루의 버스킹 라이브가 시작 되었어요!`;
      default:
        return notif.content;
    }
  };

  // 정렬: 읽지 않은 알림은 상단, 읽은 알림은 하단; 각 그룹 내에서는 최신순(내림차순)으로 정렬
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.read !== b.read) {
      return a.read ? 1 : -1;
    }
    return b.createdAt - a.createdAt;
  });

  return (
    <AlertWrapper
      animate={{ right: isToggle ? "3px" : "-300px" }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <h3>알림</h3>
      {sortedNotifications.length === 0 ? (
        <EmptyMessage>알림이 존재하지 않습니다.</EmptyMessage>
      ) : (
        sortedNotifications.map((notif) => (
          <NotificationItem
            key={notif.emitterId}
            read={notif.read}
            onClick={() => handleNotificationClick(notif.emitterId)}
          >
            <NotificationContent>
              {notif.crewImageUrl ? (
                <ProfileImage
                  src={notif.crewImageUrl}
                  alt={`${notif.crewName} 프로필`}
                />
              ) : (
                <ProfilePlaceholder bgColor={stringToHslColor(notif.crewName)}>
                  {notif.crewName ? notif.crewName.charAt(0).toUpperCase() : "?"}
                </ProfilePlaceholder>
              )}
              <NotificationText>
                {formatNotificationMessage(notif)}
              </NotificationText>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotificationDelete(notif.emitterId);
                }}
              >
                ✕
              </DeleteButton>
            </NotificationContent>
            <TimeStamp>{formatTimeAgo(notif.createdAt)}</TimeStamp>
          </NotificationItem>
        ))
      )}
    </AlertWrapper>
  );
};
