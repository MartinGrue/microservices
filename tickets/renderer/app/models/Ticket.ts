export interface ITicket {
  id: string | string[];
  title: string;
  price: number;
  userId: string;
  orderId?: string;
  verison: number;
}
export interface NewTicketBody {
  title: string;
  price: number;
}
