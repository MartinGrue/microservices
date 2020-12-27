import nats, { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCreatedEvent } from "@scope/common";
import { queueGroupName } from "./queueGroupName";
import { expirationQ } from "../queues/ExpirationQ";
export class CreateOrderListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  onMessage = async (data: OrderCreatedEvent["data"], msg: Message) => {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    expirationQ.add({ orderId: data.id }, {delay});
    msg.ack();
  };
}
