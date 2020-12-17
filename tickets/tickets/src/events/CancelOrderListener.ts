import nats, { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCancelledEvent } from "@scope/common";
import { queueGroupName } from "./queueGroupName";
import { Ticket } from "../models/Ticket";
import { UpdateTicketPublisher } from "./UpdateTicketPublisher";

export class CancelOrderListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  onMessage = async (data: OrderCancelledEvent["data"], msg: Message) => {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    console.log("ticket found");
    ticket.set({ orderId: undefined });
    await ticket.save();
    if (ticket.id) {
      await new UpdateTicketPublisher(this.client).publish({
        id: ticket.id,
        price: ticket.price,
        title: ticket.title,
        userId: ticket.userId,
        orderId: ticket.orderId,
        version: ticket.version,
      });
    }

    msg.ack();
  };
}
