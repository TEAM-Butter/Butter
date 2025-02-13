import { CheckLoginIdRequestDto, SignUpRequestDto } from "./memberDto";
import { MemberExtraInfoResponseDto } from "../../response/member";
import { CheckLoginIdResponseDto, MemberDetailResponseDto, SignUpResponseDto } from "../../response/member";
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