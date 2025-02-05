import { SignUpRequestDto } from "./member";
import { LoginRequestDto } from "./auth";
import { request } from "http";
import axios from "axios";
import { LoginResponseDto } from "../response/auth";

const DOMAIN = `http://localhost:8080`;

const API_DOMAIN = `${DOMAIN}/api/v1`;

const LOGIN_URL = () => `${API_DOMAIN}/auth/login`;
const SIGNUP_URL = () => `${API_DOMAIN}/members/signup`;

export const loginRequest = async (requestBody: LoginRequestDto) => {
    const result = await axios.post(LOGIN_URL(), requestBody)
        .then(response => {
            const responseBody: LoginResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            console.log("Login api error:", error)
        })

    return result
}