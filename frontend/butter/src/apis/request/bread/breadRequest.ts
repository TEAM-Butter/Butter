import { axiosInstance } from "../../axiosInstance";
import { BreadAmountDto } from "../../response/bread";
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

export const getBreadAmount = async () => {
    const result: BreadAmountDto = await axiosInstance.get('/bread')
    .then(response => {
        return response.data
    }).catch(error => {
        console.log("memberDetailRequest api error:", error)
        return null
    });
    return result;
}