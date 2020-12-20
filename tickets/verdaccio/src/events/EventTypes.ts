import { OrderStatus } from "./helper/order-status";
import { Subjects } from "./Subjects";

export interface Event {
  subject: Subjects;
  data: any;
}
export interface TicketCreatedEvent extends Event {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
  };
}
export interface TicketUpdatedEvent extends Event {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string;
  };
}
// id: order.id,
// version: order.version,
// status: order.status,
// userId: order.userId,
// expiresAt: order.expiresAt.toISOString(),
// ticket: {
//   id: ticket.id,
//   price: ticket.price,
// },
export interface OrderCreatedEvent extends Event {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: { id: string; price: number };
  };
}
export interface OrderCancelledEvent extends Event {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number;
    // status: OrderStatus;
    // userId: string;
    // expiresAt: string;
    ticket: { id: string };
  };
}
export interface ExpirationCompleteEvent extends Event {
  subject: Subjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}
