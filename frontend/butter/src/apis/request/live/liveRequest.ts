import { LiveListResponseDto } from "../../response/live";
import { axiosInstance } from "../../axiosInstance";

export const LiveListRequest = async () => {
    const result = await axiosInstance.get('/live/list')
        .then(response => {
            const responseBody: LiveListResponseDto = response.data;
            return responseBody
        })
        .catch(error => {
            console.log("memberDetailRequest api error:", error)
            return null
        })

    return result
}