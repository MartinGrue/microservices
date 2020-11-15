import nats, { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCreatedEvent } from "@scope/common";
import { queueGroupName } from "./queueGroupName";
import { Ticket } from "../models/Ticket";
import { UpdateTicketPublisher } from "./UpdateTicketPublisher";
export class CreateOrderListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  onMessage = async (data: OrderCreatedEvent["data"], msg: Message) => {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    ticket.set({ orderId: data.id });
    await ticket.save();
    await new UpdateTicketPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    msg.ack();
  };
}
