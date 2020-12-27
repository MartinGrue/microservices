import nats, { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCreatedEvent } from "@scope/common";
import { queueGroupName } from "./queueGroupName";
import { Order } from "../models/Orders";
export class CreateOrderListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  onMessage = async (data: OrderCreatedEvent["data"], msg: Message) => {
    const { userId, status, ticket, id } = data;

    const order = Order.build({
      id,
      price: ticket.price,
      status,
      userId,
    });
    await order.save();
    msg.ack();
  };
}
