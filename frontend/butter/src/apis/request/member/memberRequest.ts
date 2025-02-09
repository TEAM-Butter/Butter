import axios from "axios";
import { MemberExtraInfoDto, SignUpRequestDto } from "./memberDto";
import { MemberDetailResponseDto, SignUpResponseDto } from "../../response/member";
import { axiosInstance } from "../../axiosInstance";

const API_DOMAIN = `http://localhost:8080/api/v1`;
const SIGNUP_URL = () => `${API_DOMAIN}/members/signup`;

export const signupRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGNUP_URL(), requestBody,)
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
    const result = await axiosInstance.post('/members/extra-info', requestBody)
        .then(response => {
            const responseBody: MemberExtraInfoDto = response.data;
            return responseBody
        })
        .catch(error => {
            console.log("MemberExtraInfo api error:", error)
            return null
        })

    return result
}