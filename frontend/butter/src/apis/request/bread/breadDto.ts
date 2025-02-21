import { Socket } from "socket.io-client";

interface BreadDonationRequestDto {
  crewId: number;
  amount: number;
  socket: Socket;
  participant: string;
}

export type { BreadDonationRequestDto };
