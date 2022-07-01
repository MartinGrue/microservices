export interface Ticket {
  id: string;
  title: string;
  price: string;
  oderId: string;
  count: number;
}
export interface IEventTicket extends Ticket {
  eventId: string;
}
export interface IUserTicket extends Ticket {
  userId: string;
}
