import { useEffect } from "react";

const KAKAO_MAP_API_KEY = "YOUR_KAKAO_MAP_API_KEY"; // 🔥 API 키 입력

const useKakaoLoader = () => {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      console.log("Kakao Maps API already loaded.");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("✅ Kakao Maps API loaded successfully.");
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default useKakaoLoader;
