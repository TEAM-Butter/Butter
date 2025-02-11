import React, { useEffect } from "react";

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
    <div>
      <button onClick={handleLogin}>네이버로 로그인</button>
    </div>
  );
};

export default NaverLogin;
