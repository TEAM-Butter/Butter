import axios from "axios";
import { LoginRequestDto } from "../auth/authDto";
import { LoginResponseDto } from "../../response/auth";

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