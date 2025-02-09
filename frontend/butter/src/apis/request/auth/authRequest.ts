import axios from "axios";
import { EmailExistRequestDto, LoginRequestDto } from "../auth/authDto";
import { EmailExistResponseDto, LoginResponseDto } from "../../response/auth";
import { axiosInstance } from "../../axiosInstance";

const DOMAIN = `http://localhost:8080`;

const API_DOMAIN = `${DOMAIN}/api/v1`;

const LOGIN_URL = () => `${API_DOMAIN}/auth/login`;
const EmailExist_URL = () => `${API_DOMAIN}/auth/email/send-code`;

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

export const emailExistRequest = async (requestBody: EmailExistRequestDto) => {
    const result = await axios.post(EmailExist_URL(), requestBody)
        .then(response => {
            const responseBody: EmailExistResponseDto = response.data;
            console.log("EmailExist response:", responseBody)
            return responseBody;
        })
        .catch(error => {
            console.log("EmailExist api error:", error)
            return null
        })

    return result
}