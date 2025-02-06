import { SignUpRequestDto } from "./member";
import { LoginRequestDto } from "./auth";
import axios from "axios";
import { LoginResponseDto } from "../response/auth";
import { SignUpResponseDto } from "../response/member";

const DOMAIN = `http://localhost:8080`;

const API_DOMAIN = `${DOMAIN}/api/v1`;

const LOGIN_URL = () => `${API_DOMAIN}/auth/login`;
const SIGNUP_URL = () => `${API_DOMAIN}/members/signup`;

export const loginRequest = async (requestBody: LoginRequestDto) => {
    const result = await axios.post(LOGIN_URL(), requestBody)
        .then(response => {
            const responseBody: LoginResponseDto = response.data;
            console.log("Login response:", responseBody)
            return responseBody;
        })
        .catch(error => {
            console.log("Login api error:", error)
            return null
        })

    return result
}

export const signupRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGNUP_URL(), requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            console.log("Signup response:", responseBody)
            return responseBody
        })
        .catch(error => {
            console.log("Signup api error:", error)
            return null
        })

    return result
}