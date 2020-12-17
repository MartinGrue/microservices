export interface ITicket {
  id: string | string[];
  title: string;
  price: number;
  userId: string;
  orderId: string;
}
export interface NewTicketBody {
  title: string;
  price: number;
}
