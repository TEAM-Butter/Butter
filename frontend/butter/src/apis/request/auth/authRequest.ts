import axios from "axios";
import { EmailExistSendDto, EmailVerifyCodeRequestDto, LoginRequestDto } from "../auth/authDto";
import { EmailSendCodeResponseDto, EmailVerifyCodeResponseDto, LoginResponseDto } from "../../response/auth";
import { axiosInstance } from "../../axiosInstance";

const DOMAIN = `http://localhost:8080`;

const API_DOMAIN = `${DOMAIN}/api/v1`;

const LOGIN_URL = () => `${API_DOMAIN}/auth/login`;

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

export const EmailExistRequest = async (requestBody: EmailExistSendDto) => {
    const result = await axiosInstance.post(`/auth/email/exists`, requestBody)
        .then(response => {
            const responseBody: EmailExistSendDto = response.data;
            console.log("EmailExist response:", responseBody)
            return responseBody;
        })
        .catch(error => {
            console.log("EmailExist error:", error)
            return null
        })

    return result
}

export const EmailSendCodeRequest = async (requestBody: EmailExistSendDto) => {
    const result = await axiosInstance.post(`/auth/email/send-code`, requestBody)
        .then(response => {
            const responseBody: EmailSendCodeResponseDto = response.data;
            console.log("EmailSendCode response:", responseBody)
            return responseBody;
        })
        .catch(error => {
            console.log("EmailSendCode error:", error)
            return null
        })

    return result
}

export const EmailVerifyCodeRequest = async (requestBody: EmailVerifyCodeRequestDto) => {
    const result = await axiosInstance.post(`/auth/email/verify-code`, requestBody)
        .then(response => {
            const responseBody: EmailVerifyCodeResponseDto = response.data;
            console.log("EmailVerifyCode response:", responseBody)
            return responseBody;
        })
        .catch(error => {
            console.log("EmailVerifyCode error:", error)
            return null
        })

    return result
}