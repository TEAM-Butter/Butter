import { axiosInstance } from "../../axiosInstance";
import { BreadAmountDto } from "../../response/bread";
import { BreadDonationRequestDto } from "./breadDto";

export const breadDonationRequest = async (
  requestBody: BreadDonationRequestDto
) => {
  const result = await axiosInstance
    .post(
      "/bread/donate",
      { crewId: requestBody.crewId, amount: requestBody.amount },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const socket = requestBody.socket;
      console.log("🚀🚀🚀🚀🚀🚀🚀", socket);
      console.log("crewId", requestBody.crewId);
      console.log("participant", requestBody.participant);
      console.log("amount", requestBody.amount);
      socket.emit("donate", {
        roomName: requestBody.crewId,
        participant: requestBody.participant,
        breadAmount: requestBody.amount,
      });
      alert("후원하셨습니다");
    })
    .catch((error) => {
      console.log("Bread donate api error:", error);
      return null;
    });
  return result;
};

export const getBreadAmount = async () => {
  const result: BreadAmountDto = await axiosInstance
    .get("/bread")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("memberDetailRequest api error:", error);
      return null;
    });
  return result;
};
