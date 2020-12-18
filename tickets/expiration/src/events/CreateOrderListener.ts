import nats, { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCreatedEvent } from "@scope/common";
import { queueGroupName } from "./queueGroupName";
export class CreateOrderListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  onMessage = async (data: OrderCreatedEvent["data"], msg: Message) => {
    msg.ack();
  };
}
