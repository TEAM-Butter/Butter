import { axiosInstance } from "../../axiosInstance";
import { CrewRegisterResponseDto } from "../../response/crew";

export const CrewRegisterRequest = async (requestBody: FormData) => {
    const result = await axiosInstance.post('/crew', requestBody,{
        headers: {
            "Content-Type" : "multipart/form-data",
        }
    })
        .then(response => {
            const responseBody: CrewRegisterResponseDto = response.data;
            return responseBody
        })
        .catch(error => {
            console.log("CrewRegister api error:", error)
            return null
        })
        return result
    }