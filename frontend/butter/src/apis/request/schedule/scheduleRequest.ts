import { axiosInstance } from "../../axiosInstance";
import { ScheduleResponseDto } from "../../response/schedule";

export const myCrewScheduleRequest = async () => {
    const result = await axiosInstance.get(`/schedule/my-crew`)
        .then(response => {
            const responseBody: ScheduleResponseDto[] = response.data;
            return responseBody;
        })
        .catch(error => {
            console.log("My crew schedule api error", error);
            return null;
        });
    return result;
};