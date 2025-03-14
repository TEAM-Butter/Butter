import { EmailExistSendDto, EmailVerifyCodeRequestDto, LoginRequestDto } from "../auth/authDto";
import { EmailSendCodeResponseDto, EmailVerifyCodeResponseDto, LoginResponseDto } from "../../response/auth";
import { axiosInstance } from "../../axiosInstance";

export const loginRequest = async (requestBody: LoginRequestDto) => {
    const result = await axiosInstance.post(`/auth/login`, requestBody)
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
            console.log("EmailExist response: 존재하지 않는 이메일 입니다.")
            return false;
        })
        .catch(error => {
            console.log("EmailExist response: 존재하는 이메일 입니다.", error)
            return true
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
            return responseBody;
        })
        .catch(error => {
            console.log("EmailVerifyCode error: 인증코드가 잘못되었습니다.", error)
            return null
        })

    return result
}