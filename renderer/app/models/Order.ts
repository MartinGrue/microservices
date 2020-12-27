import { interopDefault } from "next/dist/next-server/server/load-components";

export interface IOrder {
  id: string | string[];
  expiresAt: Date;
  status: string;
  ticket: ITicketInOrder;
  userId: string;
  version: number;
}
interface ITicketInOrder {
  title: string;
  price: number;
  version: number;
  id: string;
}
