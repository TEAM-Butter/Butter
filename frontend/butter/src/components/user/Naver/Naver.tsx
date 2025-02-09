import { useEffect } from "react";

const Naver = () => {
    const { naver }: any = window;

    const clientID = import.meta.env.VITE_NAVER_CLIENT_ID;

    const stateString = import.meta.env.VITE_NAVER_STATE_STRING;

    const callbackUrl = import.meta.env.VITE_NAVER_CALLBACK_URL;

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${clientID}&response_type=code&redirect_uri=${callbackUrl}&state=${stateString}`

    const loginHandler = () => {
        window.location.href = naverAuthUrl;
    }

    return (
        <button onClick={loginHandler}>
            네이버
        </button>
    );
};
export default Naver;