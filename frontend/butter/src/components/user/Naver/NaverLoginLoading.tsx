import axios from "axios";
import { div } from "framer-motion/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const NaverLogin = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");

    const BASE_URL = import.meta.env.NAVER_BASE_URL

    useEffect(() => {
        const naver = async () => {
            return await axios
                .get(
                    `${BASE_URL}?code=${code}&platform=NAVER`,
                )
                .then((res) => localStorage.setItem('naverToken', res.headers.authorization))
                .then(() => {
                    navigate('/')
                })

        }
        if (code) {
            naver();
        }
    }, [code]);

    return <div>로딩 페이지 렌더링</div>
}

export default NaverLogin;