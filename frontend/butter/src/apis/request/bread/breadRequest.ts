import { axiosInstance } from "../../axiosInstance";
import { BreadDonationRequestDto } from "./breadDto";

export const breadDonationRequest = async (requestBody: BreadDonationRequestDto) => {
    const result = await axiosInstance.post('/bread/donate', requestBody,{
        headers: {
            "Content-Type" : "application/json",
        },
        
    })
    .then(response => {

    })
    .catch(error => {
        console.log("Bread donate api error:", error)
        return null
    })
    return result
}