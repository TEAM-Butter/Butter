import { CheckLoginIdRequestDto, CheckNicknameRequestDto, SignUpRequestDto, PasswordUpdateRequestDTO } from "./memberDto";
import { MemberExtraInfoResponseDto, PasswordUpdateResponseDto } from "../../response/member";
import { CheckLoginIdResponseDto, CheckNicknameResponseDto, MemberDetailResponseDto, SignUpResponseDto } from "../../response/member";
import { axiosInstance } from "../../axiosInstance";

export const signupRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axiosInstance.post(`/members/signup`, requestBody,)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody
        })
        .catch(error => {
            console.log("Signup api error:", error)
            return null
        })

    return result
}

export const memberDetailRequest = async () => {
    const result = await axiosInstance.get('/members/profile')
        .then(response => {
            const responseBody: MemberDetailResponseDto = response.data;
            return responseBody
        })
        .catch(error => {
            console.log("memberDetailRequest api error:", error)
            return null
        })

    return result
}

export const MemberExtraInfoRequest = async (requestBody: FormData) => {
    const result = await axiosInstance.post('/members/extra-info', requestBody, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
        .then(response => {
            const responseBody: MemberExtraInfoResponseDto = response.data;
            return responseBody
        })
        .catch(error => {
            console.log("MemberExtraInfo api error:", error)
            return null
        })
    return result
}

export const CheckLoginIdRequest = async (requestBody: CheckLoginIdRequestDto) => {
    const result = await axiosInstance.post('/members/check-loginId', requestBody)
        .then(response => {
            const responseBody: CheckLoginIdResponseDto = response.data;
            return responseBody
        })
        .catch(error => {
            console.log("CheckLoginIdRequest api error:", error)
            return null
        })

    return result
}

export const CheckNicknameRequest = async (requestBody: CheckNicknameRequestDto) => {
    const result = await axiosInstance.post('/members/check-nickname', requestBody)
        .then(response => {
            const responseBody: CheckNicknameResponseDto = response.data;
            return responseBody
        })
        .catch(error => {
            console.log("CheckLoginIdRequest api error:", error)
            return null
        })

    return result
}

export const PasswordUpdateRequest = async (requestBody: PasswordUpdateRequestDTO) => {
    const result = await axiosInstance.put('/members/password', requestBody)
        .then(response => {
            const responseBody: PasswordUpdateResponseDto = response.data;
            return responseBody
        })
        .catch(error => {
            console.log("PasswordUpdateRequest api error:", error)
            return null
        })
    return result
}