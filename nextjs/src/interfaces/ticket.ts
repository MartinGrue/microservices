export interface ITicketDef {
  title: string;
  price: number;
  orderid: number | null;
}
export interface ITicket {
  id: number;
  title: string;
  price: number;
  orderid: number | null;
}
export interface IEventTicket extends ITicket {
  eventslug: string;
}
export interface IUserTicket extends ITicket {
  userId: string;
}
