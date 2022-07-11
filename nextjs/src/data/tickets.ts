import { ITicket, ITicketDef } from "../interfaces/ticket";
import { makeIdGenerator } from "./utils";

const getId = makeIdGenerator();

export const ticketsDef: ITicketDef[] = [
  {
    title: "ticketforEvent1nr1",
    price: 100,
    orderid: 1,
  },
  {
    title: "ticketforEvent1nr2",
    price: 100,
    orderid: null,
  },
  {
    title: "ticketforEvent1nr3",
    price: 100,
    orderid: 3,
  },
  {
    title: "ticketforEvent1nr4",
    price: 100,
    orderid: 1,
  },
  {
    title: "ticketforEvent1nr5",
    price: 100,
    orderid: 1,
  },
  {
    title: "ticketforEvent1nr6",
    price: 100,
    orderid: 1,
  },
];
const ticketData: ITicket[] = ticketsDef.map((ticketDef) => ({
  id: getId(),
  ...ticketDef,
}));
