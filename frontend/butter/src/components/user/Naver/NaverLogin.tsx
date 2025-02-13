import React from "react";
import styled from "@emotion/styled";

const Btn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  span{
    font-weight: 800;
    color: #03CF5D;
    margin-bottom: 3px;
  }
`

const NaverLogin: React.FC = () => {
  const handleLogin = () => {
    console.log("네이버 로그인 버튼 클릭됨");

    const naverPopupUrl = import.meta.env.VITE_NAVER_POPUP_URL;
    const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const naverRedirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;
    

    const state = crypto.randomUUID().substring(0, 8);

    const naverAuthUrl = `${naverPopupUrl}?client_id=${naverClientId}&response_type=code&redirect_uri=${encodeURIComponent(naverRedirectUri)}&state=${state}`;

    console.log(naverAuthUrl)

    window.location.href = naverAuthUrl;
  };

  return (
    <Btn onClick={handleLogin}>
      Log in with <span>NAVER</span>
    </Btn>
  );
};

export default NaverLogin;
