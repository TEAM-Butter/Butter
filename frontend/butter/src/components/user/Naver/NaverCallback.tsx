import React, { useEffect } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginResponseDto } from "../../../apis/response/auth";
import { setAccessToken } from "../../../apis/auth";
import { useUserStore } from "../../../stores/UserStore";

const NaverCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useUserStore(state => state.setUser)

  useEffect(() => {
    // URL 쿼리 파라미터에서 'code'와 'state'를 추출합니다.
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      axiosInstance
        .post("/auth/login/social", {
          code: code,
          platform: "NAVER",
        })
        .then((response) => {
          console.log("서버 응답 전체:", response);
          const responseBody = response.data;
          const { accessToken } = responseBody as LoginResponseDto;
          setAccessToken(accessToken)
          setUser(true, String(responseBody?.authenticatedMemberInfo.nickname), String(responseBody?.authenticatedMemberInfo.profileImage), String(responseBody?.authenticatedMemberInfo.avatarType), String(responseBody?.authenticatedMemberInfo.memberType), Boolean(responseBody?.authenticatedMemberInfo.isExtraInfoRegistered), responseBody?.authenticatedMemberInfo.genres || []);
          navigate("/");
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
    <p>로그인 처리 중...</p>
  );
};

export default NaverCallback;
