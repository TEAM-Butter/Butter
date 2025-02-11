import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const NaverCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // URL 쿼리 파라미터에서 'code'와 'state'를 추출합니다.
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    console.log("콜백 URL 쿼리 파라미터:", { code, state });

    if (code) {
      console.log("인증 코드가 감지되었습니다. 서버에 전달하여 로그인 요청을 보냅니다.");
      axios
        .post("http://localhost:8080/api/v1/auth/login/social", {
          code: code,
          platform: "NAVER",
        })
        .then((response) => {
          console.log("서버 응답 전체:", response);
          const data = response.data;
          if (data.success) {
            console.log("로그인 성공:", data);
            // 로그인 성공 후 홈으로 리다이렉트합니다.
            navigate("/");
          } else {
            console.error("로그인 실패:", data.message);
            // 필요에 따라 실패 시 사용자에게 안내 메시지를 표시할 수 있습니다.
          }
        })
        .catch((error) => {
          console.error("서버 전송 중 오류 발생:", error);
          // 에러 발생 시 적절한 처리 (예, 에러 메시지 표시) 수행
        });
    } else {
      console.error("URL에서 인증 코드를 찾을 수 없습니다.");
    }
  }, [location.search, navigate]);

  return (
    <div>
      <p>로그인 처리 중...</p>
    </div>
  );
};

export default NaverCallback;
